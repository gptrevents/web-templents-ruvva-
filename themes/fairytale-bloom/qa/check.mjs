import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
const root = "themes/fairytale-bloom",
  base = "http://127.0.0.1:4175/" + root + "/",
  sample = JSON.parse(await readFile(root + "/sample-data.json", "utf8"));
const b = await chromium.launch(),
  report = [];
const open = async (p, q = "") => {
  await p.goto(base + q);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
};
const fixture = async (p, data) =>
  p.route("**/sample-data.json", (r) => r.fulfill({ json: data }));
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(
      base + "?g=" + encodeURIComponent("<img src=x onerror=alert(1)>"),
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    assert(
      (await p.locator(".opening-salutation").textContent()).includes("<img"),
    );
    assert.equal(await p.locator("img[onerror]").count(), 0);
    assert(await p.evaluate(() => document.body.classList.contains("locked")));
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .focus();
    await p.keyboard.press("Enter");
    await p.locator(".opening").waitFor({ state: "detached" });
    assert(
      !(await p.evaluate(() => document.body.classList.contains("locked"))),
    );
    assert.equal(await p.locator(".memory-polaroid").count(), 4);
    assert.equal(await p.locator(".hero .person").count(), 1);
    assert.equal(
      await p.locator(".hero-age").textContent(),
      "5 Years of Happiness",
    );
    const center = await p
      .locator(".memory-constellation>.person")
      .evaluate((n) => {
        const a = n.getBoundingClientRect(),
          c = n.parentElement.getBoundingClientRect();
        return Math.abs(a.x + a.width / 2 - c.x - c.width / 2);
      });
    assert(
      center < 2,
      "main portrait must remain centered after reveal transforms",
    );
    for (const id of ["gallery", "video", "live", "blessings"])
      assert.equal(await p.locator("#" + id).count(), 0);
    const dl = p.waitForEvent("download");
    await p
      .getByRole("button", { name: "Apple / Outlook", exact: true })
      .click();
    const file = await dl;
    const ics = await readFile(await file.path(), "utf8");
    assert(
      ics.includes("BEGIN:VCALENDAR") &&
        ics.includes("DTSTART:20270425T103000Z"),
    );
    const google = await p
      .getByRole("link", { name: "Google Calendar", exact: true })
      .getAttribute("href");
    assert(new URL(google).searchParams.get("location").includes("Sunshine"));
    await p.locator(".memory-polaroid").first().click();
    assert.equal(await p.locator(".viewer-counter").textContent(), "1 / 4");
    await p.locator("dialog").evaluate((n) => {
      for (const [type, x] of [
        ["touchstart", 300],
        ["touchend", 90],
      ]) {
        const t = new Touch({
          identifier: 1,
          target: n,
          clientX: x,
          clientY: 100,
        });
        n.dispatchEvent(
          new TouchEvent(type, { changedTouches: [t], bubbles: true }),
        );
      }
    });
    assert.equal(await p.locator(".viewer-counter").textContent(), "2 / 4");
    await p.keyboard.press("ArrowRight");
    assert.equal(await p.locator(".viewer-counter").textContent(), "3 / 4");
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("dialog[open]").count(), 0);
    await p.locator(".event-place summary").first().click();
    assert(
      await p
        .locator(".event-place")
        .first()
        .getByText(sample.venue, { exact: true })
        .isVisible(),
    );
    assert.equal(await p.locator(".event-painting").count(), 4);
    await p.locator(".rsvp-form button[type=submit]").click();
    assert.equal(await p.locator("[aria-invalid=true]").count(), 2);
    await p.locator("#rsvp-name").fill("Preview Guest");
    await p.locator("#rsvp-phone").fill("9876543210");
    await p.locator(".attendance input[value=no]").check();
    assert(!(await p.locator("select[name=guests]").isVisible()));
    await p.locator(".attendance input[value=yes]").check();
    await p.locator("select[name=guests]").selectOption("3");
    await p.evaluate(() => {
      window.onInviteRsvp = async () => {
        throw Error("expected rejection");
      };
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p
      .getByText("Your response could not be sent. Please try again.", {
        exact: true,
      })
      .waitFor();
    assert.equal(await p.locator("#rsvp-name").inputValue(), "Preview Guest");
    await p.evaluate(() => {
      window.onInviteRsvp = async (x) => {
        window.received = x;
      };
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p.locator(".thanks").waitFor();
    assert.equal(await p.evaluate(() => window.received.guests), 3);
    assert.equal(
      await p.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === "running")
            .length,
      ),
      0,
    );
    assert.deepEqual(errors, []);
    await p.close();
    report.push(
      `PASS ${width}: safe guest, keyboard/lock/opening, centered constellation/four polaroids, memory swipe/arrows/Escape, illustrated event disclosures, calendar UTC export, compact optional sections, RSVP errors/retry/success and reduced motion.`,
    );
  }
  {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await open(p);
    assert.equal(await p.locator(".wish-card").count(), 3);
    assert.equal(await p.locator(".wish-demo").textContent(), "Sample wishes");
    await p.getByRole("button", { name: "Write a wish", exact: true }).click();
    await p.locator(".wish-compose button[type=submit]").click();
    await p
      .getByText("Please add your name and a birthday wish.", { exact: true })
      .waitFor();
    const name = "<img src=x onerror=alert(1)>";
    await p.locator("#wish-name").fill(name);
    await p.locator("#wish-message").fill("A lovely day & a beautiful year!");
    await p.locator(".wish-compose button[type=submit]").click();
    await p
      .getByText("Your wish is saved on this device.", { exact: true })
      .waitFor();
    assert.equal(await p.locator(".wish-card").count(), 4);
    assert.equal(await p.locator(".wish-author").first().textContent(), name);
    assert.equal(await p.locator(".wishbook img[src=x]").count(), 0);
    await p.reload();
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    assert.equal(await p.locator(".wish-card").count(), 4);
    await p.getByRole("button", { name: "Write a wish", exact: true }).click();
    await p.locator("#wish-name").fill("Rohit");
    await p.locator("#wish-message").fill("Happy birthday!");
    await p.evaluate(() => {
      window.onInviteWish = async () => {
        throw Error("expected rejection");
      };
    });
    await p.locator(".wish-compose button[type=submit]").click();
    await p
      .getByText("Your wish could not be saved. Please try again.", {
        exact: true,
      })
      .waitFor();
    assert.equal(
      await p.locator("#wish-message").inputValue(),
      "Happy birthday!",
    );
    await p.evaluate(() => {
      window.onInviteWish = async (x) => {
        window.wishPayload = x;
      };
    });
    await p.locator(".wish-compose button[type=submit]").click();
    await p
      .getByText("Your wish has been received. Thank you!", { exact: true })
      .waitFor();
    assert.equal(await p.evaluate(() => window.wishPayload.name), "Rohit");
    await p.close();
    report.push(
      "PASS wishbook: marked sample cards, required fields, safe rendering, honest local-only feedback, reload persistence, callback loading/retry and payload.",
    );
  }
  for (const width of [
    320, 360, 390, 600, 820, 844, 1024, 1280, 1440, 1920, 2560,
  ]) {
    const p = await b.newPage({
      viewport: { width, height: width === 844 ? 390 : 900 },
      reducedMotion: "reduce",
    });
    await open(p);
    await p.evaluate(() => document.fonts.ready);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      width,
    );
    await p.close();
  }
  report.push("PASS 320–2560 widths, tablet and phone landscape.");
  for (const count of [1, 2, 3, 6, 12]) {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await fixture(p, {
      ...sample,
      gallery: Array.from(
        { length: count },
        (_, i) => sample.photoSlots.story[i % 4],
      ),
    });
    await open(p);
    assert.equal(await p.locator("#gallery .photo").count(), count);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await p.close();
  }
  report.push("PASS optional gallery counts 1/2/3/6/12.");
  for (const faithId of ["none", "hindu", "muslim", "christian"]) {
    const p = await b.newPage({ reducedMotion: "reduce" });
    await fixture(p, { ...sample, faithId });
    await open(p);
    assert.equal(
      await p.locator(".faith-mark").count(),
      faithId === "none" ? 0 : 1,
    );
    await p.close();
  }
  report.push("PASS faith variants, no incorrect deity artwork.");
  {
    const p = await b.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    const d = JSON.parse(await readFile("shared/sample-data.json", "utf8"));
    await fixture(p, d);
    await open(p);
    assert.equal(await p.locator("#couple .person").count(), 2);
    assert(
      (await p.locator(".person-groom .parents").last().textContent()).includes(
        "Ramesh",
      ),
    );
    assert.equal(await p.locator("#video iframe").count(), 0);
    await p.getByRole("button", { name: "Play video", exact: true }).click();
    assert.equal(await p.locator("#video iframe").count(), 1);
    assert.equal(await p.locator("#live").count(), 1);
    assert.equal(await p.locator(".event-choices input").count(), 5);
    await p.close();
    report.push(
      "PASS wedding/family-side fixture, conditional video/live and event/diet fields.",
    );
  }
  {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await fixture(p, {
      ...sample,
      name1: "Venkata Satya Sai Lakshmi Narasimha",
      name2: "Venkata Satya Sai Lakshmi Narasimha",
      events: Array.from({ length: 8 }, (_, i) => sample.events[i % 4]),
    });
    await open(p);
    assert.equal(await p.locator(".event-card").count(), 8);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await p.close();
    report.push("PASS two long names and eight events.");
  }
  for (const past of [false, true]) {
    const p = await b.newPage({ reducedMotion: "reduce" });
    await fixture(p, {
      ...sample,
      date: past
        ? "2020-01-01"
        : new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" }),
    });
    await open(p);
    assert.equal(
      await p.locator(".count-status").textContent(),
      past ? "Thank you for celebrating with us" : "Today is the day",
    );
    await p.close();
  }
  report.push("PASS today/past countdown states.");
  {
    const p = await b.newPage({ reducedMotion: "reduce" });
    await fixture(p, {
      ...sample,
      videoUrl: "javascript:alert(1)",
      liveStream: { url: "http://unsafe.test" },
      venue: "",
      address: "",
      rsvp: { enabled: false },
      gifts: { enabled: false },
      date: "",
    });
    await open(p);
    for (const id of [
      "venue",
      "rsvp",
      "video",
      "live",
      "blessings",
      "countdown",
    ])
      assert.equal(await p.locator("#" + id).count(), 0);
    assert.equal(
      await p.locator(".scroll-hint").getAttribute("href"),
      "#footer",
    );
    await p.close();
    report.push(
      "PASS invalid links, missing optional sections and missing date.",
    );
  }
  {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    await open(p);
    const pose = () =>
      p
        .locator(".hero>.butterfly .wing")
        .first()
        .evaluate((n) => getComputedStyle(n).transform);
    const a = await pose();
    await p.waitForTimeout(300);
    assert.notEqual(await pose(), a);
    await p.locator("#events").scrollIntoViewIfNeeded();
    await p.waitForTimeout(100);
    assert(
      +(await p
        .locator(".thread-fill")
        .first()
        .evaluate((n) => n.style.strokeDashoffset)) < 1,
    );
    await p.evaluate(() => {
      Object.defineProperty(document, "hidden", {
        configurable: true,
        value: true,
      });
      document.dispatchEvent(new Event("visibilitychange"));
    });
    assert.equal(
      await p.evaluate(
        () =>
          document
            .getAnimations()
            .filter(
              (a) =>
                a.effect.getTiming().iterations === Infinity &&
                a.playState === "running",
            ).length,
      ),
      0,
    );
    await p.close();
    report.push(
      "PASS actual phone butterfly motion, drawn event path and hidden-tab pause.",
    );
  }
} finally {
  await b.close();
  await writeFile(root + "/qa-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
}
