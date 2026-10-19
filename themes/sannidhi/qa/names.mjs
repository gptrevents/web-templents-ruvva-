import { chromium } from "playwright";
import assert from "node:assert/strict";
import { appendFile } from "node:fs/promises";
const b = await chromium.launch();
const base = "http://127.0.0.1:4179/";
const notes = [];
try {
  for (const width of [320, 390, 820, 1440, 2560]) {
    const p = await b.newPage({
      viewport: { width, height: width === 820 ? 1180 : 900 },
    });
    for (const data of ["birthday", "telugu"]) {
      await p.goto(base + "?data=" + data);
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      if (data === "birthday" && width >= 1024) {
        assert.equal(
          await p
            .locator("#hero .names")
            .evaluate((n) => getComputedStyle(n).display),
          "block",
        );
        const bounds = await p.locator("#hero .names").boundingBox();
        const column = await p.locator("#hero .wrap").boundingBox();
        assert(
          bounds.x >= column.x - 1 &&
            bounds.x + bounds.width <= column.x + column.width + 1,
        );
        assert.equal(await p.locator("#hero .names .amp").count(), 0);
      }
      assert((await p.locator("#hero").evaluate((n) => n.offsetHeight)) < 1800);
    }
    await p.route("**/sample-data.json", async (route) => {
      const r = await route.fetch();
      const d = await r.json();
      d.name1 = d.name2 = "Venkata Satya Sai Lakshmi Narasimha";
      await route.fulfill({ json: d });
    });
    await p.goto(base);
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    assert.equal(
      await p.locator("#hero .names").getAttribute("data-long"),
      "true",
    );
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      width,
    );
    notes.push(
      `PASS ${width}: birthday name fits the editorial column, Telugu and two long names wrap without overflow.`,
    );
    await p.close();
  }
  console.log(notes.join("\n"));
  await appendFile("themes/sannidhi/names-report.txt", notes.join("\n") + "\n");
} finally {
  await b.close();
}
