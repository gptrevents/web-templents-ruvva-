# Varnika — The Painted Wedding

## Step 1 — Art direction
An heirloom wedding folio comes to life: jade gardens, vermilion pigment, tiny painted birds, botanical margins and a ceremonial album, composed as a contemporary Indian miniature.

This is the first premium collection entry. The supplied Vijay–Rashmika page is a benchmark for consistent detailed artwork and ceremony, not a source of code, imagery, wording, palette or layout. No maroon/gold, celebrity faces, copied temple tableau or carved countdown. Every piece is original and all names remain live text. Shared sample JSON and assets were copied before work began.

| Axis | Varnika decision |
|---|---|
| 1 Palette | Multicolored miniature pigments: jade #234d3f, lapis #193550, vermilion #a63f2b, parchment #f5ead4, copper #945c35. Cream with green, not maroon/gold or ocean cyan. |
| 2 Type | Bodoni Moda display + Manrope body; restrained italic English decoration, no script names. |
| 3 Opening | A painted hanging manuscript winds upward onto a spindle, uncovering the invitation. |
| 4 Shapes | Cut-corner folios, octagonal cartouches, ruled manuscript margins. |
| 5 Ornament | Fine miniature flowering vines, long-tailed painted birds, pigment seals and tiny pigment flecks. |
| 6 Hero | Monumental offset typography balanced with a miniature garden painting, not centered within a framed temple. |
| 7 Couple | Octagonal portrait medallions on a shared paired genealogy plate. |
| 8 Countdown | Four copper-etched octagonal inlays across a jade fresco. |
| 9 Events | A ceremonial disclosure ledger: numbered manuscript rows unfold into illustrated two-column folios. |
| 10 Gallery | A bound photographic album with two pages per spread and page-turn controls, plus full viewer. |
| 11 Motion | Manuscript winding, ink drawing, soft botanical sways, articulated bird tails/wings and restrained folio turns. |
| 12 Texture | Fine miniature gouache on lightly mottled cotton paper with pigment/copper ink details. |
| 13 Desktop | A broad editorial painting stage, shared family plate, expanded two-column ledger spreads and open photographic book. |

## Step 2 — Design review

| Existing theme | Conservatively shared axes | Mandatory 1/3/4/9/10 |
|---|---|---|
| Royal Maroon | 2 serif/sans; 8 broadly framed countdown; 11 deliberate pacing | All different |
| Rose Mandap | 2 serif/sans; 5 broad floral subject; 12 broad painted medium | All different |
| Temple Dawn | 2 serif/sans; 5 broad botanical subject; 11 deliberate pacing | All different |
| Floral Elegant | 2 serif/sans; 5 broad botanical subject; 12 painted paper | All different |
| Storybook Garden | 2 broad serif/sans; 12 broad painted medium; 5 birds/botanicals | All different |
| Ocean Serene | 2 serif/sans; 5 broad bird/botanical subject | All different |

Each comparison stays at three broad shared axes or fewer. The jewel pigment palette is distinct from Temple Dawn's sandstone/olive, Floral's rose pastel, Storybook's bright cartoon garden and Ocean's monochrome cyan. No event carousel, day tabs, ticket trail, centered spine or default stacked cards. No filmstrip, masonry, circular garland or featured-thumbnail gallery. The disclosure ledger and bound-page album supply separate interaction/layout patterns. Approved.

## Step 3 — Asset maker
Original built-in imagegen paintings: portrait garden folio, landscape counterpart, miniature ceremonial border; original fictional adult Indian portraits and garden photographs. Runtime assets will be optimized WebPs inside assets/. Exact prompts and sources go in ASSETS.md. SVG supplies live botanical margins, birds, ornaments, ten event icons and controls. The original sample music will be replaced by a theme-local synthesized composition. No third-party recording.

Original paintings and fictional adult sample photographs are generated and reviewed. A shared five-vignette ritual atlas adds hand-painted ceremony objects; photographs preserve the same fictional pair. Phone and desktop backgrounds are separate, with no embedded text. Optimized common images total 439,972 bytes; the additional desktop-only painting is 120,758 bytes. The SVG parakeet uses unique gradient IDs, articulated feathers/tail and fine pen details. Approved for implementation.

## Step 4 — Builder
Independent CSS and rewritten visual builders implement the painted manuscript, asymmetric hero, genealogy plate, etched inlays, disclosure ledger and bound album. Safe shared data, calendar, lightbox, RSVP and wheel utilities were adapted into the theme folder; no runtime code is imported from another theme. Background artwork remains outside name text so Indian scripts stay live and wrap normally. The artwork is non-denominational; faith-specific icons/text follow the supplied JSON. The ritual atlas is selected by event, never by faith. Reduced motion disables continuous motion and transitions; offscreen and hidden sections pause their loops.


## Step 5 — Build review

The required `node tools/shoot.mjs varnika` passes: phone and desktop opening/scroll screenshots, 360/390/844×390/820/1280/1440/1920 widths, empty/birthday/Telugu samples, untrusted guest input and reduced motion. See shoot-report.txt. Additional widths from 320 through 2560 pass. Screenshots are saved in screenshots/phone and screenshots/desktop. The theme-local runner is qa/visuals.mjs (pass varnika as its argument).

Interaction checks pass for opening scroll/focus unlock and family-side matching, YouTube only after tapping, full-screen viewer arrows/swipe/Escape/counter/focus restoration, calendar download, inline RSVP validation, declined attendance, loading state, rejected callback preserving input and successful callback payload. Music play/pause and aria-pressed are verified. There is no RSVP backend: production supplies window.onInviteRsvp. A declined response receives appropriate copy. No actual share/message was sent and speaker output was not subjectively listened to; the original audio file and browser playback state were verified.

The independent experience suite checks only the matching portrait/landscape image before opening; winding manuscript movement; inert/scroll release; unique bird gradient IDs; all five event disclosures and Home/End navigation; drawing ledger; actual album page changes and focus; viewer touch swipe; visible-only countdown scheduling; offscreen, hidden-tab and reduced-motion behavior. Fine-pointer scrolling at 421px preserves the 640px wheel impulse on the real document. Native touch remains native outside the album/viewer. Fixed music ring pauses in hidden tabs. Phone/tablet layouts reserve an outer manuscript margin for the music/share rail, keeping it clear of copy and form controls. New physical book leaves are decorative/inert and removed after their turn; odd albums receive a designed endpaper. Final detail checks confirm the controls do not overlap the RSVP submit button at phone/desktop.

Gallery counts 1/2/3/6/12, eight events, today/past countdown states, four faiths and invalid URLs pass. Name fixtures cover 320/390/820/1440/2560 with one long birthday name, two long names and Telugu. Visual review found long phone names extending toward the illustrated trees, so those names now use a narrower quiet paper field and adjusted scale; desktop retains its offset editorial column. Indic labels get larger type, no Indic tracking is applied, all font families use variables, and no foil/gradient text is used. Virama is visible in the opening, hero, couple and closing names. The birthday view omits the ampersand and centers its single family portrait within the genealogy plate.

Manual review covers every one of the 11 required sections on phone and desktop, both openings, the opening mid-wind, every ceremony panel, album second/odd spreads and mid-turn, tablet, landscape, empty, birthday, Telugu and reduced motion. The page retains the required section order. Desktop uses a broad painted scene and offset type, side-by-side genealogy, horizontal four-inlay countdown, two-column expanded event folios, a wide bound album, map/details columns, horizontal live band and two-column form fields. Phone uses a complete portrait painting, stacked profiles, compact ledger disclosures and two small album leaves. The desktop album is the deliberate wide-equivalent gallery layout, not a phone column.

Contrast ratios: ink/paper 9.57:1; muted text/cream 6.21:1; cream/jade 8.76:1; cream/vermilion 5.74:1; haldi heading/cream 5.18:1. The fine decorative copper strokes are ornamental, not small body text. Common image bytes are 439,972; desktop-only painting 120,758; first opening 115,860 phone or 120,758 desktop. JS gzip 15,841 bytes, CSS gzip 10,693 bytes. Two font families, no runtime library. Runtime image totals include the copied alternate placeholders; collection thumbnails are not invitation downloads.

Judgement calls: user asks for premium quality in the existing data-driven engine, so the repository's basic label does not constrain art direction; technical and performance limits are preserved. The opening winds instead of doors/curtains, and a paired page-turn album replaces the benchmark's gallery. Disclosures hide details through interaction, never based on screen size. Closed summaries keep event name/date/time visible, and every event can be opened by keyboard. A single/odd photo book has a designed endpaper. Optional wishes/gifts/story sections were not needed. The miniature procession contains no deity; the blessing follows faithId, including no icon for none. The fictional sample garden is not a claim about the venue. Google Maps is an external lazy embed and may remain blank in restricted/offline/headless conditions; directions links and local venue information remain available. No price pill, hamburger, top brand, copied recording or celebrity imagery is shipped.

Artwork sources and exact built-in imagegen prompts: ASSETS.md. SVG and synthesized music are project-original; alternate sample placeholders were supplied by the repository. Manrope and Bodoni Moda use SIL Open Font License 1.1, verified against their Google Fonts repository OFL files. No external photograph or illustration was reused.

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

Branch theme/varnika. All runtime code, JSON, artwork and sound live in this theme folder, with no imports from existing themes. Prior theme folders are unchanged. The user's standing request to register every future template on the home page is honored by a fifth collection entry, categorized Premium; metadata, small theme-local preview WebPs and collection screenshots accompany it. Collection checks pass with all five real invitation links and future-theme discovery. Source, prompts, design decisions, test reports and screenshots are included. Preview is local static hosting, not public deployment.
