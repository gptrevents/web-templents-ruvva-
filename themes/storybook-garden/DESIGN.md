# Storybook Garden

## Step 1 — Art direction
A hand-illustrated lakeside garden where a hanging wooden invitation opens into a bright, playful story of two people finding the same path.

The user's illustrated-cartoon moodboard supplies the tree canopy, wooden sign, illustrated adult couple, lakeside scenery and youthful joy. It is a style reference, not an image to embed. All names and useful text remain live HTML. Required invitation sections follow the repository order; the moodboard's hamburger is omitted as required by the brief.

| # | Axis | Choice |
|---|---|---|
| 1 | Palette | Sunlit coastal storybook: sky blue #cceaf1, fern #365d45, apricot #f4be83, warm cream #fff8e8, raspberry #af315d |
| 2 | Type | Friendly slab display Bree Serif with geometric Plus Jakarta Sans; no script names |
| 3 | Opening | Hanging wooden sign releases its rope, swings and sails away; a butterfly flies across the revealed scene |
| 4 | Shapes | Hand-inked irregular timber edges, ribbon cuts and perforated travel tickets |
| 5 | Ornament | Butterflies, songbirds, rope knots and little stepping stones |
| 6 | Hero | Illustrated panorama and suspended wooden name-board, typography held in the landscape |
| 7 | Couple | Leaf-shaped portrait windows and a little shared bench joining the two |
| 8 | Countdown | Four hanging wooden pennants; changing digits flip like small signs |
| 9 | Events | Perforated itinerary tickets on a winding stepping-stone trail, two-column folded map on larger screens |
| 10 | Gallery | Horizontal illustrated filmstrip with peek, scroll snap and visible previous/next controls |
| 11 | Motion | Playful spring, rope pendulum, butterfly flight and page-like ticket reveals |
| 12 | Texture | Gouache illustration, pencil edges and painted wood grain |
| 13 | Desktop | Open picture-book landscapes, broad ticket map, wide filmstrip and paired leaf portraits |

## Step 2 — Design review
Compared against Royal Maroon, Rose Mandap, Temple Dawn and Floral Elegant. No exact DNA axes are shared. Conservative family overlaps: Royal Maroon shares the broad serif-plus-sans type family (axis 2, 1 total); Rose Mandap shares the broad illustration medium (axis 12, 1 total); Temple Dawn shares the broad serif-plus-sans family and natural timber material (axes 2/12, 2 total); Floral Elegant shares the broad serif-plus-sans family and garden subject (axes 2/5, 2 total). The palette family is coastal sky/lake/fern/apricot, distinct from Floral Elegant’s blush/rose pastel family; raspberry is a restrained action color. Mandatory axes 1/3/4/9/10 differ: no maroon/gold or blush floral field, no doors/velvet/fade/bloom ceremony, no arches/scalloped paper, no existing event skeleton, no masonry/featured-plus-thumbnails gallery. Approved for build.

Fonts use variables, names wrap, English tracking is guarded by html[lang=en]. Text uses dark fern/raspberry rather than low-contrast bright pink. User-requested illustrated people are explicitly fictional adults. Portrait and landscape backgrounds are separate and selected by media query.

## Step 3 — Assets
Pending original built-in image generation. Prompts, sources, optimization and budgets will be recorded in ASSETS.md. Geometric ornaments and icons will be original inline SVG. Shared sample assets have been copied before implementation as required.

Original portrait and landscape garden illustrations, the final cartoon couple, and sunset illustration have been generated and visually inspected. Early portrait/gallery candidates were rejected as too photographic; the final character direction uses clear drawn outlines and cartoon adult faces. Two story scene variants are being finished with that final character reference. No transparent bitmap is needed: all separate butterflies, leaves, board grain and benches are code-native SVG.

## Step 4 — Builder
Implementation uses local plain HTML, new CSS and theme-local vanilla JS. Safe data/RSVP/calendar/lightbox/motion utilities are adapted from the existing working implementation, while the opening, hero, portrait frames, countdown, itinerary trail, gallery and story layouts are rebuilt for this theme. No runtime imports from another theme.

## Step 5 — Build review

Passed `node tools/shoot.mjs storybook-garden` after fixing an observed 3px overflow caused by rotating the full-width closing section's reveal wrapper. Retained rotation on the filmstrip frames, removed it from full-width section reveals. The final run covers phone/desktop opening and scroll captures, 360/390/844×390/820/1280/1440/1920 widths, empty/birthday/Telugu, guest injection and reduced motion. The local duplicate runner is qa/visuals.mjs.

Additional qa/interactions.mjs and qa/edge-cases.mjs passed: full RSVP validation and loading, rejected callback retaining data, successful declined response payload, correct family side matching, generated calendar download, delayed YouTube insertion, lightbox arrows/Escape/focus, 320–2560px, long names and eight events, gallery counts 1/2/3/6/12, today/past countdown, four faith variants, unsafe URL rejection, music aria-pressed, keyboard access with focus rings, phone landscape and tablet captures. Optional story hides when the supplied story array is empty.

qa/experience.mjs verifies the unique original opening artwork, matching portrait/landscape requests, deferred interior image loading, event trail drawing, gallery arrows and keyboard, mobile viewer swipe, and eased wheel/trackpad scrolling at the user's previously troublesome 421px width. The real document scrolls; touch, reduced motion, keyboard/focus changes, forms and modals retain their native interaction rules. Continuous decoration pauses offscreen or when the tab is hidden; countdown ticks only while visible. The dialog owns focus until opening; inside content is both hidden and inert until the guest opens it.

Visual review: inspected all 12 section captures at phone and desktop, plus tablet/landscape, birthday, empty and Telugu variants. Couple portraits sit side by side on desktop; one-person layouts center their card. The event trail has perforated tickets on a two-column winding route; the gallery is a native horizontal filmstrip. Venue map and details sit side by side, live stream becomes a horizontal band and Name/Phone share a row on desktop. Telugu virama is visible in the hero, portrait names and closing names; there is no foil/gradient text. Larger Indic labels are explicitly covered. The wooden board uses unique SVG gradient IDs so the hidden hero cannot affect the visible opening sign.

Measured contrast: body ink on cream 10.82:1; muted body 5.29:1; fern headings 7.07:1; white on raspberry actions 6.14:1; large names on the darkest wood stop 4.32:1 (above the 3:1 large-text minimum). Small pennant labels use a darker brown. Date/venue labels have a cream backing to remain readable over the changing landscape.

Weights: common/phone images 448,806 bytes (including unused copied alternate sample placeholders); separate desktop-only background 141,040 bytes. Opening image request is only 103,352 bytes on phone or 141,040 on desktop, both below 150 KB. Two font families. Final JS/CSS gzip counts are in experience-report.txt; both pass the 60 KB/25 KB limits. The landscape background uses the brief's additional desktop image allowance; total raw image bytes including it are 589,846. Catalog preview WebPs under screenshots/ are used only by the collection, never by the invitation.

Judgement calls: the user's illustrated seed overrides the next suggested theme seed. An optional picture-book story is added between Couple and Countdown; all required sections retain their relative order. The illustration is a fictional wedding sample and the illustrated pavilion does not claim to depict the named real venue. Birthdays retain the theme's garden backdrop but use one name, one centered profile, occasion labels and no couple-specific family content. No RSVP backend is shipped: the specified callback/demo behavior is used. Declined responses receive suitable thank-you copy instead of claiming attendance.

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

Theme branch: theme/storybook-garden. Production runtime is self-contained in this folder. No first/second-theme files are modified. The user's standing request to place future themes on the home page is honored with catalog metadata, small screenshot previews, a generator preference for theme-local preview WebPs, and collection QA updated to handle any theme count. No invitation runtime imports the collection. Gallery navigation and filtering checks pass with all three themes.

Screenshots and reports are committed alongside the source. The root theme test helper and background/reference inputs remain supplied workspace files; a runnable copy of the visual checker is included under qa/. Artwork sources and final prompts are in ASSETS.md. Public preview is not deployed; these are local static preview servers.

## Scroll experience refinement — 20 October 2026

The user explicitly requested the refinement across all seven existing templates, overriding the usual one-theme scope for this update. The reference was inspected for behavior only: its root gains lenis/lenis-scrolling/lenis-smooth classes during scrolling, with independently moving scenery, portraits and headings. No reference code or assets were copied; no Lenis dependency was added.

Original vanilla JS now eases real-document wheel/trackpad scrolling over a 210ms response constant, preserves full fast-gesture distance and reverses direction immediately. Pointer/keyboard/focus, navigation, nested scrollers, opening and viewer locks remain native. Touch keeps browser inertia; scroll-driven motion also works on touch layouts. Theme-specific depths move whole portrait cards and ritual art; headings reveal with the scroll and gallery depth stays within tile gaps. Existing transforms, image crops, artwork, typography and layouts are retained. Only visible elements update after scroll/resize/intersection events, with no idle animation loop. Hidden tabs and reduced motion are respected.

Validation: required shoot passed. tools/check-scroll-motion.mjs verifies eased starts, exact 640px and 1800px gestures, reversal, scroll-linked depth, gallery lock/Escape, native keyboard End outside the gallery, reduced motion, touch behavior and 390/820/1440 widths. All seven results are in tools/scroll-motion-report.txt. Chromium automation and local in-app inspection were used; physical iOS/Android devices were unavailable. Latest gzip: JS 15567 bytes, CSS 8156 bytes, within 60KB/25KB limits. Earlier image-budget exceptions remain unchanged.
