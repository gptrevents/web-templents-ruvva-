import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const root = "themes/griha-mangalam",
  base = "http://127.0.0.1:4175/" + root + "/",
  browser = await chromium.launch(),
  report = [];
async function enter(p) {
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
}
try {
  for (const [width, height] of [
    [390, 844],
    [820, 1180],
    [1440, 900],
    [844, 390],
    [320, 740],
  ]) {
    const p = await browser.newPage({
        viewport: { width, height },
        reducedMotion: "reduce",
      }),
      errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(base + "?g=Kiran%20Garu&party=family");
    await p.locator(".guest-display").waitFor();
    await p.evaluate(() => document.fonts.ready);
    assert.equal(await p.locator(".guest-display").textContent(), "Kiran Garu");
    assert((await p.locator(".guest-party").textContent()).includes("family"));
    const action = await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .boundingBox();
    assert(
      action.y + action.height <= height + 1,
      "opening button fits " + width,
    );
    await mkdir(root + "/screenshots/guest", { recursive: true });
    await p.screenshot({
      path: root + "/screenshots/guest/" + width + "-opening.png",
    });
    await enter(p);
    assert.equal(await p.locator("#rsvp-name").inputValue(), "Kiran Garu");
    assert((await p.locator("#rsvp h2").textContent()).includes("Kiran Garu"));
    assert(
      (await p.locator(".personal-invitation").textContent()).includes(
        "Kiran Garu",
      ),
    );
    assert(
      (await p.locator(".guest-closing").textContent()).includes("Kiran Garu"),
    );
    for (const id of ["blessing", "rsvp", "footer"]) {
      await p
        .locator("#" + id)
        .evaluate((n) =>
          n.scrollIntoView({ block: "start", behavior: "instant" }),
        );
      await p.waitForTimeout(80);
      if ([390, 1440].includes(width))
        await p
          .locator("#" + id)
          .screenshot({
            path: root + "/screenshots/guest/" + width + "-" + id + ".png",
          });
      assert.equal(
        await p.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
    }
    await p
      .getByRole("button", {
        name: "Not you? Update guest details",
        exact: true,
      })
      .click();
    await p.locator("#recipient-name").fill("Unsaved name");
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("#rsvp-name").inputValue(),"Kiran Garu");
    await p.getByRole("button",{name:"Not you? Update guest details",exact:true}).click();
    await p.locator("#recipient-name").fill("Raju");
    await p.locator("#recipient-party").selectOption("couple");
    await p
      .getByRole("button", { name: "Use these details", exact: true })
      .click();
    assert.equal(await p.locator("#rsvp-name").inputValue(), "Raju");
    assert(
      (await p.locator(".guest-closing").textContent()).startsWith("Raju,"),
    );
    await p.locator("#rsvp-phone").fill("9876543210");
    await p.evaluate(() => {
      window.onInviteRsvp = async (x) => (window.sent = x);
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p.locator(".thanks").waitFor();
    assert(
      (await p.locator(".thanks").textContent()).includes("Thank you, Raju!"),
    );
    assert(
      (await p.locator(".guest-closing").textContent()).includes("so happy"),
    );
    assert.equal(await p.evaluate(() => window.sent.name), "Raju");
    assert.deepEqual(errors, []);
    await p.close();
    report.push(
      "PASS " +
        width +
        ": personal opening fits, four guest touchpoints, family label, RSVP prefill, correction and personalized success/closing; no overflow/errors.",
    );
  }
  for (const name of [
    "అర్జున్ గారు",
    "Venkata Satya Sai Lakshmi Narasimha and Padmavathi Family",
    "<img src=x onerror=alert(1)>",
  ]) {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await p.goto(base + "?g=" + encodeURIComponent(name));
    await p.locator(".guest-display").waitFor();
    assert.equal(await p.locator(".guest-display").textContent(), name);
    assert.equal(await p.locator("img[onerror]").count(), 0);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await p.screenshot({
      path:
        root +
        "/screenshots/guest/" +
        (name.startsWith("అ")
          ? "telugu"
          : name.startsWith("<")
            ? "injection"
            : "long-name") +
        ".png",
    });
    await enter(p);
    assert.equal(await p.locator("#rsvp-name").inputValue(), name);
    await p.close();
  }
  report.push(
    "PASS Telugu, long guest names and HTML injection rendered as safe text.",
  );
  {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await p.goto(base);
    await enter(p);
    assert.equal(await p.locator("#rsvp-name").inputValue(), "");
    assert(await p.locator(".personal-invitation").isHidden());
    await p.close();
  }
  for (const attendance of ["no", "maybe"]) {
    const p = await browser.newPage({ reducedMotion: "reduce" });
    await p.goto(base + "?g=Kiran");
    await enter(p);
    await p.locator(".attendance input[value=" + attendance + "]").check();
    await p.locator("#rsvp-phone").fill("9876543210");
    await p.evaluate(() => {
      window.onInviteRsvp = async () => {
        throw Error("retry");
      };
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p
      .getByText("Your response could not be sent. Please try again.", {
        exact: true,
      })
      .waitFor();
    assert(
      (await p.locator(".guest-closing").textContent()).includes(
        "look forward",
      ),
    );
    await p.evaluate(() => {
      window.onInviteRsvp = async () => {};
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p.locator(".thanks").waitFor();
    assert(
      (await p.locator(".guest-closing").textContent()).includes(
        attendance === "no" ? "missed" : "hope",
      ),
    );
    await p.close();
  }
  report.push(
    "PASS generic fallback, failed submission preserves waiting copy, decline/maybe success closing.",
  );
  {
    const d = JSON.parse(await readFile(root + "/sample-data.json", "utf8"));
    d.guest = {
      name: "Kiran",
      honorific: "Garu",
      partyType: "family",
      note: "Please come early. We would love your blessings.",
    };
    const p = await browser.newPage({ reducedMotion: "reduce" });
    await p.route("**/sample-data.json", (r) => r.fulfill({ json: d }));
    await p.goto(base);
    await enter(p);
    assert.equal(await p.locator("#rsvp-name").inputValue(), "Kiran");
    assert(
      (await p.locator(".guest-note").textContent()).includes("come early"),
    );
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
    assert(await p.locator(".guest-note").isHidden());
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
    assert(await p.locator(".personal-invitation").isHidden());
    await p.close();
  }
  report.push(
    "PASS structured guest/honorific/party/note; corrected identity clears original note; generic reset.",
  );
  await writeFile(root + "/guest-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
} finally {
  await browser.close();
}
