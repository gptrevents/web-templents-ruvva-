import { chromium } from "playwright";
const b = await chromium.launch();
for (const width of [390, 1440]) {
  const p = await b.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
    reducedMotion: "reduce",
  });
  p.on("pageerror", (e) => console.log("ERROR", e.message));
  await p.goto("http://127.0.0.1:4175/themes/fairytale-bloom/?g=Rohit");
  await p
    .getByRole("button", { name: "Open Invitation", exact: true })
    .waitFor();
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `/tmp/fairytale-${width}-opening.png` });
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  for (const id of ["hero", "events", "venue", "rsvp", "footer"]) {
    await p.locator("#" + id).scrollIntoViewIfNeeded();
    await p.waitForTimeout(100);
    await p
      .locator("#" + id)
      .screenshot({ path: `/tmp/fairytale-${width}-${id}.png` });
  }
  console.log(
    width,
    await p.evaluate(() => ({
      width: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
    })),
  );
  await p.close();
}
await b.close();
