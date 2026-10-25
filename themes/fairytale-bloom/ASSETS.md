# Fairytale Bloom — final assets and provenance

All paintings are original project artwork made with the **built-in imagegen tool**. No API key, fallback CLI, third-party photograph or reference-site asset is used. The user supplied a six-panel birthday moodboard; it guides composition, not the shipped pixels. The girl is fictional, and the baby/toddler versions are illustrative memories, not a real child's biography. Every name, date, caption, signpost word and button is live HTML.

Final images are saved in `themes/fairytale-bloom/assets/`. Raw originals remain in the generation library and are not runtime dependencies. `generation-prompts.json` records every original path and exact prompt. Production preparation is crop/resize/WebP encoding only; the transparency pass uses built-in imagegen. Transparent objects were composited on the actual pale pink paper for inspection and alpha was verified numerically. Colors stored underneath alpha-zero pixels do not form an opaque background.

## Final file inventory

| File | Dimensions | Bytes | Mode |
|---|---:|---:|---|
| `bouquet.webp` | 160×162 | 12,290 | RGBA |
| `cake.webp` | 160×172 | 10,902 | RGBA |
| `cover-desktop.webp` | 1536×1024 | 197,746 | RGB |
| `cover.webp` | 640×960 | 89,170 | RGB |
| `dinner.webp` | 160×134 | 9,478 | RGBA |
| `gifts.webp` | 160×163 | 9,554 | RGBA |
| `memory-1.webp` | 240×240 | 9,028 | RGB |
| `memory-2.webp` | 240×240 | 15,112 | RGB |
| `memory-3.webp` | 240×240 | 13,782 | RGB |
| `memory-4.webp` | 240×240 | 12,964 | RGB |
| `moon-desktop.webp` | 1440×960 | 180,044 | RGB |
| `moon.webp` | 600×900 | 88,952 | RGB |
| `portrait.webp` | 448×524 | 52,862 | RGBA |
| `signpost.webp` | 190×233 | 17,102 | RGBA |
| `venue.webp` | 580×387 | 52,316 | RGB |
| `welcome.webp` | 160×152 | 13,586 | RGBA |

The six-object atlas was cropped using separate non-overlapping bounds around the arch, cake, gifts, dinner table, signpost/teddy and bouquet, then encoded with alpha intact. Source crops: welcome (0,0,548,520), cake (550,0,1024,510), gifts (1024,0,1536,520), dinner (0,520,604,1024), signpost (604,510,1024,1024), bouquet (1028,510,1536,1024). The four memory quadrants are split at the original sheet midpoint. Portrait versus landscape sources use `<picture>`; no device detection.

## Generation prompts and sources

### day

Final use: assets/cover.webp — portrait opening.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-9174e451-bafd-47e2-a3a4-03b4ad2f45c8.png`

```text
Use the attached birthday moodboard only as art-direction reference. Create ONE text-free portrait 2:3 illustration for the cover of a premium girl's birthday invitation, matching its pink fairy-garden mood and composition closely. Original completely fictional Indian girl aged five, long wavy dark-brown hair, tiny delicate flower tiara, beautiful layered blush-pink party dress, sitting among flowers in the LOWER HALF, chin resting on her hands, joyful dreamy expression looking slightly upward. A small white rabbit and warm lantern to lower left, a delicate distant fairytale castle at right, peach roses and tiny daisies, glowing butterflies. A richly painted climbing flower arch curves up the LEFT AND RIGHT EDGES and across the very top. UPPER CENTER 45 percent is quiet pale warm ivory-pink sky, genuinely clear for live invitation text. Soft peach golden hour, exquisite detailed hand-painted animation-film storybook realism. Frame the full girl and dress inside the portrait, safe margins, luxurious flowers but no opaque central decorations. No text at all, no numbers, no lettering on any prop or sign, no UI, no collage, no logo or watermark.
```

### day-wide

Final use: assets/cover-desktop.webp — landscape opening.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-f601febb-ecd5-4917-9dc1-a97e2a0ba232.png`

```text
Recompose this original girl's pink fairy-garden portrait as a WIDE 3:2 landscape illustration for a birthday invitation. Keep the same fictional five-year-old Indian girl, same face, wavy brown hair, flower tiara and elaborate blush-pink dress, chin resting on both hands. Girl sits at RIGHT third, full dress in frame. Flower arch frames top and outer edges, white rabbit and lantern near lower right, far castle behind her. LEFT 55% is quiet pale ivory/peach-pink glowing sky for live lettering. Exquisite rich animated-storybook painting, natural detailed peach flowers. No text, lettering, numbers, logos, UI, signboards or watermark.
```

### portrait

Final use: assets/portrait.webp — isolated central child portrait.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-c42f9782-9223-456f-aefc-9ad890c21b42.png`

```text
Isolate the SAME fictional five-year-old Indian girl from this original painting as a single cutout portrait, facing slightly upward smiling, chin resting on both hands, long wavy dark-brown hair, delicate peach flower crown, blush-pink party dress. Show head, both hands, elbows and upper skirt, clean full silhouette, no head cropped. Premium detailed animated-storybook realism matching the reference exactly. REAL transparent background, no garden, no flowers around the perimeter except her flower crown, no floor, no text, no halo, no frame, no checkerboard. This is a completely fictional child.
```

### memories

Final use: assets/memory-1.webp through memory-4.webp — four quadrant crops.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-e4682866-d9b8-4978-a788-de8abe7fff64.png`

```text
Create a square 2x2 asset sheet with four equal square portraits, no borders, no letters. Use this original painting as reference for the SAME fictional Indian girl and the same exquisite detailed animated-storybook style. Top left: baby version of her aged six months in a white/pink romper with a pink head bow, cheerful face, softly lit floral nursery. Top right: toddler version aged two in a pink dress, smiling first steps in a garden. Bottom left: same five-year-old girl in playful pink sunglasses, little explorer in a rose garden. Bottom right: same five-year-old girl smiling in a blush-pink dress and floral hairband, holding one small pink flower. Clear recognizable coherent faces across all four quadrants, full heads inside each safe frame, airy pastel peach backgrounds. No text, names, dates, numbers, watermark or UI.
```

### objects

Final use: Original six-object source atlas; final alpha pass below is used for delivery.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-ef1bb1d5-d41f-4b69-9252-fdfe4be9b2b4.png`

```text
Create a beautifully detailed hand-painted storybook birthday decoration asset atlas, REAL TRANSPARENT background, six separate objects in a precise 3-column by 2-row grid with generous transparent gutters, no object crossing its own cell. Top left: tiny peach-rose welcome arch around a completely blank cream sign and two pink balloons. Top middle: exquisite three-tier pink birthday cake with tiny roses, strawberries and five unnumbered candles. Top right: a stack of peach/lilac/pink wrapped gifts with golden bows. Bottom left: a little feast table with warm bowls of Indian dinner food and tiny flowers. Bottom middle: a wooden signpost with SIX COMPLETELY BLANK horizontal wooden arrows, beside a cute plush teddy bear and a few roses. Bottom right: a lush peach-pink rose and daisy corner bouquet with curved green leafy branches. Match the warm luminous rich animated-fairy-garden style of the reference, not flat clipart. Each item isolated with genuine alpha transparency; no white squares, grey checkerboard, floor or shadows outside the objects. No text, letters, numbers, logos, watermark or UI.
```

### moon

Final use: assets/moon.webp — complete portrait crescent scene.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-de41f920-fb71-41df-91d5-7fc73de084e9.png`

```text
Create a tall portrait 2:3 fantasy birthday closing painting matching this original fictional girl's appearance and detailed premium storybook style. The same fictional five-year-old Indian girl, wavy brown hair, flower tiara, blush-pink layered party dress, seated on the inner curve of a large glowing golden crescent moon, hugging a small cream teddy bear. Entire crescent, full girl and full dress in frame, placed in the LOWER HALF. Delicate peach roses, daisies, lanterns and butterflies around the moon, magical distant castle at right, soft peach sunset horizon behind her. TOP 35% is quiet rich deep midnight blue starry sky with a few hanging tiny gold stars, clear for live thank-you text. BOTTOM 15% is pale warm blank parchment-colored clearing with roses along its edges, clear for live message text. Luxurious, dreamy, feminine, rich natural painted detail, no text at all, no lettering, no numbers, no watermark, no UI.
```

### objects-alpha

Final use: assets/welcome.webp, cake.webp, gifts.webp, dinner.webp, signpost.webp, bouquet.webp — alpha-preserving object crops.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-90d75eec-a08c-488e-b7fd-bb86c936bf51.png`

```text
Remove ALL of the brown gradient background in this six-object asset atlas, replacing every background pixel including gaps between petals and inside the blank arch's outer opening with genuine TRANSPARENCY. Keep exactly the same six original decorative objects in the exact same 3-column x 2-row positions and sizes: welcome arch and blank cream sign, pink birthday cake, wrapped gifts, feast table, six-arrow wooden signpost with teddy, rose corner bouquet. Keep the blank cream sign itself opaque. Preserve their colors and detailed painting, do not change their layout or crop anything. No replacement color background, no shadows outside objects, no checkerboard, no text. Output a real RGBA cutout atlas with alpha zero between all six objects.
```

### moon-wide

Final use: assets/moon-desktop.webp — landscape crescent scene.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-6c04a5f8-f306-47c6-ab91-bd5cbfb8a74c.png`

```text
Recompose this original birthday closing scene as a wide 3:2 LANDSCAPE painting. Preserve the same fictional girl, flower tiara, layered blush dress, teddy bear, and glowing rose-covered crescent moon. Place the entire moon and seated girl on the RIGHT half, all fully inside the frame. LEFT half is quiet dark blue starry sky fading into peach twilight and a pale warm parchment-colored clearing at lower left, usable for live thank-you text and a message. Delicate flowers and lanterns at outer edges, distant castle far right, subtle hanging tiny stars. Rich premium detailed storybook style, same character, no letters, words, names, numbers, logo, watermark, UI or collage.
```

### venue

Final use: assets/venue.webp — illustrated demo party venue.

Original: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/exec-4e4f33d1-a858-457d-85e6-7df010401e91.png`

```text
Create a new landscape 3:2 illustration of an enchanting girl's birthday garden venue, in the exact detailed warm pink fairy-garden painted style of this reference. A grand peach-rose and pink-balloon floral arch frames an inviting garden path leading to a small beautifully decorated party pavilion and cake table. Warm festoon lights and lanterns, daisies, peach roses and a distant fairytale silhouette, golden hour. No people. Keep all signs and backdrop circles completely blank, not even illegible writing. Exquisite realistic painted flowers, elegant rich pastel palette, full scene edge-to-edge, no title, no text, no numbers, no watermark, no UI.
```

## Other assets and licensing
- Original SVG crown, hearts, butterflies, occasion icons, ornaments and controls are project-authored code. No external icon pack or emoji icon is used.
- `assets/sample/music.mp3` is an original 24-second synthesized fairytale music-box loop. The source is `assets/make-music.py`; encoded locally with ffmpeg. No film song, sampled recording or third-party melody.
- Alternate fixture placeholders are copied from `shared/sample-assets/` and retain their repository provenance. No real-person portraits are included.
- Google Fonts family licences were checked directly in the primary repository: [Cormorant Infant](https://github.com/google/fonts/blob/main/ofl/cormorantinfant/OFL.txt), copyright 2015 the Cormorant Project Authors; [Lora](https://github.com/google/fonts/blob/main/ofl/lora/OFL.txt), copyright 2011 The Lora Project Authors; [Great Vibes](https://github.com/google/fonts/blob/main/ofl/greatvibes/OFL.txt), copyright 2015 The Great Vibes Pro Project Authors. All use SIL Open Font License 1.1. No local font binary is redistributed. Great Vibes is used only for fixed English decoration, not names.
