import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch();
let notes = [];
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 900 },
      hasTouch: width === 390,
      isMobile: width === 390,
    });
    let files = [];
    p.on("response", (r) => {
      if (/\.(webp|svg|png)(\?|$)/.test(r.url()))
        files.push(r.url().split("/").at(-1));
    });
    await p.goto("http://127.0.0.1:4175/themes/sannidhi/");
    await p.locator(".opening .devotional-image").waitFor();
    await p.locator(".opening .devotional-image").evaluate((e) => e.decode());
    const src = await p
      .locator(".opening .toran")
      .evaluate((e) => e.currentSrc);
    assert(src.endsWith(width === 390 ? "toran.webp" : "toran-desktop.webp"));
    if (width === 390)
      assert(
        !files.some((f) => f.includes("desktop")),
        "phone must not download desktop art",
      );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    const music = p.locator(".floating button[aria-pressed]");
    await music.focus();
    const old = await music.getAttribute("aria-pressed");
    await music.press("Enter");
    assert.notEqual(await music.getAttribute("aria-pressed"), old);
    const down = p.waitForEvent("download");
    await p
      .getByRole("button", { name: "Apple / Outlook", exact: true })
      .click();
    assert.equal((await down).suggestedFilename(), "invitation.ics");
    await p.locator(".photo").first().click();
    assert(await p.locator("dialog").isVisible());
    await p.keyboard.press("Escape");
    await p.locator("dialog").waitFor({ state: "detached" });
    assert.equal(await p.locator(".video iframe").count(), 0);
    await p.getByRole("button", { name: "Play video", exact: true }).click();
    assert.equal(await p.locator(".video iframe").count(), 1);
    await p.getByRole("button", { name: "Send RSVP", exact: true }).click();
    assert.equal(
      await p.locator("#rsvp-name").getAttribute("aria-invalid"),
      "true",
    );
    await p.locator("#rsvp-name").fill("Sample Guest");
    await p.locator("#rsvp-phone").fill("9876543210");
    await p.locator(".event-choices input").first().check();
    await p.evaluate(
      () =>
        (window.onInviteRsvp = async (payload) => {
          window.testPayload = payload;
        }),
    );
    await p.getByRole("button", { name: "Send RSVP", exact: true }).click();
    await p.locator(".thanks").waitFor();
    assert(await p.evaluate(() => Boolean(window.testPayload)));
    notes.push(
      `PASS ${width}: correct responsive garland source, music, ICS, gallery/Escape, deferred video, RSVP validation and local callback.`,
    );
    await p.close();
  }
  await writeFile(
    "themes/sannidhi/ceremonial-actions-report.txt",
    notes.join("\n") + "\n",
  );
  console.log(notes.join("\n"));
} finally {
  await b.close();
}
