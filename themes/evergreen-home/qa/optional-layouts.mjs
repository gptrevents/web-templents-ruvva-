import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
const root = "themes/evergreen-home",
  base = "http://127.0.0.1:4175/" + root + "/",
  sample = JSON.parse(await readFile(root + "/sample-data.json", "utf8")),
  b = await chromium.launch(),
  report = [];
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    for (const count of [1, 2, 3, 6, 12]) {
      const d = structuredClone(sample);
      d.gallery = Array.from(
        { length: count },
        (_, i) =>
          "assets/" + ["living", "dining", "house-wide"][i % 3] + ".webp",
      );
      await p.route("**/sample-data.json", (r) => r.fulfill({ json: d }));
      await p.goto(base);
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      await p.locator("#gallery").scrollIntoViewIfNeeded();
      await p.locator("#gallery img").evaluateAll((ns) =>
        Promise.all(
          ns.map((n) => {
            n.loading = "eager";
            return n.decode();
          }),
        ),
      );
      await p
        .locator("#gallery")
        .screenshot({
          path:
            root +
            "/screenshots/" +
            (width === 390 ? "phone" : "desktop") +
            "/gallery-" +
            count +
            ".png",
        });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      await p.unroute("**/sample-data.json");
    }
    report.push(
      "PASS " +
        width +
        ": gallery compositions 1,2,3,6,12 captured without overflow.",
    );
    const d = JSON.parse(await readFile("shared/sample-data.json", "utf8"));
    d.name1 = "Venkata Satya Sai Lakshmi Narasimha";
    d.name2 = "Sri Lakshmi Venkata Padmavathi Devi";
    await p.route("**/sample-data.json", (r) => r.fulfill({ json: d }));
    await p.goto(base);
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    await p.locator("#couple").scrollIntoViewIfNeeded();
    await p
      .locator("#couple")
      .screenshot({
        path:
          root +
          "/screenshots/" +
          (width === 390 ? "phone" : "desktop") +
          "/long-family.png",
      });
    if (width === 1440) {
      const x = await p
        .locator(".person")
        .evaluateAll((ns) => ns.map((n) => n.getBoundingClientRect().x));
      assert(x[1] > x[0] + 100);
      assert.equal(await p.locator(".family-row>.amp").count(), 1);
    }
    await p.close();
    report.push(
      "PASS " +
        width +
        ": long-name family fixture; desktop paired portraits and joining motif.",
    );
  }
  await writeFile(
    root + "/optional-layout-report.txt",
    report.join("\n") + "\n",
  );
  console.log(report.join("\n"));
} finally {
  await b.close();
}
