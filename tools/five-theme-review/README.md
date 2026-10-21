# Five-theme continuity review

Scope: Temple Dawn, Floral Elegant, Ocean Serene, Varnika and Sannidhi. Storybook Garden and Kalyana Vaibhavam are unchanged.

- Required `node tools/shoot.mjs <id>` passed for each theme; reports are in each theme folder.
- `node tools/check-five-continuity.mjs` checks phone/tablet/desktop, moving-part geometry, native touch swipes, optional/long/Indic data, full closing images and code budgets. An optional list of theme ids limits a rerun.
- `node tools/check-five-actions.mjs` verifies music, ICS, gallery, deferred video and RSVP behavior.
- `RUVVA_SCROLL_REPORT=tools/five-scroll-motion-report.txt node tools/check-scroll-motion.mjs temple-dawn floral-elegant ocean-serene varnika sannidhi` checks the original scroll behavior.
- Per-theme continuity-budget.txt includes all runtime scripts/styles and all image assets, including SVG sources.

Phone live/closing contact sheet accompanies the individual phone, tablet and desktop section screenshots. Visual review covered changed sections and empty-data/long-name behavior. Physical-device FPS and OS background-tab behavior were not measured.

Local phone preview: the existing gallery server accepts an optional RUVVA_PREVIEW_HOST environment variable and PORT. Default binding stays localhost. Set the host to the Mac Wi-Fi address for an intentional same-network preview; its route allowlist stays in place. This is not public hosting.
