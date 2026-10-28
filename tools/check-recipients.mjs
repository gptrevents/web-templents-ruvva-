import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const ids = (await readdir("themes", { withFileTypes: true }))
  .filter((x) => x.isDirectory() && x.name !== "griha-mangalam")
  .map((x) => x.name)
  .filter(
    (x) => !process.env.THEMES || process.env.THEMES.split(",").includes(x),
  );
const browser = await chromium.launch();
const base = "http://127.0.0.1:4175/themes/";
async function enter(p) {
  await p.evaluate(() => document.fonts.ready);
  const action = p.getByRole("button", {
    name: "Open Invitation",
    exact: true,
  });
  await action.scrollIntoViewIfNeeded();
  let r = await action.boundingBox();
  await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
  await p.waitForTimeout(100);
  r = await action.boundingBox();
  assert(
    await action.evaluate((n) => {
      const r = n.getBoundingClientRect();
      return n.contains(
        document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2),
      );
    }),
    "Opening receives a real pointer hit",
  );
  await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2);
  await p.locator(".opening").waitFor({ state: "detached" });
}
async function noOverflow(p, w) {
  assert.equal(
    await p.evaluate(() => document.documentElement.scrollWidth),
    w,
    "document overflow",
  );
}
try {
  for (const id of ids) {
    const report = [];
    const folder = "themes/" + id;
    await mkdir(folder + "/screenshots/guest", { recursive: true });
    for (const [width, height] of [
      [390, 844],
      [820, 1180],
      [1440, 900],
      [320, 740],
      [844, 390],
    ]) {
      const p = await browser.newPage({
        viewport: { width, height },
        reducedMotion: "reduce",
      });
      const errors = [];
      p.on("pageerror", (e) => errors.push(e.message));
      await p.goto(base + id + "/?g=Kiran%20Garu&party=family");
      await p.locator(".guest-display").waitFor();
      await p.evaluate(() => document.fonts.ready);
      assert.equal(
        await p.locator(".guest-display").textContent(),
        "Kiran Garu",
      );
      assert.match(await p.locator(".guest-party").textContent(), /family/);
      await noOverflow(p, width);
      const action = p.getByRole("button", {
        name: "Open Invitation",
        exact: true,
      });
      await action.scrollIntoViewIfNeeded();
      const box = await action.boundingBox();
      assert(
        box.y >= 0 && box.y + box.height <= height + 1,
        "opening action visible",
      );
      if ([390, 1440].includes(width))
        await p.screenshot({
          path: folder + "/screenshots/guest/" + width + "-opening.png",
        });
      await enter(p);
      assert.equal(await p.locator("#rsvp-name").inputValue(), "Kiran Garu");
      assert.match(await p.locator("#rsvp h2").textContent(), /Kiran Garu/);
      assert.match(
        await p.locator(".personal-invitation").textContent(),
        /Kiran Garu/,
      );
      assert.match(
        await p.locator(".guest-closing").textContent(),
        /Kiran Garu/,
      );
      if ([390, 1440].includes(width)) {
      await p.locator(".guest-closing").scrollIntoViewIfNeeded();
      await p.locator("#footer").screenshot({ path: folder + "/screenshots/guest/" + width + "-footer.png" });
    }
    await p.locator(".personal-invitation").scrollIntoViewIfNeeded();
      await noOverflow(p, width);
      if ([390, 1440].includes(width))
        await p
          .locator(".personal-invitation")
          .screenshot({
            path: folder + "/screenshots/guest/" + width + "-letter.png",
          });
      await p
        .getByRole("button", {
          name: "Not you? Update guest details",
          exact: true,
        })
        .click();
      await p.locator("#recipient-name").fill("Unsaved");
      await p.keyboard.press("Escape");
      assert.equal(await p.locator("#rsvp-name").inputValue(), "Kiran Garu");
      await p
        .getByRole("button", {
          name: "Not you? Update guest details",
          exact: true,
        })
        .click();
      await p.locator("#recipient-name").fill("Raju");
      await p.locator("#recipient-party").selectOption("couple");
      await p
        .getByRole("button", { name: "Use these details", exact: true })
        .click();
      assert.equal(await p.locator("#rsvp-name").inputValue(), "Raju");
      assert.equal(await p.locator(".guest-seal").textContent(), "R");
      if ([390, 1440].includes(width))
        await p
          .locator("#rsvp")
          .screenshot({
            path: folder + "/screenshots/guest/" + width + "-rsvp.png",
          });
      await p.locator("#rsvp-phone").fill("9876543210");
      await p.evaluate(
        () => (window.onInviteRsvp = async (x) => (window.sent = x)),
      );
      await p.locator(".rsvp-form button[type=submit]").click();
      await p.locator(".thanks").waitFor();
      assert.match(
        await p.locator(".thanks").textContent(),
        /Thank you, Raju!/,
      );
      assert.match(await p.locator(".guest-closing").textContent(), /so happy/);
      await noOverflow(p, width);
      assert.deepEqual(errors, []);
      await p.close();
      report.push(
        width +
          ": named opening, letter, editable RSVP, successful reply and closing; no overflow/page errors PASS",
      );
    }
    const p = await browser.newPage({
      viewport: { width: 320, height: 740 },
      reducedMotion: "reduce",
    });
    await p.goto(
      base +
        id +
        "/?g=" +
        encodeURIComponent("కిరణ్ కుమార్ వెంకట సత్యనారాయణ గారు") +
        "&party=family",
    );
    await p.locator(".guest-display").waitFor();
    await enter(p);
    assert.equal(await p.locator(".guest-seal").textContent(), "కి");
    await noOverflow(p, 320);
    await p.locator(".personal-invitation").scrollIntoViewIfNeeded();
    await p
      .locator(".personal-invitation")
      .screenshot({
        path: folder + "/screenshots/guest/320-telugu-letter.png",
      });
    report.push(
      "Long Telugu name: first grapheme, wrapping and no overflow PASS",
    );
    await p.goto(
      base + id + "/?g=" + encodeURIComponent("<img src=x onerror=alert(1)>"),
    );
    await p.locator(".guest-display").waitFor();
    assert.equal(await p.locator(".guest-display img").count(), 0);
    assert.equal(
      await p.locator(".guest-display").textContent(),
      "<img src=x onerror=alert(1)>",
    );
    report.push("URL markup rendered as text PASS");
    await p.goto(base + id + "/");
    await p.locator(".guest-display").waitFor();
    await enter(p);
    assert.equal(await p.locator(".personal-invitation").isVisible(), false);
    assert.equal(await p.locator("#rsvp-name").inputValue(), "");
    assert.equal(await p.locator(".guest-closing").isVisible(), false);
    report.push(
      "Generic fallback has no letter, no named closing and blank RSVP PASS",
    );
    await p.close();
    for (const attendance of ["no", "maybe"]) {
      const p = await browser.newPage({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      await p.goto(base + id + "/?g=Kiran");
      await p.locator(".guest-display").waitFor();
      await enter(p);
      await p.locator(".attendance input[value=" + attendance + "]").check();
      await p.locator("#rsvp-phone").fill("9876543210");
      await p.evaluate(
        () =>
          (window.onInviteRsvp = async () => {
            throw Error("retry");
          }),
      );
      await p.locator(".rsvp-form button[type=submit]").click();
      await p
        .getByText("Your response could not be sent. Please try again.", {
          exact: true,
        })
        .waitFor();
      assert.match(
        await p.locator(".guest-closing").textContent(),
        /look forward/,
      );
      assert.equal(await p.locator("#rsvp-name").inputValue(), "Kiran");
      await p.evaluate(() => (window.onInviteRsvp = async () => {}));
      await p.locator(".rsvp-form button[type=submit]").click();
      await p.locator(".thanks").waitFor();
      assert.match(
        await p.locator(".guest-closing").textContent(),
        attendance === "no" ? /missed/ : /hope/,
      );
      await p.close();
    }
    report.push(
      "Failed callback retains input/waiting closing; No/Maybe retry changes closing only on success PASS",
    );
    {
      const data = JSON.parse(
        await readFile(folder + "/sample-data.json", "utf8"),
      );
      data.guest = {
        name: "Kiran",
        honorific: "Garu",
        partyType: "family",
        note:
          "Please come early. " + "A blessing for our celebration. ".repeat(18),
      };
      const p = await browser.newPage({
        viewport: { width: 320, height: 740 },
        reducedMotion: "reduce",
      });
      await p.route("**/sample-data.json", (r) => r.fulfill({ json: data }));
      await p.goto(base + id + "/");
      await p.locator(".guest-display").waitFor();
      assert.equal(
        await p.locator(".guest-display").textContent(),
        "Kiran Garu",
      );
      await enter(p);
      assert.equal(await p.locator("#rsvp-name").inputValue(), "Kiran");
      assert.match(await p.locator(".guest-note").textContent(), /come early/);
      await p.locator(".personal-invitation").scrollIntoViewIfNeeded();
      await noOverflow(p, 320);
      await p
        .getByRole("button", {
          name: "Not you? Update guest details",
          exact: true,
        })
        .click();
      await p.locator("#recipient-name").fill("Raju");
      await p
        .getByRole("button", { name: "Use these details", exact: true })
        .click();
      assert.equal(await p.locator(".guest-note").isVisible(), false);
      await p
        .getByRole("button", {
          name: "Not you? Update guest details",
          exact: true,
        })
        .click();
      await p
        .getByRole("button", {
          name: "Continue without a personal name",
          exact: true,
        })
        .click();
      assert.equal(await p.locator("#rsvp-name").inputValue(), "");
      assert.equal(await p.locator(".personal-invitation").isVisible(), false);
      await p.goto(base + id + "/?g=Raju");
      await p.locator(".guest-display").waitFor();
      assert.equal(await p.locator(".guest-display").textContent(), "Raju");
      assert.equal(await p.locator(".guest-note").textContent(), "");
      await p.close();
    }
    report.push(
      "Structured name/honorific/family/long note; changed identity clears old note; generic reset PASS",
    );
    // Includes all JS/CSS dependencies actually requested; stylesheets via @import count too.
    const q = await browser.newPage();
    const files = new Set();
    q.on("response", (r) => {
      const u = new URL(r.url());
      if (
        u.origin === "http://127.0.0.1:4175" &&
        /\.(js|css)$/.test(u.pathname)
      )
        files.add(decodeURIComponent(u.pathname.slice(1)));
    });
    await q.goto(base + id + "/");
    await q.locator(".guest-display").waitFor();
    let js = 0,
      css = 0;
    for (const f of files) {
      const n = gzipSync(await readFile(f)).length;
      if (f.endsWith(".js")) js += n;
      else css += n;
    }
    assert(js <= 60000);
    assert(css <= 25000);
    report.push(
      `Dependency-inclusive gzip: JS ${js}/60000 B; CSS ${css}/25000 B PASS`,
    );
    await q.close();
    await writeFile(folder + "/guest-report.txt", report.join("\n") + "\n");
    console.log(id + ": PASS");
  }
} finally {
  await browser.close();
}
