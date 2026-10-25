import { runtimeBudget } from "./runtime-budget.mjs";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { gzipSync } from "node:zlib";
const ids = [
  "temple-dawn",
  "floral-elegant",
  "storybook-garden",
  "ocean-serene",
  "varnika",
  "sannidhi",
  "kalyana-vaibhavam",
];
for (const id of ids) {
  const base = `themes/${id}/`;
  let image = 0,
    desktop = 0;
  async function walk(path) {
    for (const e of await readdir(path, { withFileTypes: true })) {
      if (e.isDirectory()) {
        await walk(path + "/" + e.name);
      } else if (/\.(webp|png|jpg|svg)$/.test(e.name)) {
        const size = gzipSync(await readFile(path + "/" + e.name)).length;
        if (e.name.includes("desktop")) desktop += size;
        else image += size;
      }
    }
  }
  await walk(base + "assets");
  const { js: j, css: c } = await runtimeBudget(id);
  const text = `All runtime JS gzip: ${j} B / 60000\nAll runtime CSS gzip: ${c} B / 25000\nCommon image assets gzip: ${image} B / 450000\nSeparate desktop backgrounds gzip: ${desktop} B / 400000\n${image > 450000 ? "Image target exceeded; see DESIGN.md. Kalyana retains its pre-existing raster artwork unchanged." : "Common image target met."}\n`;
  await writeFile(base + "natural-details-budget.txt", text);
  console.log(id + " " + text.replaceAll("\n", "; "));
}
