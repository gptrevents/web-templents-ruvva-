import { chromium } from "playwright";
const b = await chromium.launch();
for (const width of [390, 820, 1440]) {
  const p = await b.newPage({
    viewport: { width, height: width === 390 ? 844 : 900 },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4175/themes/little-wonder/?g=Rohit");
  await p
    .getByRole("button", { name: "Open Invitation", exact: true })
    .waitFor();
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: `/tmp/little-wonder-${width}-opening.png` });
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.screenshot({ path: `/tmp/little-wonder-${width}-hero.png` });
  console.log(
    width,
    await p.evaluate(() => ({
      sw: document.documentElement.scrollWidth,
      w: innerWidth,
      h: document.documentElement.scrollHeight,
    })),
  );
  await p.close();
}
await b.close();
