import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const browser = await chromium.launch();
const report = [];
try {
  for (const width of [390, 820, 1440]) {
    const page = await browser.newPage({
      viewport: { width, height: width === 820 ? 1180 : 900 },
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("http://127.0.0.1:4176/");
    await page
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await page.locator(".opening").waitFor({ state: "detached" });
    const sections = await page
      .locator("#story,#countdown,#events,#video,#venue,#live,#rsvp")
      .evaluateAll((ns) => ns.map((n) => getComputedStyle(n).backgroundColor));
    assert(
      sections.every((c) => c === "rgba(0, 0, 0, 0)"),
      "one continuous paper behind sections",
    );
    assert.equal(
      await page.locator(".live-pavilion").getAttribute("href"),
      await page.locator("#live .button").getAttribute("href"),
    );
    assert.equal(
      await page.locator(".live-pavilion").getAttribute("target"),
      "_blank",
    );
    assert.equal(
      await page.locator(".live-pavilion img").getAttribute("alt"),
      "",
    );
    for (const id of ["live", "rsvp", "footer"]) {
      await page.locator("#" + id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(850);
      await page
        .locator("#" + id)
        .screenshot({
          path: `themes/storybook-garden/screenshots/${width === 390 ? "phone" : "desktop"}/refined-${id}-${width}.png`,
        });
    }
    const picture = await page
      .locator(".closing-photo")
      .evaluate((n) => ({
        natural: n.naturalWidth / n.naturalHeight,
        rendered: n.clientWidth / n.clientHeight,
        fit: getComputedStyle(n).objectFit,
        left: n.getBoundingClientRect().left,
        right: n.getBoundingClientRect().right,
      }));
    assert(
      Math.abs(picture.natural - picture.rendered) < 0.025,
      "complete closing photo at natural ratio",
    );
    assert.equal(picture.fit, "contain");
    assert(picture.left >= 0 && picture.right <= width);
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    assert.deepEqual(errors, []);
    report.push(
      `PASS ${width}: continuous paper, actionable pavilion, complete closing image, no overflow/errors; live/RSVP/footer screenshots saved.`,
    );
    await page.close();
  }
  await writeFile(
    "themes/storybook-garden/continuity-report.txt",
    report.join("\n") + "\n",
  );
  console.log(report.join("\n"));
} finally {
  await browser.close();
}
