# Artwork and provenance

Original source artworks and isolated-object refinements were created for this theme using the built-in `image_gen` tool. The user’s board guided composition; no pixels from it are shipped. Exact prompts and saved original PNG paths are in [generation-prompts.json](generation-prompts.json). People are fictional generated portraits, not real clients or celebrities. Source PNGs remain in their original generated-images folder; all runtime derivatives are inside this theme.

| Runtime asset | Source / preparation |
|---|---|
| `assets/welcome.webp` | welcome source, portrait 600×900, WebP quality 72; whole painting retained |
| `assets/house-wide.webp` | house-wide source, 740×493, quality 74; whole scene retained |
| `assets/house-desktop.webp` | independent wide source, 1440×960 quality 77; loaded for desktop opening only |
| `assets/toran.webp` | toran source, 800×267 quality 75, original real alpha preserved |
| `assets/altar.webp` | altar source, 740×493 quality 75; whole scene retained |
| `assets/kalash.webp` | ritual atlas top-left object, crop (15,15,607,607), trimmed alpha, 230px maximum width |
| `assets/doorway.webp` | ritual atlas top-right object, crop (610,15,1254,670), trimmed alpha |
| `assets/satyanarayana.webp` | independent clean altar refinement, complete arch and pedestal, 230×233, quality 74 |
| `assets/meal.webp` | independent clean meal refinement, complete banana leaf and bowls, 230×153, quality 74 |
| `assets/father.webp`, `mother.webp`, `son.webp` | three equal portrait-atlas columns, 5px gutter removed; downsampled 230px wide, quality 76 |
| `assets/lotus-edge.svg` | original vector drawing authored in this theme |
| `assets/sample/*` | repository shared sample placeholders and original 24-second generated music drone; copied as required |

Atlas derivatives are separate object extractions; neighboring-cell fragments were excluded when selecting bounds. Transparent canopy and all four ritual objects retain real alpha, including fully transparent pixels. Compression keeps the complete scene visible without CSS zooming; sample portraits use their designed oval portrait crop.

Google Fonts: Cormorant Infant, Lora and Great Vibes, distributed under the SIL Open Font License. Google Fonts CSS is the only font service. All families are CSS variables. Great Vibes is confined to fixed English headings; data names and Indic text use the book serif fallback.

The live sample is a fictional family and address for demonstration. No third-party photographs, songs, branding, embedded text, or external image dependencies are included. Shared QR encoding is the repository’s local MIT component.

New October 26 refinement: `assets/ceremonial-rail.webp` is an original built-in image_gen transparent side-border illustration. Transparent bounds were trimmed, resized to (78, 509) and saved as WebP quality 53; original alpha retained. Exact prompt and original PNG path are in generation-prompts.json.

Personal-letter refinement: the lotus crest and botanical corner engravings are original authored static SVG in guest.js. The guest initial is live Unicode text; no external icon/art library or bitmap was added.
