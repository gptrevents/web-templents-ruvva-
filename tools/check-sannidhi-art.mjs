import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const b = await chromium.launch();
const report = [];
const dir = "themes/sannidhi/screenshots/ceremonial-art";
await mkdir(dir, { recursive: true });
try {
  for (const [width, height] of [
    [360, 740],
    [390, 844],
    [844, 390],
    [820, 1180],
    [1440, 900],
  ]) {
    const p = await b.newPage({
      viewport: { width, height },
      hasTouch: width < 1024,
      isMobile: width < 600,
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto("http://127.0.0.1:4175/themes/sannidhi/");
    const open = p.getByRole("button", {
      name: "Open Invitation",
      exact: true,
    });
    await open.waitFor();
    await p.evaluate(() => document.fonts.ready);
    await p.locator(".opening .devotional-image").evaluate((e) => e.decode());
    await p.screenshot({ path: `${dir}/opening-${width}.png` });
    const box = await open.boundingBox();
    assert(box.x >= 0 && box.x + box.width <= width);
    if (height >= 700 || width >= 600)
      assert(
        box.y + box.height <= height,
        `${width}: opening button below viewport ${JSON.stringify(box)}`,
      );
    assert.equal(await p.locator(".opening svg.diya").count(), 0);
    assert(
      await p.locator(".opening img.devotional-image").evaluate((e) => e.naturalWidth > 0),
    );
    await open.click();
    await p.locator(".opening").waitFor({ state: "detached" });
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
    );
    assert.deepEqual(errors, []);
    if (width === 390 || width === 1440) {
      for (const id of ["hero", "couple", "countdown", "gallery", "rsvp"]) {
        await p.locator("#" + id).scrollIntoViewIfNeeded();
        await p.waitForTimeout(1300);
        await p.screenshot({ path: `${dir}/${id}-${width}.png` });
      }
      assert(
        await p
          .locator("#couple .margin-kolam")
          .evaluate((e) => e.tagName === "SPAN" && e.querySelectorAll("path").length >= 16),
      );
      assert.equal(
        await p
          .locator("#couple")
          .evaluate((e) => getComputedStyle(e, "::before").display),
        "none",
      );
    }
    report.push(
      `PASS ${width}x${height}: opening CTA fits, darshan image decoded, no overflow/JS errors, ceremony unlocks.`,
    );
    await p.close();
  }
  await writeFile(
    "themes/sannidhi/ceremonial-art-report.txt",
    report.join("\n") + "\n",
  );
  console.log(report.join("\n"));
} finally {
  await b.close();
}
