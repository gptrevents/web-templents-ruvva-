# Ruvva invitation collection

The repository-root `index.html` is the shared home page. It links to the two independent invitation folders; existing invitation code and assets are unchanged.

## Preview

From the repository root:

```sh
node tools/preview-gallery.mjs
```

Open http://127.0.0.1:4175/ . Set `PORT=4176` if needed. This dependency-free local development server discovers themes whenever the catalog is requested. It serves the gallery and invitation files on the same origin, so preview links work without separate theme servers.

## Add a future theme

1. Build `themes/<theme-id>/index.html` and the rest of that invitation using the repository brief.
2. Optionally add an entry to `gallery/theme-details.json` with title, category, description, detail, palette and stage color. Unlisted folders get a readable title and an Other filter automatically.
3. Include `screenshots/desktop/section-hero.png` and `screenshots/phone/section-hero.png`. The generator also recognizes `00-opening.png`. Optional smaller WebP previews go in `gallery/assets/<id>-desktop.webp` and `<id>-phone.webp`; these take priority. A theme without screenshots still gets a working card with its title.
4. Refresh the local gallery. Before a static release, run `node tools/build-catalog.mjs` and commit the regenerated `gallery/themes.json` along with the new theme. No app.js or HTML edits are needed.

The generator ignores directories without index.html. All paths are relative, including when the project is served beneath a subdirectory. Production requires only static hosting of index.html, gallery/ and themes/; the preview server is not a production backend.

## Design and assets

Warm paper, forest ink and quiet green typography give the collection its own neutral identity. Each card stages actual desktop and phone screenshots of its invitation, rather than invented mockups. Previews are resized WebP derivatives of the existing theme screenshots. Their underlying generated imagery is documented in each theme's ASSETS.md. No new third-party media is used. Logo and line ornaments are authored SVG. Fonts: Google Fonts Manrope and DM Sans (open font licences).

Responsive composition: one column on phones, two columns on tablets, two broad landscape stages and a split introductory composition on desktop. Hover lifts the preview frames; native anchor scrolling is smooth; reduced motion disables transitions and smooth scrolling. Focus rings, a skip link, filter pressed states and live search announcements support keyboard and screen-reader use.

## Verification

`node tools/check-gallery.mjs` (requires the existing Playwright installation and a running preview server). See verification.txt and screenshots/ for results. Checks cover 320–2560px, landscape, loaded images, filters, keyboard activation, search/reset, actual invitation navigation and Back, reduced motion, browser errors and discovery of a temporary third theme. The fixture is removed afterwards.

Visual review: inspected the phone, tablet and desktop screenshots; adjusted the staged frames so their captions do not overlap. Existing themes have no tracked changes. The invitation-only section-6 checklist and `shoot.mjs <theme-id>` do not apply to this collection page, since this task adds no invitation theme. Existing theme verification remains in each theme folder.
