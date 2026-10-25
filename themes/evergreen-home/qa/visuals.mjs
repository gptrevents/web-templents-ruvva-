import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const root = "themes/evergreen-home",
  b = await chromium.launch(),
  report = [];
try {
  for (const [label, width, height] of [
    ["phone", 390, 844],
    ["tablet", 820, 1180],
    ["landscape", 844, 390],
    ["desktop", 1440, 900],
  ]) {
    const p = await b.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await p.goto("http://127.0.0.1:4175/" + root + "/");
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    await p.evaluate(() => document.fonts.ready);
    await mkdir(root + "/screenshots/" + label, { recursive: true });
    await p.screenshot({ path: `${root}/screenshots/${label}/preview.png` });
    const action = await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .boundingBox();
    assert(
      action.y + action.height <= height + 1,
      "opening action should fit " + label,
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    for (const id of [
      "hero",
      "couple",
      "countdown",
      "events",
      "venue",
      "rsvp",
      "footer",
    ]) {
      if (!(await p.locator("#" + id).count())) continue;
      await p.locator("#" + id).scrollIntoViewIfNeeded();
      await p.waitForTimeout(100);
      if (["phone", "desktop"].includes(label))
        await p.locator("#" + id).screenshot({
          path: `${root}/screenshots/${label}/section-${id}.png`,
        });
    }
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      width,
    );
    const family = await p
      .locator(".person")
      .evaluateAll((ns) =>
        ns.map((n) => Math.round(n.getBoundingClientRect().x)),
      );
    assert.equal(await p.locator(".home-snapshot").count(), 3);
    if (label === "desktop") {
      const cols = await p
        .locator(".venue-grid")
        .evaluate((n) =>
          [...n.children].map((n) => n.getBoundingClientRect().x),
        );
      assert(cols[1] > cols[0]);
      const events = await p
        .locator(".event-card")
        .evaluateAll((ns) =>
          ns.map((n) => Math.round(n.getBoundingClientRect().x)),
        );
      assert.equal(new Set(events).size, 2);
      const fields = await p
        .locator(".form-columns .field")
        .evaluateAll((ns) => ns.map((n) => n.getBoundingClientRect().x));
      assert(fields[1] > fields[0]);
    }
    report.push(
      `PASS ${label}: ${width}x${height}, visible opening action, three-photo interior collage, chapter captures and responsive compositions.`,
    );
    await p.close();
  }
  const p = await b.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4175/" + root + "/?data=telugu");
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.locator("#couple").scrollIntoViewIfNeeded();
  await p
    .locator("#couple")
    .screenshot({ path: root + "/screenshots/phone/telugu-family.png" });
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth),
    390,
  );
  await p.close();
  report.push("PASS Telugu family/long names remain within the phone layout.");
  await writeFile(root + "/visual-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
} finally {
  await b.close();
}
