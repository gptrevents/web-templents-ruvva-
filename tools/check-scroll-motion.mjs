import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const themes = [
  "temple-dawn",
  "floral-elegant",
  "storybook-garden",
  "ocean-serene",
  "varnika",
  "sannidhi",
  "kalyana-vaibhavam",
];
const report = [];
const browser = await chromium.launch();
try {
  for (const theme of themes) {
    const errors = [];
    const page = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "no-preference",
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`http://127.0.0.1:4175/themes/${theme}/`);
    await page.mouse.move(40, 350);
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(120);
    assert.equal(
      await page.evaluate(() => scrollY),
      0,
      theme + " opening locks scroll",
    );
    await page
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await page.locator(".opening").waitFor({ state: "detached" });
    await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
    await page.mouse.move(40, 350);
    await page.mouse.wheel(0, 640);
    await page.waitForTimeout(80);
    const early = await page.evaluate(() => scrollY);
    assert(early > 0 && early < 500, theme + " eased start " + early);
    await page.waitForTimeout(400);
    const middle = await page.evaluate(() => scrollY);
    assert(middle > early && middle < 640, theme + " progressive motion");
    await page.waitForTimeout(1100);
    assert(
      Math.abs((await page.evaluate(() => scrollY)) - 640) < 3,
      theme + " exact distance",
    );
    await page.mouse.wheel(0, 1800);
    await page.waitForTimeout(1800);
    assert(
      Math.abs((await page.evaluate(() => scrollY)) - 2440) < 3,
      theme + " fast multi-screen gesture retains its full distance",
    );
    await page.mouse.wheel(0, 700);
    await page.waitForTimeout(120);
    const turn = await page.evaluate(() => scrollY);
    await page.mouse.wheel(0, -240);
    await page.waitForTimeout(220);
    assert(
      (await page.evaluate(() => scrollY)) < turn - 60,
      theme + " immediate direction reversal",
    );
    await page.waitForTimeout(1200);
    await page.locator(".person").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(350);
    const before = await page
      .locator(".person")
      .first()
      .evaluate((n) => n.style.translate);
    await page.evaluate(() => scrollBy({ top: 220, behavior: "instant" }));
    await page.waitForTimeout(150);
    const after = await page
      .locator(".person")
      .first()
      .evaluate((n) => n.style.translate);
    assert(before !== after, theme + " portraits respond to actual scroll");
    // The entire portrait card moves; the image keeps its existing crop and scale.
    await page.locator(".photo").first().click();
    await page.locator("dialog[open]").waitFor();
    const locked = await page.evaluate(() => scrollY);
    await page.mouse.move(40, 350);
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(300);
    assert(
      Math.abs((await page.evaluate(() => scrollY)) - locked) < 2,
      theme + " viewer keeps document locked",
    );
    await page.keyboard.press("Escape");
    await page.locator("dialog").waitFor({ state: "detached" });
    // Leave the focused gallery: its Home/End keys intentionally select photos.
    await page.locator("#couple h2").click();
    await page.mouse.wheel(0, -500);
    await page.waitForTimeout(80);
    await page.keyboard.press("End");
    await page.waitForTimeout(1100);
    const end = await page.evaluate(() => ({
      y: scrollY,
      max: document.documentElement.scrollHeight - innerHeight,
    }));
    assert(
      Math.abs(end.y - end.max) < 8,
      theme + " keyboard interrupts easing and reaches page end",
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.locator(".person").first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
    assert.equal(
      await page
        .locator(".person")
        .first()
        .evaluate((n) => n.style.translate),
      "",
      theme + " reduced motion restores static cards",
    );
    for (const [width, height] of [
      [390, 844],
      [820, 1180],
      [1440, 900],
    ]) {
      await page.setViewportSize({ width, height });
      await page.locator("#couple").scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
        theme + " width " + width,
      );
    }
    await page.close();
    const touch = await browser.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    await touch.goto(`http://127.0.0.1:4175/themes/${theme}/`);
    await touch
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await touch.locator(".opening").waitFor({ state: "detached" });
    await touch.locator("#couple").scrollIntoViewIfNeeded();
    await touch.waitForTimeout(200);
    const touchBefore = await touch
      .locator(".person")
      .first()
      .evaluate((n) => n.style.translate);
    await touch.evaluate(() => scrollBy({ top: 160, behavior: "instant" }));
    await touch.waitForTimeout(150);
    assert.notEqual(
      await touch
        .locator(".person")
        .first()
        .evaluate((n) => n.style.translate),
      touchBefore,
      theme + " choreography works on touch layout",
    );
    const native = await touch.evaluate(() => {
      const e = new TouchEvent("touchmove", {
        bubbles: true,
        cancelable: true,
      });
      document.body.dispatchEvent(e);
      return !e.defaultPrevented;
    });
    assert(native, theme + " native touch gesture not hijacked");
    await touch.close();
    assert.deepEqual(errors, [], theme + " no runtime errors");
    const js = gzipSync(await readFile(`themes/${theme}/app.js`)).length;
    const css = gzipSync(await readFile(`themes/${theme}/style.css`)).length;
    assert(js < 60000 && css < 25000, theme + " script/style budgets");
    report.push(
      `PASS ${theme}: eased start ${early}px, continued motion ${middle}px, exact 640px finish and full 1800px fast gesture; reversal, portrait depth, gallery lock/Escape, keyboard End, reduced motion, 390/820/1440 widths, touch-layout depth and native touch preserved. JS ${js}B; CSS ${css}B gzip.`,
    );
    console.log(report.at(-1));
  }
  await writeFile(
    "tools/scroll-motion-report.txt",
    report.join("\n") +
      "\nChromium automation; no physical iOS/Android device verification.\n",
  );
} finally {
  await browser.close();
}
