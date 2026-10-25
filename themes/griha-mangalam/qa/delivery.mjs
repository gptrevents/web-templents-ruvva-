import { chromium } from "playwright";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch();
try {
  const p = await b.newPage({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4175/");
  await p.locator(".theme-card").nth(11).waitFor();
  const catalog = await p.evaluate(() =>
      fetch("/gallery/themes.json").then((r) => r.json()),
    ),
    old = JSON.parse(
      execFileSync("git", ["show", "HEAD:gallery/themes.json"], {
        encoding: "utf8",
      }),
    );
  assert.deepEqual(
    catalog.filter((t) => t.id !== "griha-mangalam"),
    old,
  );
  const t = catalog.find((t) => t.id === "griha-mangalam");
  assert.equal(t.tier, "premium");
  assert.equal(t.category, "Housewarming");
  assert(t.desktop && t.phone);
  await p.getByRole("button", { name: "Housewarming", exact: true }).click();
  assert.equal(await p.locator(".theme-card").count(), 1);
  await p
    .getByRole("link", {
      name: "Open the Griha Mangalam invitation preview",
      exact: true,
    })
    .first()
    .click();
  await p.getByRole("button", { name: "Open Invitation", exact: true }).focus();
  await p.keyboard.press("Enter");
  await p.locator(".opening").waitFor({ state: "detached" });
  const seen = new Set();
  for (let i = 0; i < 90; i++) {
    await p.keyboard.press("Tab");
    const a = await p.evaluate(() => ({
      id: document.activeElement.id,
      outline: getComputedStyle(document.activeElement).outlineStyle,
    }));
    if (a.id) seen.add(a.id);
    if (a.id === "rsvp-name") assert.notEqual(a.outline, "none");
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
  const report =
    "PASS twelve-theme catalog, eleven existing entries unchanged, premium Housewarming filter/card/thumbnail/preview and keyboard Tab through RSVP with visible focus.\n";
  await writeFile("themes/griha-mangalam/delivery-report.txt", report);
  console.log(report);
} finally {
  await b.close();
}
