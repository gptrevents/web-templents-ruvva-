# Ruvva web-invitation themes — rules for every task

Before starting any task, read, in this order:
1. `WEB_INVITE_THEME_BRIEF.md` — the full brief. Sections 3, 4, 4A, 6 and 9 are hard rules.
2. `reference/arjun-priya/REFERENCE_SPEC.md` and every image in
   `reference/arjun-priya/screenshots/` — the base every theme is built on.
3. `reference/existing-themes.md` and every folder in `themes/` — what a new theme must
   not resemble.

## Rules

- One theme per task, in `themes/<theme-id>/`, on branch `theme/<theme-id>`. Change nothing
  outside that folder except, if needed, `tools/`.
- Start by copying the samples: `shared/sample-*.json` → `themes/<id>/`,
  `shared/sample-assets/*` → `themes/<id>/assets/sample/`.
- Plain HTML + CSS + vanilla JS. The only library allowed is GSAP + ScrollTrigger, saved in
  `themes/<id>/vendor/`. No React, Tailwind, jQuery, AOS, GLightbox or CDNs.
- No backend, no API keys, no secrets. External requests allowed: Google Fonts CSS, the
  Google Maps embed, YouTube (only after a tap). Every image, icon and sound is in the
  theme folder.
- All content comes from the sample JSON (field names in brief section 5). Write data with
  `textContent` / `setAttribute` only — never `innerHTML` with data.
- Every item in brief section 6 must exist and work. Nothing may be left out.
- Three designed layouts — phone (390), tablet (820), desktop (1440) — brief section 4A.
  A phone column centred on a desktop screen is a failure.
- Indic-safe CSS — brief section 4: no letter-spacing on text that can be Indic; padding on
  gradient ("foil") text; larger labels for Indic.
- English copy only, all in `COPY.en`. No machine translation.
- Visibly different from every existing theme — brief section 7: at most 3 of the 13 axes
  shared with any one of them.
- Use the arjun-priya reference for structure, features, behaviour and polish only. Never
  reuse its code, photos (film actors), music (film song), wording, or its maroon + gold
  palette.
- Before finishing: run `node tools/shoot.mjs <theme-id>` until it passes, do the manual
  checks in brief section 10, write `themes/<id>/DESIGN.md` with every section-6 box
  ticked, commit the screenshots, and open a pull request.
- If something cannot be done, write it in `DESIGN.md`. Never claim a check passed
  without running it.
