import { chromium } from "playwright";
import assert from "node:assert/strict";
const b = await chromium.launch();
try {
  for (const width of [390, 820, 1440]) {
    const p = await b.newPage({
        viewport: {
          width,
          height: width === 820 ? 1180 : width === 390 ? 844 : 900,
        },
        reducedMotion: "reduce",
      }),
      size = width === 390 ? "phone" : "desktop";
    for (const data of ["telugu", "birthday"]) {
      await p.goto("http://127.0.0.1:4180/?data=" + data);
      await p.waitForTimeout(400);
      await p.screenshot({
        path: `themes/kalyana-vaibhavam/screenshots/${size}/${data}-opening-${width}.png`,
      });
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await p.locator(".opening").waitFor({ state: "detached" });
      await p.waitForTimeout(600);
      if (data === "telugu") {
        await p.locator("#footer").scrollIntoViewIfNeeded();
        await p
          .locator("#footer")
          .screenshot({
            path: `themes/kalyana-vaibhavam/screenshots/${size}/telugu-footer-${width}.png`,
          });
      }
    }
    await p.route("**/sample-data.json", async (r) => {
      const z = await r.fetch(),
        d = await z.json();
      d.name1 = d.name2 = "Venkata Satya Sai Lakshmi Narasimha";
      await r.fulfill({ json: d });
    });
    await p.goto("http://127.0.0.1:4180/");
    await p.screenshot({
      path: `themes/kalyana-vaibhavam/screenshots/${size}/long-opening-${width}.png`,
    });
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    await p.waitForTimeout(600);
    await p
      .locator("#hero")
      .screenshot({
        path: `themes/kalyana-vaibhavam/screenshots/${size}/long-hero-${width}.png`,
      });
    const n = await p.locator("#hero .names").boundingBox(),
      f = await p.locator("#hero .hero-date").boundingBox();
    assert(n.y + n.height <= f.y);
    await p.close();
  }
  const p = await b.newPage({
    viewport: { width: 844, height: 390 },
    reducedMotion: "reduce",
  });
  await p.goto("http://127.0.0.1:4180/");
  await p.screenshot({
    path: "themes/kalyana-vaibhavam/screenshots/phone/landscape-opening.png",
  });
  const button = await p
    .getByRole("button", { name: "Open Invitation", exact: true })
    .boundingBox();
  assert(button.y >= 0 && button.y + button.height <= 390);
  await p.getByRole("button", { name: "Open Invitation", exact: true }).click();
  await p.locator(".opening").waitFor({ state: "detached" });
  await p.waitForTimeout(600);
  await p
    .locator("#hero")
    .screenshot({
      path: "themes/kalyana-vaibhavam/screenshots/phone/landscape-hero.png",
    });
  console.log(
    "Visual review fixtures saved: opening, long names, Telugu, birthday, tablet, landscape.",
  );
} finally {
  await b.close();
}
