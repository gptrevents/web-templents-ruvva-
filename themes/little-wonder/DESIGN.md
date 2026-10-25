# Little Wonder — An adventure worth celebrating

## Step 1 — Art direction
A child's garden birthday unfolds from a balloon-filled welcome into a sunny day of little adventures, then closes beneath a lantern-lit moon. The user's birthday board guides the illustrated richness and six narrative beats. The housewarming board is reserved for a separate task.

| Axis | Decision |
|---|---|
| 1 Palette | Lemon custard #fff4ce, cobalt-blue #1269a1, tangerine #e66a28 and pine #244f35; night blue is confined to the story's ending. |
| 2 Type | Baloo 2 rounded display + Nunito Sans humanist body. Names never use script. |
| 3 Opening | A bouquet of balloons lifts the invitation's greeting up into the sky, revealing a fully decoded garden scene. |
| 4 Shapes | Puffed cloud frames, toy-block numerals and gently curved orchard clearings; no wooden sign containers. |
| 5 Motif | Kites, balloons, scattered star confetti, leaf sprigs and a tiny toy rocket. |
| 6 Hero | A playful live birthday masthead above a full illustrated child-and-swing garden; desktop type and character occupy opposite halves. |
| 7 Person | One oversized cloud portrait surrounded by smaller cloud memory windows; two-person fixtures use two cloud portraits. |
| 8 Countdown | Four toy-block digits on a picnic-check ledge. |
| 9 Events | An adventure ladder with colored step numbers, distinct horizontal stepped bays on desktop and alternating flag headings on phone. |
| 10 Gallery | A cloud-window mosaic: one large vertical memory beside paired small horizontal memories, repeating in groups of three; all photos open the full viewer. |
| 11 Motion | Buoyant balloon lift, drifting kites, asymmetric tumbling confetti, short toy-like settles. |
| 12 Texture | Detailed painted children's-book scenery against smooth custard paper and tiny picnic checks. |
| 13 Desktop | Landscape garden welcome; wide cloud memory constellation, stepped activity ladder, asymmetric cloud mosaics and map/party pavilion. |

## Step 2 — Design review
Compared all nine implemented themes and the two reference prototypes before build. The user's rich illustrated garden direction necessarily shares subject matter with Storybook Garden; this is an explicit reference-driven exception to palette/illustration-family exclusion, not a reused layout. Mandatory opening, cloud/block shapes, stepped activities and cloud mosaic are new. Shared broad axes: Royal Maroon 0; Rose Mandap 12 (painted); Temple Dawn 5 (vegetation); Floral Elegant 5 (garden),12 (painted); Storybook Garden 5 (garden),11 (playful),12 (painted); Ocean Serene 5 (outdoor subject); Varnika 5 (vegetation),12 (painted); Sannidhi 12 (painted); Kalyana Vaibhavam 12 (painted); Epure 0; Vesper 0. Storybook's wooden hanging board, leaf portraits, pennant clock, perforated tickets and filmstrip are not reused. Approved for assets.

## Step 3 — Asset plan
Original built-in imagegen: day garden with fictional Indian child on a swing; complementary night thank-you scene; a small portrait/memory sheet with the same fictional child. Every text remains HTML. Local responsive WebP derivatives; first-screen and total image budgets measured. Geometric balloons/clouds/kites/icons are code-native SVG. Shared JSON and placeholder assets were copied first.

## Step 3 — Final assets and review
All planned artwork is generated, visually inspected and saved locally. Separate 720×1080 portrait and 1536×1024 landscape scenes serve phone/desktop; decorative cropping is confined to scene edges and the child/puppy remain within the composition. The alpha-bearing garden sprig is real RGBA and remains transparent in WebP. Exact prompts, source paths and derivatives are in ASSETS.md. There is no embedded lettering. Original local music-box audio replaces the placeholder drone.

Image budget: common images including alternate fixture placeholders **415,628 / 450,000 bytes**; desktop-only additions **324,910 / 400,000 bytes**. Opening portrait **85,036 / 150,000 bytes**; the opening plus margin sprig totals **130,976 / 150,000 bytes** on the phone; other below-fold images are lazy-loaded. Runtime script/CSS budgets include shared modules and local QR encoder.

## Step 4 — Builder
Independent cloud/block composition and responsive CSS; plain HTML and vanilla JS. Common behavior imports shared/core.js and shared/blessings.js, rather than forking validation/calendars/gallery/countdown/payment claims. No new library, backend, secret or API key.

The existing contract's name1/groom slot represents the birthday child. name2 and a second portrait remain supported for alternate two-person fixtures. No age is inferred from dates: the demo's 5th Birthday label comes from events[].label. Memory photos use photoSlots.story; no fixed years or unverifiable real-child biography are added. Family labels appear only with matching families[].side data. English COPY.en remains the sole authored copy. Wishes are the RSVP's optional message, with no invented public messages or fake guest testimonials.

Opening locks focus/scroll, lifts the greeting upward with balloons and decodes the prepared hero before removal. SVG balloons sway independently; natural confetti has differing delays, paths, sizes and speeds, behind text in clipped local layers. The continuous transparent painted margin is separate from the section backgrounds, not a repeated canopy. A throttled scroll callback draws the event path and shifts the edge plant slightly; animations are paused when offscreen/hidden or reduced motion is enabled. The only deliberate light-to-night palette transition is the narrative closing; the middle retains one garden family.

Phone uses a tall scene, portrait/memory stack and two-column cloud mosaic; tablet uses paired memory rows, wider activity bays and a three-column mosaic; desktop uses a landscape scene, five-window memory constellation, stepped activity bays, broad mosaic and map/details side by side. RSVP name/phone and event choices become paired columns. All controls have visible focus treatment and 44px touch targets. Only outer decorative scene edges crop; lightbox photos fit the viewport.

## Step 5 — Build review
Passed required `node tools/shoot.mjs little-wonder`: seven widths, full phone/desktop captures, empty/birthday/Telugu fixtures, guest injection and reduced-motion screenshot. Output saved as shoot-report.txt. Additional checks in qa/interactions.mjs and qa/blessings.mjs passed; reports are committed. qa/visuals.mjs captures whole principal sections and checks desktop rearrangement. Phone/tablet/landscape/desktop were inspected, including the Telugu virama and script spacing. Last corrections remove a hard scene boundary on phones, keep the moon in the closing composition, and increase Indic name leading.

Manual review: opening and main scene are composed for both orientations; portrait memory constellation and stepped activities make use of desktop width. Keyboard opening, calendar, gallery arrows/Escape and form validation/retry/success were exercised in Chromium. All local scene variants were checked against actual network requests. Photos, names, primary buttons and form fields remain readable. Phone screenshots are emulation, not a physical Android/iPhone hardware review. Embedded map/video and configured real-event URLs still depend on the event owner's data and network. The demo stream is labeled as a sample link. No live payment or external message was sent.

The dedicated Blessings checks decode the locally generated desktop QR, compare regenerated amount/URI, verify mobile intent/desktop QR layout, inline limits, callbacks/retry, unique reference restoration, injection safety and disabled/invalid hiding. The default birthday demo has gifts disabled; enabled fixtures use demo:true and cannot launch payment. Test-only routing enables a synthetic live intent for QR decoding without initiating payment.

## Step 6 — Delivery
One new theme on theme/little-wonder. The standing user request to add future templates to the home collection is fulfilled using theme-local theme.json and a small tools/build-catalog.mjs extension; the generated catalog registers only this new entry. Existing themes/data/layouts are unchanged. All source, optimized assets, provenance, checks and final screenshots are included in the pull request.

## Required parity checklist (section 6, birthday interpretation)
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


### Judgement calls
- Couple/parents names remain supported for contract parity, but the primary birthday data shows one child's cloud portrait and a memory constellation, with no wedding relationship labels.
- Wedding-specific heading defaults are occasion-aware in the birthday demo; dates and age label remain supplied data.
- No optional public wishes feed or backend is added; RSVP collects a private optional wish through the supplied callback.
- The user-requested illustrated garden direction shares broad subject/motion/medium with Storybook Garden; explicit reference guidance takes precedence over a categorical palette exclusion. Opening, shapes, person/countdown/events/gallery skeletons are distinct and were compared before implementation.

Final release evidence: asset-report.txt records 415,628 common image bytes, 324,910 desktop-only bytes, 130,976 first-screen phone image bytes, real alpha and the correct responsive sources; full runtime gzip is 33,579 JS / 9,784 CSS bytes. delivery-report.txt verifies the tenth home entry, Birthday filter, premium metadata, all nine previous catalog entries unchanged, keyboard access/focus to RSVP and touch-swipe handling. Photo previews are optimized theme-local WebPs derived from final rendered views. Local preview remains available on ports 4175 and 4178 for review.
