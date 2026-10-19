import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const b = await chromium.launch();
for (const width of [390, 1440]) {
  const p = await b.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
  });
  await p.goto("http://127.0.0.1:4178/");
  await p.waitForTimeout(900);
  const dir = `themes/varnika/screenshots/${width === 390 ? "phone" : "desktop"}`;
  await mkdir(dir, { recursive: true });
  await p.screenshot({ path: dir + "/00-opening.png" });
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.waitForTimeout(1000);
  await p.screenshot({ path: dir + "/section-hero.png" });
  for (const s of await p.locator("section").all()) {
    await s.scrollIntoViewIfNeeded();
    await p.waitForTimeout(950);
    await s.screenshot({
      path: dir + "/section-" + (await s.getAttribute("id")) + ".png",
    });
  }
  await p.close();
}
await b.close();
