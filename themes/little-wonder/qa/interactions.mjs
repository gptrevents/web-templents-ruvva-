import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { runtimeBudget } from "../../../tools/runtime-budget.mjs";
const root = "themes/little-wonder",
  base = "http://127.0.0.1:4175/" + root + "/",
  data = JSON.parse(await readFile(root + "/sample-data.json", "utf8"));
const browser = await chromium.launch();
const report = [];
const open = async (p, query = "") => {
  await p.goto(base + query);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
};
const fixture = async (p, d) =>
  p.route("**/sample-data.json", (r) => r.fulfill({ json: d }));
try {
  for (const width of [390, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const errors = [],
      requests = [];
    p.on("pageerror", (e) => errors.push(e.message));
    p.on("request", (r) => requests.push(r.url()));
    await p.goto(base + "?g=%3Cimg%20src%3Dx%20onerror%3Dalert(1)%3E");
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    assert.equal(await p.locator(".opening img[onerror]").count(), 0);
    assert(
      (await p.locator(".opening-salutation").textContent()).includes("<img"),
    );
    assert(await p.evaluate(() => document.body.classList.contains("locked")));
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .focus();
    await p.keyboard.press("Enter");
    await p.locator(".opening").waitFor({ state: "detached" });
    assert(
      !(await p.evaluate(() => document.body.classList.contains("locked"))),
    );
    assert.equal(await p.locator(".person").count(), 1);
    assert.equal(await p.locator(".memory").count(), 4);
    assert.equal(await p.locator(".event-card").count(), 4);
    assert.equal(await p.locator(".video-frame iframe").count(), 0);
    assert(
      !requests.some((u) =>
        width < 1024 ? u.endsWith("-desktop.webp") : u.endsWith("/day.webp"),
      ),
      "responsive scenery requests",
    );
    const download = p.waitForEvent("download");
    await p
      .getByRole("button", { name: "Apple / Outlook", exact: true })
      .click();
    const file = await download;
    const ics = await readFile(await file.path(), "utf8");
    assert(
      ics.includes("BEGIN:VCALENDAR") &&
        ics.includes("DTSTART:20270412T103000Z"),
    );
    await p.locator(".photo").first().click();
    assert(await p.locator("dialog[open]").isVisible());
    assert.equal(await p.locator(".viewer-counter").textContent(), "1 / 6");
    await p.keyboard.press("ArrowRight");
    assert.equal(await p.locator(".viewer-counter").textContent(), "2 / 6");
    await p.keyboard.press("ArrowLeft");
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("dialog[open]").count(), 0);
    await p.getByRole("button", { name: "Play video", exact: true }).click();
    assert.equal(await p.locator(".video-frame iframe").count(), 1);
    await p.locator(".rsvp-form button[type=submit]").click();
    assert.equal(await p.locator("[aria-invalid=true]").count(), 2);
    await p.locator("input[name=name]").fill("Preview Guest");
    await p.locator("input[name=phone]").fill("9876543210");
    await p.locator(".attendance input[value=no]").check();
    assert(!(await p.locator("select[name=guests]").isVisible()));
    await p.locator(".attendance input[value=yes]").check();
    await p.locator("select[name=guests]").selectOption("3");
    await p.evaluate(() => {
      window.onInviteRsvp = async () => {
        throw Error("Test rejection");
      };
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p
      .getByText("Your response could not be sent. Please try again.", {
        exact: true,
      })
      .waitFor();
    assert.equal(
      await p.locator("input[name=name]").inputValue(),
      "Preview Guest",
    );
    await p.evaluate(() => {
      window.onInviteRsvp = async (payload) => {
        window.testPayload = payload;
      };
    });
    await p.locator(".rsvp-form button[type=submit]").click();
    await p.locator(".thanks").waitFor();
    assert.equal(await p.evaluate(() => window.testPayload.guests), 3);
    assert.equal(
      await p.evaluate(
        () =>
          document.getAnimations().filter((a) => a.playState === "running")
            .length,
      ),
      0,
    );
    assert.deepEqual(errors, []);
    report.push(
      `PASS ${width}: safe salutation, opening keyboard/lock, single child and four memories, responsive image requests, ICS, gallery arrows/Escape, deferred video, RSVP inline errors/retry/payload, reduced motion.`,
    );
    await p.close();
  }
  for (const width of [
    320, 360, 390, 600, 820, 844, 1024, 1280, 1440, 1920, 2560,
  ]) {
    const p = await browser.newPage({
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
  report.push(
    "PASS overflow: 320,360,390,600,820,844 landscape,1024,1280,1440,1920,2560.",
  );
  for (const count of [1, 2, 3, 6, 12]) {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    await fixture(p, {
      ...data,
      gallery: Array.from({ length: count }, (_, i) => data.gallery[i % 6]),
    });
    await open(p);
    assert.equal(await p.locator(".photo").count(), count);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await p.close();
  }
  report.push("PASS gallery counts 1/2/3/6/12.");
  for (const faithId of ["none", "hindu", "muslim", "christian"]) {
    const p = await browser.newPage({ reducedMotion: "reduce" });
    await fixture(p, { ...data, faithId });
    await open(p);
    assert.equal(
      await p.locator(".faith-mark").count(),
      faithId === "none" ? 0 : 1,
    );
    await p.close();
  }
  report.push("PASS all four faith variants.");
  {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const many = {
      ...data,
      name1: "Venkata Satya Sai Lakshmi Narasimha",
      name2: "Venkata Satya Sai Lakshmi Narasimha",
      events: Array.from({ length: 8 }, (_, i) => ({
        ...data.events[i % 4],
        key: "birthday",
      })),
    };
    await fixture(p, many);
    await open(p);
    assert.equal(await p.locator(".person").count(), 2);
    assert.equal(await p.locator(".event-card").count(), 8);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await p.close();
  }
  report.push("PASS two long names and eight events.");
  for (const past of [false, true]) {
    const p = await browser.newPage({ reducedMotion: "reduce" });
    const date = past
      ? "2020-01-01"
      : new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    await fixture(p, { ...data, date });
    await open(p);
    assert.equal(
      await p.locator(".count-status").textContent(),
      past ? "Thank you for celebrating with us" : "Today is the day",
    );
    await p.close();
  }
  report.push("PASS today/past countdown states.");
  {
    const p = await browser.newPage({ reducedMotion: "reduce" });
    await fixture(p, {
      ...data,
      videoUrl: "javascript:alert(1)",
      liveStream: { url: "http://unsafe.test" },
      venue: "",
      address: "",
      gallery: [],
      rsvp: { enabled: false },
      gifts: { enabled: false },
    });
    await open(p);
    for (const id of ["video", "live", "venue", "gallery", "rsvp", "blessings"])
      assert.equal(await p.locator("#" + id).count(), 0);
    await p.close();
  }
  report.push("PASS invalid links and empty optional sections.");
  for (const width of [390, 1440]) {
    const p = await browser.newPage({
      viewport: { width, height: 900 },
      reducedMotion: "reduce",
    });
    const alternate = JSON.parse(
      await readFile(root + "/sample-birthday.json", "utf8"),
    );
    await fixture(p, alternate);
    await open(p);
    assert.equal(await p.locator("#blessings").count(), 1);
    assert.equal(await p.locator('.bless-pay[href^="upi:"]').count(), 0);
    assert.equal(await p.locator(".bless-qr svg").count(), 0);
    await p.close();
  }
  report.push(
    "PASS conditional Blessings present; demo has no payable UPI/QR.",
  );
  {
    const p = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await open(p);
    const a = await p
      .locator(".hero .balloon")
      .first()
      .evaluate((n) => getComputedStyle(n).rotate);
    await p.waitForTimeout(300);
    const b = await p
      .locator(".hero .balloon")
      .first()
      .evaluate((n) => getComputedStyle(n).rotate);
    assert.notEqual(a, b);
    await p.locator("#events").scrollIntoViewIfNeeded();
    await p.waitForTimeout(150);
    const offset = await p
      .locator(".thread-fill")
      .evaluate((n) => n.style.strokeDashoffset);
    assert(+offset < 1);
    assert(await p.locator(".event-card.seen").count());
    await p.close();
  }
  report.push(
    "PASS actual phone balloon motion, scroll-drawn event line and event reveals.",
  );
  const budget = await runtimeBudget("little-wonder");
  assert(budget.js <= 60000);
  assert(budget.css <= 25000);
  report.push(
    `PASS full module graph gzip budget: JS ${budget.js}/60000 B; CSS ${budget.css}/25000 B.`,
  );
} finally {
  await browser.close();
  await writeFile(root + "/qa-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
}
