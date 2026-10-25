// Stable, local-only layout evidence before and after the behavior migration.
import { chromium } from "playwright";
import { mkdir, writeFile, readFile } from "node:fs/promises";
const phase = process.argv[2] || "after";
const browser = await chromium.launch();
const results = {};
try {
  for (const id of [
    "temple-dawn",
    "floral-elegant",
    "storybook-garden",
    "ocean-serene",
    "varnika",
    "sannidhi",
    "kalyana-vaibhavam",
  ]) {
    for (const width of [390, 1440]) {
      const page = await browser.newPage({
        viewport: { width, height: width === 390 ? 844 : 900 },
        reducedMotion: "reduce",
      });
      await page.route("**/*", (route) =>
        new URL(route.request().url()).hostname === "127.0.0.1"
          ? route.continue()
          : route.abort(),
      );
      await page.goto(`http://127.0.0.1:4175/themes/${id}/?g=Rohit`);
      await page
        .getByRole("button", { name: "Open Invitation", exact: true })
        .click();
      await page.locator(".opening").waitFor({ state: "detached" });
      await page.evaluate(async () => {
        for (const i of document.images) {
          i.loading = "eager";
          await i.decode().catch(() => {});
        }
        document
          .querySelectorAll(".reveal")
          .forEach((n) => n.classList.add("seen"));
      });
      await page.waitForTimeout(250);
      const key = id + "-" + width;
      results[key] = await page
        .locator(".section")
        .evaluateAll((nodes) =>
          nodes
            .filter((n) => n.id !== "blessings")
            .map((n) => ({
              id: n.id,
              width: Math.round(n.getBoundingClientRect().width),
              height: Math.round(n.getBoundingClientRect().height),
              text: n.innerText.replace(/\d+/g, "#"),
            })),
        );
      await mkdir(`/tmp/ruvva-core-${phase}`, { recursive: true });
      await page.screenshot({
        path: `/tmp/ruvva-core-${phase}/${key}.png`,
        fullPage: true,
      });
      await page.close();
    }
    console.log(phase, id);
  }
  await writeFile(
    `/tmp/ruvva-core-${phase}/layout.json`,
    JSON.stringify(results, null, 2),
  );
  if (phase === "after") {
    const before = JSON.parse(
      await readFile("/tmp/ruvva-core-before/layout.json", "utf8"),
    );
    const failures = Object.keys(results).filter(
      (k) => JSON.stringify(results[k]) !== JSON.stringify(before[k]),
    );
    if (failures.length) throw Error("Layout changed: " + failures.join(", "));
    console.log(
      "PASS: all existing section dimensions and text unchanged at 390 and 1440.",
    );
  }
} finally {
  await browser.close();
}
