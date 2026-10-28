# Guest personalization review — 28 October 2026

The user approved adapting the Griha Mangalam guest-first prototype to the remaining themes. This intentionally spans twelve theme folders and a new shared recipient helper/CSS; the Griha prototype itself is preserved.

## Design and integration

- Four touchpoints: recipient salutation, personal letter, named RSVP with editable prefill, and an attendance-aware closing.
- Theme-local authored SVG crest, border/paper silhouette and monogram; no stock images, extra fonts or raster downloads. These original vectors are authored for Ruvva and have no third-party asset dependency.
- Shared helper handles safe text, identity correction, title/prefill updates and successful-response state; RSVP still uses the existing shared core callback.
- Guest data: optional `guest: { name, honorific, partyType, note }`; partyType is individual/couple/family. Preview query `?g=Kiran%20Garu&party=family` overrides the display. Changed name clears the prior honorific and personal note.
- Names remain live text, never inferred gender or titles. The decorative initial uses a Unicode grapheme, including Telugu vowel signs.
- Display-only prototype: opaque invite/guest IDs, access control and persistence remain production integration work. A URL name is not authenticated identity.

## Validation

See `guest-report.txt` from `node tools/check-recipients.mjs` for named layout at 320, 390, 820, 844 landscape and 1440; correction/cancel/clear; success/failure/retry; Yes/No/Maybe closing; long Telugu; injection; generic fallback; structured data/note reset; dependency-inclusive gzip budgets.

See `shoot-report.txt` from `node tools/shoot.mjs kalyana-vaibhavam` for all seven required widths, empty/birthday/Telugu samples, injection and reduced motion.

Named 390/1440 opening, letter, RSVP and closing captures are in `screenshots/guest/`, together with a 320px Telugu letter. Standard full-page sections are in the phone/desktop screenshot folders.

Manual review: themed letter composition and opening readability on phone/desktop; original host identity retained; RSVP controls and primary action remain usable. Shared correction editor is inside the section heading when present, preserving editorial two-column form placement. No extra continuous motion is introduced; reduced-motion behavior remains static.
