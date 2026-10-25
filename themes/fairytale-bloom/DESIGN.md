# Fairytale Bloom — A little world of magic

## Step 1 — Art direction
Follow the user's six-panel Aadhya birthday reference closely: rose/peach flower arch around a princess portrait, four tilted memory polaroids around a large central portrait, illustrated cake/gift/dinner itinerary, flower-framed venue, pink RSVP with a real local wishes interaction, and a girl seated on a glowing crescent moon at sunset.

The user explicitly says the previous birthday design diverged too far and asks for this supplied layout and artwork direction. Fidelity takes priority over novelty rules where they conflict. Do not recolor Little Wonder or reuse its scenery, cloud photos, rounded sans headings, toy blocks, stepped event bays or blue controls. All typography remains live, and all shipped paintings are newly generated rather than screenshots of the reference.

| Axis | Choice |
|---|---|
| 1 Palette | Rose #b82f58, warm pale pink #fff1eb, ivory #fff8ec, peach #f4c6b6, muted leaf #63734e, small honey highlights; midnight only in closing. |
| 2 Type | Great Vibes for English names in the opening, memory chapter and RSVP inscription, following the user’s calligraphic reference; Cormorant Infant for other headings and Indic names, Lora for book text. |
| 3 Opening | A butterfly's flight opens two translucent petal veils sideways to reveal the decoded floral garden. No flower bloom or balloon lift. |
| 4 Shapes | Full floral arch, fine peach stationery, tilted rectangular polaroids and ribbon header tabs, as supplied. |
| 5 Motif | Painted peach roses, tiny butterflies, pink hearts, flower crowns, teddy bear and lanterns. |
| 6 Hero | Centered birthday inscription above the pink-dressed girl within the flower arch; a cream date/time/venue strip at the foot. Landscape widens the inscription and girl into a floral garden stage. |
| 7 Person | Central free portrait with four tilted polaroids at upper/lower sides, including on phone. |
| 8 Countdown | Live rose numerals in four ribbon tabs above a painted gift/cake garden vignette. |
| 9 Events | Numbered straight rose stem with illustrated object vignettes beside cream stationery cards; phone includes the fun/games/music signpost at the margin, desktop uses a wide two-column celebration sheet. |
| 10 Gallery | Optional contact-sheet strip of stamp-edged rectangular keepsakes with caption baselines; hidden in the default six-beat demo, memory photos still use the full-screen viewer. |
| 11 Motion | Butterfly wing/flight, swaying flower sprigs, individually drifting tiny hearts, soft paper arrivals, drawn rose stem. |
| 12 Texture | Rich animated-storybook paintings against faint peach watercolor stationery. |
| 13 Desktop | Broad floral proscenium; full memory constellation, two-column illustrated program, flower-framed venue/map pair and framed response stationery. |

## Step 2 — Design review
The direct request overrides mandatory palette/shape/events exclusions where necessary to reproduce the supplied design. Compared with every current theme and both reference prototypes: Royal Maroon shares broad serif type only; Rose Mandap shares floral/pink painted medium (no velvet); Temple Dawn shares broad serif type; Floral Elegant shares pink/floral/polaroid subject (explicit reference-driven exception, different opening/program/constellation); Storybook Garden shares illustration and natural garden subject, without wooden hero/leaf portraits/tickets/filmstrip; Ocean Serene shares no specific layout; Varnika shares painted medium/serif; Sannidhi shares painted medium/serif; Kalyana Vaibhavam shares rich framing/serif/painted art (different fairy birthday theme); Epure shares broad serif type; Vesper shares no specific layout; Little Wonder shares children's-book medium and birthday context, but all actual visual compositions, palette, shapes, type, opening, countdown, events and gallery differ. Approved for faithful asset production.

## Step 3 — Asset plan
Built-in imagegen: separate portrait/landscape floral birthday garden and moon closing; consistent fictional girl portraits and childhood memories; transparent rose/leaf edge; transparent cake/gifts/feast illustration sheet; flower-arch venue. Images contain no names or text. Local WebPs, real alpha checked, responsive sources, image budgets enforced. Geometric icons and crown/butterflies authored SVG. Shared samples copied first.

## Step 3 — Final asset review
All final paintings are saved in assets/ and inspected. Separate portrait/landscape opening and closing paintings retain the fictional girl's face, flower tiara and pink dress. The central portrait and six object crops have genuine alpha. The atlas was checked by compositing over the actual pale pink paper; stored RGB colors under alpha-zero pixels are not a background. A complete inventory, exact prompts, source originals and font licences are in ASSETS.md and generation-prompts.json. All text remains HTML. The original generated music-box loop and its synthesis source are local.

Common images including alternate placeholders: 446,164 / 450,000 bytes. Desktop-only images: 377,790 / 400,000 bytes. Phone opening: 101,460 / 150,000 local image bytes including its bouquet. Only the appropriate portrait/landscape background is requested at each breakpoint. Full runtime budgets include the shared core, Blessings and local MIT QR encoder; exact final sizes are in asset-report.txt.

## Step 4 — Builder
Plain HTML/CSS/vanilla JS. Shared/core.js and shared/blessings.js supply all existing RSVP, gallery, validation, countdown, calendar, URL, music/share and payment-claim behavior. No library, backend, key or secret is introduced. Newly added wishbook.js is a theme-local optional interaction, with a callback boundary and truthful local-only feedback.

The user's reference controls the birthday reading order: the opening is the floral cover; the invitation begins with the Our Little Star portrait/polaroid constellation and its message, then a compact matching countdown, illustrated party program, venue/map, RSVP/wishbook and crescent-moon farewell. To avoid duplicating the birthday child's portrait and message, the single birthday portrait and blessing builders are composed inside the hero. Two-person fixtures retain the separate family block, side matching and monogram fallbacks. This is an explicit reference-driven exception to the older fixed section-position rule, not a missing feature. Gallery, video and stream builders remain functional and appear when their fields are supplied; the default demo leaves them empty because the reference does not contain them.

The live age comes from optional birthdayAge (validated integer 1–125), falling back to an ordinal birthday event label. Optional milestones adds labels/years to photoSlots.story; event.description supplies compact reference-style copy. Optional landmarks provides venue-adjacent labels without inventing travel-time estimates. Base JSON field names are unchanged. Optional wishbook.enabled and wishes supply the requested wish cards. Seeded cards are labeled Sample wishes. Newly written wishes are safely rendered and persisted only on this browser/device when no onInviteWish callback is installed. The UI explicitly says so. A callback can accept/reject a wish, with loading, preserved inputs and retry. No network posting or public delivery is claimed.

Mobile keeps all four tilted polaroids around the central portrait, not a stacked list. Desktop expands the same composition into a wide garden stage, a two-column program and side-by-side venue/map; RSVP/wishes share a two-column stationery layout. Tablet has separately sized portraits/captions and spacious frames. Short landscape screens use a three-part opening with inscription, intact artwork and a compact action side panel; its Open Invitation button fits the viewport. Continuous tiny heart drift and butterfly wings are visible on phones, paused offscreen/hidden and disabled for reduced motion. The scroll path and its tip draw in phone and desktop vertical stems. Photo centering uses the independent translate property so reveal transforms cannot move the child to the side. Main and calendar controls remain keyboard/touch reachable.

The closing portrait painting is shown in full on phones, with live heading/message in its painted clearings. Credits and the shared floating-control clearance extend the pale floral floor; no clipped moon or dark empty block. Desktop uses its independently composed landscape scene. Indic names retain the safe roman/italic display face. English name inscriptions use calligraphy to follow the user’s explicit reference-fidelity correction; no Indic letter-spacing or foil clipping.

## Step 5 — Build review
Required shoot runner passed: phone/desktop opening and scroll screenshots, all seven specified widths, empty/birthday/Telugu fixtures, guest-name injection and reduced motion. See shoot-report.txt. qa/check.mjs passed center alignment, four polaroids, touch swipe/keyboard gallery, event location disclosures, UTC ICS export, Google Calendar URL, RSVP errors/retry/success, wishbook required fields/safe rendering/local persistence/callback retry, 320–2560px widths, gallery counts, faith variants, family side matching, deferred video/live, eight events, long names, today/past countdown, empty fields and actual phone butterfly/line motion with hidden-tab pause.

qa/blessings.mjs passed mobile intent/desktop QR decoding and regeneration, encoded amount/URI agreement, validation, callbacks/retry, single success, restored references, name injection and invalid/disabled hiding. Default gifts are disabled; alternate demos cannot launch a payment. Test-only synthetic live intents are decoded without initiating a payment.

Manual visual review includes opening, whole principal sections at 390/1440, 820 tablet, 844×390 opening, and Telugu glyph/leading stress. Four-polaroid placement, full moon composition, contrast and photo clarity were reviewed; small controls retain visible focus rings. The actual embedded map was observed rendering (.gm-style present), beyond verifying its URL. qa/delivery.mjs verifies the eleventh catalog entry, Birthday filter, existing ten entries unchanged, keyboard access through RSVP, visible focus and memory swipe handling. Test reports and final screenshots are committed.

Practical limit: mobile review is Chromium viewport/touch emulation, not a physical Android/iPhone hardware review. Public wish synchronization and live event media require the app owner's callbacks/content; no backend is shipped. No actual RSVP, payment or message to another person was sent.

## Step 6 — Delivery
One new theme on theme/fairytale-bloom, with original assets, prompt provenance, reports and screenshots. The standing user request to add future themes to Home is fulfilled through theme-local theme.json and the generated catalog entry. Existing theme files, including Little Wonder, are untouched. Delivery is through a GitHub pull request.

## Required section-6 checklist (birthday interpretation documented above)
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


### Checklist judgement calls
- Birthday identity, photo, monogram/family and invitation message are represented together in the Our Little Star chapter, following the explicit six-panel reference. No wedding relationship labels are invented for the default child.
- The opening uses the reference's You're invited to phrasing; personal salutation, scroll/focus lock and full ceremony/music behavior are retained.
- Event location/address/map actions are accessible in each card's location disclosure to keep the supplied compact schedule design. Supplied description text remains visible.
- The default gallery/video/live/gift sections are omitted cleanly because their data is empty/disabled, while fixture testing covers their complete behavior.
- Wishes are clearly marked demo cards or actual local/callback submissions, with no fake live guests, fabricated public delivery or backend.


### Reference-fidelity correction — 25 October 2026
The user reported that many layouts differed from the supplied six-panel birthday reference. Corrected the English calligraphic name hierarchy, enlarged the central phone portrait while preserving all four polaroids, and put chapter titles above the schedule ribbon and venue introduction. Opening lettering was resized to clear the painted girl’s crown.

The phone itinerary now pairs a larger six-arrow signpost with compact illustration cards; desktop uses two columns with two drawing stems. Dates, addresses and map links remain available through keyboard-accessible pin disclosures with 44px targets. RSVP uses compact name/phone and attendance/guest rows when extra event/diet fields are absent. Wishes and the paper note share one desktop aside, preventing the former grid-row gap. Demo wish cards use local portrait avatars and keep the Sample wishes disclosure.

Validation rerun: required shoot runner, full theme behavior suite, asset/runtime budgets and four-viewport chapter captures. Added visual assertions for title/introduction order, loaded wish avatars and the two-column desktop program. Reviewed phone opening, memory, itinerary and RSVP and desktop itinerary/response screenshots. No changes to other themes or shared validation behavior.

### Floral corner direction correction — 25 October 2026
The transparent bouquet painting is drawn for a bottom-right corner. The user identified incorrectly oriented flowers in the memory, RSVP and closing chapters. The memory chapter now rotates the top-left bouquet 180 degrees and renders its bottom-right bouquet independently. RSVP uses the original bottom-right orientation instead of mirroring the whole background layer. Closing credits mirror only the left corner, leaving the right corner upright. The subtle side rails likewise face outward. No content or section layout changed. Reviewed phone hero/RSVP/closing and desktop chapter captures; the required shoot runner and asset/runtime budgets were rerun.


## Art and motion refinement — October 26, 2026
User explicitly requested the two housewarming and two birthday themes together, overriding the usual single-theme task scope. Existing layouts/content/shared behaviors remain intact. Middle chapters now have actual transparent side artwork, asymmetric placement, soft artwork watermarks, visible phone-safe breeze and scroll depth; birthday butterflies articulate their wings, housewarming lights breathe. The artwork pauses offscreen/in hidden documents and becomes static under reduced motion. Opening/closing paintings retain their established composition. New scene-owned margins replace the tiny faded fixed birthday edges and isolated modern top corners. Each theme keeps its own artwork and motion timing. Validation follows in ART_MOTION_REVIEW.md.
