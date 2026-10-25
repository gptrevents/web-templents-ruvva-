# Ruvva web-invitation themes

Basic and premium web-invitation themes for the Ruvva app, built as plain HTML/CSS/JS so they can be
ported into the app's invitation engine. Each theme lives in `themes/<theme-id>/`.

```
AGENTS.md                      rules applied to every agent task (read first)
WEB_INVITE_THEME_BRIEF.md      the full brief
reference/
  arjun-priya/
    REFERENCE_SPEC.md          the base: sections, behaviour, phone vs desktop
    screenshots/phone/         390×844 (photos hidden)
    screenshots/desktop/       1440×900 (photos hidden)
  existing-themes.md           themes already in the app — do not repeat them
shared/
  core.js                     shared invitation behavior
  blessings.js/.css             UPI gift claims and responsive layout
  vendor/                      local MIT QR encoder + licence
  sample-data.json             full wedding sample
  sample-empty.json            every optional field empty
  sample-birthday.json         one long name, one event
  sample-telugu.json           Telugu text
  sample-assets/               placeholder photos (not real people) + generated music
tools/
  shoot.mjs                    screenshots + automatic checks for one theme
themes/                        seven finished visual themes
```

## Build a theme

Give the agent a task like:

> Build the theme `temple-dawn` (seed in WEB_INVITE_THEME_BRIEF.md section 12),
> following AGENTS.md.

Then check it:

```sh
npm ci
npx playwright install chromium
node tools/shoot.mjs temple-dawn
node tools/preview-gallery.mjs   # http://127.0.0.1:4175/
# Phone on the same Wi-Fi: RUVVA_PREVIEW_HOST=0.0.0.0 PORT=4178 node tools/preview-gallery.mjs
```

Serve the repository root, including `/shared/`; theme folders now import the common
ES module. See [shared/README.md](shared/README.md) for the callback/data contract and
verification commands. Sample gift IDs use `demo:true` and cannot initiate payment.
Start all new theme branches from `main`, then merge finished work back into `main`;
keep prior branches.

## Order

`temple-dawn` → `mehendi-garden` → `midnight-diya` → `kolam-courtyard` → `banana-leaf`
→ `palm-leaf-script` → `marigold-fiesta` → `pastel-editorial` → `peacock-jharokha`
→ `coastal-sunset` → `kanjivaram-silk` → `ink-and-gold`. One per task.

## Rights

Artwork and invitation code are original to this project. The local QR encoder is MIT-licensed; see shared/vendor/LICENSES.md. The reference screenshots show the structure of a public
page for study only; its photos, video and map were hidden before capture. Do not add third-party images or music.
