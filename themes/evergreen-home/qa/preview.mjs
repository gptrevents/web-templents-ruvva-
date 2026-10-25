import { chromium } from "playwright";
const b = await chromium.launch();
for (const [width, height] of [
  [390, 844],
  [820, 1180],
  [1440, 900],
]) {
  const p = await b.newPage({
    viewport: { width, height },
    reducedMotion: "reduce",
  });
  p.on("pageerror", (e) => console.log("ERROR", e.message));
  await p.goto("http://127.0.0.1:4175/themes/evergreen-home/");
  await p
    .getByRole("button", { name: "Open Invitation", exact: true })
    .waitFor();
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `/tmp/evergreen-${width}-opening.png` });
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
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
    await p.waitForTimeout(80);
    await p
      .locator("#" + id)
      .screenshot({ path: `/tmp/evergreen-${width}-${id}.png` });
  }
  console.log(
    width,
    await p.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth,
    })),
  );
  await p.close();
}
await b.close();
