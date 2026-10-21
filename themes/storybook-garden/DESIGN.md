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
- [x] Music toggle (bottom-right): play/pause, pulsing ring while playing, `aria-pressed`
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

Validation: required shoot passed. tools/check-scroll-motion.mjs verifies eased starts, exact 640px and 1800px gestures, reversal, scroll-linked depth, gallery lock/Escape, native keyboard End outside the gallery, reduced motion, touch behavior and 390/820/1440 widths. All seven results are in tools/scroll-motion-report.txt. Chromium automation and local in-app inspection were used; physical iOS/Android devices were unavailable. Latest gzip: JS 15633 bytes, CSS 8156 bytes, within 60KB/25KB limits. Earlier image-budget exceptions remain unchanged.


## Phase 1 — invitation bug fixes and tier metadata, 21 October 2026

The user approved fixes across all seven existing templates and basic/premium metadata. This collection-wide task intentionally extends the usual one-theme scope. Full shared-core migration, UPI Blessings and merging into main are deferred.

C1: floating music/share controls sit bottom-right (16px phone/tablet, 24px desktop, plus safe areas), with 48px hit targets and visible keyboard focus. When a heading, field or primary action intersects them, the dock fades to 30% and pointer events pass through to the content. Keyboard focus restores the controls. Footer padding leaves clearance at the end. Reveal, resize and font/layout changes recalculate collisions. This is the requested fade policy; it does not promise zero geometric intersection during scrolling.

All openings prepare and decode local hero imagery beneath the still-visible cover before starting their own ceremony. Content remains inert until the ceremony completes. Audio playback still starts directly from the user gesture. Small canonical UI sources live in shared/invitation-ui.js and .css; tools/sync-invitation-ui.mjs copies them into each theme, retaining standalone folder hosting. This is not the deferred full core refactor.

C5: desktop opening/hero name spans wrap as words; adjusted desktop hero type fits the default names on the hanging sign. Extremely long single words retain emergency wrapping.

Metadata: ruvva-theme and ruvva-tier are present in the HTML and gallery catalog. Temple Dawn, Floral Elegant, Storybook Garden and Ocean Serene are basic; Varnika, Sannidhi and Kalyana Vaibhavam are premium.

Validation: required tools/shoot.mjs checks and refreshed phone/desktop screenshots; tools/check-invitation-fixes.mjs covers 390/820/1440 controls, collision sweeps, keyboard access, local source synchronization, tiers, unmodified shared fixtures, long names and injection. The required shoot additionally checks 360, landscape 844x390, 1280 and 1920. tools/check-opening-ready.mjs deliberately delays the three affected hero images and verifies that the cover waits. tools/audit-invitation-fixes.mjs captures 200ms opening frames and name-word ranges at 390/1440; before/after review images live in tools/invitation-fixes-review/. Scroll and gallery regressions are checked by the existing tools.

Manual visual review used generated Chromium phone/desktop screenshots and the before/after contacts, including the Storybook sign, Varnika footer, opening wipes and Temple contrast. Physical iOS/Android devices were unavailable. An attempt to refresh an old in-app browser error tab was blocked by browser URL policy; it was not bypassed. Automated local Chromium screenshots were used for visual review. Existing section-6 functionality and original assets remain intact; the earlier image-weight exceptions remain unchanged. Combined app + helper gzip weights are reported in tools/invitation-fixes-report.txt (rather than omitting the helper).

## Garden continuity refinement — 21 October 2026

### Art direction and design review
The user approved refining Storybook Garden first. Keep the illustrated lakeside story, hanging sign, wood, leaf portraits, itinerary tickets and filmstrip. Replace disconnected solid section colors with one warm cream page, restrained fern/apricot washes and continuous botanical margins. The live invitation becomes an illustrated garden pavilion rather than a dark color block; RSVP is a letter on the same paper, and the closing joins live names with the supplied closing image. New original vector drawings use the existing garden palette, remain decorative and keep reading/form areas clear. No repeated overhead garlands. Do not change the other six themes or introduce new functionality.

This is a refinement of the existing theme, not a new DNA seed. Existing distinctness against the other themes is retained: wood-sign ceremony, leaf portraits, hanging pennants, perforated itinerary tickets and horizontal filmstrip. Kalyana's devotional art, palette, frames and layout are not reused. Review approved: the new surfaces serve the original storybook concept and the user's request for visual continuity.

### Asset and build review
Two original SVG illustrations were authored for this refinement: continuous botanical margins and a garden pavilion. Provenance is recorded in ASSETS.md. Both contain only vector paths, fills and reusable symbols; no external images, embedded text or font dependency. The margins are decorative CSS, scroll with the document, stay faint at the edges and add no animation loop. The pavilion is a focusable link to the same validated live URL as the Watch Live button. Opening/hero artwork, ceremony, fonts, sample data, section order and required behavior are preserved.

The new theme-local garden-refinement.css keeps the established stylesheet intact and changes the interior surfaces to one warm paper. Soft washes remain within the fern/apricot palette; headings retain fern and primary actions retain raspberry. Itinerary event colors still identify their different rituals. The footer is a picture-book spread on desktop and a stacked inscription plus complete photograph on phone, with a text-only fallback when no closing image is supplied. The closing picture uses its natural ratio and object-fit:contain rather than cropping.

Validation passed: required `node tools/shoot.mjs storybook-garden`; qa/interactions.mjs; qa/edge-cases.mjs; qa/experience.mjs; qa/continuity.mjs. Reports and fresh screenshots are saved in this folder. Reviewed phone/desktop sections, tablet live/RSVP/footer, and Telugu couple text. The experience checker was corrected to stop a prior wheel gesture before resetting scroll, avoiding a race between its last animation frame and a programmatic reset. No production scrolling code changed. Its budget calculation now includes both helper files, garden-refinement.css and SVG images rather than omitting them.

The existing contrast values remain applicable: fern headings on cream 7.07:1, body ink 10.82:1, muted copy 5.29:1, white actions on raspberry 6.14:1. No fonts or Indic tracking changed. The continuous scenery is behind the content; keyboard focus and reduced-motion behavior are preserved. The 390/820/1440 continuity checks verify the same paper surface, matching live links, full uncropped closing image and no overflow or page errors. Required shoot additionally covers landscape and 360/1280/1920; edge cases cover 320–2560, eight events, gallery sizes, faith variants and single-name occasions. Physical devices were unavailable; visual and interaction review used local Chromium.

### Delivery
Only themes/storybook-garden/ is changed from the latest fixes branch. New screenshots, vector sources, asset notes and QA reports accompany the refinement. The existing seven-theme collection and shared core source are unchanged. Merge into main and UPI remain outside this task.

## Final garden motion — 21 October 2026

The user approved the three proposed restrained effects for Storybook Garden before a later batch of other themes. Existing scenery remains still: four small edge sprigs and existing portrait/corner leaves sway by about 1–1.5 degrees. The pavilion pennants move slightly in the breeze, and the perched bird stretches its wing twice during a short part of each 14-second cycle, resting for the remainder. Story photographs use the existing once-only reveal with softer timing; the closing picture has its own small upward fade, with no image zoom, cropping or rotation during its entrance. Avoiding rotation also prevents a transient 1px overflow during viewport resizing.

The original pavilion SVG is now inlined as a static, project-authored SVG string so CSS can animate individual parts and the existing section visibility controller can pause them. No new runtime fetch, library, timer, RAF loop, text animation or external request was introduced. All new continuous effects default to paused, run only in a visible motion-active section, pause when the document is hidden, and become static under prefers-reduced-motion. The static SVG source remains in assets/ for provenance; its helper in app.js is the runtime representation.

Validation: qa/garden-motion.mjs verifies actual flag/leaf pose changes, offscreen pause, the document-hidden event handler through a simulated hidden state, once-only closing reveal, reduced-motion static visibility and no overflow at 390/820/1440. qa/interactions.mjs also checks live resizing from 320 through 2560, calendar, RSVP, gallery and sample-data behavior. qa/continuity.mjs, qa/experience.mjs and the required shoot were rerun, with updated reports and screenshots. All motion uses transforms on small decorative elements; the SVG scene, photo source dimensions and core scrolling remain unchanged. Physical device and real OS background-tab testing were unavailable.

## Mobile-first motion visibility — 21 October 2026

The user reported that desktop effects were visible but phone effects were not. The previous 43px, 32%-opacity sprigs and 2.5-degree total leaf sweep were too restrained at phone scale. At widths below 600px, edge sprigs now measure 66px at 64% opacity, with a 12-degree breeze sweep over 4.6s. The existing faint full-page illustration remains static and unchanged. Pavilion pennants use a more readable apricot fill and a larger gentle skew; the perched bird is 1.45x its former phone size and its occasional wing stretch recurs every 6s rather than 14s. Story photo entrances travel 34px and closing entrances 28px. Native-scroll portrait depth is slightly stronger on narrow screens, while desktop amplitudes remain unchanged. Reading areas and form fields do not animate.

The new phone-specific settings still pause offscreen and on hidden-document events and stop under reduced motion. Reduced-motion styling also explicitly resets an unseen story page's transform. No new dependencies, raster assets, timers or animation loops were added.

Validation: garden-motion.mjs now uses coarse-pointer, touch-enabled phone/tablet contexts. At 390px it measures 10.1 CSS pixels of leaf-tip movement between the cycle extrema and sends native Chromium touch events for a real scroll gesture; document scrolling and portrait-depth changes both pass. It also verifies pause/resume and static reduced-motion content at 390/820/1440. Continuity, interactions, experience and required shoot pass, covering 320–2560 resizing, data variants, gallery, RSVP and calendar behavior. Updated screenshots and reports are saved. This is browser device emulation, not a physical-device performance claim. Current combined gzip totals are recorded in refinement-budget.txt and experience-report.txt.
