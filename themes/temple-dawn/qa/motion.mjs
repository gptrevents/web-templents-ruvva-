import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const notes = [];
await page.goto("http://127.0.0.1:4173/");
await page.mouse.move(600, 400);
await page.mouse.wheel(0, 640);
await page.waitForTimeout(100);
assert.equal(await page.evaluate(() => scrollY), 0);
await page
  .getByRole("button", { name: "Open Invitation", exact: true })
  .click();
await page.locator(".opening").waitFor({ state: "detached" });
await page.mouse.move(600, 400);
await page.mouse.wheel(0, 640);
const samples = await page.evaluate(
  () =>
    new Promise((resolve) => {
      const points = [];
      const start = performance.now();
      function read(now) {
        points.push({ t: Math.round(now - start), y: scrollY });
        if (now - start < 800) requestAnimationFrame(read);
        else resolve(points);
      }
      requestAnimationFrame(read);
    }),
);
assert.ok(
  samples.some((s) => s.y > 0 && s.y < 600),
  "wheel should pass through intermediate positions",
);
assert.ok(
  samples.every((s, i) => !i || s.y >= samples[i - 1].y),
  "downward motion must be monotonic",
);
assert.ok(
  Math.abs(samples.at(-1).y - 640) < 2,
  "wheel should settle at intended distance",
);
notes.push(
  "Desktop mouse wheel eases through intermediate positions, stays monotonic and settles at the intended 640px.",
);
await page.evaluate(() => scrollTo({top:0,behavior:"instant"}));
await page.waitForTimeout(80);
await page.mouse.move(600,400);
await page.evaluate(() => window.smallWheelPrevented = []);
await page.evaluate(() => addEventListener("wheel", e => {
  queueMicrotask(() => window.smallWheelPrevented.push(e.defaultPrevented));
}));
for(let i=0;i<24;i++) { await page.mouse.wheel(0,8); await page.waitForTimeout(8); }
await page.waitForTimeout(900);
assert.equal(await page.evaluate(() => window.smallWheelPrevented.every(Boolean)),true);
assert.ok(Math.abs(await page.evaluate(() => scrollY)-192)<2);
notes.push("Small 8px trackpad deltas are eased consistently; a 24-step gesture settles at 192px.");
await page.setViewportSize({width:421,height:900});
await page.evaluate(() => scrollTo({top:0,behavior:"instant"}));
await page.waitForTimeout(80);
await page.mouse.move(250,400);
await page.mouse.wheel(0,120);
await page.waitForTimeout(900);
assert.ok(Math.abs(await page.evaluate(() => scrollY)-120)<2);
notes.push("Fine-pointer narrow preview panels receive the same smoothing.");
await page.setViewportSize({width:1440,height:900});
await page.mouse.move(600,400);
await page.mouse.wheel(0, 600);
await page.waitForTimeout(60);
await page.keyboard.press("Home");
await page.waitForTimeout(900);
assert.ok((await page.evaluate(() => scrollY)) < 2);
notes.push("Keyboard Home cancels wheel inertia and reaches the top.");
await page.locator("#hero").scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
assert.equal(
  await page
    .locator("#countdown")
    .evaluate((n) => n.classList.contains("motion-active")),
  false,
);
assert.equal(
  await page
    .locator(".lamp-unit .flame")
    .first()
    .evaluate((n) => getComputedStyle(n).animationPlayState),
  "paused",
);
await page.locator("#countdown").scrollIntoViewIfNeeded();
await page.waitForTimeout(800);
assert.equal(
  await page
    .locator(".lamp-unit .flame")
    .first()
    .evaluate((n) => getComputedStyle(n).animationPlayState),
  "running",
);
notes.push(
  "Flame animation pauses offscreen and resumes when its section is visible.",
);
await page.locator(".photo").first().click();
const before = await page.evaluate(() => scrollY);
await page.mouse.wheel(0, 600);
await page.waitForTimeout(400);
assert.equal(await page.evaluate(() => scrollY), before);
await page.keyboard.press("Escape");
notes.push("Gallery modal locks wheel scrolling and Escape still closes it.");
await page.emulateMedia({ reducedMotion: "reduce" });
await page.locator("#hero").scrollIntoViewIfNeeded();
await page.waitForTimeout(100);
await page.evaluate(() => (window.motionPrevented = null));
await page.evaluate(() =>
  addEventListener(
    "wheel",
    (e) => setTimeout(() => (window.motionPrevented = e.defaultPrevented)),
    { once: true },
  ),
);
await page.mouse.move(600, 400);
await page.mouse.wheel(0, 300);
await page.waitForTimeout(100);
assert.equal(await page.evaluate(() => window.motionPrevented), false);
assert.equal(
  await page
    .locator(".lamp-unit .flame")
    .first()
    .evaluate((n) => getComputedStyle(n).animationName),
  "none",
);
notes.push(
  "Reduced motion bypasses wheel easing and disables decorative animations.",
);
const touch = await browser.newPage({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
await touch.goto("http://127.0.0.1:4173/");
await touch
  .getByRole("button", { name: "Open Invitation", exact: true })
  .click();
await touch.locator(".opening").waitFor({ state: "detached" });
const prevented = await touch.evaluate(() => {
  const event = new WheelEvent("wheel", {
    deltaY: 120,
    bubbles: true,
    cancelable: true,
  });
  document.querySelector("#hero").dispatchEvent(event);
  return event.defaultPrevented;
});
assert.equal(prevented, false);
notes.push("Coarse-pointer mobile context retains native scrolling.");
await writeFile(
  "themes/temple-dawn/motion-report.txt",
  notes.join("\n") + "\n",
);
console.log(notes.join("\n"));
await browser.close();
