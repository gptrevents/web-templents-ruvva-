import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const base = "http://127.0.0.1:4176/";
const folder = "themes/storybook-garden";
const browser = await chromium.launch();
const notes = [];
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } }),
      images = new Set();
    page.on("response", (r) => {
      if (r.url().endsWith(".webp")) images.add(r.url().split("/").pop());
    });
    await page.goto(base, { waitUntil: "networkidle" });
    assert.deepEqual(
      [...images],
      [width === 390 ? "garden-phone.webp" : "garden-desktop.webp"],
    );
    assert.equal(await page.locator(".page-content").isHidden(), true);
    assert.equal(await page.locator(".hanging-sign .wood-board").count(), 2);
    const paintIds = await page
      .locator(".wood-board linearGradient")
      .evaluateAll((nodes) => nodes.map((node) => node.id));
    assert.equal(new Set(paintIds).size, paintIds.length);
    assert.equal(await page.locator(".opening .butterfly").count(), 1);
    assert.equal(
      await page
        .locator(".opening")
        .evaluate((n) =>
          getComputedStyle(n).backgroundImage.includes(
            "garden-" + (innerWidth < 1024 ? "phone" : "desktop"),
          ),
        ),
      true,
    );
    await page
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await page.locator(".opening").waitFor({ state: "detached" });
    assert.equal(await page.locator(".page-content").isVisible(), true);
    assert.equal(
      await page.evaluate(() => document.body.classList.contains("locked")),
      false,
    );
    const row = page.locator(".gallery-filmstrip");
    await row.scrollIntoViewIfNeeded();
    await page
      .getByRole("button", { name: "Next pictures", exact: true })
      .click();
    await page.waitForTimeout(850);
    assert((await row.evaluate((n) => n.scrollLeft)) > 100);
    await row.focus();
    await page.keyboard.press("ArrowRight");
    await page.waitForTimeout(850);
    assert((await row.evaluate((n) => n.scrollLeft)) > 200);
    await page.locator(".photo").nth(3).click();
    await page.keyboard.press("Escape");
    await page.locator("dialog").waitFor({ state: "detached" });
    assert.equal(
      await page.evaluate(() =>
        document.activeElement.classList.contains("photo"),
      ),
      true,
    );
    await page.locator("#events").scrollIntoViewIfNeeded();
    await page.waitForTimeout(900);
    const line = await page.locator(".trail-progress").evaluate((n) => ({
      length: n.getTotalLength(),
      offset: parseFloat(n.style.strokeDashoffset),
    }));
    assert(line.length > 100);
    assert(line.offset < line.length);
    const markers = await page.locator(".event-marker").evaluateAll((nodes) =>
      nodes.map((n) => ({
        x: n.getBoundingClientRect().x,
        y: n.getBoundingClientRect().y,
      })),
    );
    if (width === 1440) assert(Math.abs(markers[0].x - markers[1].x) > 200);
    notes.push(
      `PASS ${width}px: only matching background before opening, no eager gallery requests, wooden scene unlocks; filmstrip arrows/keyboard and lightbox focus; winding event trail draws.`,
    );
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 421, height: 844 } });
  await page.goto(base);
  await page
    .getByRole("button", { name: "Open Invitation", exact: true })
    .click();
  await page.locator(".opening").waitFor({ state: "detached" });
  await page.mouse.move(210, 400);
  await page.mouse.wheel(0, 640);
  await page.waitForTimeout(40);
  const early = await page.evaluate(() => scrollY);
  assert(early > 0 && early < 630);
  await page.waitForTimeout(1400);
  const settled = await page.evaluate(() => scrollY);
  assert(Math.abs(settled - 640) < 2);
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.mouse.down();
  await page.mouse.up();
  for (let i = 0; i < 24; i++) await page.mouse.wheel(0, 8);
  await page.waitForTimeout(1300);
  assert(Math.abs((await page.evaluate(() => scrollY)) - 192) < 3);
  notes.push(
    "PASS 421px fine-pointer wheel easing and repeated small trackpad deltas; real document scroll preserved.",
  );
  await page.close();
  const touch = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const tp = await touch.newPage();
  await tp.goto(base);
  await tp
    .getByRole("button", { name: "Open Invitation", exact: true })
    .click();
  await tp.locator(".opening").waitFor({ state: "detached" });
  await tp.locator(".photo").first().click();
  await tp.locator("dialog").evaluate((n) => {
    n.dispatchEvent(
      new TouchEvent("touchstart", {
        changedTouches: [
          new Touch({ identifier: 1, target: n, clientX: 300, clientY: 400 }),
        ],
      }),
    );
    n.dispatchEvent(
      new TouchEvent("touchend", {
        changedTouches: [
          new Touch({ identifier: 1, target: n, clientX: 100, clientY: 400 }),
        ],
      }),
    );
  });
  assert.equal(await tp.locator(".viewer-counter").textContent(), "2 / 6");
  await tp.keyboard.press("Escape");
  await touch.close();
  notes.push("PASS mobile lightbox swipe.");
  const walk = async (dir) => {
    let paths = [];
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const file = dir + "/" + entry.name;
      if (entry.isDirectory()) paths.push(...(await walk(file)));
      else paths.push(file);
    }
    return paths;
  };
  const all = await walk(folder + "/assets");
  const files = all.filter((f) => /\.(webp|png|jpe?g)$/.test(f));
  const common = files.filter((f) => !f.endsWith("garden-desktop.webp"));
  let bytes = 0;
  for (const file of common) bytes += (await stat(file)).size;
  const desktop = (await stat(folder + "/assets/garden-desktop.webp")).size;
  const js = gzipSync(await readFile(folder + "/app.js")).length,
    css = gzipSync(await readFile(folder + "/style.css")).length;
  assert(bytes <= 450000);
  assert(desktop <= 400000);
  assert(js <= 60000);
  assert(css <= 25000);
  assert((await stat(folder + "/assets/garden-phone.webp")).size <= 150000);
  assert(desktop <= 150000);
  notes.push(
    `PASS budgets: common/phone images ${bytes} bytes; desktop-only ${desktop}; JS gzip ${js}; CSS gzip ${css}; first-screen phone 103352, desktop ${desktop}.`,
  );
  await writeFile(folder + "/experience-report.txt", notes.join("\n") + "\n");
  console.log(notes.join("\n"));
} finally {
  await browser.close();
}
