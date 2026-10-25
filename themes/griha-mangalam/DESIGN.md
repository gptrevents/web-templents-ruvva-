# Griha Mangalam — A home filled with blessings

## Step 1 — Art direction
Follow the user’s six-panel Griha Pravesh reference: illuminated butter-yellow paper, mango/jasmine canopy, new home illustration, three family portraits, four ritual paintings on a flowering vine, venue with map, presence form and a kalash courtyard blessing. Original artwork, fictional people, live HTML content. This is the first dedicated housewarming theme; the earlier board was reserved while Little Wonder was built.

| Axis | Decision |
|---|---|
| Palette | Butter-yellow paper, leaf green, restrained ruby inscriptions and brass ornament, explicitly requested by the supplied board. |
| Type | Cormorant Infant and Lora for live content; Great Vibes only for fixed English occasion headings, safe serif for Indic. |
| Opening | A single welcoming home scene rolls away upward like a ceremonial threshold reveal; no door leaves, curtain, balloon or light-wipe. |
| Shapes | Gold oval family medallions, rectangular house portrait and open ritual vignettes. |
| Motif | Actual transparent mango/jasmine canopy, kalash, lamp, rangoli and delicate lotus edge. |
| Hero | New home facade and welcome note with host identity/date; wide image beside text on desktop. |
| Family | Three independently supplied household portraits in one row, fallback to side-matched canonical family cards. |
| Countdown | A decorated doorway beside four live brass-colored numerals. |
| Events | Four alternating art/text rituals along a drawing vine, two-column ritual garden on desktop. |
| Gallery | Optional clean framed contact grid of 1–12 images. |
| Motion | Welcome scene lift, soft garland breath, staggered family arrival, drawn vine and individually tumbling petals; light phone movement. |
| Texture | Luminous painted paper, realistic villa and ritual cutouts. |
| Desktop | Broad home/text split, family triptych, four-unit clock, two-column ritual garden, details/map pair and form/wishes split. |

## Step 2 — Design review
Reviewed every existing theme DESIGN.md and the base reference contact sheet before implementation. The direct reference requires a palette/medium/vine similarity to Kalyana Vaibhavam and is a user-directed exception to the normal three-axis cap. This is a homecoming narrative with a new facade, household triptych and ritual objects, not a wedding tableau or birthday layout. Compared against Royal Maroon, Rose Mandap, Temple Dawn, Floral Elegant, Storybook Garden, Ocean Serene, Varnika, Sannidhi, Kalyana Vaibhavam, Epure, Vesper, Little Wonder and Fairytale Bloom. No existing theme is altered; shared runtime supplies behavior, not visual layout.

## Step 3 — Asset plan and review
Eight built-in imagegen calls: portrait welcome, independently composed wide facade, transparent canopy, four-object ritual atlas, fictional family portrait atlas and closing kalash courtyard, plus separate clean altar and meal refinements. See generation-prompts.json for exact prompts and original saved source paths. Crops and WebP compression retain real alpha. No third-party media or real people. Original repository drone music copied from shared sample assets. SVG line icons, lotus edging and flower sprigs are authored geometry. User reference is not shipped as an image.

## Data and reference judgement calls
Default sample is housewarming; canonical field names are preserved. Optional household entries add name/relation/photo for a three-person family; canonical wedding fixtures still match parents by side. Optional event.description and landmarks labels are data-driven. No travel-time estimates are invented. Venue/date/map details remain keyboard-accessible disclosures to preserve the board’s compact open-art ritual layout. Countdown and calendars are added between family and rituals, as required by the brief. The opening is an overlay, then the remaining chapters flow continuously; repeated canopies are limited to the hero and closing. RSVP includes required phone and guest/attendance validation beyond the board’s simplified sketch. No fake submitted guest wishes are shown; Warm Wishes choices select the actual attendance radio, and Send RSVP follows the shared callback/demo contract. Default gallery/video/live/gifts hide because their sample data are empty/disabled.

## Validation
Passed `node tools/shoot.mjs griha-mangalam`: seven required widths, empty/birthday/Telugu fixtures, injection and reduced-motion captures. Additional theme QA passed at 320–2560px, including landscape and tablet, actual phone scroll animation, 1–12 gallery images, 1/8-event behavior, long names, side-matched families, today/past countdown, calendars, RSVP validation/callback retry/success, deferred YouTube and conditional live stream. Shared blessings QA passed seven widths, QR decoding, amounts, callbacks and session persistence.

Manually inspected the opening, chapter compositions, ritual edges, footer, desktop split and Telugu family screenshot; the virama in “అర్జున్” remains visible. Keyboard QA covered the opening trap, RSVP fields, gallery arrows/Escape and visible focus. Network capture confirmed portrait-only opening art on phone and landscape-only opening art on desktop. Final asset/runtime report: common images 430,444/450,000 bytes, desktop-only art 290,146/400,000, first phone screen 81,410/150,000; runtime gzip JS 34,562/60,000 and CSS 10,297/25,000. Captures and exact logs are committed in this folder.

Delivery QA verified the new premium Housewarming card/filter and unchanged eleven existing catalog entries. The generated gallery catalog is the sole outside-folder edit, following the user’s standing request to list every new template on the home page. Demo data are fictional; real RSVP persistence requires the documented host callback. Optional video/live/gallery/gifts remain hidden in the default housewarming sample and were exercised using fixtures. No live payment or real RSVP was sent.

## Parity checklist
 — every item is required

Order on the page is fixed. Visual form is yours; the content and behaviour are not.

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


### DNA comparison against current themes
| Existing theme | Shared broad axes | Differentiation / explicit reference exception |
|---|---|---|
| Royal Maroon | 2 (serif), 4 (fine framing) | Illuminated house painting and household triptych rather than jewel typographic cards |
| Rose Mandap | 12 (painted medium) | No velvet, night arch or couple-text cards |
| Temple Dawn | 1 (warm stone), 5 (jasmine/brass), 12 (realistic medium) | Private home facade, triptych and household itinerary rather than temple doors/niches |
| Floral Elegant | 2 (book serif) | No pink scrapbook, flowers/polaroid constellation or circular dials |
| Storybook Garden | 12 (illustrated medium) | No cartoon landscape, timber signs, tickets or filmstrip |
| Ocean Serene | None | No waves, sea, portholes or tabs |
| Varnika | 2 (serif), 12 (painted medium) | No jade manuscript, octagons, ledger or bound album |
| Sannidhi | 5 (jasmine), 11 (ceremonial), 12 (painted) | No lamp ignition, bell clock, calendar wall or photo fan |
| Kalyana Vaibhavam | 1, 2, 5, 9, 11, 12 | User-directed traditional board deliberately overlaps these broad axes; different homecoming subject, generated villa/rituals, household row and doorway clock |
| Épure | 2 (broad serif) | Rich ceremony artwork rather than restrained photo editorial |
| Vesper | None | No carbon, capsule/aperture composition or orbital salon |
| Little Wonder | 12 (illustrated medium) | No child garden, toy blocks/clouds or activity ladder |
| Fairytale Bloom | 2 (book/script hierarchy), 12 (painted) | No rose princess arch, tilted polaroids, straight party cards or moon closing |
