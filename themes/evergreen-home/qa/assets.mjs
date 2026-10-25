import { runtimeBudget } from "../../../tools/runtime-budget.mjs";
import { chromium } from "playwright";
import { readdir, readFile, writeFile, stat } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
const root = "themes/evergreen-home";
const files = (await readdir(root + "/assets", { recursive: true })).filter(
  (f) => /\.(webp|png|jpg|svg)$/.test(f),
);
let common = 0,
  desktop = 0;
for (const f of files) {
  const n = (await stat(root + "/assets/" + f)).size;
  if (f.includes("-desktop")) desktop += n;
  else common += n;
}
assert(common <= 450000);
assert(desktop <= 400000);
const alpha = execFileSync(
  "python3",
  [
    "-c",
    "from PIL import Image; i=Image.open('themes/evergreen-home/assets/bough.webp'); assert i.mode=='RGBA' and i.getextrema()[-1][0]==0 and i.getextrema()[-1][1]>200; print('real RGBA with fully transparent pixels')",
  ],
  { encoding: "utf8" },
).trim();
const report = [
  `PASS common image bytes ${common}/450000; desktop-only ${desktop}/400000; foliage ${alpha}.`,
];
const b = await chromium.launch();
try {
  for (const width of [390, 1440]) {
    const p = await b.newPage({ viewport: { width, height: 900 } });
    const images = new Set();
    p.on("request", (r) => {
      if (
        r.resourceType() === "image" &&
        r.url().startsWith("http://127.0.0.1:4175")
      )
        images.add(new URL(r.url()).pathname);
    });
    await p.goto("http://127.0.0.1:4175/themes/evergreen-home/");
    await p
      .locator(".opening img")
      .evaluateAll((ns) => Promise.all(ns.map((n) => n.decode())));
    await p.waitForTimeout(200);
    let bytes = 0;
    for (const path of images) {
      bytes += (await stat("." + path)).size;
    }
    if (width < 1024) {
      assert(bytes <= 150000);
      assert(![...images].some((s) => s.includes("-desktop")));
    } else assert(![...images].some((s) => s.endsWith("/welcome.webp")));
    report.push(
      `PASS ${width} opening: ${bytes} local image bytes; correct portrait/landscape source. ${[...images].map((s) => s.split("/").at(-1)).join(", ")}`,
    );
    await p.close();
  }
} finally {
  await b.close();
}
const budget = await runtimeBudget("evergreen-home");
assert(budget.js <= 60000 && budget.css <= 25000);
report.push(
  `PASS final runtime gzip: JS ${budget.js}/60000; CSS ${budget.css}/25000.`,
);
await writeFile(root + "/asset-report.txt", report.join("\n") + "\n");
console.log(report.join("\n"));
