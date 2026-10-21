// Local development only. The shipped gallery is entirely static.
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { buildCatalog, root } from "./build-catalog.mjs";
const port = Number(process.env.PORT || 4175);
const host = process.env.RUVVA_PREVIEW_HOST || "127.0.0.1";
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".woff2": "font/woff2",
};
await buildCatalog();
const server = http.createServer(async (req, res) => {
  try {
    if (!["GET", "HEAD"].includes(req.method)) {
      res.writeHead(405);
      res.end();
      return;
    }
    let route = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (route === "/") route = "/index.html";
    if (
      route !== "/index.html" &&
      !route.startsWith("/gallery/") &&
      !route.startsWith("/themes/")
    )
      throw Error("Not found");
    if (
      route
        .split("/")
        .some((segment) => segment.startsWith(".") || segment === "..")
    )
      throw Error("Not found");
    let file = path.resolve(root, "." + route);
    if (!file.startsWith(root)) throw Error("Not found");
    if ((await stat(file)).isDirectory()) {
      if (!route.endsWith("/")) {
        res.writeHead(301, { Location: route + "/" });
        res.end();
        return;
      }
      file = path.join(file, "index.html");
    }
    // Refreshing the home page discovers newly created theme folders.
    if (route === "/gallery/themes.json") await buildCatalog();
    const body = await readFile(file);
    res.writeHead(200, {
      "Content-Type": mime[path.extname(file)] || "application/octet-stream",
      "Cache-Control": "no-cache",
    });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
  }
});
server.listen(port, host, () =>
  console.log(`Ruvva collection: http://${host}:${port}/`),
);
