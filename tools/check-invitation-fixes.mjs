import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const themes = [
  "temple-dawn",
  "floral-elegant",
  "storybook-garden",
  "ocean-serene",
  "varnika",
  "sannidhi",
  "kalyana-vaibhavam",
];
const premium = ["varnika", "sannidhi", "kalyana-vaibhavam"];
const report = [];
const browser = await chromium.launch();
const catalog = JSON.parse(await readFile("gallery/themes.json", "utf8"));
try {
  for (const id of themes) {
    assert.equal(
      catalog.find((t) => t.id === id)?.tier,
      premium.includes(id) ? "premium" : "basic",
    );
    for (const ext of ["js", "css"])
      assert.equal(
        await readFile(`themes/${id}/invitation-ui.${ext}`, "utf8"),
        await readFile(`shared/invitation-ui.${ext}`, "utf8"),
      );
    const js = gzipSync(
      Buffer.concat(
        await Promise.all(
          ["app.js", "invitation-ui.js"].map((f) =>
            readFile(`themes/${id}/${f}`),
          ),
        ),
      ),
    ).length;
    const css = gzipSync(
      Buffer.concat(
        await Promise.all(
          ["style.css", "invitation-ui.css"].map((f) =>
            readFile(`themes/${id}/${f}`),
          ),
        ),
      ),
    ).length;
    assert(js < 60000 && css < 25000, `${id} combined code budget`);
    for (const width of [390, 820, 1440]) {
      const p = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(`http://127.0.0.1:4175/themes/${id}/`);
      assert.equal(
        await p.locator('meta[name="ruvva-theme"]').getAttribute("content"),
        id,
      );
      assert.equal(
        await p.locator('meta[name="ruvva-tier"]').getAttribute("content"),
        premium.includes(id) ? "premium" : "basic",
      );
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      const dock = await p.locator(".floating").evaluate((n) => {
        const r = n.getBoundingClientRect();
        return {
          right: innerWidth - r.right,
          bottom: innerHeight - r.bottom,
          sizes: [...n.querySelectorAll("button")].map((b) => [
            b.offsetWidth,
            b.offsetHeight,
          ]),
          padding: parseFloat(
            getComputedStyle(document.querySelector(".footer")).paddingBottom,
          ),
        };
      });
      assert.equal(Math.round(dock.right), width >= 1024 ? 24 : 16);
      assert.equal(Math.round(dock.bottom), width >= 1024 ? 24 : 16);
      assert(dock.sizes.every(([w, h]) => w >= 44 && h >= 44));
      assert(dock.padding >= 144);
      assert.equal(
        await p.locator(".floating button[aria-pressed]").count(),
        1,
      );
      // Sweep all sections. Intersections must fade and pass taps through; keyboard focus remains usable.
      const max = await p.evaluate(
        () => document.documentElement.scrollHeight - innerHeight,
      );
      for (let y = 0; y <= max + 250; y += 400) {
        await p.evaluate((y) => scrollTo({ top: y, behavior: "instant" }), y);
        await p.waitForTimeout(180);
        const collision = await p.locator(".floating").evaluate((n) => {
          const overlap = (a, b) =>
            a.left < b.right &&
            a.right > b.left &&
            a.top < b.bottom &&
            a.bottom > b.top;
          const boxes = [...n.querySelectorAll("button")].map((x) =>
            x.getBoundingClientRect(),
          );
          const hit = [
            ...document.querySelectorAll(
              "h1,h2,h3,input,textarea,select,.button",
            ),
          ]
            .filter((x) => !n.contains(x))
            .some((x) => {
              const r = x.getBoundingClientRect();
              return r.width && r.height && boxes.some((b) => overlap(b, r));
            });
          return {
            hit,
            opacity: +getComputedStyle(n).opacity,
            pointer: getComputedStyle(n).pointerEvents,
          };
        });
        if (collision.hit) {
          assert(
            collision.opacity <= 0.31,
            `${id} ${width} y${y} collision opacity ${JSON.stringify(collision)}`,
          );
          assert.equal(collision.pointer, "none");
        }
      }
      await p.locator(".floating button").first().focus();
      await p.waitForTimeout(40);
      assert.equal(
        await p
          .locator(".floating")
          .evaluate((n) => getComputedStyle(n).pointerEvents),
        "auto",
      );
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
      );
      assert.deepEqual(errors, []);
      await p.close();
    }
    // Use the unmodified shared fixtures, including default, instead of theme-custom data.
    for (const fixture of [
      "sample-data.json",
      "sample-empty.json",
      "sample-birthday.json",
      "sample-telugu.json",
      "long-injection",
    ]) {
      const data = JSON.parse(
        await readFile(
          "shared/" +
            (fixture === "long-injection" ? "sample-data.json" : fixture),
          "utf8",
        ),
      );
      if (fixture === "long-injection") {
        data.name1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi";
        data.name2 = '<img src=x onerror="window.injected=1">';
      }
      const p = await browser.newPage({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.route("**/sample-data.json", (r) => r.fulfill({ json: data }));
      await p.goto(`http://127.0.0.1:4175/themes/${id}/`);
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      assert.equal(await p.evaluate(() => Boolean(window.injected)), false);
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        `${id} ${fixture} overflow`,
      );
      assert.deepEqual(errors, [], `${id} ${fixture}`);
      await p.close();
    }
    report.push(
      `${id}: PASS — tier, local UI sync, 390/820/1440 layout, collision sweep, keyboard, 5 data cases; combined gzip JS ${js} B / CSS ${css} B`,
    );
    console.log(report.at(-1));
  }
  const venue = JSON.parse(
    await readFile("themes/varnika/sample-data.json", "utf8"),
  );
  assert(!venue.venue.startsWith("assets/"));
  assert.equal(typeof venue.photoSlots.venue, "string");
  await writeFile(
    "tools/invitation-fixes-report.txt",
    new Date().toISOString() +
      "\n" +
      report.join("\n") +
      "\nC8: venue text and photo slot already correct; left unchanged.\n",
  );
} finally {
  await browser.close();
}
