import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const themes = [
  "griha-mangalam",
  "evergreen-home",
  "little-wonder",
  "fairytale-bloom",
];
const b = await chromium.launch();
try {
  for (const id of themes) {
    const report = [];
    for (const width of [390, 1440]) {
      const page = await b.newPage({
        viewport: { width, height: 900 },
        hasTouch: width === 390,
      });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await page.goto("http://127.0.0.1:4175/themes/" + id + "/");
      await page
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await page.locator(".opening").waitFor({ state: "detached" });
      for (const name of ["countdown", "events", "venue", "rsvp"]) {
        const section = page.locator("#" + name);
        if (!(await section.count())) continue;
        for(const part of await section.locator('.reveal').all()) {await part.scrollIntoViewIfNeeded();await page.waitForTimeout(35);}
        await section.evaluate(n=>n.scrollIntoView({block:'start',behavior:'instant'}));
        await page.waitForTimeout(900);
        await section.locator(".occasion-decor .rail-art").evaluateAll((ns) =>
          Promise.all(
            ns.map((n) => {
              n.loading = "eager";
              return n.decode();
            }),
          ),
        );
        assert.equal(
          await page.evaluate(() => document.documentElement.scrollWidth),
          width,
        );
        assert.equal(await section.locator(".occasion-rail").count(), 2);
        const motion = await section
          .locator(".rail-art")
          .first()
          .evaluate((n) => ({
            state: getComputedStyle(n).animationPlayState,
            rotate: getComputedStyle(n).rotate,
          }));
        assert.equal(
          motion.state,
          "running",
          id + " " + name + " visible breeze",
        );
        await page.waitForTimeout(260);
        assert.notEqual(await section.locator('.rail-art').first().evaluate(n=>getComputedStyle(n).rotate),motion.rotate,id+' visible pixels move over time');
        const before = await section.evaluate((n) =>
          getComputedStyle(n).getPropertyValue("--art-depth"),
        );
        await page.mouse.wheel(0, 130);
        await page.waitForTimeout(300);
        const after = await section.evaluate((n) =>
          getComputedStyle(n).getPropertyValue("--art-depth"),
        );
        assert.notEqual(after, before, id + " scroll depth");
        await section.evaluate(n=>n.scrollIntoView({block:'start',behavior:'instant'}));await page.waitForTimeout(450);
        await mkdir("themes/" + id + "/screenshots/art-motion", {
          recursive: true,
        });
        await section.screenshot({
          path:
            "themes/" +
            id +
            "/screenshots/art-motion/" +
            width +
            "-" +
            name +
            ".png",
        });
      }
      await page.locator("#hero").scrollIntoViewIfNeeded();
      await page.waitForTimeout(250);
      const paused = await page
        .locator("#rsvp .rail-art")
        .first()
        .evaluate((n) => getComputedStyle(n).animationPlayState);
      assert.equal(paused, "paused");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.locator("#rsvp").scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
      assert.equal(
        await page
          .locator("#rsvp .rail-art")
          .first()
          .evaluate((n) => getComputedStyle(n).animationName),
        "none",
      );
      await page.evaluate(() => {
        window.onInviteRsvp = async (payload) => {
          window.artRsvp = payload;
        };
      });
      await page.locator("#rsvp-name").fill("Motion Preview Guest");
      await page.locator("#rsvp-phone").fill("9876543210");
      await page.locator(".rsvp-form button[type=submit]").click();
      await page.locator(".thanks").waitFor();
      assert.equal(
        await page.evaluate(() => window.artRsvp.name),
        "Motion Preview Guest",
      );
      assert.deepEqual(errors, []);
      report.push(
        "PASS " +
          width +
          ": two visible image rails in countdown/events/venue/RSVP; mobile/desktop breeze running, scroll-linked depth changes, offscreen paused and reduced-motion static; RSVP remains clickable with valid callback payload; no horizontal overflow or page errors.",
      );
      await page.close();
    }
    await writeFile(
      "themes/" + id + "/art-motion-report.txt",
      report.join("\n") + "\n",
    );
    console.log(id, report.join("\n"));
  }
} finally {
  await b.close();
}
