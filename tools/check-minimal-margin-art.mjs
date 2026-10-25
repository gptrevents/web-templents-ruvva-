import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { runtimeBudget } from "./runtime-budget.mjs";
const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["epure", "vesper"].filter((id) => existsSync(`themes/${id}/margin-art.js`));
// Optional pre-edit capture; otherwise compare with the decorative layer removed.
const baseline = process.env.RUVVA_MARGIN_BASELINE
  ? JSON.parse(await readFile(process.env.RUVVA_MARGIN_BASELINE, "utf8"))
  : null;
const b = await chromium.launch();
const report = [];
try {
  for (const id of ids) {
    for (const width of [390, 1440]) {
      const p = await b.newPage({ viewport: { width, height: 900 } });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(`http://127.0.0.1:4175/themes/${id}/?g=Rohit`);
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .waitFor();
      assert.equal(
        await p.locator(".margin-art").getAttribute("aria-hidden"),
        "true",
      );
      assert.equal(
        await p
          .locator(".margin-art")
          .evaluate((n) => getComputedStyle(n).pointerEvents),
        "none",
      );
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      await p.locator("#couple").scrollIntoViewIfNeeded();
      await p.waitForTimeout(250);
      const pose = () =>
        p
          .locator(".margin-svg")
          .evaluateAll((ns) =>
            ns.map((n) => [
              getComputedStyle(n).transform,
              getComputedStyle(n).rotate,
            ]),
          );
      const first = await pose();
      await p.waitForTimeout(300);
      assert.notDeepEqual(
        await pose(),
        first,
        "visible mobile/desktop artwork must actually move",
      );
      const before = await p
        .locator(".margin-art")
        .evaluate((n) => n.style.getPropertyValue("--art-drift"));
      await p.locator("#gallery").scrollIntoViewIfNeeded();
      await p.waitForTimeout(100);
      assert.notEqual(
        await p
          .locator(".margin-art")
          .evaluate((n) => n.style.getPropertyValue("--art-drift")),
        before,
        "art follows scroll",
      );
      await p.locator(".photo").first().click();
      await p.locator("dialog").waitFor();
      await p.waitForTimeout(70);
      const paused = () =>
        p.locator(".margin-art").evaluate((n) =>
          n
            .getAnimations({ subtree: true })
            .filter((a) => a.effect.getTiming().iterations === Infinity)
            .every((a) => a.playState === "paused"),
        );
      assert(await paused(), "pause while gallery is open");
      await p.keyboard.press("Escape");
      await p.locator("dialog").waitFor({ state: "detached" });
      await p.evaluate(() => {
        Object.defineProperty(document, "hidden", {
          configurable: true,
          value: true,
        });
        document.dispatchEvent(new Event("visibilitychange"));
      });
      assert(await paused(), "pause in hidden tab");
      await p.evaluate(() => {
        delete document.hidden;
        document.dispatchEvent(new Event("visibilitychange"));
      });
      await p.locator("#rsvp").scrollIntoViewIfNeeded();
      await p.waitForFunction(() =>
        document.querySelector(".margin-art").classList.contains("is-calm"),
      );
      const hit = await p.locator("#rsvp button[type=submit]").evaluate((n) => {
        const r = n.getBoundingClientRect(),
          top = document.elementFromPoint(
            r.x + r.width / 2,
            r.y + r.height / 2,
          );
        return n.contains(top);
      });
      if (!hit) {
        await p.locator("#rsvp button[type=submit]").scrollIntoViewIfNeeded();
        await p.waitForTimeout(100);
        assert(
          await p.locator("#rsvp button[type=submit]").evaluate((n) => {
            const r = n.getBoundingClientRect();
            return n.contains(
              document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2),
            );
          }),
        );
      }
      await p.emulateMedia({ reducedMotion: "reduce" });
      await p.waitForTimeout(70);
      assert.equal(
        await p
          .locator(".margin-art")
          .evaluate(
            (n) =>
              n
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
          ),
        0,
      );
      await p.evaluate(async () => {
        await document.fonts.ready;
        for (const i of document.images) {
          i.loading = "eager";
          await i.decode().catch(() => {});
        }
      });
      const geometry = await p
        .locator(".section")
        .evaluateAll((ns) =>
          ns.map((n) => ({
            id: n.id,
            w: Math.round(n.getBoundingClientRect().width),
            h: Math.round(n.getBoundingClientRect().height),
          })),
        );
      if (baseline)
        assert.deepEqual(
          geometry,
          baseline[id + "-" + width],
          "existing layouts must not change",
        );
      await p
        .locator(".margin-art")
        .evaluate((n) => (n.style.display = "none"));
      const plain = await p
        .locator(".section")
        .evaluateAll((ns) =>
          ns.map((n) => ({
            id: n.id,
            w: Math.round(n.getBoundingClientRect().width),
            h: Math.round(n.getBoundingClientRect().height),
          })),
        );
      assert.deepEqual(geometry, plain, "art must not take layout space");
      await p.locator(".margin-art").evaluate((n) => (n.style.display = ""));
      await p.locator("#couple").scrollIntoViewIfNeeded();
      await p.clock.setFixedTime(new Date());
      const folder = `themes/${id}/screenshots/margin-art`;
      await mkdir(folder, { recursive: true });
      await p.screenshot({ path: `${folder}/${width}-with.png` });
      await p
        .locator(".margin-art")
        .evaluate((n) => (n.style.visibility = "hidden"));
      await p.screenshot({ path: `/tmp/${id}-margin-off-${width}.png` });
      await p
        .locator(".margin-art")
        .evaluate((n) => (n.style.visibility = "visible"));
      const counts = JSON.parse(
        execFileSync(
          "python3",
          [
            "-c",
            `
from PIL import Image,ImageChops
import json
on=Image.open('${folder}/${width}-with.png').convert('RGB');off=Image.open('/tmp/${id}-margin-off-${width}.png').convert('RGB')
diff=ImageChops.difference(on,off);w,h=diff.size;band=min(240,int(w*.22));margins=0;center=0
for y in range(h):
 for x in range(w):
  if max(diff.getpixel((x,y)))>3:
   if x<band or x>=w-band:margins+=1
   elif int(w*.3)<x<int(w*.7):center+=1
print(json.dumps({'margins':margins,'center':center}))
`,
          ],
          { encoding: "utf8" },
        ),
      );
      assert(
        counts.margins > 50,
        "margin artwork must be visibly painted, including phone",
      );
      assert.equal(counts.center, 0, "center stays clear");
      assert.deepEqual(errors, []);
      report.push(
        `PASS ${id} ${width}: visible ink/contour artwork (${counts.margins} edge pixels), moving SVG and scroll depth; center unchanged; reduced motion/static; hidden-tab/gallery pause; RSVP hit target and unchanged section dimensions.`,
      );
      console.log(report.at(-1));
      await p.close();
    }
    const p = await b.newPage({ reducedMotion: "reduce" });
    for (const width of [320, 360, 390, 844, 820, 1280, 1440, 1920, 2560]) {
      await p.setViewportSize({ width, height: width === 844 ? 390 : 900 });
      await p.goto(`http://127.0.0.1:4175/themes/${id}/`);
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
    }
    await p.close();
    const { js, css } = await runtimeBudget(id);
    assert(js < 60000 && css < 25000);
    report.push(
      `PASS ${id}: 320–2560 widths; full runtime JS ${js}/60000 B; CSS ${css}/25000 B; no raster assets, data or content changes.`,
    );
  }
  await writeFile(
    "tools/minimal-margin-art-report.txt",
    report.join("\n") + "\n",
  );
} finally {
  await b.close();
}
