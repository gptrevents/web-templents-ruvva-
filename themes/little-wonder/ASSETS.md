# Little Wonder — artwork provenance and prompts

All six artwork outputs were made with the **built-in imagegen tool** for this project. No fallback CLI or API key was used. The user supplied moodboards as art direction; their pixels are not shipped. The child is fictional. Sources remain in the generation folder; optimized final files are saved inside `themes/little-wonder/assets/`. These are project-generated illustrations, not third-party stock photographs. All lettering is live HTML.

Original generation directory: `/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464/`.

## 1. Day landscape
Original: `exec-f6210f7f-f467-4d28-9c06-591607c618c1.png`.
Final: `assets/day-desktop.webp`.

Prompt:
```text
Create a text-free premium children's picture-book illustration for a birthday invitation website. Wide landscape composition 3:2. A joyful fictional Indian boy aged five, tousled black hair, white shirt and caramel shorts, sitting on a wooden rope swing hung from a lush tree at the RIGHT third, smiling upward, small friendly golden puppy beside him, wrapped presents and daisies at bottom. Layered botanical garden, emerald leaves, gentle yellow sunlight, tiny colorful balloons, rolling distant green hills. LEFT two thirds and upper middle are very quiet pale buttery sky with soft clouds, generous empty area for live website typography. Rich polished hand-painted animation-film storybook realism, detailed leaves and materials, charming expressive child, tasteful warm cyan/lemon/orange palette. No words, letters, numbers, signs, logos, watermark, frame, UI or collage. Full scene with edges to edges. This is a completely fictional child, not based on any real person.
```

## 2. Day portrait
Original: `exec-b72f6798-89af-4177-861a-6910bcf64bee.png`.
Final: `assets/day.webp`. Reference/edit target: the original day landscape above, inspected before the call.

Prompt:
```text
Recompose this original fictional child's garden birthday painting as a tall portrait 2:3 website background. Keep the exact same fictional five-year-old boy, white shirt, caramel shorts, swing and puppy, polished detailed animation-film painting style. Place the entire child, swing seat, puppy and presents in the LOWER 45% of the portrait; upper 55% must be quiet very pale buttery ivory sky, with leafy branches confined to top corners and sides, generous blank center for live invitation text. Bottom garden flowers, far hills, tiny balloons at sides, warm cyan/lemon sunshine. Show the full boy and feet without cropping. No text, signboards, lettering, watermarks, or UI.
```

## 3. Night landscape
Original: `exec-1f25f8e2-6f97-478d-9d84-eebeeb439b71.png`.
Final: `assets/night-desktop.webp`. Style/character reference: day landscape.

Prompt:
```text
Create a complementary night illustration for this original fictional child's birthday storybook website. Wide 3:2 landscape. Same fictional Indian five-year-old boy with black tousled hair, white shirt and caramel shorts, seen in three-quarter back view sitting beside a teddy bear on a garden terrace at LOWER RIGHT, pointing at a crescent moon in the upper right sky. Tiny warm lanterns and daisies at ground, distant tiny hillside houses with lit windows. LEFT two thirds is beautifully quiet deep midnight blue sky with delicate stars and a subtle warm horizon, room for live thank-you typography. Detailed premium hand-painted animation-film storybook style matching the reference palette and child. Enchanting, peaceful, no bright area behind left text. Full image edge-to-edge. No text, words, numbers, signs, logos, watermarks or UI.
```

## 4. Memory sheet
Original: `exec-03aa18ee-9151-4448-be19-c493bdc4a87d.png`.
Final: `assets/memory-1.webp` through `memory-4.webp`, and `portrait.webp` (third quadrant, higher-resolution main portrait). Production preparation only: crop quadrants and encode WebP. Style/character reference: day landscape.

Prompt:
```text
Create a square four-panel 2x2 artwork asset sheet, four equally-sized square illustrations, no borders or margins, NO words or labels. Match this reference's premium detailed animated storybook painted style and same FICTIONAL Indian child, not a real person. Top left: smiling six-month-old baby version of him, white romper, sitting on pale garden blanket. Top right: toddler version age two taking happy steps across a sunny garden, yellow linen overalls, daisies. Bottom left: same five-year-old boy with tousled black hair, white shirt, smiling chin resting on hands, close-up, gentle creamy garden background, bright eyes. Bottom right: same boy aged five running with a blue kite across a green meadow, full figure, sunlight. Each subject must be entirely within its own square quadrant with safe space around head. Coordinated luminous lemon/green/cyan colors, believable hands and faces. No lettering, numbers, logos, watermarks, frame, UI.
```

## 5. Night portrait
Original: `exec-8fc9875f-85dd-482a-8a44-6bf941bb79d7.png`.
Final: `assets/night.webp`. Reference/edit target: the night landscape above, inspected before the call.

Prompt:
```text
Recompose this original birthday thank-you illustration into a tall portrait 2:3. Preserve the same fictional Indian boy, white shirt/caramel shorts, teddy bear, lanterns and rich painted style. Boy and teddy sit entirely inside the LOWER third, on a terrace pointing upwards, whole body visible, tiny hillside houses and warm lights at very bottom. Crescent moon in middle-right of the sky. TOP 55% must be quiet dark midnight blue starry sky with generous clear space for live website thank-you typography. Sparse leafy branches at top corners only, small golden twinkling stars. Beautiful coherent enchanting night palette. NO lettering, numbers, text, logos, signs, watermark or UI. Edge-to-edge painted scene.
```

## 6. Transparent botanical margin
Original: `exec-6dbeba48-aede-4760-994a-32b49e77c0c3.png`.
Final: `assets/garden-sprig.webp`. Real alpha verified: original RGBA range 0–255, preserved in WebP. Not a white rectangle or painted checkerboard. Original alpha retained without background-removal processing.

Prompt:
```text
An isolated decorative asset for a premium child's garden-birthday illustrated website. One elegant narrow vertical trailing garden sprig, natural vivid green leaves with delicate veins, a few tiny yellow and white daisies, two small curling stems and a little cyan-blue kite snagged among the upper leaves. Organic tapering silhouette, leaves mainly along the left edge, sparse airy gaps toward right, height about three times width. Sophisticated detailed hand-painted animation-film storybook style with warm sunlight on leaves, realistic botanical surfaces, matches a cheerful lemon/cyan garden. NO pot, ground, tree trunk, rectangle, border, text, lettering, logos, watermark, stars or characters. REAL TRANSPARENT BACKGROUND, all isolated leaves and petals cleanly cut out with genuine alpha; not a flat background or checkerboard.
```

## Other assets
- Inline SVG balloons, star/ripple dividers, occasion and control icons: project-authored vector code, no external icon library.
- `assets/sample/music.mp3`: original 24-second synthesized garden music-box melody, created with the committed `assets/make-music.py` and encoded locally with ffmpeg. No third-party song or sampled recording.
- Remaining `assets/sample/` placeholders were copied from `shared/sample-assets/` as required and retain repository provenance. They are used only by alternate fixtures.
- Baloo 2 and Nunito Sans are requested through the allowed Google Fonts CSS endpoint; no font binary is copied from another invitation.

Font licences verified from the primary Google Fonts repository: [Baloo 2 OFL.txt](https://github.com/google/fonts/blob/main/ofl/baloo2/OFL.txt), copyright 2019 The Baloo 2 Project Authors; [Nunito Sans OFL.txt](https://github.com/google/fonts/blob/main/ofl/nunitosans/OFL.txt), copyright 2016 The Nunito Sans Project Authors. Both are SIL Open Font License 1.1. No local font binary is redistributed.
