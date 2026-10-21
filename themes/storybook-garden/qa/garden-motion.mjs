import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const report = [];
try {
  for (const width of [390, 820, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    await page.goto("http://127.0.0.1:4176/");
    await page
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await page.locator(".opening").waitFor({ state: "detached" });
    const flags = page.locator(".pavilion-flags");
    await page.locator("#live").scrollIntoViewIfNeeded();
    await page.waitForTimeout(180);
    assert.equal(
      await flags.evaluate((n) => getComputedStyle(n).animationPlayState),
      "running",
    );
    const pose = await flags.evaluate((n) => getComputedStyle(n).transform);
    await page.waitForTimeout(450);
    assert.notEqual(
      await flags.evaluate((n) => getComputedStyle(n).transform),
      pose,
      "flags move independently",
    );
    assert.equal(
      await page
        .locator(".pavilion-wing")
        .evaluate((n) => getComputedStyle(n).animationName),
      "garden-bird-stretch",
    );
    // Exercise the visibility-change handler without relying on headless OS tab focus.
    await page.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        get: () => true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert.equal(
      await flags.evaluate((n) => getComputedStyle(n).animationPlayState),
      "paused",
    );
    await page.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await page.locator("#couple").scrollIntoViewIfNeeded();
    await page.waitForTimeout(180);
    assert.equal(
      await flags.evaluate((n) => getComputedStyle(n).animationPlayState),
      "paused",
      "offscreen pavilion pauses",
    );
    const leaf = page.locator("#couple > .garden-breeze .breeze-leaves");
    assert.equal(
      await leaf.evaluate((n) => getComputedStyle(n).animationPlayState),
      "running",
    );
    const angle = await leaf.evaluate((n) => getComputedStyle(n).rotate);
    await page.waitForTimeout(350);
    assert.notEqual(
      await leaf.evaluate((n) => getComputedStyle(n).rotate),
      angle,
      "leaf changes pose",
    );
    await page.locator(".closing-picture").scrollIntoViewIfNeeded();
    await page.waitForTimeout(1400);
    assert(
      await page
        .locator(".closing-picture")
        .evaluate((n) => n.classList.contains("seen")),
    );
    assert.equal(
      await page
        .locator(".closing-photo")
        .evaluate((n) => getComputedStyle(n).objectFit),
      "contain",
    );
    await page.locator("#hero").scrollIntoViewIfNeeded();
    await page.locator(".closing-picture").scrollIntoViewIfNeeded();
    assert(
      await page
        .locator(".closing-picture")
        .evaluate((n) => n.classList.contains("seen")),
      "reveal remains seen after returning",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.waitForTimeout(80);
    assert.equal(
      await flags.evaluate((n) => getComputedStyle(n).animationName),
      "none",
    );
    assert.equal(
      await leaf.evaluate((n) => getComputedStyle(n).animationName),
      "none",
    );
    assert.equal(
      await page
        .locator(".pavilion-wing")
        .evaluate((n) => getComputedStyle(n).animationName),
      "none",
    );
    assert.equal(
      await page
        .locator(".closing-picture")
        .evaluate((n) => getComputedStyle(n).opacity),
      "1",
    );
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    report.push(
      `PASS ${width}: independent flag/leaf motion; intermittent wing; offscreen pause; simulated hidden-state handler pause; once-only closing reveal; reduced-motion stops loops and leaves photos visible.`,
    );
    await page.close();
  }
  await writeFile(
    "themes/storybook-garden/garden-motion-report.txt",
    report.join("\n") + "\n",
  );
  console.log(report.join("\n"));
} finally {
  await browser.close();
}
