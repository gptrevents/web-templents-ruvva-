# Ocean Serene

## Step 1 — Art direction
A contemporary seaside invitation, where names meet at the horizon and every chapter carries a little sea breeze.

The user's ocean moodboard supplies the sea, palms, calm luxury and sunset warmth; its repeated phone-card skeleton is not copied. New blue/pearl art, animated water, drifting clouds and original flying gulls create the setting. All names and content remain live HTML. The moodboard is inspiration only, not a shipped asset. No menu or logo is added to the invitation.

| # | Axis | Choice |
|---|---|---|
| 1 | Palette | Aquatic monochrome: deep ocean ink #073c4d, cyan #087e98, salt white #f7fcfc, mist blue #e2f1f4; restrained sand highlight |
| 2 | Type | Thin fashion serif Italiana and geometric Outfit; no script names |
| 3 | Opening | A rising tide washes the opening away and reveals the horizon |
| 4 | Shapes | Long sinusoidal wave edges, broad horizon rules and fluid section bands |
| 5 | Ornament | Seagulls, cloud banks, shell ribs and sea-foam lines |
| 6 | Hero | Two large names balanced across a wide ocean horizon, with an ampersand at their meeting point |
| 7 | Couple | Two rectangular editorial portrait panels in one shared frame with a shell seam |
| 8 | Countdown | Four unboxed tide numerals on a flowing wave baseline |
| 9 | Events | Accessible day tabs with a tide-line navigator and day-specific wide itinerary panels |
| 10 | Gallery | Circular porthole photographs in a wave-connected garland grid |
| 11 | Motion | Calm linear current, water refraction, gliding cloud banks and articulated gull wings |
| 12 | Texture | Clear photographic water, fine sand and salt-white surfaces |
| 13 | Desktop | Broad maritime horizon, paired editorial panels, tabbed day stages and porthole contact wall |

## Step 2 — Design review
Compared against Royal Maroon, Rose Mandap, Temple Dawn, Floral Elegant and Storybook Garden. The required palette/opening/shapes/events/gallery axes differ from every one. Ocean Serene uses cool aquatic monochrome and white; Storybook Garden uses a multicolored fern/apricot/coral illustrated coast, with wood, paper and cartoon figures. Specific typography differs; conservatively count broad serif/sans axis 2 as shared with Royal Maroon, Temple Dawn, Floral Elegant and Storybook Garden (one axis each). Rose Mandap shares the broad photographic/cinematic spirit only (axis 11, one). No comparison exceeds three. No existing CSS layout skeleton will be reused. Approved.

## Step 3 — Asset maker
Shared samples were copied first. Original portrait and landscape beach backgrounds, a fictional adult couple and their seaside story, sunset and venue samples will be generated with the built-in imagegen tool. Prompts and shipped dimensions will be recorded in ASSETS.md. SVG supplies moving gulls, clouds, foam, ripples, shell dividers and icons; no transparent raster asset is required. Two Google Font families only.

All seven generated assets are now copied and visually reviewed. Beach art has distinct portrait/landscape compositions; fictional adult character samples consistently use blue/ivory linen. Common images including copied alternate placeholders total 412,958 bytes, desktop background 144,550 bytes. No transparency processing is needed. Approved.

## Step 4 — Builder
The theme uses new CSS and independent visual builders. Tested safe data, RSVP, ICS, video and lightbox utilities are adapted into this theme-local script. Opening content hides the interior until the guest taps. Section atmosphere is SVG and CSS; desktop water uses bounded displacement, phone water uses compositor transforms. Motion will pause when offscreen/hidden and for reduced motion.

## Step 5 — Build review

`node tools/shoot.mjs ocean-serene` passed after implementation and layout refinements. It captured opening and scroll states at phone/desktop, checked 360/390/844×390/820/1280/1440/1920 widths, empty/birthday/Telugu samples, untrusted guest names and reduced motion. No horizontal overflow or page errors. A theme-local copy of the runner is qa/visuals.mjs.

Additional interaction checks passed: families match by side, background unlocks after opening, YouTube appears only after tap, viewer arrows/Escape/focus work, RSVP inline validation/loading/failure/preserved input/success payload work, No hides the guest count, ICS download is generated, and 320–2560px fits. Edge checks cover gallery counts 1/2/3/6/12, today/past countdown, all four faiths, invalid URL rejection, music aria-pressed, keyboard focus, landscape and tablet.

qa/experience.mjs verifies only the matching beach image downloads before opening, unique ripple filter IDs, real moving sea-layer transforms, desktop SVG refraction, three articulated SVG gulls plus clouds/waves in every section, pausing offscreen and when the document is hidden, and full reduced-motion behavior. Day tabs support click, Left/Right, Home/End with proper tab/panel relationships; all day states have screenshots. Calendar/event information remains reachable in the appropriate day. 421px fine-pointer scroll easing and mobile viewer swipe pass. Countdown scheduling independently pauses when offscreen or the tab is hidden.

qa/names.mjs checks one-name birthdays, Telugu and two 34-character names at 320/390/820/1440/2560. Visual review caught the one-name desktop hero staying in a two-person column; it now centers the name across the horizon. Long-name attributes reduce type scale when needed. Indic line height is 1.55, all names wrap and no gradient text is used; small Indic labels get extra size. Telugu hero, couple and closing names were inspected for visible virama.

Visual review covers all 12 sections at 390 and 1440, plus opening, birthday, empty, Telugu, tablet and landscape. Desktop uses a wide horizon, side-by-side editorial portraits, day stages with multiple cards, three/four porthole columns, map/details columns, a horizontal live band and side-by-side Name/Phone. On phone the couple becomes compact portrait/text rows, the day rail scrolls within its region, stories use one panorama above two photographs, and the closing letter comes before a full-width sunset. Photo-free closing data gets a compact centered dark band instead of an empty image area. The brief's required relative section order is retained, with the optional story between Couple and Countdown.

Water uses small CSS transforms on phones and gentle SVG displacement on desktop. Names stay outside the water filter. Cloud and gull movement use transforms; animation loops pause offscreen/hidden. Two sea-region frame crops differed in the visual-motion check, confirming rendered water changes rather than an unused animation. Local headless Chromium at 1440×900 measured 16.7ms mean / 16.8ms p95 animation frames; see motion-measurement.txt. This measures the local test browser, not all hardware.

Contrast checks: ink on pearl 11.51:1, muted text on pearl 5.91:1, white on blue actions 4.72:1, white on deep ocean 11.91:1. Small labels over photography have an opaque pearl backing. Common/phone images are 412,958 bytes; the separate desktop-only background is 144,550. First opening image is 106,872 bytes phone / 144,550 desktop. Two font families. Final JS/CSS gzip measurements are in experience-report.txt and pass the 60 KB/25 KB limits. Catalog preview WebPs live in screenshots/ and are not downloaded by the invitation.

Judgement calls: the user's ocean seed overrides the next suggested repository seed. The connecting tide line links day markers, with a soft glow at its advancing tip; individual event icons pop when revealed. Tabs are an explicit day-based itinerary layout, so inactive days are hidden by interaction and accessible through the tabs, never hidden based on screen size. No RSVP backend is included: the specified callback/demo behavior is used. A declined response gets suitable thank-you copy. The generated beachfront venue is an illustrative sample rather than a claim about the named venue. The moodboard's hamburger is omitted as required.

### Required parity checklist


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

Branch theme/ocean-serene. Runtime is entirely inside this folder; no existing theme is changed or imported. The standing user request to place future themes on the home page is honored by registering Ocean Serene as the fourth card with small theme-local screenshot previews. Collection filtering/navigation checks pass with all four themes. Screenshots, exact generated-asset prompts, original audio source and test reports accompany the theme. Preview is local static hosting, not a public deployment.

## Scroll experience refinement — 20 October 2026

The user explicitly requested the refinement across all seven existing templates, overriding the usual one-theme scope for this update. The reference was inspected for behavior only: its root gains lenis/lenis-scrolling/lenis-smooth classes during scrolling, with independently moving scenery, portraits and headings. No reference code or assets were copied; no Lenis dependency was added.

Original vanilla JS now eases real-document wheel/trackpad scrolling over a 210ms response constant, preserves full fast-gesture distance and reverses direction immediately. Pointer/keyboard/focus, navigation, nested scrollers, opening and viewer locks remain native. Touch keeps browser inertia; scroll-driven motion also works on touch layouts. Theme-specific depths move whole portrait cards and ritual art; headings reveal with the scroll and gallery depth stays within tile gaps. Existing transforms, image crops, artwork, typography and layouts are retained. Only visible elements update after scroll/resize/intersection events, with no idle animation loop. Hidden tabs and reduced motion are respected.

Validation: required shoot passed. tools/check-scroll-motion.mjs verifies eased starts, exact 640px and 1800px gestures, reversal, scroll-linked depth, gallery lock/Escape, native keyboard End outside the gallery, reduced motion, touch behavior and 390/820/1440 widths. All seven results are in tools/scroll-motion-report.txt. Chromium automation and local in-app inspection were used; physical iOS/Android devices were unavailable. Latest gzip: JS 15183 bytes, CSS 8183 bytes, within 60KB/25KB limits. Earlier image-budget exceptions remain unchanged.
