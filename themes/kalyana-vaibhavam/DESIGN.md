# Kalyana Vaibhavam — A celebration, richly adorned

## Step 1 — Art direction
An illuminated wedding scroll comes to life: three distinct Sita–Rama ceremony scenes, sculpted gold niches, botanical welcome/hero/closing canopies, detailed moving temple-town engravings and uninterrupted floral SVG margins, faithfully following the user's three supplied compositions.

This is a new template. Existing designs remain intact. Shared samples and sample assets were copied first. The mockups guide the artwork density, color, scale and section composition; no celebrity photographs are shipped. Names, dates, addresses, controls and forms stay live HTML. New fictional photographs and decorative illustrations were generated with built-in imagegen; ASSETS.md saves every exact prompt and derivative source.

| Axis | Decision |
|---|---|
| 1 Palette | Luminous butter-gold #fff0c1, ruby #870d2b, engraved ochre #a86c16 and banana green #2b5b22, explicitly requested in the user's mockups. |
| 2 Type | Cormorant Infant italic/roman for live names/headings, Source Sans 3 for controls/body; Great Vibes only for fixed English decorative flourishes and ampersand. Indic names never use a Latin-only script. |
| 3 Opening | A gilded invitation panel pivots away in perspective, revealing the living wedding tableau; no doors, velvet, manuscript winding or lamp-light expansion. |
| 4 Shapes | Sculpted multifoil gold niches, carved temple frames and ornate rectangular picture borders, matching the mockups. |
| 5 Ornament | Banana/jasmine canopies at welcome, hero and closing only; continuous SVG lotus margins; temple etchings concentrated at middle-section margins and three distinct complete devotional paintings. |
| 6 Hero | Centered live inscription above an original panoramic hand-taking ceremony, with etched lotus seal, continuous margins and a quiet illuminated field. |
| 7 Couple | Two carved multifoil portrait niches, joined by a central gold lotus. |
| 8 Countdown | An edge-to-edge temple-tank sunrise fills a full-screen section; live clock and calendars sit in its quiet sky. Separate portrait/wide scenes respond to viewport aspect. |
| 9 Events | Alternating illustrated ritual vignettes on a sinuous flowering gold vine, with open text opposite; no repeated cards or central straight spine. |
| 10 Gallery | A framed five-tile photographic composition with a tall center and broad outer panels, adapting to all counts; full-screen viewer. |
| 11 Motion | Gilded panel turn with opening-only lamp sway, growing flowering vine, gentle scene depth and restrained photo drift; static SVG edges never restart between chapters. |
| 12 Texture | Warm illuminated parchment, carved metal highlights and painted devotional tableau. |
| 13 Desktop | Broad symmetrical ceremonial stage; paired niches, full-width scenic countdown, alternating large ritual illustrations and framed photographic composition. |

## Step 2 — Design review
The explicit new visual request intentionally revisits traditional gold framing and ruby accents. It takes precedence over the older brief's ban on the maroon/gold palette and the mandatory shape-axis exclusion. This exception is confined to the requested art direction; technical, data, accessibility, language and performance rules remain in force. No approval is needed for the user's own requested direction.

| Existing design | Shared/revisited axes | Distinct features |
|---|---|---|
| Royal Maroon | 1 ruby/gold family; 6 centered names; 11 ceremonial pace | Original rich tableaux, carved niche frames, pivot opening, illustrated vine events, framed photographic composition and designed desktop. |
| Temple Dawn | 4 temple frames; 5 traditional ornament; 7 paired niches; 11 sacred pace | Deliberate user-requested exception: painted illuminated celebration rather than photographic sandstone, new opening/countdown/vine/gallery. |
| Rose Mandap | 4 ornamental arch family; 5 lush ornament; 11 cinematic pacing | No velvet curtain, original devotional tableau, no blush page, new structure. |
| Floral Elegant | 5 flowers; 10 broad photographic collage family | Gold framed architectural composition rather than blush paper/masonry; new rituals and opening. |
| Storybook Garden | 5 vegetation; 9 broadly curving event path | Elaborate devotional/metalwork rather than cartoon wood/tickets. |
| Ocean Serene | 11 background depth | Entire visual and layout language differs. |
| Varnika | 5 Indian ornament; 12 painted medium | No miniature jade garden, disclosure ledger or book gallery. |
| Sannidhi | 5 temple/toran subject; 6 ceremonial inscription; 11 depth | Rich gold/banana tableau instead of sparse rice/terracotta scene; no lamp opening, folded calendar or fan. |

Approved with the recorded user-directed palette/shape/paired-niche exception. Do not falsely claim the older <=3-axis test passes against Temple Dawn. The supplied references contain script-style names; an italic book serif preserves elegance while honoring the Indic-safe name-font rule. Fixed English decorative headings may use Great Vibes.

## Step 3 — Asset maker
Delivered text-free portrait and landscape illuminated backgrounds, an original Sita–Rama wedding tableau isolated on alpha (shown for Hindu only), a transparent carved gold portrait frame, a three-ritual illustration atlas, and original fictional adult couple photographs. A neutral architectural base remains usable without religious figures for other faiths. No text or buttons will be embedded in a bitmap. Geometric icons, Ganesha line art, mandala and flowering timeline are authored SVG. New local synthesized music; no film recording.

Core scene, three tableaux, portrait frame and ritual atlas have been visually reviewed: intricate ornament matches the supplied direction, no baked text/buttons, respectful distinct devotional figures, and large empty portrait opening. All transparent outputs passed alpha checks after optimization, including the fully transparent portrait opening. Three consistent fictional couple photographs and individual crops are complete. ASSETS.md records provenance, export quality and font licences.

## Step 4 — Builder
Completed independent CSS and rewritten scene/section builders. Existing engine utilities for safe text insertion, dates/calendar, modal viewing, RSVP and native-document wheel easing are adapted locally; no old theme is imported at runtime. The new visual structure follows the supplied composition rather than re-skinning Sannidhi.


## Step 5 — Browser verification and visual review

Ran the required `node tools/shoot.mjs kalyana-vaibhavam` successfully; see `shoot-report.txt`. Additional Playwright scripts in `qa/` verify full RSVP callback/failure/demo behavior, tap-only video, viewer keyboard/touch/focus, calendars, four faith variants, same-day/past countdown, gallery counts 1/2/3/6/12, one/eight events, alternate data and widths through 2560px. Reports: `verification.txt`, `edge-cases-report.txt`, `names-report.txt`, `experience-report.txt`, `weight-report.txt`. `review-visuals.mjs` and `capture.mjs` saved alternate opening/hero/couple/footer and every section at phone/desktop sizes. Review-only fixture selectors were corrected to this template's actual hero date/faith containers before rerunning successfully.

Manual visual review completed for the 390px and 1440px section screenshots, 820px tablet, 844×390 landscape, Telugu opening/couple/footer, long names, birthday, empty data and reduced motion. Telugu virama and name bounds remain visible. Desktop uses a broad ceremonial stage, side-by-side niches, a four-column scenic countdown, alternating illustrated rituals, a three-column collage, a wide video surround, split map/details and paired form fields. Tablet has its own paired niches/four-digit arrangement and scaled reading widths. Landscape uses two independent art/copy regions so artwork does not cover the live names/button. Gallery photographs retain their complete natural aspect ratios.

Keyboard traversal and focus ring checks passed. The opening traps focus until it is removed; the viewer restores focus and handles Escape/arrows/swipe. Network checks at 390 and 1440 verified only the matching background and tableau before opening, and no incorrect background after opening. Scene movement, hidden/reduced petal pauses, visible-only countdown and exact 640px wheel distance were exercised. Fixed controls were checked clear of RSVP fields. There were no runtime page errors in these checks. This is Chromium verification; real-device Safari and Android hardware were not available.

## Runtime weight — current clarity-first revision

| Resource | Actual bytes | Limit bytes |
| --- | ---: | ---: |
| All stored image variants, including supplied fixtures | 8,391,127 | 450,000 |
| Desktop-only landscape image | 414,132 | 400,000 |
| First-screen phone images | 471,230 (standard-density phone picture source) | 150,000 |
| First-screen desktop images | 913,912 (native desktop painting) | 150,000 |
| app.js gzip | 19,484 | 60,000 |
| style.css gzip | 11,605 | 25,000 |

Three font families; no runtime library. Original synthesized audio is 192,620 bytes and starts only after opening. QA screenshots/previews are not runtime invitation images. The latest explicit user request for sharp complete artwork takes precedence over the original basic-theme image budget. The old 450,000-byte image and 150,000-byte first-screen limits are exceeded and are NOT claimed as passing. These values cover all stored variants, not a single guest request. Native/960/1440 picture sources and lazy loading reduce each guest's actual transfer. JS and CSS remain within their original limits. All SVG marks and dividers remain resolution-independent.

## Judgement calls and delivery limits

- The latest user-supplied direction explicitly takes precedence for the palette, carved arches and paired portrait niches; the DNA exception is documented above, not silently claimed as compliant.
- Additional live countdown, calendar, maps, live-stream and full RSVP features fill gaps in the visual mockups in the required section order. Wedding “journey” wording is decorative; the required event and gallery titles remain present.
- Hindu devotional artwork is omitted for Muslim, Christian and faith-none data, which use a neutral mandap ornament instead. No faith icon/line is shown in the blessing for faith none; decorative botanical ornaments are not faith marks.
- Portraits and photos are fictional sample content. Replace sample JSON/contact numbers/video/live URLs for a real invitation. No production reservation service is connected: RSVP uses `window.onInviteRsvp` when supplied and otherwise the required local demo success; the callback is where the host integrates persistence.
- Main data from the supplied shared fixtures is retained except the main sample names and original local photo/audio paths. Missing photos use safe Unicode monograms within the same carved frame.
- The optional story/wishes/gifts modules are not enabled by this concept; no backend, API key, paid CDN or external artwork is required.
- The retained local gallery registers this as the seventh template, in Premium. Existing six themes are unchanged. Minimal gallery metadata/catalog/preview verification updates implement the user's standing request to list every new template on Home.


## Earlier iteration — separate scenes and continuous borders (superseded)

The first iteration incorrectly reused one devotional composition for opening, hero and closing, and repeated a fresh botanical corner canopy at every section boundary. Both are corrected in this revision. Opening keeps the garland-exchange scene only once. Hero uses a newly generated panoramic hand-taking ceremony with royal attendants; footer uses a separately generated seated fire ritual. These are different source paintings, not repeated crops. Non-Hindu fixtures omit all three deity compositions.

A single `continuous-border` element now spans the whole invitation after opening, using one original `edge-vine.svg` on both outer margins. Section builders no longer insert banana corners, hanging strings, watermarks or restarting side borders. The opening canopy disappears with the opening panel. The hero/closing backgrounds use live vector seals and floor geometry without the opening background or toran. The content remains one naturally scrolling document.

Original SVG work replaces the flat CSS countdown bevel and basic video surround with engraved floral frames. The divider has a layered lotus and fine scrollwork; the event vine uses fine botanical sprays. Detailed painted ritual objects and portrait niche artwork stay intact. Simple vector bowls were evaluated and rejected as the main event imagery to avoid losing their painted detail. All ornament remains decorative and pointer-transparent; data and controls stay live.

That earlier iteration verified separate paintings, a single continuous margin and vector borders, but retained aggressively compressed artwork. Its opening-only canopy, alpha-quantized low-resolution exports and sub-450KB image budget were superseded by the latest request below. Current tests and source settings are recorded in clarity-report.txt, experience-report.txt and ASSETS.md.


## Current revision — full-screen countdown and visible temple artwork

The user's screenshots identified both true resampling blur and cropped-out attendants. The old 640–720px art was enlarged to 200–225% width. That implementation is removed. The complete original 2172×724 paintings are now exported at quality 90 without alpha quantization. Explicit picture sources provide 960px/1440px mobile exports according to pixel density and native paintings for tablet/desktop. Every ceremony image retains the exact full source aspect ratio with `object-fit: contain`, static positioning, 100% width, no crop and no scale. The main image is capped at 1080 CSS pixels on desktop so a 2× display has enough source detail. Gallery photographs are quality 90 and retain full natural ratios; individual portrait sources retain their native crop resolution. Old conflicting artwork layout rules were removed, not merely left to fight new overrides.

New botanical canopy art is present on the hero and closing, following the latest explicit request. It remains absent from intermediate section headers. A newly generated original copperplate-style temple-town engraving fills the complete background of every scrolling chapter except the scenic countdown, including hero and closing. Detailed gopurams, pillars, shrines, palms and tank steps replace the previous near-invisible SVG watermarks. Hero and closing retain the approved 30% artwork. Middle chapters now reserve a clear central reading area: the etching fades to zero between 30–70% of the section width and fades vertically at chapter boundaries. Maximum edge opacity is 16% for the couple, 12% for blessing/gallery, 9% for events/video/venue and 6% for live/RSVP. This keeps the original architecture present at the margins without competing with photos, ritual illustrations or form labels. Localized cream copy veils maintain legibility. No intermediate canopy is repeated. Their displacement follows the real scroll, is capped at 32px, updates only for visible sections, stops while hidden, and becomes static for reduced motion.

Countdown now uses a newly painted temple-tank sunrise as a decorative full-bleed section background. Its picture is a direct child of the section with absolute inset zero, rather than an inset 540/820px panel inside the content wrap. The section is at least 100svh. Portrait and landscape compositions follow viewport aspect; scenic background edges may crop with cover, while every devotional painting remains complete and uncropped. Live heading, digits and both calendars occupy the quiet sky; the 2×2 phone clock becomes a four-column tablet/desktop row. Landscape phones get 640px minimum section height to keep all content readable. Same-day and past states remain live. This supersedes both earlier countdown frames.

`qa/clarity.mjs` verifies complete ratios, image bounds, absence of image transforms, and source pixel density at 390px/2×, 390px/3×, tablet/2×, 970px/2× (the reported inset-card case), desktop/2× and landscape. It asserts the countdown artwork equals the full viewport width and full section height at every tested size. It also verifies both canopy locations, absence of intermediate canopies, responsive countdown sources, architectural parallax and reduced motion. `clarity-report.txt` records the selected pixel widths and rendered dimensions. At normal fixture sizes the hero fits 390×844, 820×1180, 1440×900 and 844×390.

Quality requires an explicit image-weight exception. The old basic-theme image budget caused the reported quality loss, so native artwork is retained instead of claiming compliance through another aggressive downscale. Current weight-report.txt gives exact bytes; no legacy image-budget pass is asserted. No new runtime library, remote asset or network service was introduced. The original asset prompts and all new prompts are preserved in ASSETS.md.

## Section 6 — Completed parity checklist

### 0. Global
- [x] Falling petals (or the theme's own falling motif: leaves, sparks, marigold, stars) — subtle, behind text, paused for reduced motion
- [x] Section dividers between sections (theme's own ornament)
- [x] Reveal-on-scroll for section content, once only (not every time the guest scrolls back)
- [x] Smooth scrolling feel
- [x] Page title = "Name1 & Name2"

### 1. Opening screen (full screen, shown first)
- [x] Theme ornament / motif (animated)
- [x] Small line "You are cordially invited"
- [x] Personal salutation: "Dear {guest}," from `ctx.guest`; "Dear Guest," when empty
- [x] Couple names (name1, ampersand, name2)
- [x] Button "Open Invitation"
- [x] Short tagline under the button (e.g. "Two families, one celebration")
- [x] Page scroll is **locked** until the button is pressed
- [x] Pressing it plays the theme's **opening ceremony** (section 7) and removes the screen from the DOM afterwards
- [x] Pressing it starts background music (a browser only allows audio after a tap)

### 2. Hero
- [x] Small top line: "॥ Shubh Vivah ॥" for a Hindu wedding, otherwise the occasion name
- [x] Names, large, with an animated treatment (shimmer, ink, glow — theme's choice)
- [x] Decorative divider
- [x] Main event date with weekday
- [x] City / venue hint
- [x] Frame or corner ornaments
- [x] Slow background motif animation
- [x] "Scroll" hint with a gentle bounce at the bottom

### 3. Blessing
- [x] Faith icon: hindu → lamp or Ganesha line-art; muslim → crescent; christian → cross; none → no icon
- [x] Faith line: hindu "Shree Ganeshaya Namaha", muslim "Bismillah ir-Rahman ir-Rahim", christian "In the name of the Lord", none → hidden
- [x] Blessing paragraph = `message`, or the default copy when empty
- [x] Ornament above and below

### 4. Couple
- [x] Groom card: photo frame, name, "Son of", parents
- [x] Bride card: photo frame, name, "Daughter of", parents
- [x] Ampersand / joining motif between the cards
- [x] When a photo is missing: a monogram (first letter) inside the same frame — never an empty box
- [x] Staggered entrance animation

### 5. Countdown
- [x] Title "Counting Down to Our Special Day"
- [x] Days, Hours, Minutes, Seconds — live, ticking every second
- [x] A digit animates only when it changes
- [x] Ticks only while visible on screen (saves battery)
- [x] On the day: shows "Today is the day"; after the event: hides the numbers and shows "Thank you for celebrating with us"
- [x] "Save the Date" label
- [x] Button "Google Calendar" (opens calendar.google.com/calendar/render with title, dates, location)
- [x] Button "Apple / Outlook" (generates and downloads an `.ics` file on the phone, RFC 5545 escaping)

### 6. Events timeline
- [x] Title "Wedding Events" (occasion-aware)
- [x] One card per event: icon, name, weekday + date, time ("onwards" style allowed), venue + address, "View on Maps" button
- [x] Each known event has its own colour: haldi yellow, mehendi green, sangeet pink, wedding = theme main colour, reception = theme accent
- [x] Icons for at least: haldi, mehendi, sangeet, engagement, wedding, reception, puja, housewarming, birthday, nikah (inline SVG you draw)
- [x] Connecting line that **draws itself** as the guest scrolls, with a soft glow at its tip
- [x] Each event marker **pops** when it reaches the screen
- [x] Works with 1 event and with 8

### 7. Gallery
- [x] Title "Our Journey Together"
- [x] Up to 12 photos (layout must look good with 1, 2, 3, 6 and 12)
- [x] Tap a photo → full-screen viewer: swipe/arrow to next and previous, close button, Esc closes, background scroll locked, counter "3 / 6"
- [x] Lazy-loaded images
- [x] Hidden when `gallery` is empty

### 8. Video
- [x] Title "A Special Glimpse"
- [x] Shows a poster with a play button first; the YouTube iframe is inserted only on tap (keeps the page light)
- [x] 16:9 frame, theme border
- [x] Hidden when `videoUrl` is empty or invalid

### 9. Venue
- [x] Title "Wedding Venue"
- [x] Venue name, full address
- [x] Google Maps embed (`https://maps.google.com/maps?q=<encoded>&z=15&output=embed`, lazy-loaded)
- [x] "Get Directions" button (google.com/maps/dir/?api=1&destination=…)
- [x] Tap-to-call buttons for `ph1` / `ph2` when present
- [x] Hidden when venue and address are both empty

### 10. Live stream
- [x] Title "Can't Make It? Watch Live!"
- [x] Subtitle "Join us virtually as we celebrate this beautiful moment"
- [x] "Watch Live" button opening `liveStream.url` in a new tab
- [x] Small note (default "The live stream will begin 30 minutes before the ceremony", or `liveStream.note`)
- [x] Icon
- [x] Hidden when there is no URL

### 11. RSVP
- [x] Title "Kindly Respond", subtitle "We would be honoured by your presence"
- [x] Attending choice: Yes / No / Maybe
- [x] Full Name (required), Phone Number (required, Indian format hint)
- [x] Number of Guests: select 1 … `rsvp.maxGuests` (hidden when "No")
- [x] Events Attending: one checkbox per event in `events` (only when `askEvents`)
- [x] Dietary Preference: No Preference, Vegetarian, Non-Vegetarian, Vegan, Jain (only when `askDiet`)
- [x] Message for the Couple (optional textarea)
- [x] "Send RSVP" button with a loading state
- [x] Inline validation messages next to the field, not `alert()`
- [x] **No network call.** On submit call `await window.onInviteRsvp(payload)` if it exists; otherwise wait 600 ms (demo). On success replace the form with "Thank You! We look forward to celebrating with you." and fire a short **confetti** burst in theme colours. On failure show a message and keep the form filled.
- [x] Hidden when `rsvp.enabled` is false

### 12. Footer
- [x] Names in the theme's display treatment
- [x] Date
- [x] Ornament
- [x] Small "Made with Ruvva" link to https://ruvva.com

### 13. Floating controls (fixed on screen after opening)
- [x] Music toggle (bottom-right): play/pause, pulsing ring while playing, `aria-pressed`
- [x] WhatsApp share button: opens `https://wa.me/?text=<encoded page URL>`; uses `navigator.share` when available
- [x] Neither covers text; both ≥ 44×44 px
- [x] No hamburger menu, no app logo at the top, no price tag


## Step 6 — Packaging and handoff

Self-contained HTML/CSS/vanilla JS, four sample fixtures, optimized artwork/audio, exact asset prompts, reproduction scripts, reports and committed screenshots. Run `node tools/preview-gallery.mjs` from the repository and open `/themes/kalyana-vaibhavam/`; the theme also serves independently from its directory. PR is stacked on `theme/sannidhi` so this review contains only this new template and its gallery registration. No existing PR was merged, and no public hosting deployment is implied.

## Artwork balance refinement — 20 October 2026

The user found the middle chapters visually crowded while approving the opening and closing. Only chapter-flow mural styling changed: horizontal and vertical masks keep artwork at the edges, with section-specific intensity according to content density. Opening, hero, closing, the full-screen countdown scene, all artwork source files, content layout and behavior are unchanged. The decorated edge, portrait niches, ritual vine and video frame remain. This is a CSS composition adjustment using existing assets; no new image generation or runtime dependencies.

Required shoot screenshots, per-section captures, and motion/interaction checks were rerun for this refinement. Actual browser inspection and phone/tablet/desktop visual comparisons confirm a quiet center and softened architectural margins.

## Scroll experience refinement — 20 October 2026

The user explicitly requested the refinement across all seven existing templates, overriding the usual one-theme scope for this update. The reference was inspected for behavior only: its root gains lenis/lenis-scrolling/lenis-smooth classes during scrolling, with independently moving scenery, portraits and headings. No reference code or assets were copied; no Lenis dependency was added.

Original vanilla JS now eases real-document wheel/trackpad scrolling over a 210ms response constant, preserves full fast-gesture distance and reverses direction immediately. Pointer/keyboard/focus, navigation, nested scrollers, opening and viewer locks remain native. Touch keeps browser inertia; scroll-driven motion also works on touch layouts. Theme-specific depths move whole portrait cards and ritual art; headings reveal with the scroll and gallery depth stays within tile gaps. Existing transforms, image crops, artwork, typography and layouts are retained. Only visible elements update after scroll/resize/intersection events, with no idle animation loop. Hidden tabs and reduced motion are respected.

Validation: required shoot passed. tools/check-scroll-motion.mjs verifies eased starts, exact 640px and 1800px gestures, reversal, scroll-linked depth, gallery lock/Escape, native keyboard End outside the gallery, reduced motion, touch behavior and 390/820/1440 widths. All seven results are in tools/scroll-motion-report.txt. Chromium automation and local in-app inspection were used; physical iOS/Android devices were unavailable. Latest gzip: JS 19484 bytes, CSS 11605 bytes, within 60KB/25KB limits. Earlier image-budget exceptions remain unchanged.


## Phase 1 — invitation bug fixes and tier metadata, 21 October 2026

The user approved fixes across all seven existing templates and basic/premium metadata. This collection-wide task intentionally extends the usual one-theme scope. Full shared-core migration, UPI Blessings and merging into main are deferred.

C1: floating music/share controls sit bottom-right (16px phone/tablet, 24px desktop, plus safe areas), with 48px hit targets and visible keyboard focus. When a heading, field or primary action intersects them, the dock fades to 30% and pointer events pass through to the content. Keyboard focus restores the controls. Footer padding leaves clearance at the end. Reveal, resize and font/layout changes recalculate collisions. This is the requested fade policy; it does not promise zero geometric intersection during scrolling.

All openings prepare and decode local hero imagery beneath the still-visible cover before starting their own ceremony. Content remains inert until the ceremony completes. Audio playback still starts directly from the user gesture. Small canonical UI sources live in shared/invitation-ui.js and .css; tools/sync-invitation-ui.mjs copies them into each theme, retaining standalone folder hosting. This is not the deferred full core refactor.

Included as the seventh theme, with premium metadata. Its existing ceremony artwork, middle-page mural intensity, image sizing and countdown design are unchanged.

Metadata: ruvva-theme and ruvva-tier are present in the HTML and gallery catalog. Temple Dawn, Floral Elegant, Storybook Garden and Ocean Serene are basic; Varnika, Sannidhi and Kalyana Vaibhavam are premium.

Validation: required tools/shoot.mjs checks and refreshed phone/desktop screenshots; tools/check-invitation-fixes.mjs covers 390/820/1440 controls, collision sweeps, keyboard access, local source synchronization, tiers, unmodified shared fixtures, long names and injection. The required shoot additionally checks 360, landscape 844x390, 1280 and 1920. tools/check-opening-ready.mjs deliberately delays the three affected hero images and verifies that the cover waits. tools/audit-invitation-fixes.mjs captures 200ms opening frames and name-word ranges at 390/1440; before/after review images live in tools/invitation-fixes-review/. Scroll and gallery regressions are checked by the existing tools.

Manual visual review used generated Chromium phone/desktop screenshots and the before/after contacts, including the Storybook sign, Varnika footer, opening wipes and Temple contrast. Physical iOS/Android devices were unavailable. An attempt to refresh an old in-app browser error tab was blocked by browser URL policy; it was not bypassed. Automated local Chromium screenshots were used for visual review. Existing section-6 functionality and original assets remain intact; the earlier image-weight exceptions remain unchanged. Combined app + helper gzip weights are reported in tools/invitation-fixes-report.txt (rather than omitting the helper).
