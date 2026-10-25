import { chromium } from "playwright";
const browser = await chromium.launch();
const base = "http://127.0.0.1:4179/";
for (const width of [390, 1440]) {
  const page = await browser.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
  });
  await page.goto(base + "?g=Rohit%20Kumar");
  await page.waitForTimeout(1000);
  await page.screenshot({
    path: `themes/sannidhi/screenshots/${width === 390 ? "phone" : "desktop"}/00-opening.png`,
  });
  await page
    .getByRole("button", { name: "Open Invitation", exact: true })
    .click();
  await page.locator(".opening").waitFor({ state: "detached" });
  await page.evaluate(
    () => (document.documentElement.style.scrollBehavior = "auto"),
  );
  for (const item of await page
    .locator(".person,.event-card:visible,.story-page")
    .all()) {
    await item.scrollIntoViewIfNeeded();
    await page.waitForTimeout(100);
  }
  for (const section of await page.locator("section").all()) {
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(950);
    await section.screenshot({
      path: `themes/sannidhi/screenshots/${width === 390 ? "phone" : "desktop"}/section-${await section.getAttribute("id")}.png`,
    });
  }
  for (const data of ["empty", "birthday", "telugu"]) {
    await page.goto(base + "?data=" + data);
    await page
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await page.locator(".opening").waitFor({ state: "detached" });
    await page.waitForTimeout(850);
    await page.locator("#hero").screenshot({
      path: `themes/sannidhi/screenshots/${width === 390 ? "phone" : "desktop"}/hero-${data}.png`,
    });
    if (data === "telugu") {
      await page.locator("#couple").scrollIntoViewIfNeeded();
      await page.waitForTimeout(950);
      await page.locator("#couple").screenshot({
        path: `themes/sannidhi/screenshots/${width === 390 ? "phone" : "desktop"}/telugu-couple.png`,
      });
    }
  }
  await page.close();
}
await browser.close();
