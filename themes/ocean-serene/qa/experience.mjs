import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const base = "http://127.0.0.1:4177/",
  folder = "themes/ocean-serene",
  notes = [];
const b = await chromium.launch();
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: width === 390 ? 844 : 900 },
    });
    const images = new Set();
    p.on("response", (r) => {
      if (r.url().endsWith(".webp")) images.add(r.url().split("/").pop());
    });
    await p.goto(base, { waitUntil: "networkidle" });
    assert.deepEqual(
      [...images],
      [width === 390 ? "shore-phone.webp" : "shore-desktop.webp"],
    );
    const ids = await p
      .locator(".ripple-defs filter")
      .evaluateAll((nodes) => nodes.map((n) => n.id));
    assert.equal(ids.length, new Set(ids).size);
    await p.waitForTimeout(250);
    assert.equal(
      await p
        .locator(".opening .ripple-defs")
        .evaluate((n) => n.animationsPaused()),
      width < 1024,
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    assert.equal(
      await p.locator(".section").count(),
      await p.locator(".section>.coastal-atmosphere").count(),
    );
    assert.equal(
      await p.locator(".section .gull").count(),
      3 * (await p.locator(".section").count()),
    );
    const sea = p.locator(".hero>.water-surface");
    const transform = await sea.evaluate((n) => getComputedStyle(n).transform);
    await p.waitForTimeout(500);
    assert.notEqual(
      await sea.evaluate((n) => getComputedStyle(n).transform),
      transform,
    );
    assert.equal(
      await p
        .locator("#rsvp .wave-track")
        .evaluate((n) => getComputedStyle(n).animationPlayState),
      "paused",
    );
    await p.locator("#events").scrollIntoViewIfNeeded();
    await p.waitForTimeout(900);
    const tabs = p.getByRole("tab"),
      count = await tabs.count();
    assert.equal(count, 4);
    for (let i = 0; i < count; i++) {
      await tabs.nth(i).click();
      assert.equal(await tabs.nth(i).getAttribute("aria-selected"), "true");
      assert.equal(await p.getByRole("tabpanel").count(), 1);
      await p.waitForTimeout(850);
      await p
        .locator("#events")
        .screenshot({
          path: `${folder}/screenshots/${width === 390 ? "phone" : "desktop"}/event-day-${i + 1}.png`,
        });
    }
    await tabs.nth(0).click();
    await tabs.nth(0).focus();
    await p.keyboard.press("ArrowRight");
    assert.equal(await tabs.nth(1).getAttribute("aria-selected"), "true");
    await p.keyboard.press("End");
    assert.equal(
      await tabs.nth(count - 1).getAttribute("aria-selected"),
      "true",
    );
    await p.keyboard.press("Home");
    assert.equal(await tabs.nth(0).getAttribute("aria-selected"), "true");
    assert(
      parseFloat(
        await p
          .locator(".day-tide")
          .evaluate((n) => n.style.getPropertyValue("--tide")),
      ) > 0,
    );
    await p.locator("#rsvp").scrollIntoViewIfNeeded();
    await p.waitForTimeout(300);
    assert.equal(
      await p
        .locator("#rsvp .wave-track")
        .evaluate((n) => getComputedStyle(n).animationPlayState),
      "running",
    );
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        get: () => true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert.equal(await p.locator(".motion-active").count(), 0);
    assert(
      await p
        .locator(".ripple-defs")
        .evaluateAll((nodes) => nodes.every((n) => n.animationsPaused())),
    );
    await p.evaluate(() => {
      delete document.hidden;
      document.dispatchEvent(new Event("visibilitychange"));
    });
    await p.emulateMedia({ reducedMotion: "reduce" });
    await p.waitForTimeout(100);
    assert.equal(await p.locator(".ambient").isVisible(), false);
    assert.equal(await p.locator(".hero>.water-surface").isVisible(), false);
    assert.equal(
      await p
        .locator("#rsvp .wave-track")
        .evaluate((n) => getComputedStyle(n).animationName),
      "none",
    );
    assert(
      await p
        .locator(".ripple-defs")
        .evaluateAll((nodes) => nodes.every((n) => n.animationsPaused())),
    );
    notes.push(
      `PASS ${width}: matching background only at opening, unique water filters, ${width < 1024 ? "light phone sea transforms" : "desktop SVG refraction"}, clouds/gulls/waves in every section; offscreen/hidden/reduced motion pauses; day tabs click/arrows/Home/End and all day screenshots.`,
    );
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 421, height: 844 } });
  await p.goto(base);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.mouse.move(200, 400);
  await p.mouse.wheel(0, 640);
  await p.waitForTimeout(40);
  const first = await p.evaluate(() => scrollY);
  assert(first > 0 && first < 630);
  await p.waitForTimeout(1400);
  assert(Math.abs((await p.evaluate(() => scrollY)) - 640) < 2);
  notes.push(
    "PASS 421px wheel inertia uses the real document and settles without lost distance.",
  );
  await p.close();
  const ctx = await b.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  const t = await ctx.newPage();
  await t.goto(base);
  await t.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await t.locator(".opening").waitFor({ state: "detached" });
  await t.locator(".photo").first().click();
  await t.locator("dialog").evaluate((n) => {
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
  assert.equal(await t.locator(".viewer-counter").textContent(), "2 / 6");
  await ctx.close();
  notes.push("PASS native mobile viewer swipe.");
  const walk = async (dir) => {
    let all = [];
    for (const e of await readdir(dir, { withFileTypes: true })) {
      const f = dir + "/" + e.name;
      all.push(...(e.isDirectory() ? await walk(f) : [f]));
    }
    return all;
  };
  let common = 0;
  for (const f of (await walk(folder + "/assets")).filter(
    (f) => /\.(webp|png|jpg)$/.test(f) && !f.endsWith("shore-desktop.webp"),
  ))
    common += (await stat(f)).size;
  const desktop = (await stat(folder + "/assets/shore-desktop.webp")).size,
    phone = (await stat(folder + "/assets/shore-phone.webp")).size;
  const js = gzipSync(await readFile(folder + "/app.js")).length,
    css = gzipSync(await readFile(folder + "/style.css")).length;
  assert(
    common <= 450000 &&
      desktop <= 400000 &&
      desktop <= 150000 &&
      phone <= 150000 &&
      js <= 60000 &&
      css <= 25000,
  );
  notes.push(
    `PASS budgets: common images ${common}; desktop-only ${desktop}; first-screen phone ${phone}; JS gzip ${js}; CSS gzip ${css}.`,
  );
  await writeFile(folder + "/experience-report.txt", notes.join("\n") + "\n");
  console.log(notes.join("\n"));
} finally {
  await b.close();
}
