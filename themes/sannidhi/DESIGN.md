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

Motion checks verify only the toran image on the opening, only the matching phone/desktop temple scene after opening, the expanding light transition, separate panorama movement, a visible-only countdown, drawing day threads, fan selection and gestures, and paused decoration in hidden/offscreen/reduced-motion states. A further 1366×500 desktop check confirms only the landscape background is requested, even on a short screen. Fine-pointer wheel input retains a 640px impulse on the actual document; native touch remains native outside the explicit gallery gestures. These checks do not establish universal device frame rates. Speaker output was not subjectively listened to; browser audio state and the original file were verified.

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
- [x] Music toggle (bottom-right): play/pause, pulsing ring while playing, `aria-pressed`
- [x] WhatsApp share button: opens `https://wa.me/?text=<encoded page URL>`; uses `navigator.share` when available
- [x] Neither covers text; both ≥ 44×44 px
- [x] No hamburger menu, no app logo at the top, no price tag

### Optional (build only if the theme's concept needs it)
- Our Story timeline using `photoSlots.story`
- Wishes box
- Gifts / UPI (only when `gifts.enabled`)


## Step 6 — Delivery

Branch theme/sannidhi. Runtime assets, code, sample JSON, original music, exact prompts, research notes, verification reports and screenshots are inside this theme folder. The user’s standing request to add every new template to the home page authorizes the minimal collection metadata/manifest/previews/screenshots update outside the folder. The existing themes, including Varnika, are unchanged. The collection now contains six templates and two Premium entries. The gallery search test uses the specific existing name “temple dawn” because generic “temple” now correctly matches two designs. The new pull request is stacked on theme/varnika; no existing PR is merged by this task. Preview is local static hosting, not public deployment.

## Scroll experience refinement — 20 October 2026

The user explicitly requested the refinement across all seven existing templates, overriding the usual one-theme scope for this update. The reference was inspected for behavior only: its root gains lenis/lenis-scrolling/lenis-smooth classes during scrolling, with independently moving scenery, portraits and headings. No reference code or assets were copied; no Lenis dependency was added.

Original vanilla JS now eases real-document wheel/trackpad scrolling over a 210ms response constant, preserves full fast-gesture distance and reverses direction immediately. Pointer/keyboard/focus, navigation, nested scrollers, opening and viewer locks remain native. Touch keeps browser inertia; scroll-driven motion also works on touch layouts. Theme-specific depths move whole portrait cards and ritual art; headings reveal with the scroll and gallery depth stays within tile gaps. Existing transforms, image crops, artwork, typography and layouts are retained. Only visible elements update after scroll/resize/intersection events, with no idle animation loop. Hidden tabs and reduced motion are respected.

Validation: required shoot passed. tools/check-scroll-motion.mjs verifies eased starts, exact 640px and 1800px gestures, reversal, scroll-linked depth, gallery lock/Escape, native keyboard End outside the gallery, reduced motion, touch behavior and 390/820/1440 widths. All seven results are in tools/scroll-motion-report.txt. Chromium automation and local in-app inspection were used; physical iOS/Android devices were unavailable. Latest gzip: JS 15989 bytes, CSS 9641 bytes, within 60KB/25KB limits. Earlier image-budget exceptions remain unchanged.


## Phase 1 — invitation bug fixes and tier metadata, 21 October 2026

The user approved fixes across all seven existing templates and basic/premium metadata. This collection-wide task intentionally extends the usual one-theme scope. Full shared-core migration, UPI Blessings and merging into main are deferred.

C1: floating music/share controls sit bottom-right (16px phone/tablet, 24px desktop, plus safe areas), with 48px hit targets and visible keyboard focus. When a heading, field or primary action intersects them, the dock fades to 30% and pointer events pass through to the content. Keyboard focus restores the controls. Footer padding leaves clearance at the end. Reveal, resize and font/layout changes recalculate collisions. This is the requested fade policy; it does not promise zero geometric intersection during scrolling.

All openings prepare and decode local hero imagery beneath the still-visible cover before starting their own ceremony. Content remains inert until the ceremony completes. Audio playback still starts directly from the user gesture. Small canonical UI sources live in shared/invitation-ui.js and .css; tools/sync-invitation-ui.mjs copies them into each theme, retaining standalone folder hosting. This is not the deferred full core refactor.

C4: the lamp/light sequence now crossfades earlier into the decoded temple; the bloom ends transparent instead of holding cream over the hero.

Metadata: ruvva-theme and ruvva-tier are present in the HTML and gallery catalog. Temple Dawn, Floral Elegant, Storybook Garden and Ocean Serene are basic; Varnika, Sannidhi and Kalyana Vaibhavam are premium.

Validation: required tools/shoot.mjs checks and refreshed phone/desktop screenshots; tools/check-invitation-fixes.mjs covers 390/820/1440 controls, collision sweeps, keyboard access, local source synchronization, tiers, unmodified shared fixtures, long names and injection. The required shoot additionally checks 360, landscape 844x390, 1280 and 1920. tools/check-opening-ready.mjs deliberately delays the three affected hero images and verifies that the cover waits. tools/audit-invitation-fixes.mjs captures 200ms opening frames and name-word ranges at 390/1440; before/after review images live in tools/invitation-fixes-review/. Scroll and gallery regressions are checked by the existing tools.

Manual visual review used generated Chromium phone/desktop screenshots and the before/after contacts, including the Storybook sign, Varnika footer, opening wipes and Temple contrast. Physical iOS/Android devices were unavailable. An attempt to refresh an old in-app browser error tab was blocked by browser URL policy; it was not bypassed. Automated local Chromium screenshots were used for visual review. Existing section-6 functionality and original assets remain intact; the earlier image-weight exceptions remain unchanged. Combined app + helper gzip weights are reported in tools/invitation-fixes-report.txt (rather than omitting the helper).


## Five-theme continuity and mobile artwork refinement — 21 October 2026

### Art direction and review
The user explicitly requested these five existing themes together after approving Storybook Garden. That overrides the normal one-theme task scope for this batch. Storybook Garden and Kalyana Vaibhavam are protected and unchanged. This theme retains its own opening ceremony, typography, colors, portrait/event/gallery layouts and design DNA; this is a refinement, not a new seed or a recolored Storybook layout.

Rice paper and temple brass. Quiet gopuram etchings and a hanging bell between stone piers, above a kolam motif. The bell swings gently within its own illustration. The complete walking photograph joins the live blessing, names and existing temple panorama; desktop forms an album-like paired spread.

Interior sections now share one quiet paper surface. Theme-specific SVG margins remain faint at the edges; no repeated overhead garland was introduced. Countdown shapes and ritual colors remain distinctive, while their surrounding blocks and live/RSVP surfaces belong to the same palette. All live text remains HTML and optional photographs remain data-driven. Closing photographs preserve their natural aspect ratio with object-fit:contain, and a missing photo leaves one centered desktop inscription rather than an empty half-column.

### Assets and implementation
assets/continuity-margin.svg and assets/continuity-scene.svg are original project-authored vector drawings, with no embedded text, external content, bitmap or third-party license. continuity-art.js contains the original static SVG scene for part-level animation, using innerHTML only for this trusted static drawing. User data is still assigned through textContent/setAttribute and the existing validated local/HTTPS helpers. The optional closing image reuses this theme's own existing fictional sample artwork. No new generated people, fonts, libraries, audio, runtime API or backend was introduced.

continuity.css loads after the established stylesheet. Mobile effects remain visible at phone scale: the original decorative part moves inside a static scene, and the existing scroll-linked portrait/gallery depth is slightly stronger on narrow screens. Continuous motion defaults to paused, follows the existing motion-active/visibility controller, and stops under reduced motion. New margin drawings, form fields and reading areas do not animate. No new animation timer or RAF loop was added.

### Build review and delivery
Required tools/shoot.mjs passes, with refreshed opening/full-section phone and desktop screenshots and checks at 360, 390, 844x390, 820, 1280, 1440 and 1920. tools/check-five-continuity.mjs covers 390/820/1440 touch-enabled layouts, actual moving-art coordinates, native Chromium touch swipes, offscreen pause, reduced motion, validated live links, complete closing photographs and empty/birthday/Telugu/long-name variants at 390/1440. Additional actions cover music, ICS download, gallery/Escape, deferred video and RSVP validation/local callback. The existing scroll-motion checker verifies eased gestures, exact distance, reversals, gallery locks and keyboard behavior for these five themes. Reports are saved alongside the source and under tools/.

Manual review used phone/desktop live, countdown, portrait and closing captures, plus tablet layouts. The original section-6 checklist remains intact. Physical devices were unavailable: touch evidence is Chromium device emulation, not measured real-device frame rates. Combined runtime and image weights are reported in continuity-budget.txt; original artwork quality and any earlier image-budget exceptions are retained. The first-screen raster requests and responsive background selection remain unchanged.

The preview gallery server gains an optional RUVVA_PREVIEW_HOST setting for same-Wi-Fi phone previews; its default remains localhost and its existing route allowlist is retained. No public deployment, main merge, UPI or core migration is part of this batch.


## Natural artwork and mobile alignment — 21 October 2026

User-authorized cross-theme correction, retaining each theme's existing palette and layout.

- [x] Symmetric mobile/tablet `.wrap` margins; floating controls no longer reserve an asymmetric content rail. Verified every section wrapper at 360, 390, 412 and 820 pixels.
- [x] Six independently phased ambient paths, different horizontal positions, fall speeds and lateral drift; inner tumble runs independently from vertical descent. No animation-frame random work.
- [x] Reduced-motion removes ambient movement; existing visibility controller pauses the new paths. Native touch scrolling remains intact.
- [x] Required `node tools/shoot.mjs THEME` passed: phone/desktop screenshots, seven responsive sizes, empty/birthday/Telugu, injection check, reduced-motion capture.
- [x] `tools/check-natural-details.mjs`: all seven themes at five sizes; centered sections, no horizontal overflow, distinct particle phases, limited bird pairs, no JS errors, reduced-motion behavior.
- [x] Reviewed phone couple/live/RSVP captures; Kalyana/Varnika content now aligns with viewport center.

Original painted transparent bitmap side ornaments replace the schematic continuous margin. The live vignette now uses existing original raster artwork instead of the line illustration. New assets and exact built-in image-generation prompts are recorded in `PAINTED_ART.md`. Small functional icons and motion silhouettes remain SVG for clarity. Optimized alpha WebP edges retain a transparent center and do not crop content. Temple/Floral load a separate higher-resolution border only on desktop.

Validation scope: browser touch emulation and local screenshots, not a physical Android-device certification. Full manual assistive-technology testing was not repeated for this decoration-only correction. Size measurements are in `natural-details-budget.txt`; Kalyana’s pre-existing artwork budget overrun remains, with its protected raster artwork untouched.

Sannidhi also replaces its repeated chapter bird silhouettes with two global, scene-scoped passing pairs.

## Ceremonial artwork refinement — 21 October 2026

The user identified the overlapping polygon “kolam”, flat drawn diya and repeated striped bands as unfinished. This refinement keeps Sannidhi's indigo welcome, vermilion/ivory interior, temple panorama and existing content/layouts.

- [x] Replaced the welcome's flat SVG lamp with original transparent brass-and-jasmine raster artwork. Names, salutation, action and tagline remain live HTML.
- [x] Replaced the polygon lattice with an original rice-flour-inspired interlaced muggu illustration, used as a quiet floor beneath the lamp and as occasional interior corner ornaments. The generated design is not represented as a documented historical/ritual pattern.
- [x] Replaced arrow/diamond dividers with fine rules and a small muggu medallion. The image remains decorative and is excluded from the accessibility tree.
- [x] Removed repeated fence-like section stripes and portrait-frame stripes. Existing profile photos/crops are preserved.
- [x] Removed the hidden schematic continuity detail from the render tree and stopped loading its script. The old vector sources remain available as historical assets.
- [x] Phone garland is optimized to 640px, while `<picture>` selects the original 900px image only on desktop. Both use real alpha; visual content is unchanged. This pays for the new artwork within the existing image budget.
- [x] Portrait, tablet and desktop welcome compositions reviewed. Short landscape uses a two-column lamp/inscription stage with a separate button and tagline row. The call-to-action is usable at every tested width.
- [x] All parity functionality retained. Opening tap/music, native touch, eased wheel behavior, reduced motion, calendar download, gallery/Escape, deferred video and RSVP validation/success were checked; per-feature outputs are in `ceremonial-actions-report.txt` and `ceremonial-scroll-report.txt`.
- [x] Required `node tools/shoot.mjs sannidhi` passed; final screenshots and output are committed. Additional five-size artwork checks are in `ceremonial-art-report.txt` and screenshots/ceremonial-art/.

Assets and exact prompts: `CEREMONIAL_ART.md`. Built-in image_gen generated two original transparent PNGs; delivery WebPs were trimmed, resized and compressed. Rice-flour artwork uses a compact palette/alpha representation; no third-party images or embedded text are used. Assets: `assets/ceremonial-diya-v1.webp`, `assets/ceremonial-kolam-v1.webp`, and the original garland retained as `assets/toran-desktop.webp`.

Budgets (all local assets, including retained old SVG sources): see `natural-details-budget.txt`. Phone first-screen decorative artwork totals under 150 KB (garland + diya + muggu). Desktop garland requests and phone exclusion were verified in the browser. No new framework, service or animation library.

Manual scope: reviewed original/new artwork and 390/1440 screenshots, checked phone landscape, focus-visible opening button and complete Telugu glyph samples. Browser touch emulation was used; physical-device and full screen-reader certification are not claimed. Other themes were not modified.


## Final devotional direction and true-alpha correction

The user's later references supersede the earlier isolated-lamp welcome: Sannidhi now has three distinct original traditional calendar-style Venkateswara scenes. The previous opaque full-scene backgrounds were specifically rejected, removed from delivery, and replaced through built-in image_gen background extraction.

- [x] Hindu welcome: full Venkateswara/Lakshmi darshan cutout; live guest salutation, names and open button beside/below it.
- [x] Hindu hero: separate Srinivasa–Padmavathi wedding group, sacred altar, witnesses, canopy and lamps on real transparent alpha.
- [x] Hindu closing: separate Venkateswara/Sridevi/Bhudevi blessing group on real transparent alpha.
- [x] All three paintings keep their natural image ratio with object-fit:contain; no background-cover crop, distortion or motion on deity figures.
- [x] Non-Hindu/none data renders no deity pictures. Other faiths retain the generic lamp welcome and existing neutral temple architecture.
- [x] Detailed inline rice-flour loops, pulli dots and lotus petals replace the old polygon motif. Each normalized SVG path is drawn independently with staggered stroke-dashoffset. The once-only observer starts the drawing; offscreen/tab visibility pauses it. Separate, very slow mandala rotation moves only decorative geometry.
- [x] Reduced motion shows finished strokes immediately and stops continuous decorative rotation.
- [x] Phone/tablet/desktop and short-landscape opening CTA checks passed. Tests verified actual stroke progression/completion, rotation, faith guards, responsive picture sources and complete image ratios.
- [x] Required shoot.mjs passed at final asset state, including sample variants and injection/reduced-motion checks. Full screenshots plus additional artwork captures are committed.
- [x] Real alpha checked for every phone/desktop devotional WebP; dark/ivory compositing proof and numeric results are in screenshots/ceremonial-art/alpha-proof.webp and devotional-alpha-report.txt.

Sources, original prompts, extraction prompts and final paths: DEVOTIONAL_ART.md. Earlier generated candidates remain outside the project in the generation archive and are not delivered.

Performance limitation: requested dense calendar-style artwork exceeds the earlier basic-theme total-image targets; devotional-budget.txt reports the exact overrun, rather than claiming compliance. The phone welcome raster payload is 108,960 bytes (under 150 KB); larger inside/closing scenes are lazy-loaded and desktop sources are excluded on phones. JS/CSS remain below their limits. Existing assets required by other-faith/sample variants are retained. No physical-device or screen-reader certification is claimed.

Final load-stability fix: removed the explicit `aspect-ratio:auto` override from devotional images, preserving their HTML width/height aspect hints before lazy image decoding. This prevents the closing tableau from expanding the page after keyboard End has already reached its previous bottom. The existing scrolling regression passes without changing its timing or assertions.

## Shared runtime and Blessings — 25 October 2026

- [x] Existing visual builders, artwork, openings and scroll choreography preserved; shared behavior moved to `../../shared/core.js`.
- [x] Added section 11b after RSVP: amount chips/custom amount, guest/message fields, mobile UPI intent, desktop local QR, copy ID and reference.
- [x] Invalid/disabled gifts hide cleanly; RSVP No offers one optional link.
- [x] Guest claims use callback/demo only, inline retry, single successful submission and session persistence; payment confirmation is explicitly left to the couple.
- [x] Fake sample IDs use demo mode so preview cannot initiate a payment. No real UPI ID or backend was added.
- [x] English copy in COPY.en; guest data remains text; reduced-motion-safe thanks and theme-local Blessings styling.

The shared behavior exception is explicitly requested by UPDATE_WEB_TEMPLATES.md and the
user's request to finish the remaining common features across the collection. This task
keeps all seven designs, including approved Kalyana artwork. No new image assets are added.
See `shared/README.md`, `shared/vendor/LICENSES.md`, `tools/blessings-report.txt` and the
current screenshot/check reports for verification. Pre-existing Sannidhi/Kalyana image
budget overruns remain documented in their artwork notes; this task does not claim those
image targets pass. Runtime JS/CSS budgets include shared modules and the QR encoder.


## Guest personalization rollout — 28 October 2026

User-approved multi-theme rollout of the reviewed Griha Mangalam pilot; shared recipient behavior is centralized in `shared/recipient.js` (the original pilot remains unchanged). Theme-specific artwork and composition live in `guest-art.js` and `guest.css`.

Treatment: kolam; An invitation with love and blessings. Four touchpoints: opening, personal letter, editable RSVP, attendance-aware closing. Names remain live Indic-safe text; decorative monogram uses the first Unicode grapheme. Optional party and private note follow the pilot contract. URL values are display-only, not authenticated identity; no backend or verified RSVP persistence is introduced. No new bitmap or font assets.

Validation results are recorded in `GUEST_REVIEW.md`.


## Guest-first opening correction — 28 October 2026
The recipient name now leads the opening hierarchy (about 38–48px on phones, 58px on tablet and 62–80px on desktop; the illustrated home/birthday openings use tuned sizes). Host names remain separately visible at a smaller size. Long names wrap in live Indic-safe text, with a landscape adjustment; the salutation has no clipped internal scroll box. No generic invitation is assigned a fabricated recipient. The collection's demo links explicitly carry a preview guest, and preserve a supplied guest/party query. See `opening-report.txt`, `guest-report.txt` where present, and `shoot-report.txt` for executed checks.


## Opening and closing guest motion — 28 October 2026
User-approved across all themes. Only the opening guest name and footer guest block receive the new finite treatment: a small fade/rise plus a drawn hairline. No letter splitting, blur, masking or looping; Indic names remain whole live text. The closing name has its own larger line (smaller than the opening), with the existing attendance-aware sentence underneath. Long names use a calmer smaller type size.

Theme-local variables tune timing, rise and line origin to the existing editorial, playful, coastal or ceremonial style. The footer observes its actual text and plays once on arrival; it never replays on scrolling back. Hidden tabs pause the effect, and reduced motion shows all text statically. No new images or fonts. The body sections receive no new guest-name motion. Behavior and generic fallback remain intact.

Checks: `tools/check-recipient-motion.mjs`, existing guest checks and `tools/shoot.mjs`; executed results and captures are stored alongside the theme.
