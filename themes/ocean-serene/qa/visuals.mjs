// Screenshots and automatic checks for one theme (brief section 10).
//
//   npm install            (once; installs Playwright)
//   npx playwright install chromium   (once)
//   node tools/shoot.mjs <theme-id>
//
// Writes themes/<id>/screenshots/{phone,desktop}/*.png and prints a report.
// Exits non-zero if an automatic check fails. Checks it cannot do (does it look good,
// is every checklist item present) are still yours.

import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFile, mkdir, stat } from 'node:fs/promises';
import { extname, join, normalize, resolve } from 'node:path';

const id = process.argv[2];
if (!id) { console.error('usage: node tools/shoot.mjs <theme-id>'); process.exit(2); }
const root = resolve('themes', id);
await stat(join(root, 'index.html')).catch(() => { console.error(`no themes/${id}/index.html`); process.exit(2); });

// ── a tiny static server rooted at the theme folder ──
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.mp3': 'audio/mpeg', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  const file = join(root, path.endsWith('/') ? path + 'index.html' : path);
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  try { res.writeHead(200, { 'Content-Type': TYPES[extname(file)] || 'application/octet-stream' }).end(await readFile(file)); }
  catch { res.writeHead(404).end(); }
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/index.html`;

const browser = await chromium.launch();
const failures = [];
const report = [];

const VIEWS = {
  phone: { width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 },
  desktop: { width: 1440, height: 900, deviceScaleFactor: 1 },
};
const WIDTHS = [[360, 740], [390, 844], [844, 390], [820, 1180], [1280, 800], [1440, 900], [1920, 1080]];

const open = async (page) => {
  const btn = page.getByRole('button', { name: /open invitation/i });
  if (await btn.count()) { await btn.first().click(); await page.waitForTimeout(2500); }
  else failures.push('no "Open Invitation" button found');
};

// Scroll through slowly so reveal-on-scroll effects fire, then back to the top.
const walk = async (page) => {
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  const vh = page.viewportSize().height;
  for (let y = 0; y < h; y += Math.round(vh * 0.6)) {
    await page.evaluate(v => window.scrollTo(0, v), y);
    await page.waitForTimeout(250);
  }
};

// 1–2. Screenshots at phone and desktop: opening, then each viewport-height step.
for (const [name, view] of Object.entries(VIEWS)) {
  const dir = join(root, 'screenshots', name);
  await mkdir(dir, { recursive: true });
  const ctx = await browser.newContext({ viewport: { width: view.width, height: view.height }, ...view });
  const page = await ctx.newPage();
  page.on('pageerror', e => failures.push(`${name}: page error: ${e.message}`));
  await page.goto(base + '?g=Rohit%20Kumar', { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: join(dir, '00-opening.png') });
  await open(page);
  await walk(page);
  const h = await page.evaluate(() => document.documentElement.scrollHeight);
  let i = 1;
  for (let y = 0; y < h && i < 40; y += Math.round(view.height * 0.85), i++) {
    await page.evaluate(v => window.scrollTo(0, v), y);
    await page.waitForTimeout(700);
    await page.screenshot({ path: join(dir, `${String(i).padStart(2, '0')}-y${y}.png`) });
  }
  report.push(`${name}: ${i} screenshots, page height ${h}px`);
  await ctx.close();
}

// 1. No horizontal overflow at any width.
for (const [w, h] of WIDTHS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'load' });
  await open(page);
  await walk(page);
  const sw = await page.evaluate(() => document.documentElement.scrollWidth);
  const ok = sw <= w;
  report.push(`width ${w}×${h}: scrollWidth ${sw} ${ok ? 'ok' : 'OVERFLOW'}`);
  if (!ok) failures.push(`horizontal overflow at ${w}px (scrollWidth ${sw})`);
  await ctx.close();
}

// 3–6. The other samples must render without errors.
for (const data of ['empty', 'birthday', 'telugu']) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', e => errs.push(e.message));
  await page.goto(`${base}?data=${data}`, { waitUntil: 'load' });
  await open(page);
  await walk(page);
  await page.screenshot({ path: join(root, 'screenshots', 'phone', `sample-${data}.png`), fullPage: true });
  report.push(`sample ${data}: ${errs.length ? 'ERRORS ' + errs.join('; ') : 'ok'}`);
  if (errs.length) failures.push(`sample ${data}: ${errs[0]}`);
  await ctx.close();
}

// 7. Guest name injection must stay text.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  let fired = false;
  page.on('dialog', d => { fired = true; d.dismiss(); });
  await page.goto(base + '?g=' + encodeURIComponent('<img src=x onerror=alert(1)>'), { waitUntil: 'load' });
  await page.waitForTimeout(1500);
  const injected = await page.evaluate(() => !!document.querySelector('img[src="x"]'));
  const ok = !fired && !injected;
  report.push(`guest-name injection: ${ok ? 'ok (shown as text)' : 'FAILED'}`);
  if (!ok) failures.push('guest name from ?g= was parsed as HTML');
  await ctx.close();
}

// 8. Reduced motion keeps content visible.
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'load' });
  await open(page);
  await walk(page);
  await page.screenshot({ path: join(root, 'screenshots', 'phone', 'reduced-motion.png'), fullPage: true });
  report.push('reduced motion: screenshot saved (check it by eye)');
  await ctx.close();
}

await browser.close();
server.close();

console.log('\n' + report.join('\n'));
if (failures.length) { console.log('\nFAILED:\n- ' + failures.join('\n- ')); process.exit(1); }
console.log('\nAutomatic checks passed. Now do the manual checks in brief section 10.');
