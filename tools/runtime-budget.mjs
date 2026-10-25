import { readFile } from "node:fs/promises";
import path from "node:path";
import { gzipSync } from "node:zlib";
// Follow the actual HTML/module graph, counting each separately cached resource once.
export async function runtimeBudget(id) {
  const folder = path.resolve("themes", id),
    html = await readFile(path.join(folder, "index.html"), "utf8");
  const jsFiles = new Set(),
    cssFiles = new Set();
  async function script(file) {
    if (jsFiles.has(file)) return;
    jsFiles.add(file);
    const source = await readFile(file, "utf8");
    for (const m of source.matchAll(
      /(?:from\s*|import\s*\(\s*|import\s*)["'](\.{1,2}\/[^"']+)["']/g,
    ))
      await script(path.resolve(path.dirname(file), m[1]));
  }
  for (const m of html.matchAll(/<script[^>]*src="([^"]+)"/g))
    await script(path.resolve(folder, m[1].split("?")[0]));
  for (const m of html.matchAll(
    /<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g,
  ))
    if (!/^https?:/.test(m[1])) cssFiles.add(path.resolve(folder, m[1]));
  const sum = async (files) =>
    (
      await Promise.all(
        [...files].map(async (f) => gzipSync(await readFile(f)).length),
      )
    ).reduce((a, b) => a + b, 0);
  return {
    js: await sum(jsFiles),
    css: await sum(cssFiles),
    jsFiles: [...jsFiles],
    cssFiles: [...cssFiles],
  };
}
