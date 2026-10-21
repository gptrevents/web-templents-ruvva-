import { chromium } from "playwright";
import assert from "node:assert/strict";
const b = await chromium.launch();
for (const [id, asset] of [
  ["temple-dawn", "courtyard-phone.webp"],
  ["ocean-serene", "shore-phone.webp"],
  ["sannidhi", "temple-phone.webp"],
]) {
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  let release;
  const gate = new Promise((r) => (release = r));
  let blocked = false;
  await p.route("**/" + asset, async (r) => {
    blocked = true;
    await gate;
    await r.continue();
  });
  await p.goto(`http://127.0.0.1:4175/themes/${id}/`, {
    waitUntil: "domcontentloaded",
  });
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.waitForTimeout(250);
  assert(blocked, id + " hero requested");
  assert.equal(await p.locator(".opening").getAttribute("aria-busy"), "true");
  assert.equal(
    await p
      .locator(".opening")
      .evaluate((n) => n.classList.contains("opening-away")),
    false,
  );
  release();
  await p.locator(".opening").waitFor({ state: "detached" });
  console.log(
    "PASS " + id + ": ceremony waits for delayed hero decode and paint",
  );
  await p.close();
}
await b.close();
