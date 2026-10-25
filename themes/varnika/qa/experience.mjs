import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, readdir, stat, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const b = await chromium.launch(),
  base = "http://127.0.0.1:4178/",
  root = "themes/varnika",
  notes = [];
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
        viewport: { width, height: width === 390 ? 844 : 900 },
      }),
      images = new Set();
    p.on("response", (r) => {
      if (r.url().endsWith(".webp")) images.add(r.url().split("/").pop());
    });
    await p.goto(base, { waitUntil: "networkidle" });
    assert.deepEqual(
      [...images],
      [width === 390 ? "garden-phone.webp" : "garden-desktop.webp"],
    );
    await p.keyboard.press("Tab");
    assert.equal(
      await p.evaluate(() => document.activeElement.textContent),
      "Open Invitation",
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.waitForTimeout(650);
    assert.notEqual(
      await p
        .locator(".manuscript")
        .evaluate((n) => getComputedStyle(n).clipPath),
      "inset(0px)",
    );
    assert(
      (await p.locator(".spindle").boundingBox()).y <
        (width === 390 ? 844 : 900) - 50,
    );
    await p.screenshot({
      path: `${root}/screenshots/${width === 390 ? "phone" : "desktop"}/opening-in-motion.png`,
    });
    await p.locator(".opening").waitFor({ state: "detached" });
    assert.equal(
      await p.locator(".page-content").evaluate((n) => n.inert),
      false,
    );
    assert.equal(
      await p.evaluate(() => document.body.classList.contains("locked")),
      false,
    );
    assert.equal(await p.locator('.music.playing').evaluate(n=>getComputedStyle(n,'::after').animationPlayState),'running');
  const ids = await p
      .locator(".painted-bird linearGradient")
      .evaluateAll((ns) => ns.map((n) => n.id));
    assert.equal(ids.length, new Set(ids).size);
    assert(
      (await p.locator("#hero").boundingBox()).height <=
        (width === 390 ? 844 : 900) * 1.2,
    );
    assert.equal(
      await p
        .locator("#rsvp .botanical")
        .evaluate((n) => getComputedStyle(n).animationPlayState),
      "paused",
    );
    const digit = p.locator(".digit").last();
    await p.locator("#countdown").scrollIntoViewIfNeeded();
    await p.waitForTimeout(250);
    const before = await digit.textContent();
    await p.waitForTimeout(1200);
    assert.notEqual(await digit.textContent(), before);
    await p.locator("#hero").scrollIntoViewIfNeeded();
    await p.waitForTimeout(250);
    const stopped = await digit.textContent();
    await p.waitForTimeout(1200);
    assert.equal(await digit.textContent(), stopped);
    for (const card of await p.locator(".event-card").all()) {
      await card.scrollIntoViewIfNeeded();
      await p.waitForTimeout(150);
    }
    for (let i = 0; i < 5; i++) {
      const toggle = p.locator(".event-toggle").nth(i);
      if ((await toggle.getAttribute("aria-expanded")) !== "true")
        await toggle.click();
      assert.equal(await p.locator(".event-panel:visible").count(), 1);
      assert.equal(
        await toggle.getAttribute("aria-controls"),
        "event-panel-" + i,
      );
      assert(
        await p.locator("#event-panel-" + i + " .event-venue").isVisible(),
      );
      await p.waitForTimeout(800);
      await p
        .locator(".event-card")
        .nth(i)
        .screenshot({
          path: `${root}/screenshots/${width === 390 ? "phone" : "desktop"}/ceremony-${i + 1}.png`,
        });
    }
    await p.locator(".event-toggle").first().focus();
    await p.keyboard.press("End");
    assert.equal(
      await p
        .locator(".event-toggle")
        .last()
        .evaluate((n) => n === document.activeElement),
      true,
    );
    await p.keyboard.press("Home");
    assert.equal(
      await p
        .locator(".event-toggle")
        .first()
        .evaluate((n) => n === document.activeElement),
      true,
    );
    await p.locator(".event-toggle").last().scrollIntoViewIfNeeded();
    await p.waitForTimeout(100);
    assert(Number(await p.locator(".ledger-tip").getAttribute("cy")) > 0);
    await p.getByRole("button", { name: "Next album pages" }).click();
    assert.equal(await p.locator(".album-status").textContent(), "02 / 02");
    assert.equal(await p.locator(".photo:visible").count(), 2);
    await p.waitForTimeout(700);
    await p
      .locator("#gallery")
      .screenshot({
        path: `${root}/screenshots/${width === 390 ? "phone" : "desktop"}/album-spread-2.png`,
      });
    await p.locator(".photo:visible").first().focus();
    await p.keyboard.press("ArrowLeft");
    assert.equal(await p.locator(".album-status").textContent(), "01 / 02");
    assert.equal(
      await p
        .locator(".photo")
        .first()
        .evaluate((n) => n === document.activeElement),
      true,
    );
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
    assert.equal(await p.locator(".viewer-counter").textContent(), "2 / 4");
    await p.keyboard.press("Escape");
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert(
      await p
        .locator(".botanical")
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
    assert.equal(await p.locator('.music.playing').evaluate(n=>getComputedStyle(n,'::after').animationPlayState),'running');
    await p.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(await p.locator(".ambient").isVisible(), false);
    assert(
      await p
        .locator(".botanical,.bird-tail,.bird-wing,.lotus-ripples ellipse")
        .evaluateAll((ns) =>
          ns.every((n) => getComputedStyle(n).animationName === "none"),
        ),
    );
    notes.push(
      `PASS ${width}: only matching opening painting requested; manuscript winding/unlock, unique bird gradients, visible-only countdown, offscreen/hidden/reduced motion, all ceremony disclosures, keyboard Home/End, drawing ledger, album page turns/focus, viewer swipe.`,
    );
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 421, height: 900 } });
  await p.goto(base);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.mouse.move(210, 400);
  await p.mouse.wheel(0, 640);
  await p.waitForTimeout(1500);
  const y = await p.evaluate(() => scrollY);
  assert(Math.abs(y - 640) < 3);
  notes.push(
    "PASS 421px fine-pointer wheel easing preserves distance on the real document.",
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
    x.endsWith(".webp"),
  );
  const common = (
    await Promise.all(
      images
        .filter((x) => !x.endsWith("garden-desktop.webp"))
        .map(async (x) => (await stat(x)).size),
    )
  ).reduce((a, b) => a + b, 0);
  const desktop = (await stat(root + "/assets/garden-desktop.webp")).size,
    phone = (await stat(root + "/assets/garden-phone.webp")).size;
  const js = gzipSync(await readFile(root + "/app.js")).length,
    css = gzipSync(await readFile(root + "/style.css")).length;
  assert(
    common <= 450000 &&
      desktop <= 400000 &&
      phone <= 150000 &&
      desktop <= 150000 &&
      js <= 60000 &&
      css <= 25000,
  );
  notes.push(
    `PASS budgets: common images ${common}; desktop-only ${desktop}; first-screen phone ${phone}; JS gzip ${js}; CSS gzip ${css}.`,
  );
  await writeFile(root + "/experience-report.txt", notes.join("\n") + "\n");
  console.log(notes.join("\n"));
} finally {
  await b.close();
}
