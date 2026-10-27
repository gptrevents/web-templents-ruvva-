# Guest-first pilot — Griha Mangalam only

## Intended review
The user requested one invitation first, with other themes to follow only after approval. This folder alone changes. The existing artwork, event details and shared invitation behaviors remain in use.

Four recipient touchpoints:
1. Opening: a distinct “An invitation especially for” inscription, a readable serif guest name and optional partner/family line; host names remain separate.
2. Blessing chapter: a personal invitation stationery panel and optional private host note.
3. RSVP: a named question, prefilled editable respondent name and an accessible guest-correction editor. Required phone/attendance validation and callback/retry behavior remain shared.
4. Closing: a personal welcome, followed by attendance-aware wording only after a successful RSVP. The shared confirmation thanks the name actually entered in the form.

## Data contract
Optional data supplied by the integrating application:
```json
{
  "guest": {
    "name": "Kiran",
    "honorific": "Garu",
    "partyType": "family",
    "note": "Please come early. We would love your blessings."
  }
}
```
`partyType` is `individual`, `couple` or `family`; no gender, title or relationship is inferred. Names are capped at 160 Unicode code points, honorifics at 40 and notes at 600. Text uses textContent/value throughout. Honorific stays out of the RSVP name field for structured data.

Preview compatibility: `?g=Kiran%20Garu&party=family`; `g` overrides the structured name and `party` is enum-validated. An override to another person clears the original honorific/note. No name leaves a complete generic invitation and blank respondent name.

Correction is in the RSVP chapter after opening. It updates the visible recipient message and RSVP name locally; original personal notes are cleared. Cancel/Escape preserve the original identity; reset returns to generic copy. Correction is hidden after RSVP success. No localStorage or URL rewriting is used.

## Integration boundary
This is a visual/interaction pilot, not a guest authentication or invitation-ID system. URL names are untrusted display input, not identity proof. Existing onInviteRsvp still receives its normal respondent payload. Before production, the app/backend must resolve an opaque invitation/guest token, authorize guest-specific notes and decide how a forwarded link's new respondent is recorded. This pilot does not assign or reassign a server guest ID, persist RSVPs, create per-guest public pages, or implement app editing/sending. It makes no new network calls beyond the existing sample/asset/embed behavior.

## Validation
`node themes/griha-mangalam/qa/guest.mjs`: personalized opening, family labels, all four touchpoints, RSVP prefill/correction and successful closing at 320, 390, 820, 844×390 and 1440; Telugu and long names; safe HTML-like guest names; generic fallback; structured honorific/note; original-note clearing; failed callback/retry; No/Maybe outcomes. Exact results: guest-report.txt; visual captures: screenshots/guest/.

`node themes/griha-mangalam/qa/check.mjs`: existing invitation interactions pass; its required-name check now deliberately clears the prefilled guest name before testing empty fields.

Required shoot and asset/runtime budgets are checked again; see shoot-report.txt and asset-report.txt. No new raster images or fonts are introduced. Customer review of this one pilot is required before propagating guest personalization to other themes.

## Personal letter artwork refinement
The user requested a distinctive design specifically for the personal-message card. It now uses an original authored SVG lotus crest, four independently positioned botanical corner engravings, a fine double brass border, luminous paper and a decorative embossed guest-initial seal. SVG corners keep their proportions as long text expands the card. The initial uses Unicode grapheme segmentation so Indic vowel signs stay attached; it updates after identity correction. It is decorative, hidden from assistive technology and makes no identity-verification claim. All guest content remains live safe text. No new raster assets, fonts or shared behaviors were added. Guest QA now verifies the initial updates from K to R along with the existing flow; phone and desktop personal-card captures were refreshed.
