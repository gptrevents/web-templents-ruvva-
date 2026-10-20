import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch(),
  root = "themes/kalyana-vaibhavam",
  notes = [];
try {
  for (const [width, height, dpr] of [
    [390, 844, 2],
    [390, 844, 3],
    [820, 1180, 2],
    [1440, 900, 2],
    [970, 850, 2],
    [844, 390, 2],
  ]) {
    const p = await b.newPage({
      viewport: { width, height },
      deviceScaleFactor: dpr,
      reducedMotion: "reduce",
    });
    await p.goto("http://127.0.0.1:4180/", { waitUntil: "networkidle" });
    const verify = async (selector) => {
      const im = p.locator(selector);
      await im.scrollIntoViewIfNeeded();
      await im.evaluate((n) => n.decode());
      const v = await im.evaluate(async (n) => {
        const raw = new Image();
        raw.src = n.currentSrc;
        await raw.decode();
        const r = n.getBoundingClientRect(),
          box = n.parentElement.getBoundingClientRect();
        return {
          src: n.currentSrc.split("/").pop(),
          rawW: raw.naturalWidth,
          rawH: raw.naturalHeight,
          w: r.width,
          h: r.height,
          x: r.x,
          right: r.right,
          boxX: box.x,
          boxRight: box.right,
          transform: getComputedStyle(n).transform,
          fit: getComputedStyle(n).objectFit,
        };
      });
      assert(
        Math.abs(v.w / v.h - v.rawW / v.rawH) < 0.015,
        "complete source ratio " + selector,
      );
      assert(
        v.x >= v.boxX - 1 && v.right <= v.boxRight + 1,
        "no side crop " + selector,
      );
      assert.equal(v.transform, "none");
      assert(v.rawW >= v.w * dpr * 0.97, JSON.stringify(v));
      notes.push(
        `${width}@${dpr}: ${selector} complete ${v.rawW}x${v.rawH} from ${v.src}, rendered ${Math.round(v.w)}x${Math.round(v.h)}.`,
      );
    };
    await verify(".opening .tableau");
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    await verify("#hero .tableau");
    await verify("#footer .tableau");
    assert.equal(await p.locator(".scene-canopy").count(), 2);
    assert.equal(await p.locator(".chapter-flow .scene-canopy").count(), 0);
    await p.locator("#countdown").scrollIntoViewIfNeeded();
    await p.locator(".count-painting").evaluate((n) => n.decode());
    assert.match(
      await p.locator(".count-painting").evaluate((n) => n.currentSrc),
      width >= 600 && width >= height ? /countdown-desktop/ : /countdown-phone/,
    );
    const art = await p.locator(".count-art").boundingBox();
    const count = await p.locator("#countdown").boundingBox();
    assert.equal(Math.round(art.width), width, "countdown art spans viewport");
    assert(
      Math.abs(art.height - count.height) < 1,
      "background fills section height",
    );
    assert(count.height >= height, "countdown at least a full screen");
    notes.push(
      `PASS full-bleed countdown ${width}: ${Math.round(art.width)} x ${Math.round(art.height)}; no inset picture.`,
    );
    assert((await p.locator(".temple-mural").count()) > 5);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      width,
    );
    if (dpr === 2 && [390, 1440, 820].includes(width)) {
      for (const id of ["hero", "countdown", "couple", "gallery", "footer"]) {
        await p.locator("#" + id).scrollIntoViewIfNeeded();
        await p.locator("#" + id).screenshot({
          path: `${root}/screenshots/${width === 390 ? "phone" : "desktop"}/clarity-${id}-${width}.png`,
        });
      }
    }
    const hb = await p.locator("#hero").boundingBox();
    notes.push(
      `hero ${width}: ${Math.round(hb.height)}px, viewport ${height}px.`,
    );
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto("http://127.0.0.1:4180/");
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.locator("#couple").scrollIntoViewIfNeeded();
  await p.waitForTimeout(200);
  const before = await p
    .locator("#couple")
    .evaluate((n) => n.style.getPropertyValue("--mural-y"));
  await p.evaluate(() => scrollBy({ top: 250, behavior: "instant" }));
  await p.waitForTimeout(200);
  assert.notEqual(
    await p
      .locator("#couple")
      .evaluate((n) => n.style.getPropertyValue("--mural-y")),
    before,
  );
  await p.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(
    await p
      .locator("#couple .temple-mural")
      .evaluate((n) => getComputedStyle(n).transform),
    "none",
  );
  notes.push(
    "Visible architectural watermarks respond to scroll; reduced motion disables displacement.",
  );
  await writeFile(root + "/clarity-report.txt", notes.join("\n") + "\n");
  console.log(notes.join("\n"));
} finally {
  await b.close();
}
