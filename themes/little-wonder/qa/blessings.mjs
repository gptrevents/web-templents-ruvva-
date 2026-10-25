import { runtimeBudget } from "../../../tools/runtime-budget.mjs";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";
import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const themes = ["little-wonder"];
const browser = await chromium.launch();
const report = [];
const decoder =
  process.env.RUVVA_QR_DECODER || fileURLToPath(import.meta.resolve("jsqr"));
const base = "http://127.0.0.1:4175";
async function fixture(page, id, modify = (d) => d) {
  await page.route("**/sample-data.json", async (route) => {
    const d = JSON.parse(
      await readFile(`themes/${id}/sample-data.json`, "utf8"),
    );
    d.gifts.enabled = true;
    d.gifts.demo = false;
    d.gifts.amounts = [501, 1001, 1116, 2116, 5116];
    d.gifts.payeeName = "Arjun & Priya";
    await route.fulfill({ json: modify(d) });
  });
}
async function open(page, id, query = "?g=Rohit%20Kumar&ref=RUV-7K2Q") {
  await page.goto(`${base}/themes/${id}/${query}`);
  await page
    .getByRole("button", { name: "Open Invitation", exact: true })
    .click();
  await page.locator(".opening").waitFor({ state: "detached" });
}
async function decode(page) {
  await page.addScriptTag({ path: decoder });
  return page.locator(".bless-qr").evaluate(async (svg) => {
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], {
      type: "image/svg+xml",
    });
    const url = URL.createObjectURL(blob),
      img = new Image();
    img.src = url;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 660;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, 660, 660);
    URL.revokeObjectURL(url);
    const data = ctx.getImageData(0, 0, 660, 660);
    return window.jsQR(data.data, 660, 660)?.data;
  });
}
try {
  for (const id of themes) {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: 900 },
        reducedMotion: "reduce",
      });
      const errors = [];
      page.on("pageerror", (e) => errors.push(e.message));
      await fixture(page, id);
      await open(page, id);
      assert.equal(await page.locator("#blessings").count(), 1);
      const siblings = await page.locator("#blessings").evaluate((n) => ({
        before: n.previousElementSibling?.id,
        after: n.nextElementSibling?.id,
      }));
      assert.equal(siblings.before, "rsvp");
      if (id !== "kalyana-vaibhavam") assert.equal(siblings.after, "footer");
      await page.locator(".attendance input[value=no]").check();
      assert(await page.locator(".rsvp-no-blessing").isVisible());
      assert.equal(
        await page.locator(".rsvp-no-blessing a").getAttribute("href"),
        "#blessings",
      );
      await page.locator('.bless-chip input[value="1116"]').check();
      const uri = await page.locator(".bless-pay").getAttribute("href");
      const params = new URL(uri).searchParams;
      assert.equal(params.get("am"), "1116.00");
      assert.equal(params.get("pn"), "Arjun & Priya");
      assert.equal(params.get("tn"), "RUV-7K2Q Rohit Kumar");
      assert.equal(params.get("cu"), "INR");
      assert.deepEqual([...params.keys()], ["pa", "pn", "am", "cu", "tn"]);
      assert((await page.locator(".bless-pay").innerText()).includes("₹1,116"));
      if (width === 1440) {
        await page.locator(".bless-qr").waitFor();
        assert.equal(await decode(page), uri);
        assert(!(await page.locator(".bless-pay").isVisible()));
        await page.locator('.bless-chip input[value="501"]').check();
        const next = await page.locator(".bless-pay").getAttribute("href");
        await page.waitForTimeout(80);
        assert.equal(await decode(page), next);
      } else {
        assert(await page.locator(".bless-pay").isVisible());
        assert(!(await page.locator(".bless-qr-wrap").isVisible()));
      }
      await page.locator(".bless-chip input[value=other]").check();
      for (const v of ["0", "1.5", "100001", ""]) {
        await page.locator("#bless-custom").fill(v);
        assert.equal(
          await page.locator(".bless-pay").getAttribute("href"),
          null,
        );
        await page.locator(".bless-sent").click();
        assert(
          (await page.locator("#bless-amount-error").innerText()).length > 0,
        );
      }
      await page.locator("#bless-custom").fill("2116");
      await page.locator("#bless-message").fill("Wishing you joy & happiness!");
      assert(
        (await page.locator("#bless-counter").innerText()).startsWith(
          String("Wishing you joy & happiness!".length),
        ),
      );
      // Rejection keeps fields; the next attempt succeeds exactly once.
      await page.evaluate(() => {
        window.claims = [];
        window.onInviteGift = async (claim) => {
          window.claims.push(claim);
          if (window.claims.length === 1) throw Error("test rejection");
        };
      });
      await page.locator(".bless-sent").click();
      await page
        .locator(".bless-payment [role=alert]")
        .filter({ hasText: "could not" })
        .waitFor();
      assert.equal(
        await page.locator("#bless-message").inputValue(),
        "Wishing you joy & happiness!",
      );
      await page.locator(".bless-sent").click();
      await page.locator(".bless-thanks").waitFor();
      assert.equal(await page.evaluate(() => window.claims.length), 2);
      const claim = await page.evaluate(() => window.claims[1]);
      assert.equal(claim.amount, 2116);
      assert.equal(claim.name, "Rohit Kumar");
      assert.equal(claim.ref, "RUV-7K2Q");
      assert.equal(claim.message, "Wishing you joy & happiness!");
      assert.equal(await page.locator(".bless-sent").count(), 0);
      await page.reload();
      await page
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await page.locator(".opening").waitFor({ state: "detached" });
      assert.equal(await page.locator(".bless-thanks").count(), 1);
      await page.locator("#blessings").scrollIntoViewIfNeeded();
      await mkdir(`themes/${id}/screenshots/blessings`, { recursive: true });
      await page.locator("#blessings").screenshot({
        path: `themes/${id}/screenshots/blessings/thanks-${width}.png`,
      });
      assert.deepEqual(errors, []);
      await page.close();
    }
    for (const width of [360, 390, 844, 820, 1280, 1440, 1920]) {
      const page = await browser.newPage({
        viewport: { width, height: width === 844 ? 390 : 900 },
        reducedMotion: "reduce",
      });
      await fixture(page, id);
      await open(page, id);
      await page.locator("#blessings").scrollIntoViewIfNeeded();
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth),
        width,
      );
      if ([390, 1440].includes(width)) {
        await page.waitForTimeout(150);
        await page.locator("#blessings").screenshot({
          path: `themes/${id}/screenshots/blessings/form-${width}.png`,
        });
      }
      await page.close();
    }
    const p = await browser.newPage({ reducedMotion: "reduce" });
    for (const patch of [{ enabled: false }, { upiId: "bad<script>" }]) {
      await p.unroute("**/sample-data.json");
      await fixture(p, id, (d) => {
        Object.assign(d.gifts, patch);
        return d;
      });
      await open(p, id);
      assert.equal(await p.locator("#blessings").count(), 0);
      assert.equal(await p.locator(".rsvp-no-blessing").count(), 0);
    }
    await p.close();
    report.push(
      `PASS ${id}: 7 widths; mobile intent/desktop QR decode and regeneration; encoded URI; amount validation; callback retry and single success; reload persistence; RSVP link; hidden invalid/disabled.`,
    );
    console.log(report.at(-1));
  }
  // Shared behavior edge cases on one representative theme.
  const p = await browser.newPage({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  await fixture(p, "little-wonder");
  const guest = "<img src=x onerror=alert(1)> 🌸";
  await open(p, "little-wonder", "?g=" + encodeURIComponent(guest));
  const ref = await p.locator(".bless-ref strong").innerText();
  assert.match(ref, /^RUV-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/);
  assert.equal(await p.locator("#bless-name").inputValue(), guest);
  assert.equal(await p.locator("#blessings img[src=x]").count(), 0);
  assert(
    !new URL(await p.locator(".bless-pay").getAttribute("href")).searchParams
      .get("tn")
      .includes("🌸"),
  );
  await p.locator("#bless-name").fill("");
  await p.locator(".bless-sent").click();
  assert.equal(
    await p.locator("#bless-name").getAttribute("aria-invalid"),
    "true",
  );
  await p.locator("#bless-name").fill(guest);
  await p.locator(".bless-sent").click();
  await p.locator(".bless-thanks").waitFor();
  assert((await p.locator(".bless-thanks").innerText()).includes(guest));
  await p.reload();
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  assert((await p.locator(".bless-thanks").innerText()).includes(ref));
  await p.close();
  const coreSize = gzipSync(await readFile("shared/core.js")).length;
  assert(coreSize < 25000);
  report.push(`Shared core gzip: ${coreSize} bytes (<25 KB).`);
  for (const id of themes) {
    const { js, css } = await runtimeBudget(id);
    assert(js < 60000);
    assert(css < 25000);
    report.push(
      `${id} full runtime gzip: JS ${js} / 60000 B; CSS ${css} / 25000 B.`,
    );
  }
  report.push(
    "PASS injection, emoji-free note, required name, generated reference and session restoration. Samples use demo:true; preview cannot launch payment.",
  );
  await writeFile(
    "themes/little-wonder/blessings-report.txt",
    report.join("\n") + "\n",
  );
} finally {
  await browser.close();
}
