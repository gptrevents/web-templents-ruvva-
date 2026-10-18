import { chromium } from "playwright";
import { mkdir, writeFile, readFile, rm } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.GALLERY_URL || "http://127.0.0.1:4175";
const browser = await chromium.launch();
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
const report = [];
try {
  await page.goto(base, { waitUntil: "networkidle" });
  await page.waitForSelector(".theme-card");
  assert.equal(await page.locator(".theme-card").count(), 2);
  for (const [width, height] of [
    [320, 844],
    [360, 844],
    [390, 844],
    [844, 390],
    [820, 1180],
    [1280, 900],
    [1440, 900],
    [1920, 1080],
    [2560, 1440],
  ]) {
    await page.setViewportSize({ width, height });
    assert(
      await page.evaluate(
        () => document.documentElement.scrollWidth === innerWidth,
      ),
      `Overflow at ${width}`,
    );
    assert(
      await page
        .locator(".theme-card img")
        .evaluateAll((images) =>
          images.every((img) => img.complete && img.naturalWidth > 0),
        ),
      "Broken preview",
    );
    report.push(`PASS ${width}x${height}: no overflow, preview images loaded`);
    if ([390, 820, 1440].includes(width))
      await page.screenshot({
        path: `gallery/screenshots/${width === 390 ? "phone" : width === 820 ? "tablet" : "desktop"}.png`,
        fullPage: true,
      });
  }
  await page.getByRole("button", { name: "Floral", exact: true }).click();
  assert.equal(await page.locator(".theme-card").count(), 1);
  assert.match(await page.locator(".card-title").innerText(), /Floral Elegant/);
  await page.getByRole("button", { name: "All styles", exact: true }).focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator(".theme-card").count(), 2);
  await page.getByRole("searchbox").fill("temple");
  assert.equal(await page.locator(".theme-card").count(), 1);
  await page.getByRole("searchbox").fill("not-a-template");
  assert(await page.locator("#empty").isVisible());
  await page.getByRole("button", { name: "Show all invitations" }).click();
  assert.equal(await page.locator(".theme-card").count(), 2);
  await page.getByRole("searchbox").fill("<img src=x onerror=alert(1)>");
  assert.equal(await page.locator("#search img").count(), 0);
  await page.getByRole("button", { name: "Show all invitations" }).click();
  report.push(
    "PASS category filters, keyboard activation, search, empty state and reset",
  );
  for (const id of ["temple-dawn", "floral-elegant"]) {
    await page.locator(`.open-link[href$="/${id}/"]`).click();
    await page
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    assert(page.url().endsWith(`/themes/${id}/`));
    await page.goBack({ waitUntil: "networkidle" });
    await page.waitForSelector(".theme-card");
    report.push(
      `PASS ${id}: actual invitation opens and browser Back returns to gallery`,
    );
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
    "auto",
  );
  await page.screenshot({
    path: "gallery/screenshots/reduced-motion.png",
    fullPage: true,
  });
  report.push("PASS reduced motion, no page errors");
  assert.deepEqual(errors, []);
  // A new folder should appear without editing app.js; a non-theme folder must not.
  const fixture = "themes/gallery-check-fixture";
  const original = await readFile("gallery/themes.json", "utf8");
  try {
    await mkdir(fixture);
    await writeFile(
      `${fixture}/index.html`,
      "<!doctype html><title>Fixture</title>",
    );
    await page.reload({ waitUntil: "networkidle" });
    assert.equal(await page.locator(".theme-card").count(), 3);
    await page.getByRole("button", { name: "Other", exact: true }).click();
    assert.equal(await page.locator(".theme-card").count(), 1);
    assert.equal(
      await page.locator(".card-title").innerText(),
      "Gallery Check Fixture",
    );
    assert(await page.locator(".fallback-preview").isVisible());
    report.push("PASS future theme auto-discovery and no-image fallback");
  } finally {
    await rm(fixture, { recursive: true, force: true });
    await writeFile("gallery/themes.json", original);
  }
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.locator(".theme-card").count(), 2);
  console.log(report.join("\n"));
  await writeFile("gallery/verification.txt", report.join("\n") + "\n");
} finally {
  await browser.close();
}
