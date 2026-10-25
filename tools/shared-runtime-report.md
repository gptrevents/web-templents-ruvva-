# Shared runtime + Blessings verification — 25 October 2026

Scope: Temple Dawn, Floral Elegant, Storybook Garden, Ocean Serene, Varnika,
Sannidhi and Kalyana Vaibhavam. The existing designs and artwork are preserved.

## Completed checks

- Core migration: 390/1440 before/after comparison of all pre-existing section dimensions
  and text passed for all seven. Comparison capture script: compare-core-layout.mjs.
- All seven `node tools/shoot.mjs <id>` runs passed: 360,390,844×390,820,1280,1440,1920;
  default/empty/birthday/Telugu, guest injection, reduced-motion captures. Screenshots saved
  in each theme. Telugu hero/name crops and new mobile/desktop Blessings forms were reviewed.
- check-invitation-fixes: all seven passed tier, shared-runtime code budget, layout,
  controls collision sweep, keyboard and data fixture checks.
- check-five-actions: Temple, Floral, Ocean, Varnika, Sannidhi passed music, ICS,
  lightbox/Escape, deferred video and RSVP validation/callback checks.
- check-scroll-motion: all seven passed easing/full distance/reversal, gallery lock,
  keyboard End, native touch layout and reduced motion. This script's old displayed
  per-app size figures are superseded by the full import-graph budgets below.
- check-natural-details: all seven, widths 360/390/412/820/1440 passed centering, no
  overflow, varied particles, restrained bird pairs, no JS errors, reduced-motion handling.
- check-opening-ready: Temple/Ocean/Sannidhi wait for delayed hero decode/paint.
- check-opening-frames: all seven at 390/1440, 13 captures at 200ms targets. Reviewed contact
  sheets and center-content checks. The Kalyana cover's opaque backing was the one new
  defect found: it now becomes transparent during the existing card pivot. Artwork,
  settled layout and motion timing are unchanged. Actual capture times are recorded.
- check-blessings: all seven, seven widths; independent jsQR decode exactly equals the
  payment URI, amount regeneration, Unicode/ampersand encoding, invalid custom amounts,
  invalid/disabled gifts, reference generation, required name, injection, callback rejection
  and retry, single success, session restoration and the optional RSVP No link passed.
- Gallery smoke: seven cards rendered; the LAN server served shared/core.js with HTTP 200.

## Budgets and practical limits

Core alone is about 8.3 KB gzip; full scripts including modules, decorators and the local
QR encoder are about 36–40 KB per theme (<60KB). Full styles about 13–20 KB (<25KB).
`runtime-budget.mjs` follows actual HTML and static/dynamic ES-module imports, accounting
for each separately cached response. See blessings-report.txt and per-theme
natural-details-budget.txt for exact current values.

No image asset was added or replaced. Sannidhi and Kalyana's documented existing image
budget overruns remain; this report does not claim those limits pass. Screenshots and
browser checks use Chromium, including touch emulation; no physical-device payment test
or bank/payment-confirmation test was performed.

All sample UPI IDs are fictional with demo:true; no payable sample QR or anchor.
Live-mode URI/QR checks use locally intercepted data and never launch a UPI app.
A successful onInviteGift records only a claim, not a verified transfer.
Backend persistence, confirmation, couple configuration, translations and entitlement
are application-side follow-up work expressly excluded by UPDATE_WEB_TEMPLATES.md.
