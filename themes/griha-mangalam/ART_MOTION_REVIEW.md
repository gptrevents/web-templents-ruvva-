# Art and motion review — October 26, 2026

## Scope
The user explicitly asked to enrich both housewarming and both birthday themes in this task. Four folders are intentionally included; this overrides the usual one-theme task scope. No shared runtime or other theme was changed.

## Visual result
Traditional jasmine/marigold strands, mango leaves and brass lamps. The new margins belong to the individual scrolling chapters, rather than a faded fixed edge that disappears while a hero is partly on screen. Artwork stays behind live content and has no pointer events or accessible/focusable content. Existing opening and closing compositions remain intact. Top canopies are not repeated at every chapter boundary. Text, data and semantic controls remain unchanged.

Movement is visible on phones: image breeze, short once-only arrivals and scroll depth use transforms; birthday wings articulate independently, while warm side lights breathe in the housewarming themes. Lamp and garland echoes remain upright. Motion observers run only when scrolling/resizing or visibility changes; offscreen images pause and reduced-motion users get static complete artwork. No hover is required.

## Checks run
- `node tools/shoot.mjs griha-mangalam` — passed all seven required widths, empty/birthday/Telugu fixtures, untrusted guest text and reduced motion.
- `node tools/check-occasion-art.mjs` — passed at 390 and 1440: two image rails in countdown, schedule, venue and RSVP; computed rotation changes over time; scroll depth changes; offscreen pause; reduced motion; valid RSVP callback payload remains reachable; no page errors/overflow. Exact per-theme results are in art-motion-report.txt.
- `node themes/griha-mangalam/qa/assets.mjs` — passed; report below includes the shared runtime and the added art modules.
- Manually inspected the mobile schedule/RSVP compositions and desktop captures. Margins are kept clear of text and controls; natural image roots and lamp orientation were checked. Original layouts, gallery/calendar/RSVP implementations, music and data contracts are unchanged.

## Current budgets
```
PASS common image bytes 449634/450000; desktop-only 290146/400000; canopy real RGBA 0–255.
PASS 390 opening: 81410 local image bytes; correct portrait/landscape source. welcome.webp
PASS 1440 opening: 290146 local image bytes; correct portrait/landscape source. house-desktop.webp
PASS final runtime gzip: JS 36008/60000; CSS 11935/25000.
```

## Assets
The new original transparent side illustration was made with the built-in image_gen tool; source prompt/path and compressed runtime path are recorded in generation-prompts.json and ASSETS.md. Source bounds were cropped around visible content without changing the retained alpha.

New captures are in screenshots/art-motion/. Existing required shoot captures were refreshed. The preview server remains available for real phone review on the same Wi-Fi; automated phone checks emulate Chromium viewport/touch, rather than claiming a physical device test.
