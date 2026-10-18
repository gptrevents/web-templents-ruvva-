# Temple Dawn

## Step 1 — Art direction
A dawn ceremony in a South Indian temple, with carved sandalwood doors opening into a sunlit courtyard.

| Axis | Choice |
|---|---|
| Palette | Sunrise warm: ivory #fff9ed, sandstone #ead8b7, saffron #b85122, brass #88652b, ink #423c2f |
| Type | Fraunces soft serif + DM Sans; serif ampersand |
| Opening | Two carved temple doors swing open |
| Shapes | Pillar frames and stepped temple arches |
| Ornament | Bells, rising sun and lotus |
| Hero | Asymmetric names beside a hand-drawn temple courtyard |
| Couple | Two arched portrait niches |
| Countdown | Four pedestal lamps with luminous numbers |
| Events | Paired ceremony bays along a central temple-pillar spine; paired rows on desktop |
| Gallery | One large photograph with thumbnail contact sheet |
| Motion | Slow and sacred |
| Texture | Sandstone stipple using CSS |
| Desktop | Architectural split stage, broad courtyard sections |

Font families are CSS variables; names never use a Latin script font. All interface copy is English. Responsive SVG art needs no raster background downloads.

Comparison: Royal Maroon shares only axis 11 (slow/sacred). Rose Mandap shares no axes. There were no existing theme folders other than .gitkeep. Mandatory differences on palette, opening, shapes, events and gallery are satisfied. The seed's left-hand vertical timeline was improved to a paired ceremony-bay layout to avoid Royal Maroon's skeleton.

## Step 2 — Design review
Approved against all 13 axes. No maroon, velvet curtains, celebrity photographs, reference code or reference music. Phone uses a compact temple arch above names; tablet has a wider architectural stage; desktop puts temple art beside large left-aligned names.

## Step 3 — Asset maker
Temple, door carving, lamps, event icons and ornaments are original inline SVG, drawn for this theme (project-owned). Sample WebP silhouettes and six abstract images are copied unchanged from shared/sample-assets; repository-provided placeholders, no real people. Music is the repository's generated 24-second drone. Fonts: Fraunces and DM Sans via Google Fonts, SIL Open Font License. No generated bitmap assets, no alpha-channel ambiguity, no raster background switching required.

## Step 4 — Builder
Completed.

Builder result: plain HTML/CSS/JS with all thirteen section builders. Data enters only through textContent/attributes; local asset paths and HTTPS destinations are validated. India timezone is explicit for event dates and calendar timestamps. External YouTube frame is deferred until a tap. SVG is static original artwork. RSVP is a local demo unless the integrator supplies window.onInviteRsvp.

## Step 5 — Build review
Automated checks and visual review completed as recorded below.

### Review evidence and judgements
- `node tools/shoot.mjs temple-dawn`: all required widths, empty/birthday/Telugu variants and injection check passed; complete output is in `shoot-report.txt`.
- Additional interaction assertions: `qa/interactions.mjs` and `qa/edge-cases.mjs`, with results in `verification.txt`. Run from repository root while a static server serves this theme at 127.0.0.1:4173. They use the repository Playwright dependency.
- Viewed phone and desktop section screenshots, opening screens, tablet and landscape renders. Wide layouts use side-by-side portraits, paired event bays, featured/contact-sheet gallery, map/details columns, horizontal live band and two-column RSVP fields.
- Visual review caught an orphan gallery thumbnail; corrected its desktop grid span. Section screenshots walk through events first so all once-only reveals are visible in the full-section capture.
- Telugu names use natural text (no background clipping) and extra line height. Virama visible in hero; no tracking applied to Indic content. Interface copy remains English as required.
- Keyboard traversal, lightbox Escape/arrows, focus restoration, visible focus outlines and form controls were exercised through Playwright keyboard input. Native dialog supplies focus trapping. Gallery touch swipe handler uses a 45px threshold.
- Same-day and past countdown states, 1/2/3/6/12 gallery sizes, eight events, long names, invalid URLs and all four faith variants checked.
- No raster backgrounds are used: scalable inline temple artwork adapts at CSS breakpoints, so portrait/landscape image-download switching is not applicable. No desktop-only image payload.
- Music starts only on the opening gesture, fades toward volume .25, and exposes manual playback control. Actual speaker output was not subjectively listened to; browser playback state was tested.
- Share uses the operating system share sheet when available; fallback is an encoded WhatsApp URL. No message was actually sent to another person during testing.
- Template demo uses the supplied silhouette/abstract images. These are intentionally placeholders, not claimed as real wedding photographs.
- RSVP intentionally has no backend; production persistence requires the documented `window.onInviteRsvp(payload)` integration. Callback rejection and success were tested.
- The event spine uses CSS height driven by scroll rather than an SVG stroke; it has the required growing path/glowing tip behavior. Desktop ceremony bays share the central spine rather than alternating cards.
- The supplied sample music path is a validated local asset; externally supplied media URLs are not fetched. External live/video links require HTTPS; YouTube is reconstructed from a validated 11-character ID.

### Asset budget (production files; screenshots excluded)
- app.js: 9,786 bytes gzip / 60,000-byte budget.
- style.css: 5,199 bytes gzip / 25,000-byte budget.
- All WebP images: 39,066 bytes raw (already below the 450 KB budget). First-screen raster image payload: 0. Two Google Font families. No runtime libraries.

### Section 6 — Completed parity checklist

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

#
## Step 6 — Delivery
Theme branch: `theme/temple-dawn`. User supplied repository: https://github.com/gptrevents/web-templents-ruvva-.git. It was empty, so an empty initial main commit was created; the implementation commit contains only this theme folder. Root brief, reference files and shared assets are left untouched and untracked in this newly initialized checkout.

Local preview: serve this directory with any static server; opening index.html via file:// is not supported because data is loaded with fetch. The development preview used `python3 -m http.server 4173 --bind 127.0.0.1 --directory themes/temple-dawn`.
