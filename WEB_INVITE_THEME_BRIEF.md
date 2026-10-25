# Ruvva Web Invitation — Theme Build Brief (for AI build agents)

You are building **basic web-invitation themes** for Ruvva, an Indian event-planning app.
A guest receives a WhatsApp link and opens it — usually on a phone, sometimes on a
laptop or a TV browser — and scrolls one page. Every theme shows the **same data and the
same sections**; what changes is the look, the opening moment and the motion.

Read this whole file before writing any code. Sections 3, 4, 4A and 9 are hard rules.
Build **one theme per task**. Do not start a second theme in the same task.

> **For Codex:** this repository is your workspace. Keep this file at the repo root and
> copy the short version in section 14 into `AGENTS.md` so it applies to every task. Work
> on a branch named `theme/<theme-id>`, commit only inside `themes/<theme-id>/`, and open
> a pull request when section 10 passes.

---

## 1. What "done" means for one theme

A folder `themes/<theme-id>/` that:

1. Looks finished — not like a template — on a phone (390px) **and** has its own designed
   layout on a desktop (1440px), as defined in section 4A. A phone column floating in an
   empty desktop screen is a failure.
2. Contains **every element in the Parity Checklist (section 6)**. Not one may be missing.
3. Builds the whole page **from a data object** (section 5). No name, date or venue is
   typed into the HTML.
4. Hides any section whose data is empty, cleanly, with no gap or placeholder text.
5. Is **visibly different** from every other theme in this repo (section 7).
6. Passes the self-review in section 10, with screenshots saved.

---

## 2. Reference — the base for every theme

Read `reference/arjun-priya/REFERENCE_SPEC.md` and look at every screenshot in
`reference/arjun-priya/screenshots/phone/` and `.../desktop/` before designing.

That page is the **base**: every theme has its sections, its features, its behaviours
(the timings and effects in the spec's motion table) and its level of calm polish, and
every theme changes between phone and desktop at least as much as it does. Where the spec
lists a gap ("Gaps in the reference"), follow this brief instead of the reference.

It is not a source of code, images, wording or music. Write everything yourself. The live
page is `https://invite.myshaadhilink.in/invitation/arjun-priya-wedding/`; you do not need
to open it.

Its look (maroon + gold, typographic) is **already built** in our app as "Royal Maroon"
(`reference/existing-themes.md`). Never produce another maroon-and-gold typographic theme.
Your job is the same *base* in a *new* visual idea.

---

## 3. Hard technical rules

| Rule | Why |
|---|---|
| Plain HTML + CSS + vanilla JavaScript. No React, Vue, Svelte, Tailwind, jQuery, Bootstrap, framer-motion, AOS, GLightbox. | The guest page must stay tiny; we port this into a no-framework engine. |
| The only library allowed is **GSAP core + ScrollTrigger**, saved locally in the theme folder (no CDN). Prefer CSS + IntersectionObserver when they are enough. | Smooth motion without weight. |
| **No backend.** No Firebase, no API keys, no fetch to any server except loading `sample-data.json`. | Our server provides the data. |
| **No external images, video, audio or scripts.** Everything lives in `themes/<id>/assets/`. Allowed external: Google Fonts CSS, the Google Maps embed iframe, YouTube embed (only after the guest taps). | A guest's invitation must not break when someone else's server changes. |
| Write all data into the page with `textContent`, `setAttribute`, `createElement`. **Never** `innerHTML`, `insertAdjacentHTML` or template strings with data. `innerHTML` is allowed only for static SVG you wrote yourself. | The guest name comes from the URL and is untrusted. |
| URLs from data (map, video, live stream, music) must be validated: `https:` only. Build the YouTube embed from the video ID, never paste a full URL into an iframe. | Prevents `javascript:` links. |
| No secrets, no `.env`, no tokens in the repo. | |
| **Responsive, mobile first:** design at 390px first, then add tablet and desktop layouts with `min-width` media queries (section 4A). No horizontal scroll at any width from 320px to 2560px. | Most guests are on budget Android phones; the rest open it on a laptop. |
| Respect `prefers-reduced-motion`: turn off continuous animation, keep content visible. | Accessibility. |

**Shared runtime (existing themes and future work):** common behavior/data handling lives
in `shared/core.js`, imported as `../../shared/core.js`. Keep visual builders, ceremony,
classes and choreography in each theme. Use options/callbacks for visual differences;
never fork RSVP, countdown, calendars, lightbox, URL validation, controls or sample loading.
The local MIT QR encoder is an explicitly allowed exception for Blessings. Serve `/shared/`
alongside `/themes/`. Shared runtime must be included in each theme's budget.

**Weight budget per theme** (measured after gzip):
- JS (including GSAP if used): ≤ 60 KB
- CSS: ≤ 25 KB
- All theme images together: ≤ 450 KB; the first screen ≤ 150 KB
- Fonts: at most 3 Google Font families (excluding the Indic fallback we add)

---

## 4. Hard rules for Indian languages (learned the hard way)

The page must render in English, Telugu, Hindi, Tamil, Malayalam and Kannada. You only
write English text (section 8), but your CSS must survive the others:

1. **Never put `letter-spacing` on text that can be Indic.** It splits conjuncts and vowel
   signs ("మి మ్మ ల్ని"). Put tracked uppercase only behind `html[lang='en']`.
2. **Gradient or "gold foil" text** (`background-clip: text`) must have
   `padding: .22em .12em; margin: -.22em -.12em;` or Telugu virama (్) and Devanagari
   matras are painted transparent and disappear.
3. Indic glyphs read smaller than Latin capitals at the same size. For every label under
   13px, add a rule `html:not([lang='en']) .label { font-size: +2px }`.
4. Do not set `text-transform: uppercase` as the only way to make a heading readable.
5. Script fonts (Great Vibes, etc.) are Latin-only. Use them only for the ampersand and
   English-only decoration, never for names or sentences.
6. Names wrap between words (`word-break: normal; overflow-wrap: break-word`); only an
   individual word wider than its container may break internally. Let signs expand as needed.
   Long names exist ("Venkata Satya Sai Lakshmi Narasimha"). Names must wrap
   (`overflow-wrap: anywhere`) and never overflow.
7. Use a CSS variable for every font family so we can put the Indic font first:
   `--f-display`, `--f-body`, `--f-script`, `--f-caps`.

Contrast: body text ≥ 4.5:1 against its background, large headings ≥ 3:1. Gold text on
cream usually fails — use a darker gold for text and keep bright gold for lines.

---

## 4A. Phone, tablet and desktop — one page, three designed layouts

The page must **re-arrange itself** for the screen it is opened on. On a phone it is a
phone page; on a laptop it is a laptop page. Not a stretched phone page, and not a phone
column centred in empty space.

**How**
- One HTML document, one `app.js`. Layout changes come only from CSS
  (`@media (min-width: …)`, `clamp()`, grid/flex, container queries). Never detect the
  device with the user-agent and never serve a different page.
- Mobile first: the base CSS is the phone layout; larger screens add rules on top.
- Breakpoints:

| Name | Width | Design for |
|---|---|---|
| Phone | 320 – 599px | 390 × 844 portrait (test 360 too) |
| Tablet | 600 – 1023px | 820 × 1180 portrait |
| Desktop | ≥ 1024px | 1440 × 900 landscape (test 1280 and 1920 too) |

- Content width on desktop: sections are full-bleed (background reaches the screen edges);
  the content inside sits in a max-width of about 1200px. Paragraphs stay under ~70
  characters per line.
- Type scales with `clamp()` — names, headings and countdown digits grow on desktop; body
  text stays 16–18px.

**What each section must do on desktop** (phone layout is your design from section 6)

| Section | Desktop arrangement (minimum; the theme may go further) |
|---|---|
| Opening screen | Fills the landscape screen. The ceremony is composed for landscape (doors span the width, toran across the top, etc.), not a portrait card in the middle. |
| Hero | Uses the width: names larger, ornament/illustration beside or around them; still one screen tall (`min-height: 100svh`). |
| Blessing | Centred, max ~640px, more breathing room. |
| Couple | Groom and bride **side by side** with the joining motif between them. |
| Countdown | Four units **in one row**; calendar buttons in one row. |
| Events | Uses two columns or alternates left/right of the line, or a horizontal layout — not a narrow single column. |
| Gallery | 3–4 columns (or the theme's wide equivalent). Lightbox: keyboard ← → Esc, arrows visible, image fits the screen. |
| Video | Max ~960px wide, centred, 16:9. |
| Venue | **Map and details side by side** (map ~60%, details ~40%). |
| Live stream | Horizontal band; icon, text and button can sit in one row. |
| RSVP | Form max ~720px; Name and Phone side by side; event checkboxes in two columns. |
| Footer | Wider band, same content. |
| Floating controls | Bottom-right or top-right, away from content; never over the RSVP button. |

**Also required**
- Phone **landscape** (844 × 390): the opening screen and hero still fit, nothing is cut.
- Desktop gets hover states on buttons and cards; every control shows a visible
  keyboard focus ring; the page works with keyboard only.
- Phone keeps touch targets ≥ 44 × 44px; hover effects must not be the only way to see
  something.
- Background images: provide a portrait version (phone) and a landscape version
  (desktop, up to 1920 × 1080) and switch with a media query or `image-set()`, so a phone
  never downloads the desktop image and vice versa. Desktop images have their own budget:
  ≤ 400 KB extra, loaded only at ≥ 1024px.
- Decorative pieces may be repositioned or hidden per breakpoint, but **no content** may be
  hidden on any screen size.
- Animations must be tuned per size: parallax and big motion on desktop are fine; on a
  phone keep them light.

---

## 5. Data contract

Your `app.js` must start like this:

```js
// themes/<id>/app.js
const p = new URLSearchParams(location.search);
const SAMPLE = { empty: 'sample-empty.json', birthday: 'sample-birthday.json', telugu: 'sample-telugu.json' };
fetch('./' + (SAMPLE[p.get('data')] || 'sample-data.json')).then(r => r.json()).then(data => {
  renderInvitation(document.getElementById('app'), data, {
    guest: p.get('g') || '',          // guest name from the link, untrusted text
    lang: p.get('lang') || data.invLang || 'en',
  });
});

function renderInvitation(root, data, ctx) { /* builds everything */ }
```

Write one builder per section: `buildEnvelope`, `buildHero`, `buildBlessing`,
`buildCouple`, `buildCountdown`, `buildEvents`, `buildGallery`, `buildVideo`,
`buildVenue`, `buildLiveStream`, `buildRsvp`, `buildFooter`, `buildFloating`.
Each takes `(data, copy, ctx)` and returns an element, or `null` when it has nothing to
show. `renderInvitation` appends the non-null ones in the order of section 6.

`sample-data.json` must use exactly these field names:

```json
{
  "invLang": "en",
  "eventType": "wedding",
  "faithId": "hindu",
  "name1": "Arjun",
  "name2": "Priya",
  "date": "2026-12-12",
  "time": "09:30",
  "venue": "Sri Kalyana Mandapam",
  "address": "Beach Road, Visakhapatnam, Andhra Pradesh 530002",
  "ph1": "+91 98765 43210",
  "ph2": "",
  "message": "With the blessings of our elders, we invite you to celebrate our wedding.",
  "mainEventKey": "wedding",

  "events": [
    { "key": "haldi",     "label": "", "date": "2026-12-10", "time": "10:00", "venue": "Our Residence", "address": "MVP Colony, Visakhapatnam" },
    { "key": "mehendi",   "label": "", "date": "2026-12-10", "time": "16:00", "venue": "Our Residence", "address": "MVP Colony, Visakhapatnam" },
    { "key": "sangeet",   "label": "", "date": "2026-12-11", "time": "19:00", "venue": "The Park Hotel", "address": "Beach Road, Visakhapatnam" },
    { "key": "wedding",   "label": "", "date": "2026-12-12", "time": "09:30", "venue": "Sri Kalyana Mandapam", "address": "Beach Road, Visakhapatnam" },
    { "key": "reception", "label": "", "date": "2026-12-13", "time": "19:00", "venue": "Novotel Varun Beach", "address": "Beach Road, Visakhapatnam" }
  ],

  "families": [
    { "side": "groom", "relation": "", "names": "Mr. Ramesh Babu & Mrs. Padmaja" },
    { "side": "bride", "relation": "", "names": "Mr. Suresh Kumar & Mrs. Lakshmi Devi" }
  ],

  "photoSlots": {
    "hero": "",
    "groom": "assets/sample/groom.webp",
    "bride": "assets/sample/bride.webp",
    "venue": "",
    "closing": "",
    "story": []
  },
  "gallery": [
    "assets/sample/g1.webp", "assets/sample/g2.webp", "assets/sample/g3.webp",
    "assets/sample/g4.webp", "assets/sample/g5.webp", "assets/sample/g6.webp"
  ],
  "videoUrl": "https://www.youtube.com/watch?v=XXXXXXXXXXX",
  "liveStream": { "url": "https://www.youtube.com/live/XXXXXXXXXXX", "note": "" },
  "musicUrl": "assets/sample/music.mp3",
  "rsvp": { "enabled": true, "maxGuests": 10, "askEvents": true, "askDiet": true },
  "gifts": { "enabled": false, "upiId": "", "note": "", "qrUrl": "" }
}
```

Meaning:
- `name1` is the groom's side, `name2` the bride's. Match parents by `families[].side`,
  not by array position. Relation defaults: groom → "Son of", bride → "Daughter of".
- `eventType` can also be `engagement`, `housewarming`, `birthday`. A birthday has one
  name; the page must still look complete with `name2` empty and no families.
- `faithId` is `hindu`, `muslim`, `christian` or `none`. The blessing line and its icon
  follow it (section 6, row 3). Never show a Hindu deity for other faiths.
- `label` overrides the event name when the couple typed their own; when empty use the
  translated name for `key`.
- Every field can be empty. Test that (section 10).

**Ready-made samples are in `shared/`** — start every theme by copying them:

```sh
mkdir -p themes/<id>/assets/sample
cp shared/sample-*.json themes/<id>/
cp shared/sample-assets/* themes/<id>/assets/sample/
```

| File | Tests |
|---|---|
| `sample-data.json` | full wedding, 5 events, gallery of 6, video, live stream, music. Families are listed **bride first** on purpose — match by `side`. |
| `sample-empty.json` | every optional field empty |
| `sample-birthday.json` | one 35-character name, no families, one event |
| `sample-telugu.json` | Telugu names and text, `invLang: "te"` |

Let `app.js` pick the file with `?data=empty|birthday|telugu` (default `sample-data.json`).

The sample photos in `shared/sample-assets/` are plain placeholders (silhouettes and
gradients) — they are not real people, which is required: never use celebrity photos
(the reference page does) or photos of anyone real. `music.mp3` is a 24-second drone
generated for this repo; it has no third-party rights. If a theme wants nicer samples,
use AI-generated people who do not exist, and record the source in `DESIGN.md`.

---

## 6. Parity Checklist — every item is required

Order on the page is fixed. Visual form is yours; the content and behaviour are not.

### 0. Global
- [ ] Falling petals (or the theme's own falling motif: leaves, sparks, marigold, stars) — subtle, behind text, paused for reduced motion
- [ ] Section dividers between sections (theme's own ornament)
- [ ] Reveal-on-scroll for section content, once only (not every time the guest scrolls back)
- [ ] Smooth scrolling feel
- [ ] Page title = "Name1 & Name2"

### 1. Opening screen (full screen, shown first)
- [ ] Theme ornament / motif (animated)
- [ ] Small line "You are cordially invited"
- [ ] Personal salutation: "Dear {guest}," from `ctx.guest`; "Dear Guest," when empty
- [ ] Couple names (name1, ampersand, name2)
- [ ] Button "Open Invitation"
- [ ] Short tagline under the button (e.g. "Two families, one celebration")
- [ ] Page scroll is **locked** until the button is pressed
- [ ] Render and decode the hero underneath before the ceremony starts; no flat-colour gap during or after opening.
- [ ] Pressing it plays the theme's **opening ceremony** (section 7) and removes the screen from the DOM afterwards
- [ ] Pressing it starts background music (a browser only allows audio after a tap)

### 2. Hero
- [ ] Small top line: "॥ Shubh Vivah ॥" for a Hindu wedding, otherwise the occasion name
- [ ] Names, large, with an animated treatment (shimmer, ink, glow — theme's choice)
- [ ] Decorative divider
- [ ] Main event date with weekday
- [ ] City / venue hint
- [ ] Frame or corner ornaments
- [ ] Slow background motif animation
- [ ] "Scroll" hint with a gentle bounce at the bottom

### 3. Blessing
- [ ] Faith icon: hindu → lamp or Ganesha line-art; muslim → crescent; christian → cross; none → no icon
- [ ] Faith line: hindu "Shree Ganeshaya Namaha", muslim "Bismillah ir-Rahman ir-Rahim", christian "In the name of the Lord", none → hidden
- [ ] Blessing paragraph = `message`, or the default copy when empty
- [ ] Ornament above and below

### 4. Couple
- [ ] Groom card: photo frame, name, "Son of", parents
- [ ] Bride card: photo frame, name, "Daughter of", parents
- [ ] Ampersand / joining motif between the cards
- [ ] When a photo is missing: a monogram (first letter) inside the same frame — never an empty box
- [ ] Staggered entrance animation

### 5. Countdown
- [ ] Title "Counting Down to Our Special Day"
- [ ] Days, Hours, Minutes, Seconds — live, ticking every second
- [ ] A digit animates only when it changes
- [ ] Ticks only while visible on screen (saves battery)
- [ ] On the day: shows "Today is the day"; after the event: hides the numbers and shows "Thank you for celebrating with us"
- [ ] "Save the Date" label
- [ ] Button "Google Calendar" (opens calendar.google.com/calendar/render with title, dates, location)
- [ ] Button "Apple / Outlook" (generates and downloads an `.ics` file on the phone, RFC 5545 escaping)

### 6. Events timeline
- [ ] Title "Wedding Events" (occasion-aware)
- [ ] One card per event: icon, name, weekday + date, time ("onwards" style allowed), venue + address, "View on Maps" button
- [ ] Each known event has its own colour: haldi yellow, mehendi green, sangeet pink, wedding = theme main colour, reception = theme accent
- [ ] Icons for at least: haldi, mehendi, sangeet, engagement, wedding, reception, puja, housewarming, birthday, nikah (inline SVG you draw)
- [ ] Connecting line that **draws itself** as the guest scrolls, with a soft glow at its tip
- [ ] Each event marker **pops** when it reaches the screen
- [ ] Works with 1 event and with 8

### 7. Gallery
- [ ] Title "Our Journey Together"
- [ ] Up to 12 photos (layout must look good with 1, 2, 3, 6 and 12)
- [ ] Tap a photo → full-screen viewer: swipe/arrow to next and previous, close button, Esc closes, background scroll locked, counter "3 / 6"
- [ ] Lazy-loaded images
- [ ] Hidden when `gallery` is empty

### 8. Video
- [ ] Title "A Special Glimpse"
- [ ] Shows a poster with a play button first; the YouTube iframe is inserted only on tap (keeps the page light)
- [ ] 16:9 frame, theme border
- [ ] Hidden when `videoUrl` is empty or invalid

### 9. Venue
- [ ] Title "Wedding Venue"
- [ ] Venue name, full address
- [ ] Google Maps embed (`https://maps.google.com/maps?q=<encoded>&z=15&output=embed`, lazy-loaded)
- [ ] "Get Directions" button (google.com/maps/dir/?api=1&destination=…)
- [ ] Tap-to-call buttons for `ph1` / `ph2` when present
- [ ] Hidden when venue and address are both empty

### 10. Live stream
- [ ] Title "Can't Make It? Watch Live!"
- [ ] Subtitle "Join us virtually as we celebrate this beautiful moment"
- [ ] "Watch Live" button opening `liveStream.url` in a new tab
- [ ] Small note (default "The live stream will begin 30 minutes before the ceremony", or `liveStream.note`)
- [ ] Icon
- [ ] Hidden when there is no URL

### 11. RSVP
- [ ] Title "Kindly Respond", subtitle "We would be honoured by your presence"
- [ ] Attending choice: Yes / No / Maybe
- [ ] Full Name (required), Phone Number (required, Indian format hint)
- [ ] Number of Guests: select 1 … `rsvp.maxGuests` (hidden when "No")
- [ ] Events Attending: one checkbox per event in `events` (only when `askEvents`)
- [ ] Dietary Preference: No Preference, Vegetarian, Non-Vegetarian, Vegan, Jain (only when `askDiet`)
- [ ] Message for the Couple (optional textarea)
- [ ] "Send RSVP" button with a loading state
- [ ] Inline validation messages next to the field, not `alert()`
- [ ] **No network call.** On submit call `await window.onInviteRsvp(payload)` if it exists; otherwise wait 600 ms (demo). On success replace the form with "Thank You! We look forward to celebrating with you." and fire a short **confetti** burst in theme colours. On failure show a message and keep the form filled.
- [ ] Hidden when `rsvp.enabled` is false

### 11b. Send Your Blessings (required behavior; hidden when disabled/invalid)
- [ ] `buildBlessings(data, copy, ctx)` after RSVP and before footer; hidden when gifts disabled or UPI invalid.
- [ ] Amount chips, middle default, custom integer ₹1–₹1,00,000; required guest name and optional 300-character blessing with counter.
- [ ] Mobile ≤1023px: UPI anchor with exact current amount. Desktop ≥1024px: local M-error-correction QR, four-module white quiet zone, ~220px; no phone button.
- [ ] Both: copyable UPI ID, unique guest reference and direct-to-couple money note; no floating gift button.
- [ ] Validated person-to-person `upi://pay` with pa, pn, am (two decimals), cu=INR, tn=reference + first 40 plain guest-name characters. No emoji or message in payment note.
- [ ] Reference from `?ref=` or crypto-generated `RUV-` + six unambiguous characters, stable per tab/invitation.
- [ ] `window.onInviteGift` receives a claim only; loading/error/retry states, success once per reference, sessionStorage restoration. Never imply verified payment.
- [ ] RSVP No reveals one gentle link only when Blessings exists. Theme-specific styling and gentle reduced-motion-safe thanks.
- [ ] Samples use fictional UPI IDs with `demo:true`; no payable sample anchor/QR. Live QR decoding, URI/amount agreement, injection, validation and callback/persistence checks pass.

### 12. Footer
- [ ] Names in the theme's display treatment
- [ ] Date
- [ ] Ornament
- [ ] Small "Made with Ruvva" link to https://ruvva.com

### 13. Floating controls (fixed on screen after opening)
- [ ] Music toggle (bottom-right): play/pause, pulsing ring while playing, `aria-pressed`
- [ ] WhatsApp share button: opens `https://wa.me/?text=<encoded page URL>`; uses `navigator.share` when available
- [ ] Controls stack bottom-right, 16px phone / 24px desktop plus safe-area insets; both ≥44px. Fade to 30% over headings, primary actions and form fields; restore on keyboard focus. Footer has clearance.
- [ ] No hamburger menu, no app logo at the top, no price tag

### Optional (build only if the theme's concept needs it)
- Our Story timeline using `photoSlots.story`
- Wishes box
- Gifts / UPI (only when `gifts.enabled`)

---

## 7. Making every theme genuinely different

The failure we are avoiding: the same page re-coloured ten times. Every theme is defined
by a **Design DNA card** — one choice from each row below. Write the card in `DESIGN.md`
**before** writing code.

| # | Axis | Options (pick one, or invent a better one) |
|---|---|---|
| 1 | Palette family | jewel-dark · sunrise-warm · pastel · earthy-terracotta · monochrome+metal · coastal · garden-green · festive-vivid · night-indigo |
| 2 | Type pairing | high-contrast serif + sans · engraved caps + italic serif · rounded humanist sans · modern geometric sans + thin serif · calligraphic display + book serif |
| 3 | Opening ceremony | temple doors swing open · envelope flap lifts and card slides up · palm-leaf scroll unrolls · tap to light a diya, light spreads · kolam draws itself dot by dot · marigold toran drops in · jharokha shutters open · silk cloth unfolds · wax seal cracks · flower blooms open · curtain of beads parts · sun rises over a line horizon |
| 4 | Section shape language | arched tops · scalloped edges · torn paper · straight editorial blocks · circles and medallions · temple-pillar frames · leaf/teardrop shapes · saree-border bands · art-deco geometry |
| 5 | Ornament motif | mandala · kolam · paisley · lotus · mango leaf toran · marigold string · peacock · elephant · bells · stars · waves · zari zig-zag |
| 6 | Hero composition | centred names on colour field · names inside an arch · split screen (names + illustration) · names on a horizon line · names in a medallion · editorial left-aligned |
| 7 | Couple layout | two circles side by side · two arches · stacked cards with offset · polaroids · one shared frame with a divider · medallions joined by a garland |
| 8 | Countdown style | outlined boxes · flip cards · circular progress rings · brass lamps with numbers · numbers on a single line with dividers · hourglass · four petals of a flower |
| 9 | Events layout | vertical timeline line · zig-zag left/right · horizontal swipe carousel · stacked tickets with perforation · path that curves down the page · tabs per day |
| 10 | Gallery layout | 2-column grid · masonry · polaroid stack you swipe · filmstrip · one big + thumbnails · circular crops on a garland |
| 11 | Motion personality | slow and sacred · soft and floating · crisp and editorial · playful and bouncy · cinematic with parallax |
| 12 | Texture | none (flat) · paper grain · silk sheen · sandstone · watercolour wash · subtle noise |
| 13 | Desktop composition | centred stage with side ornaments · split screen (art left, content right) · editorial magazine columns · full-width bands alternating colour · framed "card on a table" with scenery around it · horizontal scrolling chapters |

**Distinctness rules**
1. Compared with *each* existing theme, a new theme may share **at most 3 of the 13 axes**,
   and must differ on rows 1, 3, 4, 9 and 10 always.
2. The CSS skeleton must differ, not only the colours: the events section and the gallery
   must use a different layout from every existing theme.
3. Every theme has a **one-sentence concept** ("A dawn ceremony at a temple, warm stone
   and brass") and every visual choice must serve that sentence.
4. List in `DESIGN.md` the existing themes you compared against and which axes you share.
   "Existing" means the themes in `reference/existing-themes.md` **plus** every folder
   already in `themes/`.

**Banned (the "generic AI" look)**
- Purple-to-pink gradients, glassmorphism cards, neon glow, emoji as icons
- Inter/Roboto everywhere, everything centred with identical cards
- Drop shadows on every element; rounded-24px on every box
- Stock wedding clip-art, cartoon couples (unless the concept is explicitly illustrated)
- Copying myshaadhilink colours or layout

---

## 8. Text

- Every visible string lives in one object `COPY.en = { … }` in `app.js`, keyed by a short
  name (`openInvitation`, `cordiallyInvited`, `dearGuest`, `countdownTitle`, `days`, …).
- Write **English only**. Do **not** machine-translate. We supply Telugu, Hindi, Tamil,
  Malayalam and Kannada at integration.
- Event names: `EVENT_NAMES.en = { haldi: 'Haldi', mehendi: 'Mehendi', … }`.
- Dates and times: `toLocaleDateString(LOCALE[lang], …)` with
  `LOCALE = { en:'en-IN', te:'te-IN', hi:'hi-IN', ta:'ta-IN', ml:'ml-IN', kn:'kn-IN' }`.
- Set `<html lang>` from `ctx.lang`.

---

## 9. Images and assets

| Asset | Format | Size |
|---|---|---|
| Full-screen backgrounds (opening, hero, closing) — phone | WebP, quality 80 | 1080 × 1920 max (portrait) |
| Full-screen backgrounds — desktop | WebP, quality 80 | 1920 × 1080 max (landscape), separate file, loaded only ≥ 1024px |
| Section textures | WebP, tileable if repeating | ≤ 800 px |
| Decorative pieces (flowers, toran, lamps, corners) | WebP or PNG with **real transparency** | ≤ 1200 px long side |
| Icons, ornaments, dividers, mandalas | **Inline SVG** drawn in code, `stroke="currentColor"` | — |

- Prefer SVG drawn in code over images whenever the shape is geometric. It costs nothing
  and recolours with the theme.
- Check every "transparent" image really has an alpha channel. AI tools often bake a grey
  checkerboard into the pixels — that is not transparency.
- Text must never be part of an image (it cannot be translated).
- Record every asset's source and licence in `DESIGN.md`.

---

## 10. Self-review before delivering

Run each of these and fix what fails. Save screenshots in `themes/<id>/screenshots/`.

1. **Widths:** 360, 390, 844×390 (phone landscape), 820, 1280, 1440 and 1920 — no
   horizontal scroll at any (`document.documentElement.scrollWidth === innerWidth`),
   nothing cut off, nothing overlapping.
2. **Every section** screenshot at **390px and at 1440px**, plus the opening screen before
   and after tapping at both sizes. Compare each desktop section with the table in
   section 4A — if a desktop section is still the phone layout stretched or a narrow
   centred column, it fails.
3. **Empty data:** copy `sample-data.json` to `sample-empty.json` with every optional field blank — page must still look complete (opening, hero, footer at minimum), no empty headings.
4. **Birthday:** `eventType: "birthday"`, one name, no families, one event.
5. **Long names:** 34-character names in both fields.
6. **Telugu stress test:** put `"name1": "అర్జున్", "name2": "ప్రియ"` and `<html lang="te">`; check the virama on "అర్జున్" is visible in every place the names appear.
7. **Guest name injection:** open with `?g=<img src=x onerror=alert(1)>` — it must appear as plain text, no alert.
8. **Reduced motion:** with `prefers-reduced-motion: reduce` all content is visible and nothing loops.
9. **Weight:** report gzip sizes of JS, CSS and total images against section 3.
10. **Checklist:** paste section 6 into `DESIGN.md` with every box ticked, and a note for any item that needed a judgement call.
11. **Distinctness:** fill the DNA comparison table (section 7, rule 4).
12. **Keyboard (desktop):** Tab through the page — every button, link, form field and the
    lightbox is reachable, has a visible focus ring, and Enter/Space/Esc/arrows work.
13. **Image switching:** at 390px the network panel shows only portrait backgrounds; at
    1440px only landscape ones.

How to take the screenshots and run the automatic checks: `npm install`,
`npx playwright install chromium`, then `node tools/shoot.mjs <theme-id>`. It saves
phone and desktop screenshots, checks horizontal overflow at all seven widths, loads the
empty / birthday / Telugu samples, tries the guest-name injection and takes a
reduced-motion shot. It exits non-zero on failure. Checks 2 (design quality), 6
(virama visible), 9, 10, 11, 12 and 13 still need you to look. The button must be
reachable by its accessible name "Open Invitation" for the tool to open the page.

---

## 11. Folder to deliver

```
themes/<theme-id>/
  index.html          minimal shell: <div id="app">, fonts, style.css, app.js
  style.css           all styles; colours and fonts as CSS variables at the top
  app.js              renderInvitation + one builder per section + COPY.en
  sample-*.json       the four samples copied from shared/ (section 5)
  assets/             theme images; assets/sample/ for sample photos and music
  vendor/             gsap.min.js, ScrollTrigger.min.js (only if used)
  DESIGN.md           concept, DNA card, palette with hex, fonts, motion notes,
                      asset list with licences, distinctness table, ticked checklist
  screenshots/        phone/ and desktop/, produced by `node tools/shoot.mjs <id>`
```

---

## 12. Theme seeds (build in this order, one per task)

Each seed is a starting DNA. You may improve it, but keep the concept and the opening
ceremony, and re-check distinctness against every theme already in `themes/`.

| ID | Concept | Palette | Opening | Shapes | Events | Gallery | Countdown | Motion |
|---|---|---|---|---|---|---|---|---|
| `temple-dawn` | Dawn ceremony at a South Indian temple: warm stone, brass, first light | saffron, sandalwood, ivory, brass | Carved temple doors swing open | Arches, pillar frames | Vertical path with bell markers | One big + thumbnails | Four brass lamps, numbers in the flame glow | Slow, sacred |
| `mehendi-garden` | A henna afternoon in a courtyard garden | leaf green, henna brown, cream | Henna pattern draws itself, then names appear | Leaf / teardrop | Horizontal swipe carousel | Masonry | Circular progress rings | Soft, floating |
| `midnight-diya` | A wedding night lit by a thousand lamps | indigo, midnight blue, amber | Tap to light a diya; light spreads across the screen | Circles, medallions | Zig-zag left/right | Circular crops on a light string | Numbers on one line with lamp dividers | Cinematic, glow |
| `kolam-courtyard` | Morning kolam drawn in front of the house | terracotta, rice-white, ochre | Kolam dots appear, then the line draws through them | Geometric grid | Path drawn on a dot grid | 2-column grid with kolam frames | Four kolam squares | Crisp, geometric |
| `banana-leaf` | A traditional South Indian feast and pandal | banana-leaf green, turmeric, white | A banana leaf unrolls across the screen | Leaf-edged bands | Stacked leaf cards | Filmstrip | Flip cards | Playful, warm |
| `palm-leaf-script` | The invitation written on a palm-leaf manuscript (talapatra) | parchment, ink brown, faded red | Tied palm-leaf bundle unties and fans open | Long horizontal strips | Tabs per day | Polaroid stack | Numbers inked on a strip | Slow, hand-made |
| `marigold-fiesta` | A loud, joyful sangeet night | marigold orange, magenta, fuchsia | Marigold toran drops in from the top | Scalloped edges | Stacked tickets with perforation | Polaroid stack you swipe | Flip cards | Playful, bouncy |
| `pastel-editorial` | A modern minimal couple, magazine layout | sage, blush, warm white | Envelope flap lifts, card slides up | Straight editorial blocks | Left-aligned list with large dates | 2-column grid, generous gaps | Single line with thin dividers | Crisp, editorial |
| `peacock-jharokha` | A Rajasthani palace window at dusk | teal, peacock blue, antique gold | Jharokha shutters open | Jharokha arch frames | Zig-zag | Arched frames grid | Circular rings with feather motif | Cinematic, parallax |
| `coastal-sunset` | A beach wedding at sunset | coral, peach, sea blue | Sun sets into a wave line | Wavy dividers | Curved path down the page | Filmstrip | Numbers on wave crests | Soft, floating |
| `kanjivaram-silk` | A Kanjivaram saree: deep silk with a gold zari border | deep magenta, emerald, zari gold | Silk cloth unfolds from a fold line | Saree-border bands | Vertical with zari-border cards | Masonry | Outlined boxes with zari edge | Slow, rich |
| `ink-and-gold` | Black-tie art-deco evening | black, ivory, gold foil | A gold line draws the frame, then names fade in | Art-deco geometry | Tabs per day | One big + thumbnails | Hourglass + digits | Crisp, editorial |

---

## 13. Workflow for agents

Run these as separate steps. Do not merge them.

1. **Art Director** — reads this brief and the existing `themes/`, writes `DESIGN.md`
   (concept, DNA card, palette, fonts, motion, asset list, distinctness table). Stops.
2. **Reviewer (design)** — checks the DNA card against section 7. If any distinctness rule
   fails, sends it back to step 1 with the reason. Approves otherwise.
3. **Asset Maker** — produces the images listed in `DESIGN.md` following section 9.
   Verifies real transparency and sizes.
4. **Builder** — writes `index.html`, `style.css`, `app.js`, sample data, following
   sections 3–6 and 8.
5. **Reviewer (build)** — runs section 10 in full, ticks section 6, reports failures to the
   Builder. Repeats until everything passes.
6. **Deliver** — commit the theme folder only, with a message naming the theme and listing
   any item from section 6 that needed a judgement call.

Never mark a theme done with an unticked box in section 6 or a failing test in section 10.
If something cannot be done, say so in `DESIGN.md` instead of hiding it.

**Running this with Codex** (one agent doing all roles): do the six steps in order inside
one task, and write each step's result as a heading in `DESIGN.md` (`## Step 1 — Art
direction`, `## Step 2 — Design review`, …) before moving on. A step that fails sends you
back; record why. If your environment has no internet, do not use GSAP or Google Fonts —
use CSS + IntersectionObserver and local font files with an open licence — and say so in
`DESIGN.md`.

---

## 14. Short version for `AGENTS.md`

```md
# Ruvva web-invitation themes — rules for every task

Full brief: WEB_INVITE_THEME_BRIEF.md. Read it before starting.

- One theme per task, in themes/<theme-id>/, on branch theme/<theme-id>.
- Plain HTML + CSS + vanilla JS. Only GSAP + ScrollTrigger allowed, stored locally.
- No backend, no API keys, no external images/scripts. Google Fonts, Maps embed and
  YouTube (after tap) are the only external requests.
- All data from sample-data.json with the field names in brief section 5.
  Never innerHTML with data; textContent only.
- Every item in brief section 6 must exist.
- Responsive: designed phone (390), tablet (820) and desktop (1440) layouts — brief 4A.
- Indic-safe CSS — brief section 4 (no letter-spacing on Indic, foil-text padding).
- English copy only, in COPY.en. No machine translation.
- Visibly different from every existing theme — brief section 7, 13 axes, max 3 shared.
- Before finishing, pass every check in brief section 10 and commit the screenshots.
```
