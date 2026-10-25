import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const b = await chromium.launch();
const report = [];
for (const [label, width, height] of [
  ["phone", 390, 844],
  ["tablet", 820, 1180],
  ["landscape", 844, 390],
  ["desktop", 1440, 900],
]) {
  const p = await b.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4175/themes/little-wonder/");
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.evaluate(() => document.fonts.ready);
  await mkdir(`themes/little-wonder/screenshots/${label}`, { recursive: true });
  for (const id of [
    "hero",
    "couple",
    "countdown",
    "events",
    "gallery",
    "rsvp",
    "footer",
  ]) {
    await p.locator("#" + id).scrollIntoViewIfNeeded();
    await p.waitForTimeout(150);
    if (["phone", "desktop"].includes(label))
      await p.locator("#" + id).screenshot({
        path: `themes/little-wonder/screenshots/${label}/section-${id}.png`,
      });
  }
  await p.locator("#hero").scrollIntoViewIfNeeded();
  await p.screenshot({
    path: `themes/little-wonder/screenshots/${label}/preview.png`,
  });
  if (width === 1440) {
    const v = await p.locator(".venue-grid").evaluate((n) => {
      const [a, c] = n.children;
      return {
        a: a.getBoundingClientRect().left,
        c: c.getBoundingClientRect().left,
      };
    });
    assert(v.c > v.a + 100);
    const f = await p
      .locator(".form-columns")
      .evaluate((n) =>
        [...n.children].map((x) => x.getBoundingClientRect().left),
      );
    assert(f[1] > f[0]);
    const units = await p
      .locator(".clock-unit")
      .evaluateAll((ns) => ns.map((n) => n.getBoundingClientRect().top));
    assert(Math.max(...units) - Math.min(...units) < 25);
  }
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth),
    width,
  );
  report.push(`PASS ${label}: section capture and ${width}x${height} layout.`);
  await p.close();
}
// Inspect Indic stress as rendered, separately from the automatic fixture test.
const p = await b.newPage({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
await p.goto("http://127.0.0.1:4175/themes/little-wonder/?data=telugu");
await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
await p.locator(".opening").waitFor({ state: "detached" });
await p.evaluate(() => document.fonts.ready);
await p.locator("#hero").screenshot({
  path: "themes/little-wonder/screenshots/phone/telugu-hero.png",
});
await p.close();
await b.close();
await writeFile(
  "themes/little-wonder/visual-report.txt",
  report.join("\n") + "\n",
);
console.log(report.join("\n"));
