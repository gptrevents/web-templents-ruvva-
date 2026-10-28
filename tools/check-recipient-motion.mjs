import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readdir, writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const ids = (await readdir("themes", { withFileTypes: true }))
  .filter((x) => x.isDirectory())
  .map((x) => x.name);
async function enter(p) {
  const b = p.getByRole("button", { name: "Open Invitation", exact: true });
  await b.scrollIntoViewIfNeeded();
  let r = await b.boundingBox();
  await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await p.waitForTimeout(100);
  r = await b.boundingBox();
  await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2);
  await p.locator(".opening").waitFor({ state: "detached" });
}
try {
  for (const id of ids) {
    const report = [];
    for (const width of [390, 1440]) {
      const p = await browser.newPage({
        viewport: { width, height: width === 390 ? 844 : 900 },
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(
        "http://127.0.0.1:4175/themes/" + id + "/?g=Kiran%20Garu&party=family",
      );
      await p.locator(".guest-display").waitFor();
      assert.equal(
        await p
          .locator(".opening .guest-display")
          .getAttribute("data-guest-entered"),
        "true",
      );
      assert.equal(
        await p
          .locator("#footer .guest-closing")
          .getAttribute("data-guest-entered"),
        null,
      );
      await p.evaluate(() => document.fonts.ready);
      await p.waitForTimeout(1600);
      assert.equal(
        await p
          .locator(".guest-display")
          .evaluate((n) => getComputedStyle(n).opacity),
        "1",
      );
      assert.equal(
        await p
          .locator(".guest-display")
          .evaluate(
            (n) =>
              n.getAnimations().filter((a) => a.playState === "running").length,
          ),
        0,
      );
      await enter(p);
      assert.equal(
        await p
          .locator("#footer .guest-closing")
          .getAttribute("data-guest-entered"),
        null,
      );
      assert.equal(
        await p.locator(".page-content .guest-name-enter").count(),
        0,
      );
      await p.locator(".guest-closing").scrollIntoViewIfNeeded();
      await p.waitForFunction(
        () =>
          document.querySelector(".guest-closing").dataset.guestEntered ===
          "true",
      );
      const counts = await p
        .locator(".guest-closing")
        .evaluate(
          (n) =>
            n
              .getAnimations({ subtree: true })
              .filter((a) => a.playState === "running").length,
        );
      assert(counts > 0, id + " footer motion runs");
      await p.waitForTimeout(1700);
      assert.equal(
        await p
          .locator(".guest-closing")
          .evaluate(
            (n) =>
              n
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
          ),
        0,
      );
      assert.equal(
        await p.locator(".guest-closing-name").textContent(),
        "Kiran Garu,",
      );
      assert(
        await p
          .locator(".guest-closing-name")
          .evaluate((n) => parseFloat(getComputedStyle(n).fontSize) >= 29),
      );
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      await p
        .locator("#footer")
        .screenshot({
          path: "themes/" + id + "/screenshots/guest/" + width + "-footer.png",
        });
      await p.locator("#hero").scrollIntoViewIfNeeded();
      await p.locator(".guest-closing").scrollIntoViewIfNeeded();
      await p.waitForTimeout(100);
      assert.equal(
        await p
          .locator(".guest-closing")
          .evaluate(
            (n) =>
              n
                .getAnimations({ subtree: true })
                .filter((a) => a.playState === "running").length,
          ),
        0,
      );
      assert.equal(
        await p
          .locator(
            ".guest-name-enter:not(.opening .guest-display):not(#footer .guest-closing)",
          )
          .count(),
        0,
      );
      assert.deepEqual(errors, []);
      await p.close();
      report.push(
        width +
          ": opening/closing only; finite entrance + rule, larger closing name, no replay/overflow/errors PASS",
      );
    }
    const p = await browser.newPage({
      viewport: { width: 320, height: 740 },
      reducedMotion: "reduce",
    });
    await p.goto(
      "http://127.0.0.1:4175/themes/" +
        id +
        "/?g=" +
        encodeURIComponent("కిరణ్ కుమార్ వెంకట సత్యనారాయణ గారు"),
    );
    await p.locator(".guest-display").waitFor();
    assert.equal(
      await p
        .locator(".guest-display")
        .evaluate(
          (n) =>
            n.getAnimations().filter((a) => a.playState === "running").length,
        ),
      0,
    );
    await enter(p);
    await p.locator(".guest-closing").scrollIntoViewIfNeeded();
    await p.waitForTimeout(100);
    assert.equal(
      await p
        .locator(".guest-closing")
        .evaluate(
          (n) =>
            n
              .getAnimations({ subtree: true })
              .filter((a) => a.playState === "running").length,
        ),
      0,
    );
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      320,
    );
    await p
      .locator("#footer")
      .screenshot({
        path: "themes/" + id + "/screenshots/guest/320-telugu-footer.png",
      });
    await p.close();
    report.push("320 Telugu name wraps; reduced motion fully static PASS");
    await writeFile(
      "themes/" + id + "/guest-motion-report.txt",
      report.join("\n") + "\n",
    );
    console.log(id + ": PASS");
  }
} finally {
  await browser.close();
}
