import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const base = "http://127.0.0.1:4179/";
const notes = [];
async function fixture(mutator) {
  await page.unroute("**/sample-data.json");
  await page.route("**/sample-data.json", async (r) => {
    const response = await r.fetch();
    const data = await response.json();
    mutator(data);
    await r.fulfill({ json: data });
  });
  await page.goto(base);
  await page
    .getByRole("button", { name: "Open Invitation", exact: true })
    .click();
  await page.locator(".opening").waitFor({ state: "detached" });
}
for (const count of [1, 2, 3, 6, 12]) {
  await fixture(
    (d) =>
      (d.gallery = Array.from(
        { length: count },
        (_, i) => d.gallery[i % d.gallery.length],
      )),
  );
  assert.equal(await page.locator(".photo").count(), count);
  assert.equal(
    await page.evaluate(() => document.documentElement.scrollWidth),
    1440,
  );
  if ([1, 2, 3, 12].includes(count)) {
    await page.locator("#gallery").scrollIntoViewIfNeeded();
    await page.locator("#gallery").screenshot({
      path: `themes/sannidhi/screenshots/desktop/gallery-${count}.png`,
    });
  }
}
notes.push("Gallery counts 1, 2, 3, 6, 12 render and fit.");
await fixture((d) => {
  d.date = new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
});
assert.equal(
  await page.locator(".count-status").textContent(),
  "Today is the day",
);
assert.equal(await page.locator(".bell-count").isVisible(), false);
await fixture((d) => (d.date = "2020-01-01"));
assert.equal(
  await page.locator(".count-status").textContent(),
  "Thank you for celebrating with us",
);
notes.push("Same-day and past-event countdown states verified.");
for (const faith of ["hindu", "muslim", "christian", "none"]) {
  await fixture((d) => (d.faithId = faith));
  assert.equal(
    await page.locator(".faith-line").count(),
    faith === "none" ? 0 : 1,
  );
}
notes.push("All four faith variants render the correct blessing condition.");
await fixture((d) => {
  d.videoUrl = "javascript:alert(1)";
  d.liveStream.url = "http://example.com";
});
assert.equal(await page.locator("#video,#live").count(), 0);
notes.push("Invalid video and non-HTTPS live URLs omitted.");
await fixture((d) => {});
if (await page.getByRole("button", { name: "Pause music" }).count())
  await page.getByRole("button", { name: "Pause music" }).click();
await page.getByRole("button", { name: "Play music" }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Pause music" })
    .getAttribute("aria-pressed"),
  "true",
);
await page.getByRole("button", { name: "Pause music" }).click();
assert.equal(
  await page
    .getByRole("button", { name: "Play music" })
    .getAttribute("aria-pressed"),
  "false",
);
notes.push("Music play/pause and aria-pressed state verified.");
await page.locator("#hero").focus();
let seen = new Set();
for (let i = 0; i < 100; i++) {
  await page.keyboard.press("Tab");
  const v = await page.evaluate(() => ({
    tag: document.activeElement.tagName,
    name:
      document.activeElement.getAttribute("aria-label") ||
      document.activeElement.textContent ||
      document.activeElement.name,
    outline: getComputedStyle(document.activeElement).outlineStyle,
  }));
  if (v.tag !== "IFRAME" && v.tag !== "BODY") {
    assert.notEqual(v.outline, "none");
    seen.add(v.name);
  }
}
assert.ok([...seen].some((n) => n.includes("Send RSVP")));
notes.push(
  "Keyboard Tab traversal reaches RSVP and controls with visible focus outlines.",
);
await page.setViewportSize({ width: 844, height: 390 });
await fixture((d) => {});
await page.screenshot({
  path: "themes/sannidhi/screenshots/phone/landscape.png",
});
await page.setViewportSize({ width: 820, height: 1180 });
await fixture((d) => {});
await page.screenshot({
  path: "themes/sannidhi/screenshots/desktop/tablet.png",
});
await writeFile("themes/sannidhi/edge-cases-report.txt", notes.join("\n") + "\n");
console.log(notes.join("\n"));
await browser.close();
