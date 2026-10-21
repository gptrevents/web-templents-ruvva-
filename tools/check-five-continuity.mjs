import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const allIds = [
  "temple-dawn",
  "floral-elegant",
  "ocean-serene",
  "varnika",
  "sannidhi",
];
const requested = process.argv.slice(2);
assert(
  requested.every((id) => allIds.includes(id)),
  "unknown theme argument",
);
const ids = requested.length
  ? allIds.filter((id) => requested.includes(id))
  : allIds;
const browser = await chromium.launch();
const report = [];
try {
  for (const id of ids) {
    const notes = [];
    for (const width of [390, 820, 1440]) {
      const p = await browser.newPage({
        viewport: { width, height: width === 390 ? 844 : 900 },
        isMobile: width < 1024,
        hasTouch: width < 1024,
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto("http://127.0.0.1:4175/themes/" + id + "/");
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      const motion = p.locator("#live .scene-moving").first();
      await p.locator("#live").scrollIntoViewIfNeeded();
      await p.waitForTimeout(250);
      assert.equal(
        await motion.evaluate((n) => getComputedStyle(n).animationPlayState),
        "running",
      );
      const time = await motion.evaluate(
        (n) => n.getAnimations()[0].currentTime,
      );
      await p.waitForTimeout(200);
      assert(
        (await motion.evaluate((n) => n.getAnimations()[0].currentTime)) > time,
        "moving art clock advances",
      );
      if (width === 390) {
        const excursion = await motion.evaluate(async (n) => {
          const a = n.getAnimations()[0],
            duration = a.effect.getTiming().duration;
          a.pause();
          const box = n.getBBox(),
            tip = new DOMPoint(box.x + box.width, box.y);
          const sample = async (t) => {
            a.currentTime = t;
            await new Promise((r) =>
              requestAnimationFrame(() => requestAnimationFrame(r)),
            );
            const p = tip.matrixTransform(n.getScreenCTM());
            return { x: p.x, y: p.y };
          };
          const x = await sample(0),
            y = await sample(duration / 2);
          a.play();
          return Math.hypot(x.x - y.x, x.y - y.y);
        });
        assert(
          excursion > 2,
          id + " mobile scene must visibly move: " + excursion,
        );
        notes.push(
          "Phone live-art excursion " + excursion.toFixed(1) + " CSS px",
        );
        await p.locator(".person").first().scrollIntoViewIfNeeded();
        await p.waitForTimeout(180);
        const start = await p.evaluate(() => scrollY);
        const touch = await p.context().newCDPSession(p);
        await touch.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x: 210, y: 650 }],
        });
        for (let y = 610; y >= 290; y -= 40) {
          await touch.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x: 210, y }],
          });
          await p.waitForTimeout(20);
        }
        await touch.send("Input.dispatchTouchEvent", {
          type: "touchEnd",
          touchPoints: [],
        });
        await p.waitForTimeout(300);
        assert(
          (await p.evaluate(() => scrollY)) > start + 70,
          "native phone swipe scrolls",
        );
        await touch.detach();
      }
      assert.equal(
        await p.locator(".live-illustration").getAttribute("href"),
        await p.locator("#live .button").getAttribute("href"),
      );
      assert.equal(
        await p
          .locator("#live")
          .evaluate((n) => getComputedStyle(n).backgroundColor),
        "rgba(0, 0, 0, 0)",
      );
      await p.locator("#hero").scrollIntoViewIfNeeded();
      await p.waitForTimeout(150);
      assert.equal(
        await motion.evaluate((n) => getComputedStyle(n).animationPlayState),
        "paused",
        "offscreen loop pauses",
      );
      for (const section of ["countdown", "couple", "live", "rsvp", "footer"]) {
        const n = p.locator("#" + section);
        await n.scrollIntoViewIfNeeded();
        await p.waitForTimeout(1000);
        await n.screenshot({
          path: `themes/${id}/screenshots/${width === 390 ? "phone" : "desktop"}/continuity-${section}-${width}.png`,
        });
      }
      const photo = await p.locator("#footer .closing-photo").evaluate((n) => ({
        ratio: n.naturalWidth / n.naturalHeight,
        shown:
          (n.clientWidth -
            parseFloat(getComputedStyle(n).paddingLeft) -
            parseFloat(getComputedStyle(n).paddingRight)) /
          (n.clientHeight -
            parseFloat(getComputedStyle(n).paddingTop) -
            parseFloat(getComputedStyle(n).paddingBottom)),
        fit: getComputedStyle(n).objectFit,
      }));
      assert.equal(photo.fit, "contain");
      assert(
        Math.abs(photo.ratio - photo.shown) < 0.04,
        "complete photo uses natural ratio",
      );
      assert.equal(
        await p.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        ),
        false,
        id + " overflow " + width,
      );
      await p.emulateMedia({ reducedMotion: "reduce" });
      assert.equal(
        await motion.evaluate((n) => getComputedStyle(n).animationName),
        "none",
      );
      assert.deepEqual(errors, []);
      notes.push(
        width +
          " layout, complete closing photo, live action, motion pause and reduced-motion passed",
      );
      await p.close();
    }
    for (const variant of ["empty", "birthday", "telugu", "long"]) {
      for (const width of [390, 1440]) {
        const p = await browser.newPage({
          viewport: { width, height: 900 },
          reducedMotion: "reduce",
        });
        const errors = [];
        p.on("pageerror", (e) => errors.push(e.message));
        if (variant === "long") {
          const data = JSON.parse(
            await readFile("themes/" + id + "/sample-data.json", "utf8"),
          );
          data.name1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghi";
          data.name2 = "Venkata Satya Sai Lakshmi Narasimha";
          await p.route("**/sample-data.json", (r) =>
            r.fulfill({ json: data }),
          );
        }
        await p.goto(
          "http://127.0.0.1:4175/themes/" +
            id +
            "/" +
            (variant === "long" ? "" : "?data=" + variant),
        );
        await p
          .getByRole("button", { name: "Open Invitation", exact: true })
          .click();
        await p.locator(".opening").waitFor({ state: "detached" });
        await p.locator("#footer").scrollIntoViewIfNeeded();
        assert.equal(
          await p.evaluate(
            () => document.documentElement.scrollWidth > innerWidth,
          ),
          false,
          id + " " + variant + " overflow",
        );
        if (!(await p.locator("#footer .closing-photo").count()))
          assert.equal(
            await p
              .locator("#footer .wrap")
              .evaluate((n) => getComputedStyle(n).display),
            "block",
            "no empty half-spread when photography is absent",
          );
        assert.deepEqual(errors, []);
        await p.close();
      }
    }
    notes.push(
      "Empty/birthday/Telugu/long-name variants fit at 390/1440; missing closing photos leave no empty desktop column.",
    );
    const root = "themes/" + id + "/";
    const js = gzipSync(
      Buffer.concat(
        await Promise.all(
          ["app.js", "continuity-art.js", "invitation-ui.js"].map((f) =>
            readFile(root + f),
          ),
        ),
      ),
    ).length;
    const css = gzipSync(
      Buffer.concat(
        await Promise.all(
          ["style.css", "continuity.css", "invitation-ui.css"].map((f) =>
            readFile(root + f),
          ),
        ),
      ),
    ).length;
    assert(js < 60000 && css < 25000);
    notes.push(`Combined gzip JS ${js} B; CSS ${css} B.`);
    await writeFile(root + "continuity-report.txt", notes.join("\n") + "\n");
    report.push(id + ": PASS — " + notes.join("; "));
    console.log(report.at(-1));
  }
  await writeFile("tools/five-continuity-report.txt", report.join("\n") + "\n");
} finally {
  await browser.close();
}
