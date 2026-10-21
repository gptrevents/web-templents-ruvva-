# Floral Elegant

## Step 1 — Art direction
A romantic garden invitation unfolding like a pressed-flower keepsake, in rose, blush and soft green.

The user's floral moodboard informs the natural flower canopy, warm paper, layered photographs and romantic mood. The established data contract and required section order take precedence over the moodboard's eight-page sketch. Script is reserved for the ampersand and fixed English decoration; names use an Indic-safe book serif.

| Axis | Choice |
|---|---|
| 1 Palette | Pastel blush #fce9ec, rose #b33359, cream #fffbf6, sage #63816a |
| 2 Type | Lora book serif + Nunito Sans rounded humanist sans; Parisienne ampersand |
| 3 Opening | An original SVG flower blooms, its petal-shaped paper panels expand away |
| 4 Shapes | Scalloped keepsake paper edges and folded photo corners |
| 5 Ornament | Natural cosmos, dogwood, tiny blossom clusters and loose petals |
| 6 Hero | Asymmetric floral stationery and floating photograph composition |
| 7 Couple | Tilted polaroid portraits, both side by side on desktop |
| 8 Countdown | Four circular blossom dials |
| 9 Events | Horizontal ceremony postcards on a growing flower-stem rail |
| 10 Gallery | Variable-height masonry contact wall |
| 11 Motion | Soft floating, petal unfurl, paper lift and light elastic settling |
| 12 Texture | Fine cotton-paper grain |
| 13 Desktop | Wide layered scrapbook with offset photographic and typographic panels |

## Step 2 — Design review
Compared with Royal Maroon, Rose Mandap and themes/temple-dawn. No exact axes are intentionally shared with Temple Dawn: palette, type, ceremony, shape, motif, hero, couple, countdown, events, gallery, motion, texture and desktop arrangement all change. Royal Maroon: no exact shared axes. Rose Mandap: the broad floral subject is related, but its roses/watercolour ornament, jewel-dark velvet opening, rounded cards, photographic hero stack, box countdown, stacked events and phone-column composition are different; conservatively count the broad floral ornament family as shared axis 5 (1/13); its medium and flowers differ. Mandatory axes 1/3/4/9/10 differ from all three.

User requested a floral second theme, so this intentionally uses that direction rather than the next repository seed. Existing feature behavior is reused as engineering utility, but the CSS skeleton, visual builders and artwork are independent. No files from Temple Dawn are imported at runtime.

| Existing theme | Shared axes (conservative) | Count | Axes 1 / 3 / 4 / 9 / 10 differ? |
|---|---|---|---|
| Royal Maroon | None | 0 | Yes |
| Rose Mandap | 5 — broad floral ornament family | 1 | Yes |
| Temple Dawn | None | 0 | Yes |

## Step 3 — Asset maker
Completed assets: text-free portrait/landscape floral stationery; two consistent fictional-couple garden scenes; an unoccupied lakeside setting; real-alpha floral corner; portrait/detail crops; original inline SVG blossoms, compact occasion icons and paper details. Built-in imagegen outputs were converted to local WebP and budgets measured. The copied sample drone was replaced by an original synthesized 24-second garden loop; its source is committed. Samples and initial assets were copied from shared first as required.

Asset result: original floral portrait and landscape stationery, fictional garden couple, unoccupied lakeside garden and detail crops generated; a second consistent fictional-couple scene is complete. Opaque backgrounds require no transparency. All final WebP files are local. No artwork, images or fonts from Temple Dawn are used.

## Step 4 — Builder
Complete: independent floral CSS and visual builders, with local behavior helpers for calendar export, validation and accessibility.

## Step 5 — Build review
Passed: node tools/shoot.mjs floral-elegant. All required widths, alternate samples and injection checks passed. The final floral cutout, 421px scrolling, carousel controls, gallery swipe, media loading and background-variant network checks passed. Complete output and section screenshots are saved in this folder.

### Verification evidence
- Baseline runner: node tools/shoot.mjs floral-elegant; exact output in shoot-report.txt. Required seven widths, alternate data samples, guest-name injection and reduced-motion capture are covered.
- qa/interactions.mjs passed opening removal, family side matching, tap-to-load YouTube, gallery arrows/counter/Escape/focus, ICS download, RSVP inline validation, callback rejection/success, 320–2560px overflow, long names, eight events and optional-section removal.
- qa/edge-cases.mjs passed gallery counts 1/2/3/6/12, all four faith states, same-day/past countdown, invalid URLs, music aria-pressed state and keyboard focus traversal.
- qa/experience.mjs passed eight-petal opening, 421px fine-pointer smooth scrolling, event-rail arrows/keyboard/last-card reachability and gallery TouchEvent swipe. Asset-network checks confirmed only the correct portrait/landscape background loads. Opening image payload: 83,936 bytes phone, 146,332 bytes desktop (both below 150 KB).
- Empty/birthday hero layouts without a photo were separately checked at 390px and 1440px; the stationery panel centres when no hero image exists.
- Visual review covers opening and all sections at phone and desktop sizes, tablet/landscape layouts and Telugu opening/hero/couple/footer. Scalloped paper, polaroid framing, circular countdown, horizontal ceremony postcards and masonry are different from Temple Dawn's skeleton. The header type was placed on its own paper surface after the first desktop capture showed flowers behind the small overline.
- Floral corner is real RGBA alpha (0–254), not a baked checkerboard. It is an original generated cutout, layered behind content. Background WebPs use quality 80 and separate portrait/landscape files. No runtime imports or media dependencies on the first theme.
- Declined RSVP responses use a courteous missed-you acknowledgement; attending responses use the specified celebration thank-you copy.
- Calendar uses India timezone and RFC 5545 escaping/folding. URLs and local asset paths are validated. Data enters textContent/attributes; SVG markup is original static source.
- Only the ampersand uses the script family; data names remain in the serif with Indic-safe line height. No letter-spacing on Indic content; no clipped-gradient names.
- Carousel is intentionally horizontally scrollable: all events remain reachable through touch, buttons, Tab and arrow keys. Its stem draws on page/carousel scrolling; each blossom marker pops as it enters. The horizontal layout is a deliberate choice under the brief's event-layout options.
- Music is a new original 24-second synthesized plucked-bell loop. Browser play/pause state was tested; subjective speaker playback was not claimed. No real RSVP or share message was sent. RSVP remains a demo unless window.onInviteRsvp(payload) is supplied.
- QA scripts require Playwright and the theme server on 127.0.0.1:4174; qa/visuals.mjs is the standalone screenshot runner copy and takes floral-elegant as its argument from repository root.

### Production budgets
- app.js: 13,767 bytes gzip / 60,000.
- style.css: 7,168 bytes gzip / 25,000.
- Common/phone WebP images: 447,536 bytes raw / 450 KB. Desktop-only background: 146,332 bytes raw / 400 KB. Raw sizes are conservative for already compressed WebP. Three Google Font families. No JS libraries.

### Complete section-6 checklist

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


## Step 6 — Delivery
Branch: theme/floral-elegant. The existing Temple Dawn branch remains unchanged. Since its PR is still open, the new PR uses theme/temple-dawn as its review base so the diff contains only themes/floral-elegant/. There is no runtime dependency between themes.

Preview: http://127.0.0.1:4174/. Start with `python3 -m http.server 4174 --bind 127.0.0.1 --directory themes/floral-elegant` from repository root. A static server is needed for JSON loading.

## Scroll experience refinement — 20 October 2026

The user explicitly requested the refinement across all seven existing templates, overriding the usual one-theme scope for this update. The reference was inspected for behavior only: its root gains lenis/lenis-scrolling/lenis-smooth classes during scrolling, with independently moving scenery, portraits and headings. No reference code or assets were copied; no Lenis dependency was added.

Original vanilla JS now eases real-document wheel/trackpad scrolling over a 210ms response constant, preserves full fast-gesture distance and reverses direction immediately. Pointer/keyboard/focus, navigation, nested scrollers, opening and viewer locks remain native. Touch keeps browser inertia; scroll-driven motion also works on touch layouts. Theme-specific depths move whole portrait cards and ritual art; headings reveal with the scroll and gallery depth stays within tile gaps. Existing transforms, image crops, artwork, typography and layouts are retained. Only visible elements update after scroll/resize/intersection events, with no idle animation loop. Hidden tabs and reduced motion are respected.

Validation: required shoot passed. tools/check-scroll-motion.mjs verifies eased starts, exact 640px and 1800px gestures, reversal, scroll-linked depth, gallery lock/Escape, native keyboard End outside the gallery, reduced motion, touch behavior and 390/820/1440 widths. All seven results are in tools/scroll-motion-report.txt. Chromium automation and local in-app inspection were used; physical iOS/Android devices were unavailable. Latest gzip: JS 13767 bytes, CSS 7168 bytes, within 60KB/25KB limits. Earlier image-budget exceptions remain unchanged.


## Phase 1 — invitation bug fixes and tier metadata, 21 October 2026

The user approved fixes across all seven existing templates and basic/premium metadata. This collection-wide task intentionally extends the usual one-theme scope. Full shared-core migration, UPI Blessings and merging into main are deferred.

C1: floating music/share controls sit bottom-right (16px phone/tablet, 24px desktop, plus safe areas), with 48px hit targets and visible keyboard focus. When a heading, field or primary action intersects them, the dock fades to 30% and pointer events pass through to the content. Keyboard focus restores the controls. Footer padding leaves clearance at the end. Reveal, resize and font/layout changes recalculate collisions. This is the requested fade policy; it does not promise zero geometric intersection during scrolling.

All openings prepare and decode local hero imagery beneath the still-visible cover before starting their own ceremony. Content remains inert until the ceremony completes. Audio playback still starts directly from the user gesture. Small canonical UI sources live in shared/invitation-ui.js and .css; tools/sync-invitation-ui.mjs copies them into each theme, retaining standalone folder hosting. This is not the deferred full core refactor.

No theme-specific artwork or layout redesign was required; the shared control and hero-readiness fixes apply.

Metadata: ruvva-theme and ruvva-tier are present in the HTML and gallery catalog. Temple Dawn, Floral Elegant, Storybook Garden and Ocean Serene are basic; Varnika, Sannidhi and Kalyana Vaibhavam are premium.

Validation: required tools/shoot.mjs checks and refreshed phone/desktop screenshots; tools/check-invitation-fixes.mjs covers 390/820/1440 controls, collision sweeps, keyboard access, local source synchronization, tiers, unmodified shared fixtures, long names and injection. The required shoot additionally checks 360, landscape 844x390, 1280 and 1920. tools/check-opening-ready.mjs deliberately delays the three affected hero images and verifies that the cover waits. tools/audit-invitation-fixes.mjs captures 200ms opening frames and name-word ranges at 390/1440; before/after review images live in tools/invitation-fixes-review/. Scroll and gallery regressions are checked by the existing tools.

Manual visual review used generated Chromium phone/desktop screenshots and the before/after contacts, including the Storybook sign, Varnika footer, opening wipes and Temple contrast. Physical iOS/Android devices were unavailable. An attempt to refresh an old in-app browser error tab was blocked by browser URL policy; it was not bypassed. Automated local Chromium screenshots were used for visual review. Existing section-6 functionality and original assets remain intact; the earlier image-weight exceptions remain unchanged. Combined app + helper gzip weights are reported in tools/invitation-fixes-report.txt (rather than omitting the helper).


## Five-theme continuity and mobile artwork refinement — 21 October 2026

### Art direction and review
The user explicitly requested these five existing themes together after approving Storybook Garden. That overrides the normal one-theme task scope for this batch. Storybook Garden and Kalyana Vaibhavam are protected and unchanged. This theme retains its own opening ceremony, typography, colors, portrait/event/gallery layouts and design DNA; this is a refinement, not a new seed or a recolored Storybook layout.

Pressed floral stationery. Airy cosmos stems and a hand-drawn flower wreath. Petal clusters move gently; blush is a wash rather than a separate pink live-video panel. The complete walking portrait has a softly curved stationery frame; desktop places the inscription beside it, retaining the floral keepsake identity.

Interior sections now share one quiet paper surface. Theme-specific SVG margins remain faint at the edges; no repeated overhead garland was introduced. Countdown shapes and ritual colors remain distinctive, while their surrounding blocks and live/RSVP surfaces belong to the same palette. All live text remains HTML and optional photographs remain data-driven. Closing photographs preserve their natural aspect ratio with object-fit:contain, and a missing photo leaves one centered desktop inscription rather than an empty half-column.

### Assets and implementation
assets/continuity-margin.svg and assets/continuity-scene.svg are original project-authored vector drawings, with no embedded text, external content, bitmap or third-party license. continuity-art.js contains the original static SVG scene for part-level animation, using innerHTML only for this trusted static drawing. User data is still assigned through textContent/setAttribute and the existing validated local/HTTPS helpers. The optional closing image reuses this theme's own existing fictional sample artwork. No new generated people, fonts, libraries, audio, runtime API or backend was introduced.

continuity.css loads after the established stylesheet. Mobile effects remain visible at phone scale: the original decorative part moves inside a static scene, and the existing scroll-linked portrait/gallery depth is slightly stronger on narrow screens. Continuous motion defaults to paused, follows the existing motion-active/visibility controller, and stops under reduced motion. New margin drawings, form fields and reading areas do not animate. No new animation timer or RAF loop was added.

### Build review and delivery
Required tools/shoot.mjs passes, with refreshed opening/full-section phone and desktop screenshots and checks at 360, 390, 844x390, 820, 1280, 1440 and 1920. tools/check-five-continuity.mjs covers 390/820/1440 touch-enabled layouts, actual moving-art coordinates, native Chromium touch swipes, offscreen pause, reduced motion, validated live links, complete closing photographs and empty/birthday/Telugu/long-name variants at 390/1440. Additional actions cover music, ICS download, gallery/Escape, deferred video and RSVP validation/local callback. The existing scroll-motion checker verifies eased gestures, exact distance, reversals, gallery locks and keyboard behavior for these five themes. Reports are saved alongside the source and under tools/.

Manual review used phone/desktop live, countdown, portrait and closing captures, plus tablet layouts. The original section-6 checklist remains intact. Physical devices were unavailable: touch evidence is Chromium device emulation, not measured real-device frame rates. Combined runtime and image weights are reported in continuity-budget.txt; original artwork quality and any earlier image-budget exceptions are retained. The first-screen raster requests and responsive background selection remain unchanged.

The preview gallery server gains an optional RUVVA_PREVIEW_HOST setting for same-Wi-Fi phone previews; its default remains localhost and its existing route allowlist is retained. No public deployment, main merge, UPI or core migration is part of this batch.

Long unbroken names also revealed an existing intrinsic-width issue in the hero grid. The hero/closing copy now have explicit available widths and zero minimum widths, so both 35-character names remain inside the mobile and desktop layouts.
