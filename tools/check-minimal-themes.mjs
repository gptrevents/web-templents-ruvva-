import { existsSync } from "node:fs";
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir, readdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
import { runtimeBudget } from "./runtime-budget.mjs";
import { fileURLToPath } from "node:url";
const ids = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["epure", "vesper"].filter((id) => existsSync(`themes/${id}/index.html`));
const browser = await chromium.launch();
const report = [];
const widths = [
  [320, 740],
  [360, 740],
  [390, 844],
  [844, 390],
  [820, 1180],
  [1280, 900],
  [1440, 900],
  [1920, 1080],
  [2560, 1440],
];
async function open(p, id, query = "?g=Rohit&ref=RUV-MINIMAL") {
  await p.goto("http://127.0.0.1:4175/themes/" + id + "/" + query);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
}
async function mock(p, id, modify) {
  await p.route("**/sample-data.json", async (r) => {
    const d = JSON.parse(
      await readFile(`themes/${id}/sample-data.json`, "utf8"),
    );
    await r.fulfill({ json: modify(d) });
  });
}
try {
  for (const id of ids) {
    const p = await browser.newPage({
      viewport: { width: 390, height: 844 },
      reducedMotion: "reduce",
      hasTouch: true,
      isMobile: true,
    });
    const errors = [];
    p.on("pageerror", (e) => errors.push(e.message));
    await open(p, id);
    assert.equal(
      await p.locator("meta[name=ruvva-tier]").getAttribute("content"),
      "premium",
    );
    for (const [width, height] of widths) {
      await p.setViewportSize({ width, height });
      for (const target of [
        "#hero",
        "#couple",
        "#countdown",
        "#events",
        "#gallery",
        "#rsvp",
        "#blessings",
        "#footer",
      ]) {
        await p.locator(target).scrollIntoViewIfNeeded();
        assert.equal(
          await p.evaluate(() => document.documentElement.scrollWidth),
          width,
          `${id} ${target} ${width} overflow`,
        );
      }
    }
    await p.setViewportSize({ width: 390, height: 844 });
    const music = p.locator(".floating .music");
    await music.focus();
    const state = await music.getAttribute("aria-pressed");
    await music.press("Enter");
    await p.waitForTimeout(60);
    assert.notEqual(await music.getAttribute("aria-pressed"), state);
    const download = p.waitForEvent("download");
    await p
      .getByRole("button", { name: "Apple / Outlook", exact: true })
      .click();
    const file = await download;
    assert.equal(file.suggestedFilename(), "invitation.ics");
    const text = await readFile(await file.path(), "utf8");
    assert(
      text.includes("BEGIN:VEVENT") &&
        text.includes("DTSTART:20261212T040000Z"),
    );
    await p.locator(".photo").first().click();
    assert(await p.locator("dialog").isVisible());
    await p.keyboard.press("ArrowRight");
    assert((await p.locator(".viewer-counter").innerText()).startsWith("2 /"));
    await p.keyboard.press("ArrowLeft");
    assert((await p.locator(".viewer-counter").innerText()).startsWith("1 /"));
    await p.keyboard.press("Escape");
    await p.locator("dialog").waitFor({ state: "detached" });
    assert.equal(await p.locator("dialog").count(), 0);
    assert.equal(await p.locator(".video iframe").count(), 0);
    await p.getByRole("button", { name: "Play video", exact: true }).click();
    assert.equal(await p.locator(".video iframe").count(), 1);
    await p.getByRole("button", { name: "Send RSVP", exact: true }).click();
    assert.equal(
      await p.locator("#rsvp-name").getAttribute("aria-invalid"),
      "true",
    );
    await p.locator("#rsvp-name").fill("Sample Guest");
    await p.locator("#rsvp-phone").fill("9876543210");
    await p.locator(".attendance input[value=no]").check();
    assert(await p.locator(".rsvp-no-blessing").isVisible());
    await p.evaluate(() => {
      window.responses = [];
      window.onInviteRsvp = async (d) => window.responses.push(d);
    });
    await p.getByRole("button", { name: "Send RSVP", exact: true }).click();
    await p.locator(".thanks").waitFor();
    assert.equal(await p.evaluate(() => window.responses[0].guests), 0);
    assert.equal(await p.locator(".bless-pay").getAttribute("href"), null); // Safe fictional default.
    await p.close();
    // Real behavior is exercised using a local intercepted fixture, never opening a UPI app.
    const gift = await browser.newPage({
      viewport: { width: 1440, height: 900 },
      reducedMotion: "reduce",
    });
    await mock(gift, id, (d) => {
      d.gifts.demo = false;
      d.gifts.payeeName = "Arjun & Priya";
      return d;
    });
    await open(gift, id);
    await gift.locator('.bless-chip input[value="1116"]').check();
    const uri = await gift.locator(".bless-pay").getAttribute("href");
    assert.equal(new URL(uri).searchParams.get("am"), "1116.00");
    assert.equal(new URL(uri).searchParams.get("pn"), "Arjun & Priya");
    await gift.locator(".bless-qr").waitFor();
    await gift.addScriptTag({
      path: fileURLToPath(import.meta.resolve("jsqr")),
    });
    const decoded = await gift.locator(".bless-qr").evaluate(async (n) => {
      const url = URL.createObjectURL(
        new Blob([new XMLSerializer().serializeToString(n)], {
          type: "image/svg+xml",
        }),
      );
      const im = new Image();
      im.src = url;
      await im.decode();
      const c = document.createElement("canvas");
      c.width = c.height = 660;
      const ctx = c.getContext("2d");
      ctx.drawImage(im, 0, 0, 660, 660);
      URL.revokeObjectURL(url);
      const image = ctx.getImageData(0, 0, 660, 660);
      return window.jsQR(image.data, 660, 660)?.data;
    });
    assert.equal(decoded, uri);
    await gift.evaluate(() => {
      window.gifts = [];
      window.onInviteGift = async (c) => window.gifts.push(c);
    });
    await gift.locator(".bless-sent").click();
    await gift.locator(".bless-thanks").waitFor();
    assert.equal(await gift.evaluate(() => window.gifts.length), 1);
    await gift.reload();
    await gift
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await gift.locator(".opening").waitFor({ state: "detached" });
    assert.equal(await gift.locator(".bless-thanks").count(), 1);
    await gift.close();
    // Variable content cardinality and long names.
    for (const count of [1, 2, 3, 6, 12]) {
      const q = await browser.newPage({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      await mock(q, id, (d) => {
        d.name1 = "Venkata Satya Sai Lakshmi Narasimha";
        d.name2 = "Sree Lakshmi Prasanna Venkata Kumari";
        const photos = d.gallery;
        d.gallery = Array.from(
          { length: count },
          (_, i) => photos[i % photos.length],
        );
        d.events = Array.from({ length: count === 12 ? 8 : 1 }, (_, i) => ({
          ...d.events[i % d.events.length],
        }));
        return d;
      });
      await open(q, id);
      assert.equal(await q.locator(".photo").count(), count);
      assert.equal(
        await q.locator(".event-card").count(),
        count === 12 ? 8 : 1,
      );
      await q.locator("#gallery").scrollIntoViewIfNeeded();
      assert.equal(
        await q.evaluate(() => document.documentElement.scrollWidth),
        390,
      );
      await q.close();
    }
    for (const faith of ["muslim", "christian", "none"]) {
      const q = await browser.newPage({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      await mock(q, id, (d) => {
        d.faithId = faith;
        return d;
      });
      await open(q, id);
      assert.equal(await q.locator(".blessing .icon-lamp").count(), 0);
      if (faith === "none")
        assert.equal(await q.locator(".faith-line").count(), 0);
      await q.close();
    }
    for (const [now, status] of [
      ["2026-12-12T09:00:00+05:30", "Today is the day"],
      ["2026-12-13T09:00:00+05:30", "Thank you for celebrating with us"],
    ]) {
      const q = await browser.newPage({
        viewport: { width: 390, height: 844 },
        reducedMotion: "reduce",
      });
      await q.clock.setFixedTime(new Date(now));
      await open(q, id);
      await q.locator("#countdown").scrollIntoViewIfNeeded();
      assert.equal(await q.locator(".count-status").innerText(), status);
      assert(await q.locator(".clock-unit").first().isHidden());
      await q.close();
    }
    const heroRequests = {};
    for (const width of [390, 1440]) {
      const q = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const requests = [];
      q.on("request", (r) => {
        if (/assets\/(main|groom|bride).*webp/.test(r.url()))
          requests.push(r.url());
      });
      await open(q, id);
      await q.locator(".hero img").evaluate((n) => n.decode());
      heroRequests[width] = [...requests];
      await q.locator(".photo").first().click();
      const viewed = await q.locator("dialog > img").getAttribute("src");
      assert.equal(
        viewed,
        width >= 1024 ? "assets/main-desktop.webp" : "assets/main.webp",
      );
      await q.close();
    }
    assert(
      heroRequests[390].every((u) => !u.includes("-desktop.webp")),
      `${id} phone requested desktop assets`,
    );
    assert(heroRequests[1440].some((u) => u.endsWith("main-desktop.webp")));
    assert(
      !heroRequests[1440].some((u) => u.endsWith("/main.webp")),
      `${id} desktop unnecessarily requested phone hero`,
    );
    assert.deepEqual(errors, []);
    const wheel = await browser.newPage({
      viewport: { width: 1440, height: 900 },
    });
    await wheel.goto("http://127.0.0.1:4175/themes/" + id + "/");
    await wheel.mouse.move(60, 300);
    await wheel.mouse.wheel(0, 500);
    await wheel.waitForTimeout(80);
    assert.equal(await wheel.evaluate(() => scrollY), 0);
    await wheel
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await wheel.locator(".opening").waitFor({ state: "detached" });
    await wheel.evaluate(() => scrollTo(0, 0));
    await wheel.mouse.wheel(0, 640);
    await wheel.waitForTimeout(50);
    const early = await wheel.evaluate(() => scrollY);
    assert(early > 0 && early < 640);
    await wheel.waitForTimeout(2200);
    assert(Math.abs((await wheel.evaluate(() => scrollY)) - 640) <= 1);
    await wheel.close();
    const budget = await runtimeBudget(id);
    assert(budget.js < 60000 && budget.css < 25000);
    let common = 0,
      desktop = 0;
    async function images(dir) {
      for (const item of await readdir(dir, { withFileTypes: true })) {
        const path = dir + "/" + item.name;
        if (item.isDirectory()) await images(path);
        else if (/\.(webp|svg|png|jpg)$/.test(item.name)) {
          const n = gzipSync(await readFile(path)).length;
          if (item.name.includes("-desktop")) desktop += n;
          else common += n;
        }
      }
    }
    await images(`themes/${id}/assets`);
    assert(common <= 450000);
    assert(desktop <= 400000);
    const first = gzipSync(
      await readFile(`themes/${id}/assets/main.webp`),
    ).length;
    assert(first < 150000);
    const line = `PASS ${id}: nine widths, native touch and eased desktop wheel; audio, RFC5545 ICS, gallery keyboard/Escape; deferred video; RSVP validation/decline/callback; independent QR decode, gift claim once/session; 1/2/3/6/12 images, 1/8 events, long names, faith guard, today/past, responsive image switching. JS ${budget.js}/60000 B; CSS ${budget.css}/25000 B; common images ${common}/450000 B; desktop ${desktop}/400000 B; first hero ${first}/150000 B.`;
    report.push(line);
    console.log(line);
  }
  await writeFile("tools/minimal-themes-report.txt", report.join("\n") + "\n");
} finally {
  await browser.close();
}
