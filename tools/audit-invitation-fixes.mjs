import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const phase = process.argv[2] || "before";
const names = [
  "temple-dawn",
  "floral-elegant",
  "storybook-garden",
  "ocean-serene",
  "varnika",
  "sannidhi",
  "kalyana-vaibhavam",
];
const dir = "/tmp/ruvva-phase-one/" + phase;
await mkdir(dir, { recursive: true });
const b = await chromium.launch();
const report = [];
try {
  for (const id of names) {
    for (const width of [390, 1440]) {
      const height = width === 390 ? 844 : 900;
      const p = await b.newPage({ viewport: { width, height } });
      await p.goto("http://127.0.0.1:4175/themes/" + id + "/");
      await p.evaluate(() => document.fonts.ready);
      const openingWords = await p.locator(".opening .names").evaluate((n) => {
        const issues = [];
        const walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
        let t;
        while ((t = walker.nextNode())) {
          for (const m of t.textContent.matchAll(/[A-Za-z]+/g)) {
            const r = document.createRange();
            r.setStart(t, m.index);
            r.setEnd(t, m.index + m[0].length);
            const tops = [...r.getClientRects()].map((x) => Math.round(x.top));
            if (new Set(tops).size > 1) issues.push(m[0]);
          }
        }
        return issues;
      });
      const started = Date.now();
      await p
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      if (["temple-dawn", "ocean-serene", "sannidhi"].includes(id)) {
        for (let at = 200; at <= 2200; at += 200) {
          await p.waitForTimeout(Math.max(0, started + at - Date.now()));
          await p.screenshot({
            path: dir + "/" + id + "-" + width + "-" + at + ".png",
          });
        }
      }
      await p.locator(".opening").waitFor({ state: "detached" });
      await p.locator("#hero").scrollIntoViewIfNeeded();
      await p.waitForTimeout(350);
      const heroWords = await p.locator("#hero .names").evaluate((n) => {
        const issues = [];
        const walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
        let t;
        while ((t = walker.nextNode())) {
          for (const m of t.textContent.matchAll(/[A-Za-z]+/g)) {
            const r = document.createRange();
            r.setStart(t, m.index);
            r.setEnd(t, m.index + m[0].length);
            if (
              new Set([...r.getClientRects()].map((x) => Math.round(x.top)))
                .size > 1
            )
              issues.push(m[0]);
          }
        }
        return issues;
      });
      const floating = await p.locator(".floating").evaluate((n) => {
        const r = n.getBoundingClientRect(),
          s = getComputedStyle(n);
        return {
          top: r.top,
          bottom: r.bottom,
          height: r.height,
          opacity: s.opacity,
          position: s.position,
        };
      });
      await p.locator("#footer").scrollIntoViewIfNeeded();
      await p.waitForTimeout(350);
      const footer = await p.locator("#footer .names").evaluate((n) => {
        const walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT);
        let t;
        while ((t = walker.nextNode()) && !t.textContent.trim()) {}
        const r = document.createRange();
        r.setStart(t, 0);
        r.setEnd(t, 1);
        const first = r.getBoundingClientRect();
        return {
          x: first.x,
          right: n.getBoundingClientRect().right,
          text: n.textContent,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      if (["varnika", "storybook-garden"].includes(id)) {
        await p
          .locator("#footer")
          .screenshot({ path: dir + "/" + id + "-" + width + "-footer.png" });
        await p.locator("#hero").scrollIntoViewIfNeeded();
        await p.waitForTimeout(350);
        await p.screenshot({
          path: dir + "/" + id + "-" + width + "-hero.png",
        });
      }
      report.push({ id, width, openingWords, heroWords, floating, footer });
      await p.close();
    }
  }
  const data = JSON.parse(
    await readFile("themes/varnika/sample-data.json", "utf8"),
  );
  await writeFile(
    dir + "/report.json",
    JSON.stringify(
      {
        results: report,
        varnikaVenue: data.venue,
        varnikaVenuePhoto: data.photoSlots?.venue,
      },
      null,
      2,
    ),
  );
  console.log(
    report
      .map(
        (x) =>
          `${x.id} ${x.width}: floating top ${Math.round(x.floating.top)}, split words opening/hero ${JSON.stringify(x.openingWords)}/${JSON.stringify(x.heroWords)}, footer first x ${Math.round(x.footer.x)}`,
      )
      .join("\n"),
  );
} finally {
  await b.close();
}
