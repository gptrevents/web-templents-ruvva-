import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const ids = [
  "temple-dawn",
  "floral-elegant",
  "storybook-garden",
  "ocean-serene",
  "varnika",
  "sannidhi",
  "kalyana-vaibhavam",
];
const b = await chromium.launch();
const report = [];
try {
  for (const id of ids) {
    for (const width of [360, 390, 412, 820, 1440]) {
      const p = await b.newPage({
        viewport: { width, height: 844 },
        hasTouch: width < 1000,
        isMobile: width < 600,
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(`http://127.0.0.1:4175/themes/${id}/`);
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      const result = await p.evaluate(() => ({
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        wraps: [...document.querySelectorAll(".section > .wrap")]
          .filter((e) => e.getBoundingClientRect().width && !e.closest(".hero"))
          .map((e) => {
            const r = e.getBoundingClientRect();
            return {
              section: e.parentElement.id,
              offset:
                Math.round((r.left + r.width / 2 - innerWidth / 2) * 10) / 10,
            };
          }),
        motifs: [...document.querySelectorAll(".natural-motif")].map((e) => [
          e.style.getPropertyValue("--x"),
          e.style.getPropertyValue("--duration"),
          e.style.getPropertyValue("--phase"),
        ]),
        pairs: document.querySelectorAll(".natural-bird-pair").length,
      }));
      assert(!result.overflow, `${id}/${width}: overflow`);
      if (width < 1024)
        for (const r of result.wraps)
          assert(
            Math.abs(r.offset) < 1.1,
            `${id}/${width}/${r.section}: center offset ${r.offset}`,
          );
      assert(new Set(result.motifs.map((m) => m[0])).size >= 5);
      assert(new Set(result.motifs.map((m) => m[1])).size >= 5);
      assert(result.pairs <= 2);
      assert.deepEqual(errors, []);
      if (width === 390) {
        await mkdir(`themes/${id}/screenshots/natural-details`, {
          recursive: true,
        });
        for (const name of ["couple", "live", "rsvp"]) {
          const section = p.locator(`#${name}`);
          if (!(await section.count())) continue;
          await section.scrollIntoViewIfNeeded();
          await p.waitForTimeout(450);
          await section.screenshot({
            path: `themes/${id}/screenshots/natural-details/${name}-phone.png`,
          });
        }
        const particle = p.locator(".natural-motif").first();
        const before = await particle.evaluate(
          (e) => getComputedStyle(e).translate,
        );
        await p.waitForTimeout(160);
        assert.notEqual(
          await particle.evaluate((e) => getComputedStyle(e).translate),
          before,
          "particle actually descends on mobile",
        );
        if (result.pairs) {
          assert.equal(
            await p
              .locator(".natural-bird-pair")
              .first()
              .evaluate((e) => getComputedStyle(e).visibility),
            "hidden",
            "birds stay away from RSVP fields",
          );
          await p.locator("#live").scrollIntoViewIfNeeded();
          await p.waitForTimeout(300);
          assert.equal(
            await p
              .locator(".natural-bird-pair")
              .first()
              .evaluate((e) => getComputedStyle(e).visibility),
            "visible",
          );
        }
        const motion = await p.evaluate(() => {
          const a = document.querySelector(".natural-motif");
          return [
            getComputedStyle(a).animationName,
            getComputedStyle(a).animationPlayState,
          ];
        });
        assert.equal(motion[1], "running");
        await p.emulateMedia({ reducedMotion: "reduce" });
        assert.equal(
          await p
            .locator(".natural-motif")
            .first()
            .evaluate((e) => getComputedStyle(e).animationName),
          "none",
        );
      }
      report.push(
        `PASS ${id} ${width}: centered, no horizontal overflow, varied particle paths, <=2 pairs, no JS errors`,
      );
      await p.close();
    }
  }
  await writeFile("tools/natural-details-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
} finally {
  await b.close();
}
