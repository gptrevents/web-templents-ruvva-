import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
const root = "themes/evergreen-home",
  base = "http://127.0.0.1:4175/" + root + "/",
  sample = JSON.parse(await readFile(root + "/sample-data.json", "utf8"));
const b = await chromium.launch(),
  report = [];
async function open(p, q = "") {
  await p.goto(base + q);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
}
async function fixture(p, d) {
  await p.route("**/sample-data.json", (r) => r.fulfill({ json: d }));
}
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      }),
      errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await p.goto(
      base + "?g=" + encodeURIComponent("<img src=x onerror=alert(1)>"),
    );
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .waitFor();
    assert((await p.locator(".salutation").textContent()).includes("<img"));
    assert.equal(await p.locator("img[onerror]").count(), 0);
    assert(await p.evaluate(() => document.body.classList.contains("locked")));
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .focus();
    await p.keyboard.press("Tab");
    assert.equal(
      await p.evaluate(() => document.activeElement.textContent),
      "Open Invitation",
    );
    await p.keyboard.press("Enter");
    await p.locator(".opening").waitFor({ state: "detached" });
    assert(
      !(await p.evaluate(() => document.body.classList.contains("locked"))),
    );
    assert.equal(await p.locator(".home-snapshot").count(), 3);
    assert.equal(await p.locator(".event-card").count(), 4);
    assert.equal(await p.locator(".event-thumb").count(), 4);
    for (const id of ["gallery", "video", "live", "blessings"])
      assert.equal(await p.locator("#" + id).count(), 0);
    await p.locator(".event-detail-action").first().click();
    assert(await p.locator(".event-date").first().isVisible());
    assert(
      (
        await p
          .locator(".event-details .text-link")
          .first()
          .getAttribute("href")
      ).startsWith("https://"),
    );
    const download = p.waitForEvent("download");
    await p
      .getByRole("button", { name: "Apple / Outlook", exact: true })
      .click();
    const file = await download,
      ics = await readFile(await file.path(), "utf8");
    assert(ics.includes("DTSTART:20270314T043000Z"));
    assert.equal(
      new URL(
        await p
          .getByRole("link", { name: "Google Calendar", exact: true })
          .getAttribute("href"),
      ).hostname,
      "calendar.google.com",
    );
    await p.locator(".rsvp-form button[type=submit]").click();
    assert.equal(await p.locator("[aria-invalid=true]").count(), 2);
    await p
      .getByRole("button", { name: "With regret, we cannot", exact: true })
      .click();
    assert(await p.locator(".attendance input[value=no]").isChecked());
    assert(!(await p.locator("select[name=guests]").isVisible()));
    await p
      .getByRole("button", { name: "With joy, we will be there", exact: true })
      .click();
    await p.locator("#rsvp-name").fill("Preview Guest");
    await p.locator("#rsvp-phone").fill("9876543210");
    await p.locator("select[name=guests]").selectOption("3");
    await p
      .locator("textarea[name=message]")
      .fill("Blessings for your new home.");
    await p.evaluate(() => {
      window.onInviteRsvp = async () => {
        throw Error("test rejection");
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
      await p.evaluate(() => window.received.message),
      "Blessings for your new home.",
    );
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
      `PASS ${width}: safe guest, opening focus/lock/keyboard, three home photographs, four schedule photo rows/disclosures, calendars/UTC ICS, RSVP validation, warm choices, callback retry/payload/success, reduced motion.`,
    );
    await p.close();
  }
  {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    for (const width of [
      320, 360, 390, 599, 600, 820, 844, 1024, 1280, 1440, 1920, 2560,
    ]) {
      await p.setViewportSize({ width, height: width === 844 ? 390 : 900 });
      await open(p);
      for (const id of [
        "hero",
        "couple",
        "countdown",
        "events",
        "venue",
        "rsvp",
        "footer",
      ]) {
        if (!(await p.locator("#" + id).count())) continue;
        await p.locator("#" + id).scrollIntoViewIfNeeded();
        assert.equal(
          await p.evaluate(() => document.documentElement.scrollWidth),
          width,
          "overflow at " + width + " " + id,
        );
      }
    }
    report.push("PASS all chapters at 320–2560px, tablet and phone landscape.");
    await p.close();
  }
  {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
    });
    const d = JSON.parse(await readFile("shared/sample-data.json", "utf8"));
    d.videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    d.liveStream.url = "https://www.youtube.com/live/dQw4w9WgXcQ";
    d.name1 = "Venkata Satya Sai Lakshmi Narasimha";
    d.name2 = "Sri Lakshmi Venkata Padmavathi Devi";
    await fixture(p, d);
    await open(p);
    assert.equal(await p.locator(".person").count(), 2);
    assert(
      (await p.locator(".person").first().textContent()).includes(
        d.families.find((f) => f.side === "groom").names,
      ),
    );
    assert(await p.locator(".event-choices").isVisible());
    assert.equal(await p.locator(".video-frame iframe").count(), 0);
    assert(await p.locator("#live").isVisible());
    await p.locator(".photo").first().click();
    assert.equal(await p.locator(".viewer-counter").textContent(), "1 / 6");
    await p.keyboard.press("ArrowRight");
    assert.equal(await p.locator(".viewer-counter").textContent(), "2 / 6");
    await p.locator("dialog").evaluate((n) => {
      for (const [type, x] of [
        ["touchstart", 300],
        ["touchend", 80],
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
    assert.equal(await p.locator(".viewer-counter").textContent(), "3 / 6");
    await p.keyboard.press("Escape");
    assert.equal(await p.locator("dialog[open]").count(), 0);
    await p.locator(".video-poster").click();
    assert.equal(await p.locator(".video-frame iframe").count(), 1);
    assert(
      (await p.locator(".video-frame iframe").getAttribute("src")).startsWith(
        "https://www.youtube.com/embed/",
      ),
    );
    report.push(
      "PASS canonical wedding fixture: long names, side-matched parents, event/diet options, gallery touch/arrows/Escape, deferred YouTube and live stream.",
    );
    await p.close();
  }
  for (const count of [1, 2, 3, 6, 12]) {
    const p = await b.newPage({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      }),
      d = structuredClone(sample);
    d.gallery = Array.from({ length: count }, () => "assets/house-wide.webp");
    await fixture(p, d);
    await open(p);
    await p.locator("#gallery").scrollIntoViewIfNeeded();
    assert.equal(await p.locator(".photo").count(), count);
    assert.equal(
      await p.evaluate(() => document.documentElement.scrollWidth),
      390,
    );
    await p.close();
  }
  report.push("PASS optional gallery counts 1,2,3,6,12.");
  for (const faith of ["muslim", "christian", "none"]) {
    const p = await b.newPage({ reducedMotion: "reduce" }),
      d = structuredClone(sample);
    d.faithId = faith;
    await fixture(p, d);
    await open(p);
    assert.equal(await p.locator(".ganesha").count(), 0);
    assert.equal(await p.locator("img[src*=satyanarayana]").count(), 0);
    await p.close();
  }
  report.push("PASS other faiths: no Hindu deity artwork.");
  for (const state of ["today", "past"]) {
    const p = await b.newPage({ reducedMotion: "reduce" }),
      d = structuredClone(sample);
    d.date =
      state === "today"
        ? new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" })
        : "2020-01-01";
    await fixture(p, d);
    await open(p);
    await p.locator("#countdown").scrollIntoViewIfNeeded();
    await p.waitForTimeout(100);
    assert(
      (await p.locator(".count-status").textContent()).includes(
        state === "today" ? "Today is the day" : "Thank you",
      ),
    );
    await p.close();
  }
  report.push("PASS today/past countdown.");
  {
    const p = await b.newPage({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
      }),
      d = structuredClone(sample);
    d.events = Array.from({ length: 8 }, (_, i) => ({
      ...sample.events[i % 4],
      label: "Ritual " + (i + 1),
    }));
    await fixture(p, d);
    await open(p);
    assert.equal(await p.locator(".event-card").count(), 8);
    await p.locator("#events").scrollIntoViewIfNeeded();
    await p.waitForTimeout(500);
    assert(
      await p
        .locator(".events")
        .evaluate((n) => n.classList.contains("motion-active")),
    );
    const points = await p
      .locator(".vine-tip")
      .evaluate((n) => [n.getAttribute("cx"), n.getAttribute("cy")]);
    await p.mouse.wheel(0, 400);
    await p.waitForTimeout(450);
    assert.notDeepEqual(
      await p
        .locator(".vine-tip")
        .evaluate((n) => [n.getAttribute("cx"), n.getAttribute("cy")]),
      points,
    );
    assert(
      (await p
        .locator(".ambient .petal")
        .first()
        .evaluate((n) => getComputedStyle(n).animationPlayState)) === "running",
    );
    await p.close();
    report.push(
      "PASS eight rituals and actual phone scroll drawing/petal animation.",
    );
  }
  await writeFile(root + "/qa-report.txt", report.join("\n") + "\n");
  console.log(report.join("\n"));
} finally {
  await b.close();
}
