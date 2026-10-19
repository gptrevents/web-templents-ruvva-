# Sannidhi — In the presence of joy

## Step 1 — Art direction
A vermilion temple celebration unfolds from the first lit lamp into a rice-white courtyard, with sculpted gopurams, swinging jasmine and a photographic fan of memories.

The traditional invitation supplied by the user is a behavior and richness benchmark. Its images, code, people, recording and wording are not reused. Varnika remains unchanged in Premium. Shared sample JSON and placeholder assets were copied before work began.

| Axis | Sannidhi decision |
|---|---|
| 1 Palette | Earthy vermilion #b94329, rice #fff9ed, ink-indigo #27314b and turmeric #dfa436; deep indigo opening only. |
| 2 Type | Fraunces optical serif + Hanken Grotesk humanist sans. Live names, no script name font. |
| 3 Opening | Tap to light an oil lamp: a warm light expands from the wick and the night gives way to the courtyard. |
| 4 Shapes | Woven saree-border bands, fine double-line square frames and pleated edges. No arches, folios, waves or scalloped floral cards. |
| 5 Ornament | Mango toran, jasmine knots, twin ceremonial elephants, kolam lattice and a sculpted gopuram. |
| 6 Hero | A grand centered name inscription in quiet sky above a layered temple panorama. |
| 7 Couple | Full-length rectangular silk portraits connected by a suspended jasmine swag. |
| 8 Countdown | Four suspended ceremonial bell plaques in a vermilion pavilion. |
| 9 Events | A folded ceremonial calendar wall: date columns containing all of that day's rituals, horizontally connected day markers and vertical drawn stems. Phone folds into full-width day panels. No tabs, disclosures or carousel. |
| 10 Gallery | A photographic fan: a central active photograph with fanned neighbors, indexed controls and swipe; the fan opens with section scroll. No grid, filmstrip, thumbnails or bound book. |
| 11 Motion | Ceremonial light expansion, multi-plane temple parallax, physical bell/toran sway and scroll-linked photo fan. |
| 12 Texture | Painted gouache on rice paper with woven cotton bands. |
| 13 Desktop | Full landscape temple panorama, wide paired portraits, horizontal calendar wall and generous fanned photographic stage. |

## Step 2 — Design review

| Compared theme | Shared axes (conservative) | Mandatory 1 / 3 / 4 / 9 / 10 |
|---|---|---|
| Royal Maroon | 2 serif/sans, 6 centered names, 11 ceremonial pacing | Different |
| Rose Mandap | 2 serif/sans, 11 cinematic motion, 12 painted medium | Different |
| Temple Dawn | 2 serif/sans, 5 temple/botanical subject, 11 sacred pacing | Different |
| Floral Elegant | 2 serif/sans, 5 botanical subject, 12 painted medium | Different |
| Storybook Garden | 2 serif/sans, 5 botanical subject, 12 illustration | Different |
| Ocean Serene | 2 serif/sans, 11 parallax | Different |
| Varnika | 2 serif/sans, 5 Indian ornament, 12 painted paper | Different |

Approved before implementation. A vermilion temple illustration is distinct from Temple Dawn's photographic olive/sand architecture and Varnika's jade miniature garden. The foldout day wall and photographic fan supply genuinely new event and gallery structures. The theme subject intentionally follows the user's request; none of the mandatory five axes is shared. Temple architecture is a cultural setting rather than a faith-specific deity; blessing icons are selected from the JSON faith value.

## Step 3 — Asset maker
Planned original built-in imagegen assets: separately composed portrait/landscape temple panorama, transparent jasmine/mango/marigold toran, transparent ceremonial elephant frieze, original fictional adult couple photographs and ritual close-ups. All prompts and optimized asset paths will be recorded in ASSETS.md. Geometric kolam, controls, bells and ceremony icons are authored inline SVG. Theme-local original synthesized music will be used. No artwork will be copied from the benchmark.

Original portrait and landscape temple paintings, transparent toran and elephant frieze, four fictional-couple/ritual photographs and two portrait derivatives were produced with built-in imagegen. Alpha channels were checked for both decorations; they contain real transparent and opaque pixels. The images were visually reviewed. Assets are theme-local optimized WebPs, with separate desktop/phone scenery. Exact prompts and dimensions will be recorded in ASSETS.md. Asset review approved.

## Step 4 — Builder
Independent section builders and CSS implement the lamp-light reveal, temple panorama, woven border bands, hanging bell countdown, date-grouped folded calendar wall and photographic fan. Safe calendar/RSVP/viewer/data utilities were adapted from our existing theme engine into this folder; no runtime imports from other themes. Temple and canopy move separately; pond light, birds, bells and canopy sway use lightweight transforms. The real document scroll is preserved. Continuous decoration pauses offscreen and in hidden tabs, and reduced motion presents a static complete invitation. A first local preview is running for visual review.

## Step 5 — Build review

The required `node tools/shoot.mjs sannidhi` checks run against the theme folder and save the phone/desktop opening and scroll screenshots, seven required viewports, empty/birthday/Telugu samples, guest injection and reduced-motion capture. Its final result is in shoot-report.txt. Additional interaction and visual suites are preserved in qa/ and the theme-local reports. No test result is claimed from simply reading code.

Verified interactions: opening removes its overlay and releases scroll/focus, correct parent matching by family side, YouTube only after a tap, native full viewer with arrows/Escape/counter/swipe/focus return, inline RSVP name/Indian-phone validation, No hiding guest count, callback rejection preserving data, callback success payload, Google link/ICS download, music play/pause/aria-pressed, and Copy Link. A neighboring fan photograph opens the full viewer immediately, as required, while index/arrow controls select photos. All six collection links open their real invitations and browser Back returns to the collection.

Verified edge cases: gallery counts 1/2/3/6/12, one and eight events, today/past countdown states, all four faith choices, invalid video/live URLs, two long names and a single long birthday name, widths 320 through 2560. Keyboard traversal reaches the form and controls with visible focus. Gallery Home/End, arrows and touch gestures work. Each data fixture uses local rendering; no production RSVP or external message was sent. The RSVP demo has no backend: production provides window.onInviteRsvp.

Motion checks verify only the toran image on the opening, only the matching phone/desktop temple scene after opening, the expanding light transition, separate panorama movement, a visible-only countdown, drawing day threads, fan selection and gestures, and paused decoration in hidden/offscreen/reduced-motion states. Fine-pointer wheel input retains a 640px impulse on the actual document; native touch remains native outside the explicit gallery gestures. These checks do not establish universal device frame rates. Speaker output was not subjectively listened to; browser audio state and the original file were verified.

Visual review covers every required section at 390 and 1440, both openings, a mid-opening frame, tablet 820, landscape 844x390, reduced motion, empty, birthday, two long names and Telugu. Fixed controls have their own outer rail, outside the content/form width; no RSVP submit overlap. The landscape hero has a quiet paper wash behind the names and fits the short viewport. The footer painting fades into paper rather than ending in a hard rectangle. Explicit decoration dimensions preserve layout while CSS retains natural aspect ratios. The Telugu name spans use generous line height; the virama in opening, hero, couple and closing stays visible and no name is gradient-clipped. Longer names wrap in the quiet sky, not over carved detail. No content is removed at a breakpoint.

Desktop is a composed landscape scene, paired rectangular silk portraits, four bells in one row, a four-column folded calendar wall (two columns on tablet), a wide photographic fan, 960px video, 60/40 map/details, horizontal live band and two-column form fields/events. Phone uses portrait scenery, stacked families, two-by-two bells, successive day folds and a compact fan. Single-name occasions center the portrait and omit the ampersand. All submitted data uses textContent/setAttribute. Static SVG contains only authored drawing instructions; no data enters SVG markup.

Contrast on rice: ink 12.31:1, muted body 5.93:1, vermilion 5.14:1 and haldi label 4.98:1. Rice on vermilion is 5.14:1. Bright ochre strokes are ornamental. The final measured byte counts are in weight-report.txt; common images stay below 450,000 bytes including alternate placeholders, desktop extras below 400,000, opening below 150,000, CSS below 25,000 gzip and JS below 60,000 gzip. Two font families, no runtime library. Both decorative bitmap assets have genuine alpha. Sources, exact imagegen prompts and font licences are in ASSETS.md.

Judgment calls: the user explicitly wants a new premium temple experience, so the brief's basic label does not constrain the art direction. Structural feature parity follows the engine brief where the reference differs: countdown before events; three attendance choices and extra guest fields; a tap-loaded video; desktop map/details columns; no price/order pill. Folded date groups and the photograph fan intentionally replace the reference's grid/card composition. Temple architecture remains the chosen cultural setting for all fixtures; faith-specific blessing icons follow faithId and no separate deity image is used. The fictional temple/couple images illustrate a style rather than claiming to depict the JSON venue or real hosts. Google Maps may be unavailable in restricted/offline conditions; address/directions still work. No live calendar account was modified. Research records what was actually observed and its limits, without copying source assets, in RESEARCH.md.

### Section 6 parity checklist



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
- [x] Music toggle (top-right): play/pause, pulsing ring while playing, `aria-pressed`
- [x] WhatsApp share button: opens `https://wa.me/?text=<encoded page URL>`; uses `navigator.share` when available
- [x] Neither covers text; both ≥ 44×44 px
- [x] No hamburger menu, no app logo at the top, no price tag

### Optional (build only if the theme's concept needs it)
- Our Story timeline using `photoSlots.story`
- Wishes box
- Gifts / UPI (only when `gifts.enabled`)


## Step 6 — Delivery

Branch theme/sannidhi. Runtime assets, code, sample JSON, original music, exact prompts, research notes, verification reports and screenshots are inside this theme folder. The user’s standing request to add every new template to the home page authorizes the minimal collection metadata/manifest/previews/screenshots update outside the folder. The existing themes, including Varnika, are unchanged. The collection now contains six templates and two Premium entries. The gallery search test uses the specific existing name “temple dawn” because generic “temple” now correctly matches two designs. The new pull request is stacked on theme/varnika; no existing PR is merged by this task. Preview is local static hosting, not public deployment.
