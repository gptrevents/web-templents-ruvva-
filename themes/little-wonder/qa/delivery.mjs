import { chromium } from "playwright";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch();
const report = [];
try {
  const p = await b.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4175/");
  await p.locator(".theme-card").nth(9).waitFor();
  const catalog = await p.evaluate(() =>
    fetch("/gallery/themes.json").then((r) => r.json()),
  );
  const entry = catalog.find((t) => t.id === "little-wonder");
  assert.equal(entry.tier, "premium");
  assert.equal(entry.category, "Birthday");
  const old = JSON.parse(
    execFileSync("git", ["show", "HEAD:gallery/themes.json"], {
      encoding: "utf8",
    }),
  );
  assert.deepEqual(
    catalog.filter((t) => t.id !== "little-wonder"),
    old.filter((t) => t.id !== "little-wonder"),
  );
  await p.getByRole("button", { name: "Birthday", exact: true }).click();
  assert.equal(await p.locator(".theme-card").count(), 1);
  await p
    .getByRole("link", {
      name: "Open the Little Wonder invitation preview",
      exact: true,
    })
    .first()
    .click();
  await p.getByRole("button", { name: "Open Invitation", exact: true }).focus();
  await p.keyboard.press("Enter");
  await p.locator(".opening").waitFor({ state: "detached" });
  const seen = new Set();
  for (let i = 0; i < 115; i++) {
    await p.keyboard.press("Tab");
    const active = await p.evaluate(() => ({
      id: document.activeElement.id,
      name: document.activeElement.getAttribute("name"),
      cls: document.activeElement.className,
      outline: getComputedStyle(document.activeElement).outlineStyle,
    }));
    if (active.id || active.name) seen.add(active.id || active.name);
    if (active.id === "rsvp-name") assert.notEqual(active.outline, "none");
    if (
      seen.has("rsvp-name") &&
      seen.has("rsvp-phone") &&
      seen.has("rsvp-message")
    )
      break;
  }
  assert(
    seen.has("rsvp-name") && seen.has("rsvp-phone") && seen.has("rsvp-message"),
  );
  await p.locator(".photo").first().click();
  await p.locator("dialog").evaluate((n) => {
    for (const [type, x] of [
      ["touchstart", 300],
      ["touchend", 100],
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
  assert.equal(await p.locator(".viewer-counter").textContent(), "2 / 6");
  await p.keyboard.press("Escape");
  report.push(
    "PASS ten-entry home catalog, Birthday filter, premium metadata, nine existing entries unchanged, preview link, keyboard Tab through RSVP with focus ring and gallery touch-swipe handling.",
  );
  await p.close();
} finally {
  await b.close();
}
await writeFile(
  "themes/little-wonder/delivery-report.txt",
  report.join("\n") + "\n",
);
console.log(report.join("\n"));
