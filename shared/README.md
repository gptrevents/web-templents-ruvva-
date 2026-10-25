# Shared invitation runtime

`core.js` is the dependency-free ES module for DOM helpers, static SVG construction,
local/HTTPS validation, date/time formatting, calendar/ICS, countdown visibility and
updates, lightbox, RSVP validation/callback/confetti, music/share controls, hero readiness,
reveal observation, wheel easing, map URLs, deferred YouTube and sample loading.

Each `themes/<id>/app.js` owns its section builders, classes, artwork, English copy,
opening ceremony and scroll choreography. RSVP form markup uses the established field
classes and takes the theme ornament callback. Countdown takes a theme digit animation.
Motion observers accept a selector/activation callback. Gallery viewers receive theme icons.
The seven visual layouts were compared at 390 and 1440 with all existing section sizes and
text unchanged before adding Blessings. Evidence/check script: `tools/compare-core-layout.mjs`.

`blessings.js` implements the UPI gift-claim state machine. Its English defaults are spread
into every theme's `COPY.en`. `blessings.css` supplies responsive form layout only;
`themes/<id>/blessings.css` supplies each theme's materials. `core.js` itself has no imports.
The QR encoder is local and loaded only for a desktop payment QR; see `vendor/LICENSES.md`.

Serve the collection root over HTTP(S), including `/shared/`, `/themes/` and `/gallery/`.
Opening an HTML file directly or copying only a theme folder is no longer supported.
The old per-theme `invitation-ui.js/.css` copies remain for historical compatibility;
the current HTML loads shared CSS and imports the implementations from `core.js`.
Make behavior fixes in core, not those legacy copies. `tools/sync-invitation-ui.mjs` is
retained for older consumers and is not needed by the current themes.

## Gifts contract

`gifts`: `{enabled, upiId, payeeName, amounts, allowCustom, note, demo?}`.
Invalid or disabled gifts hide the section and the RSVP decline link.
The reference is a valid `?ref=` code, otherwise a crypto-generated `RUV-` + six letters/
digits, stable within the tab session. Allowed supplied codes: 1–64 ASCII letters, digits,
underscore or hyphen. Storage is scoped to the invitation path, UPI ID and reference.
Other amounts must be integers ₹1–₹1,00,000. The name is required; blessing ≤300 characters.

Mobile uses a normal `upi://pay` anchor; desktop uses a locally generated QR (M correction,
4-module white quiet zone). The amount, name and reference determine the URI. No payment
status is inferred from opening an app or submitting the claim.

`await window.onInviteGift({name, amount, message, ref, upiId, at})` records the guest's
claim only. Rejecting it preserves all fields for retry. A successful callback disables
further claims for that reference, with `{ref,amount,at}` saved in sessionStorage. Storage
failure does not turn a completed callback into a retry. With no callback, a 600ms local
demo is used. The thank-you explicitly leaves payment confirmation to the couple.

All shipped sample IDs are fictional and have `demo:true`: their payment anchor is
disabled and no payable QR is rendered. For integration, provide the couple's validated
UPI ID and omit `demo` or set it to false. The tests intercept sample data locally to test
live-mode URI/QR generation without opening a UPI app or sending money.

No backend, payment gateway, API keys, fee, verification claim or network submission.
Backend storage, confirmation, entitlement and translations belong to the application.

## Verification

`npm ci`; `npx playwright install chromium`; start `node tools/preview-gallery.mjs`.
Then run `node tools/check-blessings.mjs`, `node tools/check-invitation-fixes.mjs`,
`node tools/check-five-actions.mjs`, `node tools/check-scroll-motion.mjs`,
`node tools/check-opening-ready.mjs`, and `node tools/shoot.mjs <id>` for each theme.
`jsqr` is a dev-only independent QR decoder; it is never shipped to guests.
`tools/runtime-budget.mjs` follows the actual HTML/module graph including dynamic QR
imports; legacy unused scripts are excluded, shared code is included.
