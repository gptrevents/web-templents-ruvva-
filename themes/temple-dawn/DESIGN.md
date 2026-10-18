# Temple Dawn — current edition

## Step 1 — Art direction
A dawn ceremony in a South Indian temple: carved wooden doors open into a warm stone courtyard, with ivory silk, jasmine and antique brass details.

User review guided the refinement from a flat architectural diagram to photographic depth, then from basic decorative marks to individually drawn SVG ornaments. The original Temple Dawn concept and door-opening ceremony are retained in the same theme folder.

| # | DNA axis | Current choice |
|---|---|---|
| 1 | Palette | Sunrise warm limestone, ivory, olive shadows and restrained saffron |
| 2 | Type | High-contrast Cormorant Garamond + DM Sans |
| 3 | Opening | Carved temple door leaves swing open |
| 4 | Shapes | Stepped temple arches and pillar frames |
| 5 | Ornament | Lotus, jasmine, leaves, bells and brass lamps |
| 6 | Hero | Names composed within a photographic architectural courtyard |
| 7 | Couple | Two arched portrait niches |
| 8 | Countdown | Four brass pedestal lamps with digits |
| 9 | Events | Paired ceremony bays along a central spine on desktop |
| 10 | Gallery | Featured photograph and thumbnail contact sheet |
| 11 | Motion | Slow and sacred |
| 12 | Texture | Photographic sandstone, wood grain and silk |
| 13 | Desktop | Full-width architectural stage and broad courtyard sections |

Palette: paper #f8f4e9; sand #e7ddc7; olive ink #363b2d; muted text #696b59; saffron #875234; brass #85734c; dark bands #343d30. Every font family is a variable. All interface copy stays English in COPY.en.

## Step 2 — Design review
Compared against Royal Maroon and Rose Mandap from reference/existing-themes.md. No other implemented theme folders existed when this theme was started. Royal Maroon shares axes 2 and 11 only; Rose Mandap shares no axes. Both comparisons remain under the 3-axis limit, and palette/opening/shapes/events/gallery differ from both. The user-requested work updates the existing theme rather than adding another.

## Step 3 — Asset maker
Built-in imagegen produced original architectural backgrounds, a fictional adult couple and a ritual still life. Exact prompts, derivatives and attribution are in ASSETS.md. Portrait/landscape backgrounds are distinct files. All production media is local; source PNGs remain outside the repository. Generated people are sample imagery, not an actual wedding.

Original static SVG code supplies layered lotus petals, veined botanical sprigs with jasmine blossoms, brass pedestal lamps with an inner flame, carved bells, ten occasion icons, floating petals and music/share controls. Each is drawn with currentColor strokes and translucent fills; decorative SVG is aria-hidden and nonfocusable. No external SVG library or icon font. Fonts have SIL Open Font Licences. Repository-provided sample drone and alternate-sample placeholders are retained.

## Step 4 — Builder
Plain HTML, CSS and vanilla JavaScript. All thirteen builders follow the sample JSON contract; text and attributes receive data safely. Opening locks scroll and focus, reveals the page and starts music. Countdown uses India timezone and runs only while visible. Calendar export escapes and folds ICS lines. Native dialog handles the gallery focus trap, with keyboard and swipe controls. YouTube loads only after a tap. RSVP exposes window.onInviteRsvp(payload), with a local demo fallback and retained inputs on failure.

SVG refinements add layered details without extra image downloads. Flames move gently and petals drift; reduced motion disables both. Section content sits above the petal layer. Opening media is deferred correctly: hidden page sections do not load their lazy photographs until opening. Phones request portrait backgrounds; desktop requests landscape backgrounds. Non-Hindu fixtures use the neutral textile/ritual background and the correct faith-specific blessing.

## Step 5 — Build review
Passed: node tools/shoot.mjs temple-dawn. All seven required viewports, alternate samples, guest-name injection and reduced-motion capture passed; exact output is in shoot-report.txt. Interaction, edge-case and asset-network checks passed. Final section screenshots are committed at 390px and 1440px, with tablet, landscape, Telugu and gallery-count views.

### Verification evidence and practical limits
- Additional Playwright assertions passed for opening removal/scroll unlock, correct family matching, deferred YouTube, gallery counter/arrows/Escape/focus, calendar download, inline RSVP validation and callback failure/success, 320–2560px overflow, long names, eight events, optional-section removal and reduced motion. Results: verification.txt.
- Edge-case assertions passed for gallery counts 1/2/3/6/12, all four faith variants, same-day/past countdown states, invalid media URLs, music state and keyboard traversal with focus outlines.
- Network assertions passed: phone requests portrait backgrounds only; desktop requests landscape backgrounds only. Initial image payload is 95,812 bytes at 390px and 140,856 bytes at 1440px, both below 150 KB. Lazy photographs and hero backgrounds are deferred until opening.
- Visual review examined opening/hero/couple/countdown/events/gallery/video/venue/live/RSVP/footer at phone and desktop sizes, plus tablet, landscape and Telugu stress views. Original SVG decorations stay clear of portrait faces and form controls; the veined sprigs remain within the viewport. Text uses no clipped gradients and no Indic tracking.
- Local screenshot runner initially stalled at networkidle while browser media requests remained active. It now waits for page load instead; image/font layout still receives the existing capture delay. The same runner is committed as qa/visuals.mjs; from repository root use node themes/temple-dawn/qa/visuals.mjs temple-dawn. Other QA scripts expect the theme server at 127.0.0.1:4173 and the repository's Playwright installation.
- Backgrounds are opaque WebP photographs. SVG artwork is inline, static source markup; no imported illustration or external icon library.
- RSVP has no backend: production persistence requires window.onInviteRsvp(payload). Speaker output was not subjectively listened to, and no message was actually shared to another person. Browser music state and share URL construction were checked.

### Production weight (screenshots excluded)
- app.js: 11,968 bytes gzip; budget 60,000.
- style.css: 8,796 bytes gzip; budget 25,000.
- Phone/common images: 446,324 bytes raw (below 450 KB); desktop-only additional backgrounds: 301,066 bytes raw (below 400 KB). Already-compressed WebPs are measured raw, a conservative comparison. Two font families; no runtime library.

### Section 6 parity checklist
Every required item below is implemented and reviewed; evidence and any practical limits are stated above.

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
Branch: theme/temple-dawn. Existing PR: https://github.com/gptrevents/web-templents-ruvva-/pull/1. Commit only this theme directory. Root brief, reference and shared assets remain untouched.

Local preview: run `python3 -m http.server 4173 --bind 127.0.0.1 --directory themes/temple-dawn` from the repository root. A static HTTP server is required because sample JSON is fetched.
