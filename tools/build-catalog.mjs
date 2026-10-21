import { readdir, readFile, writeFile, access } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
export const root = fileURLToPath(new URL("../", import.meta.url));
const exists = async (file) =>
  access(path.join(root, file)).then(
    () => true,
    () => false,
  );
export async function buildCatalog() {
  const details = JSON.parse(
    await readFile(path.join(root, "gallery/theme-details.json"), "utf8"),
  );
  const entries = await readdir(path.join(root, "themes"), {
    withFileTypes: true,
  });
  const catalog = [];
  for (const entry of entries) {
    const id = entry.name;
    if (
      !entry.isDirectory() ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) ||
      !(await exists(`themes/${id}/index.html`))
    )
      continue;
    const info = details[id] || {};
    const preview = async (size) => {
      const candidates = [
        `gallery/assets/${id}-${size}.webp`,
        `themes/${id}/screenshots/${size}/preview.webp`,
        `themes/${id}/screenshots/${size}/section-hero.png`,
        `themes/${id}/screenshots/${size}/00-opening.png`,
      ];
      for (const file of candidates) if (await exists(file)) return file;
      return "";
    };
    catalog.push({
      id,
      title:
        info.title ||
        id
          .split("-")
          .map((word) => word[0].toUpperCase() + word.slice(1))
          .join(" "),
      category: info.category || "Other",
      tier: info.tier === "premium" ? "premium" : "basic",
      description: info.description || "",
      detail: info.detail || "",
      palette: info.palette || [],
      stage: info.stage || "#e5e6df",
      desktop: await preview("desktop"),
      phone: await preview("phone"),
    });
  }
  const order = Object.keys(details);
  catalog.sort((a, b) => {
    const rank = (id) =>
      order.includes(id) ? order.indexOf(id) : order.length;
    return rank(a.id) - rank(b.id) || a.title.localeCompare(b.title);
  });
  await writeFile(
    path.join(root, "gallery/themes.json"),
    JSON.stringify(catalog, null, 2) + "\n",
  );
  return catalog;
}
if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
)
  console.log(`Catalog updated: ${(await buildCatalog()).length} themes.`);
