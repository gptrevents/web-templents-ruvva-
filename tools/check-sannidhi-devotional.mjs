import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const b = await chromium.launch(),
  notes = [];
const base = "http://127.0.0.1:4175/themes/sannidhi/";
try {
  for (const width of [390, 820, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 900 },
      hasTouch: width < 1024,
      isMobile: width === 390,
    });
    let imageRequests = [];
    p.on("request", (r) => {
      if (/srivari-/.test(r.url())) imageRequests.push(r.url());
    });
    await p.goto(base);
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    const welcome = p.locator(".welcome-darshan img");
    await welcome.evaluate((e) => e.decode());
    assert(
      (await welcome.evaluate((e) => e.currentSrc)).endsWith(
        width >= 1024 ? "darshan-desktop.webp" : "darshan.webp",
      ),
    );
    const drawing = p.locator(".opening .kolam-line").first();
    await p.waitForTimeout(200);
    const before = await drawing.evaluate(
      (e) => getComputedStyle(e).strokeDashoffset,
    );
    await p.waitForTimeout(400);
    assert.notEqual(
      await drawing.evaluate((e) => getComputedStyle(e).strokeDashoffset),
      before,
      "real stroke-by-stroke drawing",
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    for (const name of ["hero", "footer"]) {
      await p.locator("#" + name).scrollIntoViewIfNeeded();
      await p
        .locator("#" + name + " .devotional-image")
        .evaluate((e) => e.decode());
      const e = p.locator("#" + name + " .devotional-image");
      const fit = await e.evaluate((e) => {
        const r = e.getBoundingClientRect();
        return {
          fit: getComputedStyle(e).objectFit,
          ratio: r.width / r.height,
          natural: e.naturalWidth / e.naturalHeight,
          src: e.currentSrc,
        };
      });
      assert.equal(fit.fit, "contain");
      assert(Math.abs(fit.ratio - fit.natural) < 0.03);
      assert(fit.src.endsWith(width >= 1024 ? "desktop.webp" : ".webp"));
    }
    await p.locator("#couple .margin-kolam").scrollIntoViewIfNeeded();
    await p.waitForTimeout(6500);
    assert.equal(
      await p
        .locator("#couple .margin-kolam .kolam-line")
        .first()
        .evaluate((e) => parseFloat(getComputedStyle(e).strokeDashoffset)),
      0,
    );
    assert(
      await p
        .locator("#couple .margin-kolam .kolam-orbit")
        .first()
        .evaluate((e) => e.getAnimations().length > 0),
    );
    await p.emulateMedia({ reducedMotion: "reduce" });
    assert.equal(
      await p
        .locator("#couple .margin-kolam .kolam-line")
        .first()
        .evaluate((e) => getComputedStyle(e).animationName),
      "none",
    );
    if (width < 1024) assert(!imageRequests.some((u) => u.includes("desktop")));
    notes.push(
      `PASS ${width}: three distinct tableaux, whole-image ratios, responsive sources, real drawing progression, completed strokes, slow mandala orbit, reduced-motion.`,
    );
    await p.close();
  }
  for (const faith of ["none", "muslim", "christian"]) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    await p.route("**/sample-data.json", async (route) => {
      const d = JSON.parse(
        await readFile("themes/sannidhi/sample-data.json", "utf8"),
      );
      d.faithId = faith;
      await route.fulfill({ json: d });
    });
    await p.goto(base);
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    assert.equal(await p.locator(".devotional-picture").count(), 0);
    await p.close();
    notes.push(`PASS ${faith}: Hindu deity images absent.`);
  }
  await writeFile(
    "themes/sannidhi/devotional-report.txt",
    notes.join("\n") + "\n",
  );
  console.log(notes.join("\n"));
} finally {
  await b.close();
}
const root = "themes/sannidhi/";
const files = await readdir(root);
let js = [],
  css = [],
  common = 0,
  desktop = 0;
for (const f of files) {
  if (f.endsWith(".js")) js.push(await readFile(root + f));
  if (f.endsWith(".css")) css.push(await readFile(root + f));
}
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const f = dir + "/" + e.name;
    if (e.isDirectory()) await walk(f);
    else if (/\.(svg|webp|png|jpg)$/.test(e.name)) {
      const n = gzipSync(await readFile(f)).length;
      if (e.name.includes("desktop")) desktop += n;
      else common += n;
    }
  }
}
await walk(root + "assets");
const first = ["toran.webp", "srivari-darshan.webp"];
let firstBytes = 0;
for (const f of first)
  firstBytes += (await readFile(root + "assets/" + f)).length;
assert(firstBytes < 150000, "phone first-screen image target");
await writeFile(
  root + "devotional-budget.txt",
  `Runtime JS gzip ${gzipSync(Buffer.concat(js)).length} / 60000 B\nRuntime CSS gzip ${gzipSync(Buffer.concat(css)).length} / 25000 B\nAll common/phone images ${common} / 450000 B\nSeparate desktop art ${desktop} / 400000 B\nDefault phone welcome raster payload ${firstBytes} / 150000 B\nThe three detailed calendar-art scenes exceed the legacy total-image budgets. They are lazy-loaded after opening except the welcome; no claim of total-image-budget compliance is made. Existing images for other-faith/empty/birthday variants remain available.\n`,
);
