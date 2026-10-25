# Reference: the "arjun-priya" invitation — structure and behaviour

Live page: https://invite.myshaadhilink.in/invitation/arjun-priya-wedding/

This is a written study of that page plus screenshots of it (`screenshots/phone` at
390×844, `screenshots/desktop` at 1440×900). **It is the base for structure, features,
behaviour and how the layout changes between phone and desktop.** It is not a source of
code, images, text or music.

## What you may and may not take from it

| Take | Do not take |
|---|---|
| The section order and what each section contains | Its HTML, CSS or JavaScript |
| How each part behaves (the measurements below) | Its photos — they are of film actors |
| How the layout changes from phone to desktop | Its music — it is a film song |
| The level of polish and the calm pacing | Its exact wording, its maroon + gold palette (we already ship that look as "Royal Maroon") |
| | The price pill, the "Order Now" button, its brand name |

Why the screenshots look empty in places: photos, video, map and price pill were hidden
before capture so that no third-party photograph is stored here. The gold circles are the
couple photo frames; the empty cream boxes are the gallery and the video.

---

## Page skeleton (top to bottom)

0. Fixed layers: a petal layer (6 petals) behind everything; floating music and WhatsApp
   buttons that appear only after the opening card is dismissed.
1. **Opening card** (fixed, full screen) — `00-opening.jpg`
2. **Hero** — names on a colour field
3. Divider
4. **Blessing**
5. Divider
6. **Couple**
7. **Countdown** (dark band)
8. Divider
9. **Wedding events** (timeline)
10. Divider
11. **Gallery** ("Our Journey Together")
12. Divider
13. **Video** ("A Special Glimpse")
14. **Venue** (map)
15. **Live stream** (dark band)
16. Divider
17. **RSVP**
18. **Footer** (dark band)

Light and dark bands alternate: dark hero → light → light → dark countdown → light ×4 →
dark live stream → light RSVP → dark footer. The alternation is what gives the page its
rhythm on a long scroll; keep a deliberate rhythm in every theme.

---

## Section by section

### 1. Opening card
- Full-screen fixed overlay, radial gradient (lighter centre, darker edges).
- Top to bottom, all centred: a line mandala (~90px, slowly rotating) → tiny tracked caps
  "You are cordially invited" → italic "Dear Guest," (guest name from the link) →
  couple names on three lines (name, script ampersand, name), large, gold, tracked →
  an outlined button "Open Invitation" → a tiny tagline under it.
- Body scroll is locked while it is up.
- On tap: the overlay fades out (~0.8s); music starts at volume 0 and fades up to 0.25
  over about 2 seconds (steps of 0.02 every 150ms); music and WhatsApp buttons appear.
  If the browser refuses autoplay, the music button is still shown so the guest can tap
  it.

### 2. Hero
- `min-height: 100vh`; radial gradient lighter at the top centre.
- Four thin L-shaped corner brackets (~48px phone, ~80px desktop, opacity ~0.35).
- A very faint (opacity ~0.06) large mandala behind the names (300px phone, 600px
  desktop), slowly rotating.
- Tracked caps "|| Shubh Vivah ||" (0.7rem phone / 0.8rem desktop, letter-spacing .35em).
- Names: serif 600, 3.3rem phone / 4.5rem desktop (2.7rem under 375px), line-height 1.1,
  with a moving gold shimmer clipped to the text; script ampersand on its own line.
- A divider: two thin rules with a small square/diamond in the middle.
- Date in tracked caps (1rem, weight 300), city below at 60% opacity.
- "Scroll" hint at the bottom with an arrow bouncing 8px.
- Desktop: decorative marigold shapes float at the screen edges with a parallax effect;
  on tablets they are smaller and tucked in.

### 3. Blessing
- Light ivory section, generous padding (64px phone, 96px desktop).
- Line icon of Ganesha (gold), then "|| श्री गणेशाय नमः ||" in the display serif (1.4rem,
  maroon), then a paragraph (1.05rem, weight 300, line-height 1.8, max-width 560px).
- Thin ornament rule above and below.

### 4. Couple
- Cream section. Phone: one column — groom card, script "&", bride card. Desktop: the two
  cards side by side with the "&" between them.
- Card: circular photo frame (150px phone / 180px desktop) with a 4px multi-stop gold
  gradient ring → name (serif 700, 1.6rem / 2rem) → small "Son of" / "Daughter of" →
  parents' names (0.95rem, weight 500).
- Motion: cards rise 60px and fade in with a 0.2s stagger; the "&" scales up from 0 with
  a slight overshoot (`back.out`) 0.3s later. Triggers when the section top reaches 75%
  of the viewport, plays once.

### 5. Countdown
- Dark band, diagonal gradient.
- Title in a light serif (weight 300, 1.8rem, tracked .05em).
- Four outlined boxes (1px gold border, radius 8px, faint fill). Phone: 2×2 grid,
  max-width 320px (280px under 375px). Desktop: one row of four, ~100px each.
- Number: serif 700, 2.2rem phone / 3rem desktop, gold; label tiny tracked caps.
- A digit animates with a quick vertical flip only when its value changes.
- Boxes pop in from scale 0.5 with a 0.15s stagger and slight overshoot.
- Below: tracked caps "Save the Date", then two outlined buttons side by side:
  "Google Calendar" and "Apple / Outlook" (the second downloads an .ics file).

### 6. Wedding events
- Title in the display serif, 2.5rem, centred.
- **Desktop:** a vertical line down the centre; event cards alternate left and right of
  it; each card is right-aligned when on the left and left-aligned when on the right; a
  coloured dot sits on the line beside each card.
- **Tablet and phone (≤1023px):** the line moves to the left edge (~24px), every card is
  full width to its right, all left-aligned. With only one or two events the cards stay
  centred instead.
- Card: cream fill, 1px pale-gold border, radius 8px, padding 32px → line icon (colour of
  the event) → event name (serif 700, 1.5rem, in the event colour) → date (bold) → time
  ("10:00 AM onwards") → venue and address (muted) → outlined "View on Maps" button.
- Event colours: haldi yellow `~#E8A317`, mehendi green `~#2D5016`, sangeet pink
  `~#D4145A`, wedding = theme maroon, reception = deeper red.
- Motion: the line is an SVG path that **draws itself** as the guest scrolls through the
  section (stroke-dash driven by scroll position), with a soft glow at the tip; each dot
  **pops** (scale 1.3 with overshoot, then back) when it reaches 75% of the viewport;
  cards fade up as they arrive.

### 7. Gallery ("Our Journey Together")
- Cream section. Grid of 3 columns on desktop with 16px gaps; the layout adapts to the
  count (it has a `count-6` variant). Square-ish tiles, radius 8px.
- Items rise 40px and fade in with a 0.1s stagger.
- Tap opens a full-screen lightbox with next/previous and close.

### 8. Video ("A Special Glimpse")
- 16:9 frame, max-width 720px, radius 8px, dark fill, soft shadow, YouTube embed.
- Note: the reference loads the iframe immediately and it shows "Error 153" in some
  browsers. Our brief requires a poster + tap-to-load instead.

### 9. Venue ("Wedding Venue")
- Venue name (serif), address (small), a Google Maps embed (max-width 800px, 2px
  pale-gold border, radius 8px), then a solid gold "Get Directions" button.
- Desktop: the map stays centred under the text in the reference. Our brief asks for map
  and details **side by side** on desktop instead — follow the brief.

### 10. Live stream
- Dark band. Line icon of a play screen → "Can't Make It? Watch Live!" (serif) → one-line
  subtitle → solid gold "Watch Live" button → a tiny note about when the stream starts.

### 11. RSVP ("Kindly Respond")
- Subtitle "We would be honoured by your presence".
- Labels are small tracked caps in maroon; inputs are full width, cream, 1px border.
- Fields, in order: Full Name · Phone Number · Number of Guests (select 1–10) · Events
  Attending (one checkbox row per event, each in its own bordered row) · Dietary
  Preference (No Preference / Vegetarian / Non-Vegetarian / Vegan / Jain) · Message for
  the Couple (textarea) · full-width solid gold "Send RSVP".
- On success the form is replaced by a "Thank You!" message and a confetti burst falls
  (pieces in the theme colours, rotate 720° while falling, fade out).
- The reference has no "Will you attend?" choice. **Our brief requires Yes / No / Maybe
  first** and hides the guest count when the answer is No.

### 12. Footer
- Dark band: names in the script font, large, gold → date in italic serif → ornament →
  "Made with ♥ by …". Ours says "Made with Ruvva".

### 13. Floating buttons
- Bottom-right, 48px circles, 24px from the edges: WhatsApp (green, above) and music
  (theme dark with gold border, below). The music button pulses its glow while playing.

---

## Motion summary (what makes it feel premium)

| Effect | Where | Feel |
|---|---|---|
| Slow rotation | mandalas (opening, hero) | 60–140s per turn, barely noticeable |
| Moving shimmer | names | gradient slides across over ~6s |
| Petals falling | whole page | 6 petals, low opacity (~0.5), different speeds |
| Fade up on arrival | most section content | 800ms, once, offset ~100px |
| Stagger | couple cards, countdown boxes, gallery tiles | 0.1–0.2s between items |
| Overshoot pop | "&", countdown boxes, timeline dots | `back.out(1.7)` |
| Draw on scroll | events line | scrubbed by scroll position |
| Digit flip | countdown | only the digit that changed |
| Bounce | scroll hint | 8px, ~2s loop |
| Confetti | RSVP success | one burst |
| Music fade-in | after opening | 0 → 0.25 over ~2s |

Everything above must be switched off or made static under
`prefers-reduced-motion: reduce`.

---

## Gaps in the reference that our brief fixes

- No Yes/No/Maybe attendance choice → brief adds it.
- Video iframe loads immediately and errors → brief: poster + tap to load.
- Desktop venue is still single-column → brief: map and details side by side.
- Celebrity photos and a film song → brief: sample people are not real; music is our own.
- A price pill and "Order Now" over the invitation → never in ours.
- Letter-spacing on text that would be Indic → brief section 4 forbids it.
- Countdown has no "on the day" / "after the event" state → brief adds both.
