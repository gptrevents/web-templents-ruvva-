# Épure — An invitation, beautifully considered

## Step 1 — Art direction
A private wedding announcement printed like an independent fashion journal: chalk-white space, quiet black ink, intimate editorial photographs and confident asymmetric typography.

The user explicitly requests two new minimalist premium themes, unrelated to one another and to the existing ornate collection. This authorizes building two in this conversation; each is committed on its own theme branch from main. Gallery registration is the only required exception outside the theme folder/tools. Existing themes remain intact.

| Axis | Choice |
|---|---|
| 1 Palette | Chalk #f8f7f3, near-black #242725, cool stone #d8d9d3; no gold, floral colors or patterned margins. |
| 2 Type | Libre Caslon Display + Work Sans; lowercase book typography with precise small English labels. |
| 3 Opening | Oversized asymmetrical printed invitation, two paper fields part vertically along a fine registration rule. |
| 4 Shapes | Open typesetter grid, thin baseline rules, generous unframed photographic rectangles; no ornamental containers. |
| 5 Ornament | Small registration cross, slim editorial dash, quiet paper motes and original ginkgo ink engravings confined to the outer margins. |
| 6 Hero | Overlapping oversized left-aligned name masthead, offset portrait, marginal date/caption; no central scenic arch. |
| 7 Couple | A staggered photographic diptych with a narrow joining sentence and outside captions; no cards or enclosing common frame. |
| 8 Countdown | A four-column typesetting specimen: large numerals over hairline baselines and small margin labels. |
| 9 Events | Wide printed running order: numbered rows on a multi-column typesetter grid, with a fine drawn marginal rule. No disclosures, tabs, tickets, cards or winding path. |
| 10 Gallery | A staggered photographic index: unequal open rows, alternating narrow portrait and wide image, written index beside each. No Masonry, bound album, filmstrip, fan or thumbnail selector. |
| 11 Motion | Restrained editorial: paper separation, short line wipes, 12px arrivals; slow ink-engraving drift at the edges, no photo zoom. |
| 12 Texture | Uncoated chalk paper with faint botanical engravings at the outer edges; no photographic texture or grain overlay. |
| 13 Desktop | Asymmetric journal cover, staggered diptych, wide running-order table, photographic index and wide ruled response sheet. |

## Step 2 — Design review
The mandatory palette/opening/shape/events/gallery axes use new specific implementations, not a recolor. Conservative broad overlaps:

| Existing | Shared broad axes | Count |
|---|---|---|
| Royal Maroon | 2 serif/sans, 4 straight rules (not its corner-frame composition) | 2 |
| Rose Mandap | none | 0 |
| Temple Dawn | 2 serif/sans | 1 |
| Floral Elegant | 2 serif/sans, 7 staggered portraits (without polaroid framing) | 2 |
| Storybook Garden | 2 broad serif/sans | 1 |
| Ocean Serene | 2 broad serif/sans, 7 photographic pair (different open diptych) | 2 |
| Varnika | 2 broad serif/sans, 6 offset typography | 2 |
| Sannidhi | 2 broad serif/sans | 1 |
| Kalyana Vaibhavam | 2 broad serif/sans | 1 |
| Vesper (planned alongside) | no specific axes; both are intentionally calm but have different mechanisms | 0 |

No existing CSS skeleton is copied. Interpret the shape rule by the actual open typesetter grid rather than the broad word “rectangle”, which is unavoidable in an intentionally minimal editorial design. Approved for asset production.

## Step 3 — Asset maker
Planned: original fictional adult Indian couple photographed in a minimal limestone courtyard; coordinated individual portraits. No celebrities, reference-site photos or decorative floral assets. Generated with built-in imagegen; exact prompts and output provenance will be saved in ASSETS.md. All final images local WebP; normal/desktop sources responsive. Shared sample placeholders/music copied first.

## Step 3 — Final assets and licensing
Three original coordinated photographs per theme were created with the built-in imagegen tool: a couple photograph and two individual portraits. People are fictional adults, not celebrities. Exact prompts and original generation paths are in ASSETS.md. `assets/main.webp`, `assets/groom.webp`, `assets/bride.webp` and their `-desktop.webp` counterparts are the final shipped files. No background/decorative stock image or third-party photo is used. The original local sample music and fallback placeholder assets retain their repository provenance. All typography is live HTML. SVG registration/aperture marks and icon paths were drawn in code.

## Step 4 — Build
Plain HTML, independent theme-local CSS and visual builders, with ES imports from the tested shared core. Opening, hero, couple, events, countdown styling, gallery and footer are designed independently between the two new themes. The full page stays in one consistent palette. Names/date/venue/photo slots come from JSON. Common RSVP, calendars, lightbox, wheel easing, music/share, safe controls and Blessings behavior are reused without forking the runtime.

Responsive photos are picked by picture/source media queries; the lightbox picks the larger local file on desktop so it does not enlarge a phone thumbnail. Photos never use blur/filter animation. The three faint moving paper/light marks are the restrained interpretation of the global ambient-motif requirement. The user explicitly asked for no busy decorative effects.

The opening initially focuses its labelled dialog; Tab reaches the visible Open Invitation button with a focus ring, and Enter opens it. Focus moves to the hero after the ceremony. Both the optical and paper ceremonies reveal the prepared hero without a flat-color gap. Motion respects reduced-motion and viewport visibility. The guest page makes no payment/submission network request; fictional gift fixtures are explicitly demo-only.

## Step 5 — Review and verification
- `node tools/shoot.mjs epure` passed: 360,390,844×390,820,1280,1440,1920; default/empty/birthday/Telugu, guest injection and reduced-motion captures. Separate section shots are in screenshots/review at390/1440.
- `node tools/check-minimal-themes.mjs` passed: widths320–2560, long names, gallery cardinalities1/2/3/6/12, 1/8 events, faith guards, responsive image switching and high-resolution viewer source selection, today's/past countdown, audio, ICS, gallery keyboard/Escape, deferred video, RSVP callback/decline, independent QR decode, gift claim/session persistence, locked opening and eased desktop wheel.
- `node tools/check-opening-frames.mjs epure vesper` passed: 13 captures at200ms targets at390/1440; opening contact sheets are in screenshots/opening-frames. Inscription remains visible while masked by the Vesper iris so the transition never goes empty.
- Opening keyboard focus was separately tested at390/1440 after the initial-dialog-focus refinement.
- Mobile and desktop sections were inspected, including the Telugu stress screenshot. Desktop layouts use the full width and rearrange rather than displaying a phone column. Native touch scrolling is preserved; no physical-device bank payment is claimed.
- Code and all artwork are within the brief's budgets; exact gzip results in tools/minimal-themes-report.txt. Desktop sources load only at≥1024px. First hero images are below150KB; opening itself needs no raster background.

## Parity checklist (brief section 6)

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
- [x] Render and decode the hero underneath before the ceremony starts; no flat-colour gap during or after opening.
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

### 11b. Send Your Blessings (required behavior; hidden when disabled/invalid)
- [x] `buildBlessings(data, copy, ctx)` after RSVP and before footer; hidden when gifts disabled or UPI invalid.
- [x] Amount chips, middle default, custom integer ₹1–₹1,00,000; required guest name and optional 300-character blessing with counter.
- [x] Mobile ≤1023px: UPI anchor with exact current amount. Desktop ≥1024px: local M-error-correction QR, four-module white quiet zone, ~220px; no phone button.
- [x] Both: copyable UPI ID, unique guest reference and direct-to-couple money note; no floating gift button.
- [x] Validated person-to-person `upi://pay` with pa, pn, am (two decimals), cu=INR, tn=reference + first 40 plain guest-name characters. No emoji or message in payment note.
- [x] Reference from `?ref=` or crypto-generated `RUV-` + six unambiguous characters, stable per tab/invitation.
- [x] `window.onInviteGift` receives a claim only; loading/error/retry states, success once per reference, sessionStorage restoration. Never imply verified payment.
- [x] RSVP No reveals one gentle link only when Blessings exists. Theme-specific styling and gentle reduced-motion-safe thanks.
- [x] Samples use fictional UPI IDs with `demo:true`; no payable sample anchor/QR. Live QR decoding, URI/amount agreement, injection, validation and callback/persistence checks pass.

### 12. Footer
- [x] Names in the theme's display treatment
- [x] Date
- [x] Ornament
- [x] Small "Made with Ruvva" link to https://ruvva.com

### 13. Floating controls (fixed on screen after opening)
- [x] Music toggle (bottom-right): play/pause, pulsing ring while playing, `aria-pressed`
- [x] WhatsApp share button: opens `https://wa.me/?text=<encoded page URL>`; uses `navigator.share` when available
- [x] Controls stack bottom-right, 16px phone / 24px desktop plus safe-area insets; both ≥44px. Fade to 30% over headings, primary actions and form fields; restore on keyboard focus. Footer has clearance.
- [x] No hamburger menu, no app logo at the top, no price tag


## Optional sections
A separate Our Story timeline and Wishes box are not part of either minimalist concept. All required content, including the conditional Blessings section, is implemented. No backend, entitlement, payment verification or translation is added.

## Step 6 — Delivery
Theme, original assets, fixture data, design/asset documentation and screenshots are committed on the theme's own branch. It is added as Premium to the existing collection and delivered through a GitHub pull request. Existing themed designs are unchanged.

## Margin artwork refinement — requested after the initial review
The user asked for visibly animated artwork at the sides while keeping both designs minimal. Added a single continuous, theme-local SVG layer: botanical ink engravings for Épure, optical satin contours for Vesper. It does not repeat at each section. All shapes are original code-native vector artwork in margin-art.js; margin-art.css controls appearance. No new raster image, font, library, API or data field is introduced.

The strokes draw in, then slowly breathe with travelling highlights. Scroll adds a bounded vertical drift, smaller on phones. The center is masked clear, photos remain opaque above the artwork, and forms/maps automatically lower the margin opacity. The artwork also appears at the welcome screen. It never receives taps or focus and is hidden from accessibility APIs. Gallery and hidden-tab states pause the decorative loops; reduced motion shows completed static artwork with no drift. Existing section geometry was compared against pre-edit captures at 390/1440 and remains unchanged.

`tools/check-minimal-margin-art.mjs` checks actual motion, scroll movement, visible edge pixels, a clear center, form hit targets, reduced-motion and hidden/gallery pause, nine viewport widths and the full runtime budget. Its optional RUVVA_MARGIN_BASELINE environment variable accepts a pre-edit geometry capture; without that file it verifies that removing the decorative layer does not affect section layout. `node tools/shoot.mjs epure` is run again for the required screenshots and fixtures. See tools/minimal-margin-art-report.txt and screenshots/margin-art for the result.


## Guest personalization rollout — 28 October 2026

User-approved multi-theme rollout of the reviewed Griha Mangalam pilot; shared recipient behavior is centralized in `shared/recipient.js` (the original pilot remains unchanged). Theme-specific artwork and composition live in `guest-art.js` and `guest.css`.

Treatment: letterpress; A letter, just for you. Four touchpoints: opening, personal letter, editable RSVP, attendance-aware closing. Names remain live Indic-safe text; decorative monogram uses the first Unicode grapheme. Optional party and private note follow the pilot contract. URL values are display-only, not authenticated identity; no backend or verified RSVP persistence is introduced. No new bitmap or font assets.

Validation results are recorded in `GUEST_REVIEW.md`.
