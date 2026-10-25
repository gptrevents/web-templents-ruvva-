# Vesper — An evening to remember

## Step 1 — Art direction
A private evening celebration seen through a modern photographic aperture: carbon-black space, cool silver type, panoramic night photography and a few precise curved contours.

Second of the two explicitly requested minimalist premium themes. It uses a different type hierarchy, opening, section shapes, photo arrangements, countdown, itinerary, gallery and motion from Épure. It is not the ivory design inverted.

| Axis | Choice |
|---|---|
| 1 Palette | Continuous carbon #161b1d, silver #e2e8e7, muted steel #a5b4b6 and a restrained copper #b89a83. No cream sections or saturated color bands. |
| 2 Type | Sora geometric display + DM Sans body; Instrument Serif for fixed English italic annotations only. Names stay Indic-safe. |
| 3 Opening | A quiet photographic-aperture inscription; the black foreground iris contracts out of the way to reveal the prepared hero. |
| 4 Shapes | Sweeping convex/capsule contours and edge-to-edge photographic ovals, sparse dotted meridians. No paper sheets, folios, arches or scenery borders. |
| 5 Ornament | Slender orbital contours, small aperture cross, faint light specks and original satin-fold lines along the outer margins. No birds, petals or botanicals. |
| 6 Hero | A wide photographic capsule intersects a centered low-weight sans masthead; separate marginal annotations give the composition its width. |
| 7 Couple | Two tall oval portrait apertures separated by an italic joining caption, with names in outside side labels on desktop. |
| 8 Countdown | A precision clock face: four quarter positions on a circular contour on phone, four long horizontal sectors on desktop. |
| 9 Events | Numbered evening “stations”: broad typographic stages in a horizontal snap track, linked by a drawn timing meridian; desktop exposes several stages at once. |
| 10 Gallery | Curved photographic salon: alternating full-width oval landscape and paired tall rounded panels; no thumbnails, paper, fan, masonry or filmstrip. |
| 11 Motion | Aperture contraction, curved clipping reveals and slight lateral photo-salon arrivals; no paper lifts or swinging decoration. |
| 12 Texture | Flat satin carbon, a single restrained specular arc; no paper grain or sandstone. |
| 13 Desktop | Wide photographic aperture, oval portrait salon, long multi-sector clock, horizontally connected evening stations and curved photo salon. |

## Step 2 — Design review
| Existing | Conservative broad overlaps | Count |
|---|---|---|
| Royal Maroon | none; dark alone is not the maroon/gold palette | 0 |
| Rose Mandap | 11 broad cinematic transition | 1 |
| Temple Dawn | none | 0 |
| Floral Elegant | 9 horizontal itinerary (stages differ from illustrated postcards) | 1 |
| Storybook Garden | none | 0 |
| Ocean Serene | 2 sans/display family, 4 curved edges (not wave geometry) | 2 |
| Varnika | none | 0 |
| Sannidhi | none; its indigo opening is not a continuous carbon photo salon | 0 |
| Kalyana Vaibhavam | 10 broad multi-photo composition (different oval rhythm) | 1 |
| Épure | none specifically; its paper/type grid and this curved salon differ | 0 |

Mandatory axes are judged by the actual new palette, iris motion, capsule contours,
station structure and curved salon rather than generic words such as “dark” or “carousel”.
The user’s request for calm premium presentation guides the restrained details. Approved.

## Step 3 — Asset maker
Planned: a fictional adult Indian couple at a minimal modern evening venue, restrained dark formalwear and ivory silk, warm architectural light; coordinated individual portraits. Built-in imagegen, original assets, no celebrity likeness. Exact prompts recorded in ASSETS.md. Responsive local WebP. Shared fixtures/music copied first.

## Step 3 — Final assets and licensing
Three original coordinated photographs per theme were created with the built-in imagegen tool: a couple photograph and two individual portraits. People are fictional adults, not celebrities. Exact prompts and original generation paths are in ASSETS.md. `assets/main.webp`, `assets/groom.webp`, `assets/bride.webp` and their `-desktop.webp` counterparts are the final shipped files. No background/decorative stock image or third-party photo is used. The original local sample music and fallback placeholder assets retain their repository provenance. All typography is live HTML. SVG registration/aperture marks and icon paths were drawn in code.

## Step 4 — Build
Plain HTML, independent theme-local CSS and visual builders, with ES imports from the tested shared core. Opening, hero, couple, events, countdown styling, gallery and footer are designed independently between the two new themes. The full page stays in one consistent palette. Names/date/venue/photo slots come from JSON. Common RSVP, calendars, lightbox, wheel easing, music/share, safe controls and Blessings behavior are reused without forking the runtime.

Responsive photos are picked by picture/source media queries; the lightbox picks the larger local file on desktop so it does not enlarge a phone thumbnail. Photos never use blur/filter animation. The three faint moving paper/light marks are the restrained interpretation of the global ambient-motif requirement. The user explicitly asked for no busy decorative effects.

The opening initially focuses its labelled dialog; Tab reaches the visible Open Invitation button with a focus ring, and Enter opens it. Focus moves to the hero after the ceremony. Both the optical and paper ceremonies reveal the prepared hero without a flat-color gap. Motion respects reduced-motion and viewport visibility. The guest page makes no payment/submission network request; fictional gift fixtures are explicitly demo-only.

## Step 5 — Review and verification
- `node tools/shoot.mjs vesper` passed: 360,390,844×390,820,1280,1440,1920; default/empty/birthday/Telugu, guest injection and reduced-motion captures. Separate section shots are in screenshots/review at390/1440.
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

Delivery refinement: both new minimal themes reserve the original photo dimensions before lazy loading. A delayed-decode/page-height check passed for both; this preserves their existing layout while preventing scroll jumps. Collection smoke check passed with nine templates and five Premium entries.

## Margin artwork refinement — requested after the initial review
The user asked for visibly animated artwork at the sides while keeping both designs minimal. Added a single continuous, theme-local SVG layer: botanical ink engravings for Épure, optical satin contours for Vesper. It does not repeat at each section. All shapes are original code-native vector artwork in margin-art.js; margin-art.css controls appearance. No new raster image, font, library, API or data field is introduced.

The strokes draw in, then slowly breathe with travelling highlights. Scroll adds a bounded vertical drift, smaller on phones. The center is masked clear, photos remain opaque above the artwork, and forms/maps automatically lower the margin opacity. The artwork also appears at the welcome screen. It never receives taps or focus and is hidden from accessibility APIs. Gallery and hidden-tab states pause the decorative loops; reduced motion shows completed static artwork with no drift. Existing section geometry was compared against pre-edit captures at 390/1440 and remains unchanged.

`tools/check-minimal-margin-art.mjs` checks actual motion, scroll movement, visible edge pixels, a clear center, form hit targets, reduced-motion and hidden/gallery pause, nine viewport widths and the full runtime budget. Its optional RUVVA_MARGIN_BASELINE environment variable accepts a pre-edit geometry capture; without that file it verifies that removing the decorative layer does not affect section layout. `node tools/shoot.mjs vesper` is run again for the required screenshots and fixtures. See tools/minimal-margin-art-report.txt and screenshots/margin-art for the result.
