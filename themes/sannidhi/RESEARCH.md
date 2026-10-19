# Traditional invitation — observed reference study

Reference: https://myshaadhilink.in/invitation/traditional-invitation?to=Guest&demo=true
Inspected 19 October 2026 in the in-app browser, landscape (~1265px) and phone (390px). Read-only visual/interaction study, not an asset or implementation extraction. Third-party photographs, recording, illustration files and code are not included in this theme.

## Every visible section and control

| Part | Observed behavior and composition | Our response |
|---|---|---|
| Opening | Cream screen; broad mango/marigold/jasmine canopy; Ganesha, faith line, tiny flourish, calligraphic names and a maroon pill. Flat painted gopuram skyline at bottom, faint mandala corners. Phone shrinks canopy and keeps a tall ceremonial cover. | Original lamp-light ceremony, indigo night giving way to rice-white temple courtyard; no copied skyline, maroon pill or script names. Guest salutation added. |
| Open action | Cover fades away; music button changes from Play to Pause. Hero becomes available to scroll. | Light physically expands from the lamp; cover removed from DOM; focus and scroll released; theme-local music fades up. |
| Hero | Watercolor sculpted gopuram, banana plants and hills; quotation, families line, large stacked names over the tower, date and city. Temple panorama dominates the screen. | New portrait/landscape temple paintings with a quieter name field, separate transparent toran and live drawn birds. Scene/canopy move at different rates. |
| Procession | Burgundy line illustration of horse, palanquin and musicians between hero and couple. Large whitespace and faint mandala at side. | Original elephant ceremonial frieze; original kolam band. No tracing or copied procession. |
| Couple | Two round portraits surrounded by mango leaves and marigold rings; names and parents below. Side-by-side desktop and stacked phone. | Silk-bordered rectangular portrait panels joined by jasmine, fictional adult people, side-matched family JSON. |
| Elephant divider | Pair of inward facing burgundy elephants, lotus/vessel between them. | Newly generated detailed painted elephant pair, new saddle patterns, colors, pose and vessel. |
| Events | Four cream outlined cards in a desktop 2x2 arrangement; each has name, date, time, venue, Get Directions. Single-column phone. | New foldout calendar wall grouped by actual date, all details visible. Theme SVG icons, colors, drawn connecting thread and popping day markers. |
| Countdown | Four outlined boxes in a single row, colon dividers, labels below. Displayed after events, currently zeroes because reference date has passed. | Four hanging bell plaques; required engine order places countdown before events. Today and past states prevent misleading permanent zeroes. Calendar options here. |
| Gallery | Six photos; first image wide, remaining smaller portraits in an irregular desktop 3-column grid. At 390px first image spans the width and following images form 2 columns. Initial scroll entry includes opacity, small displacement and slight rotation which settle. | New fanned photograph composition; angle/spacing linked to scroll, explicit previous/next/index controls and touch swipe. |
| Full viewer | Click first photo opens dark full-screen overlay with Close/Previous/Next; accessible counter “1 of 6”. Right arrow advanced to “2 of 6”; Escape dismissed and restored photo focus. | Native modal dialog with visible arrows/counter, keyboard, touch swipe, scroll lock and focus return. |
| Video | “Our Story”, YouTube player already inserted before any video tap. Landscape frame; video uses third-party artists. | Local poster first, only validated YouTube ID inserted after guest taps. No reused reference video. |
| Venue | “When & Where”, venue/address, Get Directions then embedded map; centered vertical layout even on wide screens. Phone map full content width. | Designed desktop 60/40 map/details, address, directions and tap-to-call. Phone stacks. |
| RSVP | Name required; Accept/Decline radio choices; optional message. Confirm button disabled until required state. No guest-count/phone/diet/event selectors visible. No submission was made to the reference owner. | Full required Yes/No/Maybe, Indian phone validation, guest count, event/diet/message fields, local demo/callback only. Loading/failure/success states. |
| Share row | WhatsApp, Add to Calendar, Copy Link buttons under RSVP. Calendar click produced no on-page chooser; no calendar event was saved. Share link was inspected but no message sent. | Preserve invitation sharing, explicit Google/ICS calendar choices, Copy Link with feedback. |
| Footer | Names, ornament, vendor link and flat gopuram skyline again. | Own temple tableau and live names, Made with Ruvva. |
| Floating music | Bottom-right circle, Play/Pause state works. Reference order/price pill bottom-left. | Music/share rail reserved away from content, >=44px, playing ring; no commercial pill. |

## Animation research limits and decisions

The study observes visible transitions, screenshots, element positions and controls. Source scripts, proprietary assets and exact proprietary easing curves were not copied. Rapid screenshots can catch reveal opacity halfway through a transition; settled states were also inspected. No device-wide 60fps claim is made from these observations. The important effects to preserve are scene depth, gentle ceremonial movement, staged content arrival and photographic movement during scrolling. Continuous loops must pause offscreen/when hidden; reduced motion shows a complete static composition. Native touch scrolling stays native, with light time-based wheel easing for fine pointers.

## Scope of “upgraded”

This means original art, a different visual identity and complete guest functionality, including the engine's accessibility, language, performance and responsive requirements. It is an art direction goal, not a claim that visual taste can be objectively ranked. No price/order flow, celebrity photograph, film recording or third-party artwork is reused. No live RSVP, message or external calendar save was performed during research.
