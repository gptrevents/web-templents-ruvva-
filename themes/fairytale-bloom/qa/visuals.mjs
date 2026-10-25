import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const root = "themes/fairytale-bloom",
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
    if (label === "landscape") {
      const box = await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .boundingBox();
      assert(
        box.y + box.height <= height + 1,
        "landscape opening action should fit the viewport",
      );
    }
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    for (const id of [
      "hero",
      "countdown",
      "events",
      "venue",
      "rsvp",
      "footer",
    ]) {
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
    if (label === "desktop") {
      const positions = await p
        .locator(".form-columns")
        .evaluate((n) =>
          [...n.children].map((x) => x.getBoundingClientRect().x),
        );
      assert(positions[1] > positions[0]);
      const eventLefts = await p
        .locator(".event-card")
        .evaluateAll((ns) =>
          ns.map((n) => Math.round(n.getBoundingClientRect().x)),
        );
      assert(new Set(eventLefts).size === 4);
      const cols = await p
        .locator(".venue-grid")
        .evaluate((n) =>
          [...n.children].map((x) => x.getBoundingClientRect().x),
        );
      assert(cols[1] > cols[0]);
    }
    report.push(
      `PASS ${label}: ${width}x${height}, opening/whole-chapter captures and responsive composition.`,
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
  await p.evaluate(() => document.fonts.ready);
  await p
    .locator("#hero")
    .screenshot({ path: root + "/screenshots/phone/telugu-hero.png" });
  await p.close();
} finally {
  await b.close();
  await writeFile(root + "/visual-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
}
