import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const root = "themes/kalyana-vaibhavam",
  base = "http://127.0.0.1:4180/",
  notes = [],
  browser = await chromium.launch();
try {
  for (const width of [390, 1440]) {
    const p = await browser.newPage({
        viewport: { width, height: width === 390 ? 844 : 900 },
      }),
      images = new Set(),
      errors = [];
    p.on("response", (r) => {
      if (r.url().endsWith(".webp")) images.add(r.url().split("/").pop());
    });
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(base, { waitUntil: "networkidle" });
    const backdrop =
      width === 390 ? "palace-phone.webp" : "palace-desktop.webp";
    assert(images.has(backdrop));
    assert([...images].some((n) => /^kalyanam(?:-\d+)?\.webp$/.test(n)));
    assert(
      !images.has(width === 390 ? "palace-desktop.webp" : "palace-phone.webp"),
    );
    assert.equal(
      new Set(
        await p
          .locator(".tableau")
          .evaluateAll((ns) => ns.map((n) => n.getAttribute("src"))),
      ).size,
      3,
    );
    assert(await p.evaluate(() => document.body.classList.contains("locked")));
    await p.keyboard.press("Tab");
    assert.equal(
      await p.evaluate(() => document.activeElement.textContent),
      "Open Invitation",
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.waitForTimeout(600);
    assert.notEqual(
      await p
        .locator(".invitation-panel")
        .evaluate((n) => getComputedStyle(n).transform),
      "none",
    );
    await p.screenshot({
      path: `${root}/screenshots/${width === 390 ? "phone" : "desktop"}/opening-in-motion.png`,
    });
    await p.locator(".opening").waitFor({ state: "detached" });
    await p.waitForTimeout(300);
    assert(
      !images.has(width === 390 ? "palace-desktop.webp" : "palace-phone.webp"),
    );
    assert.equal(
      await p.locator(".page-content").evaluate((n) => n.inert),
      false,
    );
    assert.equal(
      await p.evaluate(() => document.body.classList.contains("locked")),
      false,
    );
    assert.equal(await p.locator(".section-art,.banana-corner").count(), 0);
    assert.equal(await p.locator(".continuous-border").count(), 1);
    assert.equal(await p.locator(".hanging-lamp").count(), 0);
    assert.match(
      await p.locator("#hero .tableau").getAttribute("src"),
      /paanigrahanam/,
    );
    assert.match(
      await p.locator("#footer .tableau").getAttribute("src"),
      /sacred-fire/,
    );
    assert.equal(await p.locator('.tableau[src$="kalyanam.webp"]').count(), 0);
    assert.equal(await p.locator(".chapter-flow .palace-scene").count(), 0);
    assert.equal(await p.locator(".count-sanctum .count-painting").count(), 1);
    assert.equal(await p.locator(".scene-canopy").count(), 2);
    const initial = await p
      .locator("#hero")
      .evaluate((n) => n.style.getPropertyValue("--scene-y"));
    await p.evaluate(() => scrollTo({ top: 250, behavior: "instant" }));
    await p.waitForTimeout(200);
    assert.notEqual(
      await p
        .locator("#hero")
        .evaluate((n) => n.style.getPropertyValue("--scene-y")),
      initial,
    );
    const digit = p.locator(".digit").last();
    await p.locator("#countdown").scrollIntoViewIfNeeded();
    await p.waitForTimeout(200);
    let value = await digit.textContent();
    await p.waitForTimeout(1200);
    assert.notEqual(await digit.textContent(), value);
    await p.locator("#hero").scrollIntoViewIfNeeded();
    await p.waitForTimeout(250);
    value = await digit.textContent();
    await p.waitForTimeout(1200);
    assert.equal(await digit.textContent(), value);
    await p.locator(".event-card").last().scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    assert.equal(await p.locator(".event-card").count(), 5);
    assert(Number(await p.locator(".vine-tip").getAttribute("cy")) > 0);
    assert((await p.locator(".vine-botanical").count()) > 5);
    const ids = await p
      .locator("[id]")
      .evaluateAll((ns) => ns.map((n) => n.id));
    assert.equal(new Set(ids).size, ids.length, "SVG/HTML IDs unique");
    await p.locator(".photo").first().click();
    await p.locator("dialog").evaluate((n) => {
      n.dispatchEvent(
        new TouchEvent("touchstart", {
          changedTouches: [
            new Touch({ identifier: 1, target: n, clientX: 240, clientY: 100 }),
          ],
        }),
      );
      n.dispatchEvent(
        new TouchEvent("touchend", {
          changedTouches: [
            new Touch({ identifier: 1, target: n, clientX: 70, clientY: 100 }),
          ],
        }),
      );
    });
    assert.equal(await p.locator(".viewer-counter").textContent(), "2 / 5");
    await p.keyboard.press("Escape");
    await p.locator("#rsvp-name").scrollIntoViewIfNeeded();
    const field = await p.locator("#rsvp-name").boundingBox(),
      controls = await p.locator(".floating").boundingBox();
    assert(
      field.x + field.width <= controls.x ||
        field.y >= controls.y + controls.height ||
        field.y + field.height <= controls.y,
    );
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert(
      await p
        .locator(".rose-petal")
        .evaluateAll((ns) =>
          ns.every((n) => getComputedStyle(n).animationPlayState === "paused"),
        ),
    );
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: false,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await p.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await p.locator(".ambient").isVisible(), false);
    assert(
      await p
        .locator(".rose-petal")
        .evaluateAll((ns) =>
          ns.every((n) => getComputedStyle(n).animationName === "none"),
        ),
    );
    assert.deepEqual(errors, []);
    notes.push(
      `PASS ${width}: matching opening background; three distinct ceremony sources; canopies only on welcome/hero/closing; one continuous SVG edge; painted responsive countdown pavilion; perspective opening and scroll/focus unlock; independent scene motion; visible-only countdown; flowering five-event vine; unique SVG IDs; viewer touch swipe; fixed controls clear of RSVP; hidden/reduced motion; no page errors.`,
    );
    await p.close();
  }
  const p = await browser.newPage({ viewport: { width: 421, height: 900 } });
  await p.goto(base);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.mouse.move(210, 400);
  await p.mouse.wheel(0, 640);
  await p.waitForTimeout(1500);
  assert(Math.abs((await p.evaluate(() => scrollY)) - 640) < 3);
  await p.context().grantPermissions(["clipboard-read", "clipboard-write"]);
  await p.getByRole("button", { name: "Copy Link", exact: true }).click();
  assert.equal(await p.locator(".copy-feedback").textContent(), "Link copied");
  assert.equal(await p.evaluate(() => navigator.clipboard.readText()), base);
  notes.push(
    "PASS real document wheel easing reaches intended 640px; Copy Link exact URL and feedback. No message sent.",
  );
  await p.close();
  const files = async (dir) =>
    (
      await Promise.all(
        (await readdir(dir, { withFileTypes: true })).map(async (e) =>
          e.isDirectory()
            ? await files(dir + "/" + e.name)
            : [dir + "/" + e.name],
        ),
      )
    ).flat();
  const images = (await files(root + "/assets")).filter((x) =>
    /\.(webp|png|jpe?g|svg)$/.test(x),
  );
  const size = async (file) => (await stat(root + "/assets/" + file)).size;
  const common = (
      await Promise.all(
        images
          .filter((x) => !x.endsWith("palace-desktop.webp"))
          .map(async (x) => (await stat(x)).size),
      )
    ).reduce((a, b) => a + b, 0),
    desktop = await size("palace-desktop.webp"),
    phoneFirst =
      (await size("palace-phone.webp")) + (await size("kalyanam.webp")),
    desktopFirst = desktop + (await size("kalyanam.webp"));
  const js = gzipSync(await readFile(root + "/app.js")).length,
    css = gzipSync(await readFile(root + "/style.css")).length;
  assert(js <= 60000 && css <= 25000);
  const weight = `All stored image variants: ${common + desktop} bytes\nDesktop opening background: ${desktop} bytes\nOpening phone background: ${await size("palace-phone.webp")} bytes\nOpening portrait artwork variant: ${await size("kalyanam-960.webp")} bytes (960px, browser selects by density)\nJS gzip: ${js}/60000 bytes\nCSS gzip: ${css}/25000 bytes\nQUALITY EXCEPTION: high-resolution complete artwork exceeds the older 450KB image/150KB first-screen limits. The user's latest explicit clarity request takes precedence. No image-budget compliance is claimed. Responsive srcset, tap-only video and lazy loading avoid loading every variant.\nThree font families; allowed Google Fonts CSS.\n`;
  await writeFile(root + "/weight-report.txt", weight);
  notes.push(
    "PASS JS/CSS budgets. High-resolution image-weight exception explicitly recorded; legacy image budgets do not pass.",
  );
  await writeFile(root + "/experience-report.txt", notes.join("\n") + "\n");
  console.log(notes.join("\n"));
  console.log(weight);
} finally {
  await browser.close();
}
