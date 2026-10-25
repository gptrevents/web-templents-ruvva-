import {
  mapSearch,
  mapEmbed,
  mapDirections,
  loadVideo,
  createIcon,
  EVENT_NAMES,
  LOCALE,
  reduced,
  el,
  add,
  button,
  link,
  https,
  local,
  svg,
  dateValue,
  dateText,
  timeText,
  youtube,
  initializeWheelScroll,
  calendar as coreCalendar,
  createRsvpForm,
  createFloatingControls,
  openGallery,
  mountCountdown,
  initializeMotion as coreMotion,
  initializeReveals,
  createAudio,
  startMusic,
  loadSample,
  initControls,
  prepareHero,
} from "../../shared/core.js";
const COPY = {
  en: {
    loadFailure:
      "The invitation could not be loaded. Please refresh to try again.",
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "With love, tradition and blessings.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "The Couple",
    coupleLabel: "Two families, one beautiful journey",
    son: "Son of",
    daughter: "Daughter of",
    countdownTitle: "Counting Down to Our Special Day",
    days: "Days",
    hours: "Hours",
    minutes: "Minutes",
    seconds: "Seconds",
    today: "Today is the day",
    past: "Thank you for celebrating with us",
    save: "Save the Date",
    google: "Google Calendar",
    apple: "Apple / Outlook",
    events: "Wedding Events",
    otherEvents: "The Celebrations",
    eventIntro: "The Wedding Journey",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "Before the Vows",
    photo: "Celebration photograph",
    close: "Close gallery",
    previous: "Previous photograph",
    next: "Next photograph",
    video: "A Special Glimpse",
    play: "Play video",
    venue: "Wedding Venue",
    otherVenue: "The Venue",
    directions: "Get Directions",
    call: "Call family",
    live: "Can't Make It? Watch Live!",
    liveSub: "Join us virtually as we celebrate this beautiful moment",
    liveNote: "The live stream will begin 30 minutes before the ceremony",
    watch: "Watch Live",
    rsvp: "Kindly Respond",
    rsvpSub: "We would be honoured by your presence",
    attendance: "Will you join us?",
    yes: "Yes",
    no: "No",
    maybe: "Maybe",
    name: "Full Name",
    phone: "Phone Number",
    phoneHint: "+91 followed by your 10-digit mobile number",
    guests: "Number of Guests",
    attending: "Events Attending",
    diet: "Dietary Preference",
    diets: ["No Preference", "Vegetarian", "Non-Vegetarian", "Vegan", "Jain"],
    message: "Message for the Couple",
    otherMessage: "Your Message",
    send: "Send RSVP",
    sending: "Sending…",
    nameError: "Please enter your full name.",
    phoneError:
      "Enter a valid 10-digit Indian mobile number, optionally with +91.",
    failure: "Your response could not be sent. Please try again.",
    thanks: "Thank You!",
    success: "We look forward to celebrating with you.",
    declineSuccess: "Thank you for letting us know. You will be missed.",
    made: "Made with Ruvva",
    music: "Play music",
    pause: "Pause music",
    share: "Share invitation",
    calendarDescription: "Join us for this celebration.",
    ceremony: "The celebration",
    videoHint: "Our Story",
    amp: "&",
    closing: "With Love & Blessings",
    hostNote: "With love, from our families",
    anyDay: "The celebration",
    thankYou: "Thank you",
    closingNote: "We await your gracious presence and your blessings.",
    lightNote: "A celebration of love, culture and togetherness.",
    copyLink: "Copy Link",
    copied: "Link copied",
    copyFailed: "Please copy this page address from your browser",
    shareTitle: "Share this invitation",
    weddingOf: "The wedding of",
    portraitCaption: "Bound by love, tradition and blessings",
    gallerySub: "Little moments from the years that brought us here.",
    wishes: "Bless us with your presence",
    yourPlace:
      "Let us know if you can join us, so we may keep a place for you.",
    discover: "Discover the celebration",
    fanHint: "Swipe, explore, and hold a moment a little longer",
    photoSelect: "Show photograph",
  },
};

// Compact authored pen icons for ceremony and media controls.
const paths = {
  calendar:
    '<rect x="4" y="7" width="24" height="23" rx="2"/><path d="M4 13h24M10 3v8m12-8v8M9 18h3m5 0h3m-11 6h3m5 0h3"/>',
  clock: '<circle cx="16" cy="16" r="13"/><path d="M16 7v10l7 4"/>',
  pin: '<path d="M16 30S5 19 5 12a11 11 0 0 1 22 0c0 7-11 18-11 18Z"/><circle cx="16" cy="12" r="4"/>',

  lamp: '<path d="M7 19h18c-1 7-17 7-18 0Zm9-3c-5-4 0-10 0-10s5 6 0 10ZM11 27h10"/>',
  haldi:
    '<path d="M4 17h24c-1 14-23 14-24 0Z" fill="currentColor" fill-opacity=".12"/><path d="M9 15q0-7 7-10 7 3 7 10M7 12l3-3m16 3-3-3M11 29h10"/>',
  mehendi:
    '<path d="M10 29c-5-7-7-11-4-12l4 4V8c0-4 4-4 4 0v9V5c0-4 4-4 4 0v12V8c0-4 4-4 4 0v11-6c0-4 4-4 4 0v9c0 4-4 7-4 7"/><path d="M13 23c-3-5 6-7 6-1s-6 4-5 1"/>',
  sangeet:
    '<circle cx="12" cy="19" r="9" fill="currentColor" fill-opacity=".1"/><path d="M5 16h3m-1 9 2-2m8 3-1-3m4-7h-3M22 17V5l7-2v12"/><ellipse cx="25.5" cy="16" rx="3.5" ry="2.5"/>',
  engagement:
    '<circle cx="16" cy="21" r="9"/><path d="m11 6 5-4 5 4-5 6ZM12 6h8"/>',
  wedding:
    '<circle cx="11" cy="21" r="8"/><circle cx="22" cy="21" r="8"/><path d="m8 8 4-5 4 5-4 5ZM21 6l3-3 3 3-3 3ZM9 8h6m-3-5v10" fill="currentColor" fill-opacity=".1"/>',
  reception:
    '<path d="M3 22h26M5 21a11 11 0 0 1 22 0M16 9V6m-3 0h6M5 28h22"/><path d="M8 18a8 8 0 0 1 5-5" stroke-width="2"/>',
  puja: '<path d="M10 11h12c-1 7 7 7 4 14-2 5-18 5-20 0-3-7 5-7 4-14ZM16 10c-8-8 0-8 0-8s8 0 0 8ZM8 19h16M10 24h12"/>',
  housewarming:
    '<path d="m3 15 13-12 13 12M6 13v16h20V13M12 29v-9h8v9"/><path d="M16 11c-6-7-11 2 0 7 11-5 6-14 0-7Z" fill="currentColor" fill-opacity=".12"/>',
  birthday:
    '<path d="M5 29V17h22v12M3 29h26M5 21q4 4 7 0 4 4 7 0 4 4 8 0M10 17v-6m6 6v-6m6 6v-6"/><path d="M10 8c-4-3 0-7 0-7s4 4 0 7Zm6 0c-4-3 0-7 0-7s4 4 0 7Zm6 0c-4-3 0-7 0-7s4 4 0 7Z" fill="currentColor" fill-opacity=".2"/>',
  nikah:
    '<path d="M20 3A13 13 0 1 0 29 24 12 12 0 0 1 20 3Z"/><path d="m25 7 1 3 3 1-3 1-1 3-1-3-3-1 3-1Z"/>',
  christian: '<path d="M14 3h4v9h9v4h-9v13h-4V16H5v-4h9Z"/>',
  play: '<circle cx="16" cy="16" r="13"/><path d="m13 10 9 6-9 6Z"/>',
  music:
    '<path d="M12 24V7l14-3v17M12 12l14-3"/><ellipse cx="8" cy="25" rx="4" ry="3"/><ellipse cx="22" cy="22" rx="4" ry="3"/>',
  pause: '<path d="M11 8v16m10-16v16" stroke-width="3"/>',
  share: '<path d="M8 19v8h18v-8M16 22V4m-6 6 6-6 6 6"/>',
  chevron: '<path d="m9 13 7 7 7-7"/>',
  previous: '<path d="m20 7-9 9 9 9M11 16h15"/>',
  next: '<path d="m12 7 9 9-9 9M6 16h15"/>',
  close: '<path d="m9 9 14 14m0-14L9 23"/>',
  petal:
    '<path d="M7 23C1 12 12 2 22 4c5 11-5 23-15 19Z" fill="currentColor" fill-opacity=".65" stroke="none"/>',
};
const icon = (k) => createIcon(paths, k, { normalize: false });
function names(d, cls = "names", tag = "div") {
  const n = el(tag, cls);
  n.setAttribute(
    "data-long",
    String(
      [d.name1, d.name2].some((value) => String(value || " ").length > 28),
    ),
  );
  if (d.name1) add(n, el("span", "", d.name1));
  if (d.name2) {
    if (d.name1) add(n, el("span", "amp", COPY.en.amp));
    add(n, el("span", "", d.name2));
  }
  return n;
}

function buildCouple(d, c) {
  if (!d.name1 && !d.name2) return null;
  const s = section(
    "couple",
    d.name2 ? c.coupleTitle : "",
    d.name2 ? c.coupleLabel : "",
  );
  const row = el("div", "couple-row");
  ["groom", "bride"].forEach((side, i) => {
    const name = i ? d.name2 : d.name1;
    if (!name) return;
    if (i && row.children.length) {
      const join = el("div", "join");
      add(join, el("span", "", c.amp), ornament());
      row.append(join);
    }
    const card = el("article", "person person-" + side);
    const frame = el("div", "portrait");
    const src = local(d.photoSlots?.[side]);
    if (src) {
      const img = el("img", "person-photo");
      img.src = src;
      img.alt = name;
      img.loading = "lazy";
      frame.append(img);
    } else frame.append(el("span", "monogram", Array.from(name)[0]));

    const carving = decorativeImage(
      "assets/portrait-frame.webp",
      "portrait-carving",
    );
    carving.width = 300;
    carving.height = 400;
    frame.append(carving);
    const family = d.families?.find((f) => f.side === side);
    add(card, frame, el("h3", "", name));
    if (family?.names)
      add(
        card,
        el("p", "label", family.relation || (i ? c.daughter : c.son)),
        el("p", "parents", family.names),
      );
    row.append(card);
  });
  s.firstChild.append(row);
  return s;
}

function calendar(d, c) {
  return coreCalendar(d, c, "Kalyana Vaibhavam");
}
function buildCountdown(d, c, ctx) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle);
  const sanctum = el("div", "count-sanctum");
  const picture = el("picture", "count-art");
  const source = el("source");
  source.media = "(min-width:600px) and (max-aspect-ratio:1/1)";
  source.srcset = "assets/countdown-phone.webp";
  const wide = el("source");
  wide.media = "(min-width:600px) and (min-aspect-ratio:1/1)";
  wide.srcset = "assets/countdown-desktop.webp";
  const painting = decorativeImage(
    "assets/countdown-phone.webp",
    "count-painting",
  );
  painting.width = 941;
  painting.height = 1672;
  picture.append(wide, source, painting);
  s.append(picture);
  const row = el("div", "carved-count");
  sanctum.append(row);
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "count-unit");
    const n = el("span", "digit", "00");
    add(unit, n, el("span", "label", c[k]));
    row.append(unit);
    return n;
  });
  const status = el("p", "count-status");
  mountCountdown(s, d, c, row, digits, status, (digit) => {
    digit.animate(
      [
        { transform: "translateY(8px)", opacity: 0.3 },
        { transform: "scale(1)", opacity: 1 },
      ],
      { duration: 350 },
    );
  });
  sanctum.append(status);
  add(s.firstChild, sanctum, calendar(d, c));
  return s;
}

function buildVideo(d, c) {
  const id = youtube(d.videoUrl);
  if (!id) return null;
  const s = section("video", c.video);
  const frame = el("div", "video-frame");
  const b = button(
    "",
    () => {
      loadVideo(frame, id, c.video);
    },
    "video-poster",
  );
  b.setAttribute("aria-label", c.play);
  add(b, icon("play"), el("span", "", c.videoHint));
  frame.append(b);
  const shell = el("div", "video-shell");
  add(shell, carvedVideoFrame(), frame);
  s.firstChild.append(shell);
  return s;
}
function buildVenue(d, c) {
  if (!d.venue && !d.address) return null;
  const s = section(
    "venue",
    d.eventType === "wedding" ? c.venue : c.otherVenue,
  );
  const grid = el("div", "venue-grid");
  const iframe = el("iframe");
  iframe.src = mapEmbed(d.venue, d.address);
  iframe.loading = "lazy";
  iframe.title = c.venue;
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  const details = el("div", "venue-details");
  add(
    details,
    icon("housewarming"),
    el("h3", "", d.venue),
    el("p", "", d.address),
    link(c.directions, mapDirections(d.venue, d.address)),
  );
  [d.ph1, d.ph2].filter(Boolean).forEach((ph) => {
    const cleaned = ph.replace(/[^\d+]/g, "");
    if (/^\+?\d{7,15}$/.test(cleaned)) {
      const a = link(c.call + " · " + ph, "tel:" + cleaned, "text-link");
      a.removeAttribute("target");
      details.append(a);
    }
  });
  const source = local(d.photoSlots?.venue);
  if (source) {
    const image = el("img", "venue-photo");
    image.src = source;
    image.alt = d.venue || c.venue;
    image.loading = "lazy";
    details.prepend(image);
  }
  add(grid, iframe, details);
  s.firstChild.append(grid);
  return s;
}
function buildLiveStream(d, c) {
  const url = https(d.liveStream?.url);
  if (!url) return null;
  const s = section("live");
  const text = el("div");
  add(
    text,
    el("h2", "", c.live),
    el("p", "", c.liveSub),
    el("p", "live-note", d.liveStream.note || c.liveNote),
  );
  add(s.firstChild, icon("play"), text, link(c.watch, url));
  return s;
}
function buildRsvp(d, c) {
  if (!d.rsvp?.enabled) return null;
  const s = section("rsvp", c.rsvp, c.wishes);
  s.firstChild.append(el("p", "rsvp-intro", c.yourPlace));
  s.firstChild.append(createRsvpForm(d, c, { ornament }));
  return s;
}
function buildFloating(d, c, ctx) {
  return createFloatingControls(d, c, ctx, { icon });
}

// Keep decorative loops asleep outside the viewport and while the tab is hidden.
function initializeMotion(root) {
  coreMotion(root, { selector: ".section,.opening,.ambient,.floating" });
}

// Give all desktop wheel/trackpad deltas one consistent time-based easing curve.
// Scroll the real document, so focus, sticky controls and browser navigation still work.

// Original geometric rice-flour lattice; static authored SVG, never interpolated data.

// All SVG instructions below are authored geometry; no JSON enters SVG markup.
function ornament() {
  const n = svg(
    '<path d="M1 35h50m198 0h50M54 35c22-18 31-9 20-2-11 8-17-7-7-13 15-9 24 10 34 15m145 0c-22-18-31-9-20-2 11 8 17-7 7-13-15-9-24 10-34 15M80 35q25 20 48 0m92 0q-25 20-48 0"/><path d="M150 43c-17-13-15-32 0-42 15 10 17 29 0 42Zm0 0c-28-2-41-16-36-31 18-1 29 11 36 31Zm0 0c28-2 41-16 36-31-18-1-29 11-36 31Zm-2 0c-29 9-47-2-48-17 19-6 37 2 48 17Zm4 0c29 9 47-2 48-17-19-6-37 2-48 17ZM130 49h40m-30 5h20M11 32l3 3-3 3m278-6-3 3 3 3"/><g fill="currentColor" stroke="none"><circle cx="39" cy="35" r="2"/><circle cx="261" cy="35" r="2"/><circle cx="93" cy="35" r="2"/><circle cx="207" cy="35" r="2"/></g>',
    "0 0 300 60",
  );
  n.classList.add("ornament");
  return n;
}
function lotus() {
  const s = svg(
    '<path d="M50 62C24 44 37 17 50 3c13 14 26 41 0 59Zm0 0C17 60 6 32 9 17c22 2 40 15 41 45Zm0 0c33-2 44-30 41-45-22 2-40 15-41 45ZM50 62C22 78 5 62 1 43c22-2 36 4 49 19Zm0 0c28 16 45 0 49-19-22-2-36 4-49 19ZM29 78h42M50 12v48M13 25l31 34m43-34L56 59"/>',
    "0 0 100 90",
  );
  s.classList.add("lotus");
  return s;
}
function ganesha() {
  const s = svg(
    '<path d="M54 33c-4-8-15-11-20-2-8 14-1 31 10 32m23-30c4-8 15-11 20-2 8 14 1 31-10 32M51 39c-7-4-13 3-11 9 2 5 5 8 10 9m20-18c7-4 13 3 11 9-2 5-5 8-10 9M52 30c-7 7-8 20-2 26 6 7 13 6 13 16 0 11-17 11-19 1m13-16c-2 7-1 10 4 12M61 33v13m-7-9h3m10 0h3M48 25h27L70 12H53Zm3-5h20M55 10l7-8 7 8M57 16h10M48 27q13-6 28 0M46 59c-13 5-19 20-13 30 9 13 46 14 55-2 6-11-4-23-13-27M42 67q-7 11 1 19m34-19q9 10-1 19M45 87q17-9 31 0M35 92l-15 5c-8 3-15-4-11-10l19-13m60 18 17 6c8 2 13-5 9-10L96 75M27 57 14 43l-5 6 13 21m75-15 13-15 5 6-14 22M15 40q-11-6-3-13 9 3 3 13m94-3q11-6 3-13-9 3-3 13M49 101q13-10 27 0m-34 3h40M58 83h10"/><path d="M6 110q15-15 30 0 13-12 25 0 14-13 28 0 15-13 28 0"/><circle cx="62" cy="18" r="1.5" fill="currentColor"/>',
    "0 0 124 116",
  );
  s.classList.add("ganesha");
  return s;
}
function mandala() {
  const n = svg(
    '<circle cx="160" cy="160" r="43"/><circle cx="160" cy="160" r="58"/><circle cx="160" cy="160" r="135"/>',
    "0 0 320 320",
  );
  for (let i = 0; i < 16; i++) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.setAttribute("transform", "rotate(" + i * 22.5 + " 160 160)");
    const p = svg(
      '<path d="M160 25c-31 33-29 52 0 77 29-25 31-44 0-77Zm0 12c-17 20-18 37 0 51 18-14 17-31 0-51ZM160 107q-36-11-45 20 33 6 45-20Zm0 0q36-11 45 20-33 6-45-20M160 17v7"/>',
      "0 0 320 320",
    );
    while (p.firstChild) g.append(p.firstChild);
    n.append(g);
  }
  n.classList.add("mandala");
  return n;
}
let goldSerial = 0;
function hangingLamp() {
  const id = "kv-metal-" + ++goldSerial;
  const n = svg(
    '<defs><linearGradient id="metal" x2="1"><stop stop-color="#79400b"/><stop offset=".27" stop-color="#e4a630"/><stop offset=".48" stop-color="#fff0ac"/><stop offset=".66" stop-color="#bb7517"/><stop offset="1" stop-color="#743b0e"/></linearGradient></defs><path d="M30 0v54m-3-49q6 3 0 6 6 3 0 6 6 3 0 6 6 3 0 6 6 3 0 6 6 3 0 6 6 3 0 6"/><path class="lamp-metal" d="M26 55h8l5 12-6 10v19H18l-7 5q19 10 38 0l-7-5H30V77l-8-10ZM10 103h40c-3 14-37 14-40 0Zm15 14v11h10v-11m-17 14h24v4H18Z"/><path d="M18 98c-8-9 0-18 0-18s8 9 0 18Zm24 0c-8-9 0-18 0-18s8 9 0 18Z" fill="#f4c04e"/><path d="M16 108q14 7 28 0m-18-42h8m-10 5h12"/>',
    "0 0 60 145",
  );
  const grad = n.querySelector("linearGradient");
  grad.id = id;
  n.querySelector(".lamp-metal").setAttribute("fill", "url(#" + id + ")");
  n.classList.add("hanging-lamp");
  return n;
}
function decorativeImage(src, cls, eager = false) {
  const n = el("img", cls);
  n.src = src;
  n.alt = "";
  n.setAttribute("aria-hidden", "true");
  n.loading = eager ? "eager" : "lazy";
  n.decoding = "async";
  return n;
}
function ceremony(d, eager = false, kind = "opening") {
  const n = el("div", "ceremony-art");
  n.setAttribute("aria-hidden", "true");
  if (d.faithId === "hindu") {
    const src =
      kind === "hero"
        ? "assets/paanigrahanam.webp"
        : kind === "closing"
          ? "assets/sacred-fire.webp"
          : "assets/kalyanam.webp";
    const picture = el("picture", "ceremony-picture");
    const base = src.slice(0, -5);
    const retina = el("source");
    retina.media = "(max-width:479px) and (min-resolution:2.5dppx)";
    retina.srcset = base + "-1440.webp";
    const phone = el("source");
    phone.media = "(max-width:479px)";
    phone.srcset = base + "-960.webp";
    const img = decorativeImage(src, "tableau", eager);
    img.width = 2172;
    img.height = 724;
    picture.append(retina, phone, img);
    n.append(picture);
  } else {
    n.append(ritualIllustration("wedding"));
  }
  return n;
}
function scene(node, d, eager = false, kind = "opening") {
  const scenery = el("div", "palace-scene");
  scenery.setAttribute("aria-hidden", "true");
  if (kind !== "opening") {
    scenery.append(architecturalStage(kind));
    const seal = mandala();
    seal.classList.add("scene-seal", kind + "-seal");
    scenery.append(seal);
  }
  node.append(scenery, ceremony(d, eager, kind));
  if (kind !== "opening") {
    const canopy = decorativeImage("assets/scene-canopy.webp", "scene-canopy");
    canopy.width = 2172;
    canopy.height = 724;
    node.append(canopy);
  }
  if (kind === "opening") {
    const lamps = el("div", "lamps");
    lamps.setAttribute("aria-hidden", "true");
    add(lamps, hangingLamp(), hangingLamp());
    node.append(lamps);
  }
}
function faithMark(d) {
  return d.faithId === "hindu"
    ? ganesha()
    : d.faithId === "muslim"
      ? icon("nikah")
      : d.faithId === "christian"
        ? icon("christian")
        : lotus();
}
function section(id, title, kicker) {
  const s = el("section", "section " + id);
  s.id = id;
  const w = el("div", "wrap");
  if (kicker) w.append(el("p", "section-kicker", kicker));
  if (title) w.append(el("h2", "", title));
  s.append(w);
  if (id !== "countdown") {
    const mural = el("div", "temple-mural");
    mural.setAttribute("aria-hidden", "true");
    s.append(mural);
  }
  if (!["hero", "footer"].includes(id)) {
    const rule = ornament();
    rule.classList.add("section-rule");
    s.append(rule);
  }
  return s;
}
function renderInvitation(root, d, ctx) {
  ctx.lang = LOCALE[ctx.lang] ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.dataset.faith = d.faithId || "none";
  document.title = [d.name1, d.name2].filter(Boolean).join(" & ");
  ctx.copy = COPY.en;
  ctx.audio = createAudio(d.musicUrl);
  if (ctx.audio) ctx.audio.preload = "none";
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const p = el("i", "rose-petal");
    p.style.setProperty("--i", i);
    ambient.append(p);
  }
  RuvvaNatural.prepare(ambient, false);
  root.append(ambient);
  const content = el("div", "page-content");
  content.hidden = true;
  content.inert = true;
  root.append(content);
  const flow = el("div", "chapter-flow");
  const edge = el("div", "continuous-border");
  edge.setAttribute("aria-hidden", "true");
  content.append(edge, flow);
  [
    buildEnvelope,
    buildHero,
    buildBlessing,
    buildCouple,
    buildCountdown,
    buildEvents,
    buildGallery,
    buildVideo,
    buildVenue,
    buildLiveStream,
    buildRsvp,
    buildFooter,
    buildFloating,
  ].forEach((fn) => {
    const n = fn(d, COPY.en, ctx);
    if (n) {
      if (n.classList.contains("opening")) root.append(n);
      else if (n.id === "hero") content.insertBefore(n, flow);
      else if (n.id === "footer" || n.classList.contains("floating"))
        content.append(n);
      else flow.append(n);
    }
  });
  initializeReveals(root, ".section .wrap,.person,.event-card,.photo", 0.05);
  initControls(root);
  initializeMotion(root);
  initializeWheelScroll();
  initializeScrollChoreography(root);
  initializeSceneMotion(root);
}
function buildEnvelope(d, c, ctx) {
  const n = el("div", "opening");
  n.setAttribute("role", "dialog");
  n.setAttribute("aria-modal", "true");
  n.setAttribute("aria-label", c.openInvitation);
  const panel = el("div", "invitation-panel");
  scene(panel, d, true);
  const w = el("div", "opening-copy");
  add(
    w,
    faithMark(d),
    el("p", "faith-line", c[d.faithId] || ""),
    ornament(),
    el("p", "label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
    names(d),
    ornament(),
    el("p", "opening-date", dateText(d, ctx)),
    el("p", "opening-venue", d.venue),
  );
  const b = button(c.openInvitation, async () => {
    if (n.classList.contains("opening-away") || n.dataset.preparing) return;
    document.querySelector(".page-content").hidden = false;
    startMusic(ctx.audio);
    await prepareHero(n);
    n.classList.add("opening-away");
    document.body.classList.add("opened");
    setTimeout(
      () => {
        n.remove();
        document.body.classList.remove("locked");
        document.querySelector(".page-content").inert = false;
        document.querySelector(".floating").hidden = false;
        document.getElementById("hero").focus({ preventScroll: true });
      },
      reduced.matches ? 0 : 1450,
    );
  });
  add(w, b, el("p", "tagline", d.name2 ? c.tagline : c.singleTagline));
  panel.append(w);
  n.append(panel);
  document.body.classList.add("locked");
  setTimeout(() => b.focus({ preventScroll: true }), 0);
  n.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      b.focus();
    }
  });
  return n;
}
function buildHero(d, c, ctx) {
  const s = section("hero");
  s.tabIndex = -1;
  scene(s, d, false, "hero");
  const w = s.firstChild;
  add(
    w,
    faithMark(d),
    el("p", "faith-line", c[d.faithId] || ""),
    el(
      "p",
      "label",
      d.eventType === "wedding"
        ? c.shubh
        : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
    names(d, "names", "h1"),
    ornament(),
    el("p", "hero-date", dateText(d, ctx)),
    el("p", "hero-venue", d.venue),
  );
  const hint = el("a", "scroll-hint");
  hint.href = "#blessing";
  add(hint, el("span", "", c.scroll), icon("chevron"));
  s.append(hint);
  return s;
}
function buildBlessing(d, c) {
  const s = section("blessing"),
    w = s.firstChild;
  add(w, ornament());
  if (c[d.faithId]) add(w, faithMark(d), el("p", "faith-line", c[d.faithId]));
  add(w, el("p", "blessing-copy", d.message || c.blessing));
  return s;
}
function buildEvents(d, c, ctx) {
  if (!d.events?.length) return null;
  const s = section(
    "events",
    d.eventType === "wedding" ? c.events : c.otherEvents,
    c.eventIntro,
  );
  const trail = el("div", "ritual-trail");
  const height = d.events.length * 300;
  let geometry = "M250 0C250 60 250 90 250 150";
  let lastX = 250,
    lastY = 150;
  for (let i = 1; i < d.events.length; i++) {
    const x = i % 2 ? 750 : 250,
      y = i * 300 + 150;
    geometry +=
      "C" +
      lastX +
      " " +
      (lastY + 150) +
      " " +
      x +
      " " +
      (y - 150) +
      " " +
      x +
      " " +
      y;
    lastX = x;
    lastY = y;
  }
  geometry += "L" + lastX + " " + height;
  const line = svg(
    '<path class="vine-base"/><path class="vine-live" pathLength="1"/><circle class="vine-tip" r="8" cx="250" cy="0" fill="currentColor"/>',
    "0 0 1000 " + height,
  );
  line.querySelectorAll("path").forEach((p) => p.setAttribute("d", geometry));
  line.classList.add("ritual-vine");
  line.setAttribute("preserveAspectRatio", "none");
  trail.append(line);
  d.events.forEach((e, i) => {
    const key = Object.hasOwn(EVENT_NAMES.en, e.key) ? e.key : "wedding";
    const card = el("article", "event-card " + key);
    card.style.setProperty("--i", i);
    const visual = el("div", "ritual-visual");
    const atlas = el("div", "ritual-object");
    atlas.dataset.ritual = String(
      key === "mehendi" ? 0 : key === "haldi" ? 1 : 2,
    );
    const flower = lotus();
    flower.classList.add("event-marker");
    add(visual, atlas, flower);
    const detail = el("div", "event-detail");
    add(detail, el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony));
    const when = el("div", "event-fact");
    add(when, icon("calendar"), el("p", "event-date", dateText(e, ctx)));
    const time = el("div", "event-fact");
    add(time, icon("clock"), el("p", "event-time", timeText(e, ctx)));
    const place = el("div", "event-fact");
    add(place, icon("pin"), el("p", "event-venue", e.venue));
    add(detail, when, time, place, el("p", "event-address", e.address));
    const tiny = icon(key);
    tiny.classList.add("ritual-symbol");
    visual.append(tiny);
    if (e.venue || e.address)
      detail.append(
        link(c.maps, mapSearch(e.venue, e.address), "button map-button"),
      );
    add(card, visual, detail);
    trail.append(card);
  });
  s.firstChild.append(trail);
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  s.firstChild.append(el("p", "gallery-sub", c.gallerySub));
  const collage = el("div", "gallery-collage");
  for (let start = 0; start < photos.length; start += 5) {
    const group = el("div", "gallery-group");
    group.dataset.count = String(Math.min(5, photos.length - start));
    for (let i = start; i < Math.min(start + 5, photos.length); i++) {
      const b = button("", () => openViewer(i), "photo photo-" + (i - start));
      b.setAttribute("aria-label", c.photo + " " + (i + 1));
      const img = el("img");
      img.src = photos[i];
      img.alt = c.photo + " " + (i + 1);
      img.loading = "lazy";
      b.append(img);
      group.append(b);
    }
    collage.append(group);
  }
  s.firstChild.append(collage);
  function openViewer(index) {
    openGallery(index, photos, c, { icon });
  }
  return s;
}
function buildFooter(d, c, ctx) {
  const s = section("footer");
  scene(s, d, false, "closing");
  const w = s.firstChild;
  add(
    w,
    faithMark(d),
    el("p", "section-kicker", c.closing),
    el("p", "footer-note", c.closingNote),
    names(d),
    el("p", "footer-date", dateText(d, ctx)),
    ornament(),
  );
  const share = el("div", "share-row");
  const feedback = el("p", "copy-feedback");
  feedback.setAttribute("role", "status");
  add(
    share,
    link(
      c.share,
      "https://wa.me/?text=" + encodeURIComponent(location.href),
      "text-link",
    ),
    button(
      c.copyLink,
      async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          feedback.textContent = c.copied;
        } catch {
          feedback.textContent = c.copyFailed;
        }
      },
      "text-link",
    ),
  );
  add(w, share, feedback, link(c.made, "https://ruvva.com", "brand-link"));
  return s;
}
function carvedVideoFrame() {
  const n = ornamentalFrame("video");
  n.classList.add("video-carving");
  return n;
}
function initializeSceneMotion(root) {
  const scenes = [
      ...root.querySelectorAll(
        ".hero,.footer,.ritual-trail,.gallery-collage,.chapter-flow .section",
      ),
    ],
    visible = new Set();
  let frame = 0;
  const update = () => {
    frame = 0;
    if (document.hidden) return;
    for (const n of visible) {
      const r = n.getBoundingClientRect();
      if (n.matches(".hero,.footer"))
        n.style.setProperty(
          "--scene-y",
          (reduced.matches ? 0 : Math.max(-25, Math.min(45, -r.top * 0.055))) +
            "px",
        );
      if (n.querySelector(":scope > .temple-mural"))
        n.style.setProperty(
          "--mural-y",
          (reduced.matches ? 0 : Math.max(-32, Math.min(32, -r.top * 0.06))) +
            "px",
        );
      if (n.matches(".ritual-trail")) {
        const p = reduced.matches
          ? 1
          : Math.max(0, Math.min(1, (innerHeight * 0.78 - r.top) / r.height));
        n.style.setProperty("--progress", p);
        const path = n.querySelector(".vine-live"),
          len = path.getTotalLength(),
          pt = path.getPointAtLength(p * len);
        if (!n.dataset.flowered) {
          n.dataset.flowered = "true";
          const svgRoot = n.querySelector(".ritual-vine");
          for (let i = 1; i < vineSprigCount(n); i++) {
            const t = path.getPointAtLength((len * i) / vineSprigCount(n));
            const sprig = botanicalSprig();
            sprig.classList.add("vine-botanical");
            sprig.setAttribute("x", String(t.x - 85));
            sprig.setAttribute("y", String(t.y - 48));
            sprig.setAttribute("width", "170");
            sprig.setAttribute("height", "105");
            svgRoot.append(sprig);
          }
        }
        n.querySelector(".vine-tip").setAttribute("cx", String(pt.x));
        n.querySelector(".vine-tip").setAttribute("cy", String(pt.y));
      }
      if (n.matches(".gallery-collage")) {
        const y = reduced.matches
          ? 0
          : Math.max(-8, Math.min(8, (innerHeight * 0.5 - r.top) * 0.015));
        n.style.setProperty("--photo-y", y + "px");
      }
    }
  };
  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(update);
  };
  const io = new IntersectionObserver((es) => {
    es.forEach((e) =>
      e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
    );
    schedule();
  });
  scenes.forEach((n) => io.observe(n));
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  reduced.addEventListener("change", schedule);
}

function vineSprigCount(n) {
  return Math.max(4, n.querySelectorAll(".event-card").length * 3);
}

// Original vector ornament library. All paths below are authored art, not JSON markup.
function botanicalSprig() {
  return svg(
    '<g fill="none" stroke="#a8782c" stroke-width="1.1"><path d="M-76 13C-38 7-26-5 0-23 22-6 44 9 77 13M0-23v-24"/><g fill="#d7ad6840"><path d="M-49 7c-23-4-29-18-24-25 18 1 25 11 24 25Zm15-9c-25-4-29-19-23-25 17 2 25 12 23 25Zm14-10c-18-9-20-23-13-27 14 5 18 15 13 27Zm69 19c23-4 29-18 24-25-18 1-25 11-24 25ZM34-2c25-4 29-19 23-25-17 2-25 12-23 25ZM20-12c18-9 20-23 13-27-14 5-18 15-13 27Z"/></g><g fill="#f3cf86"><path d="M0-28c-10-9-12-22 0-31 12 9 10 22 0 31Zm0 0c-18-1-29-11-26-22 14-1 22 8 26 22Zm0 0c18-1 29-11 26-22-14-1-22 8-26 22Z"/></g><circle cy="-29" r="3" fill="#9d6927"/></g>',
    "-85 -75 170 105",
  );
}
function architecturalStage(kind) {
  const n = svg("", "0 0 1600 1000");
  const base = svg(
    '<path d="M0 910h1600v90H0Z" fill="#d9b16c"/><path d="M0 910h1600v12H0m0 38h1600v9H0m0 23h1600" stroke="#a97a36" fill="none"/><path d="M50 895h1500v15H50m80-14h1340v-14H130" fill="#e8c88c" stroke="#b78d47"/>',
    "0 0 1600 1000",
  );
  while (base.firstChild) n.append(base.firstChild);
  n.classList.add("architectural-stage");
  n.setAttribute("preserveAspectRatio", "none");
  return n;
}
function ornamentalFrame(kind) {
  const n = svg(
    '<defs><linearGradient id="carved-metal"><stop stop-color="#936126"/><stop offset=".23" stop-color="#e5bd68"/><stop offset=".5" stop-color="#ffecaf"/><stop offset=".75" stop-color="#d9a94e"/><stop offset="1" stop-color="#9f6723"/></linearGradient></defs><path class="frame-metal" fill-rule="evenodd" d="M8 8H992V642H8ZM80 68V582H920V68Z"/><path d="M15 15H985V635H15ZM27 27H973V623H27ZM63 52H937V598H63ZM74 62H926V588H74Z" fill="none" stroke="#8f6029" stroke-width="2"/><path d="M31 32H969V618H31ZM57 49H943V602H57Z" fill="none" stroke="#fff0b1" stroke-width="3"/>',
    "0 0 1000 650",
  );
  const id = "carved-metal-" + ++goldSerial;
  n.querySelector("linearGradient").id = id;
  n.querySelector(".frame-metal").setAttribute("fill", "url(#" + id + ")");
  for (const [x, y, r] of [
    [16, 16, 0],
    [984, 16, 90],
    [984, 634, 180],
    [16, 634, 270],
  ]) {
    const c = svg(
      '<path d="M0 76C3 43 26 41 34 62c9 22-14 24-17 11-3-11 11-13 14-5M76 0C43 3 41 26 62 34c22 9 24-14 11-17-11-3-13 11-5 14M7 7c12 30 28 46 56 56M12 12c31-4 51 11 51 51-40 0-55-20-51-51Z" fill="#eed08b" stroke="#99642b" stroke-width="1.5"/><path d="M17 17c12 1 28 10 40 38M24 26l19 4m-12 6 4 14M39 37l13 3" fill="none" stroke="#bc8e41"/>',
      "0 0 84 84",
    );
    c.setAttribute("width", "84");
    c.setAttribute("height", "84");
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${x} ${y}) rotate(${r})`);
    group.append(c);
    n.append(group);
  }
  for (let x = 114; x < 900; x += 48)
    for (const y of [22, 600]) {
      const leaf = botanicalSprig();
      leaf.setAttribute("x", String(x));
      leaf.setAttribute("y", String(y));
      leaf.setAttribute("width", "48");
      leaf.setAttribute("height", "30");
      n.append(leaf);
    }
  for (let y = 104; y < 560; y += 48)
    for (const x of [24, 950]) {
      const flower = lotus();
      flower.setAttribute("x", String(x));
      flower.setAttribute("y", String(y));
      flower.setAttribute("width", "26");
      flower.setAttribute("height", "27");
      n.append(flower);
    }
  if (kind === "count") n.classList.add("plaque-art");
  n.setAttribute("preserveAspectRatio", "none");
  n.setAttribute("aria-hidden", "true");
  return n;
}
function ritualIllustration(key) {
  const n = svg("", "0 0 400 300");
  const id = "ritual-gold-" + ++goldSerial;
  const defs = svg(
    '<defs><linearGradient id="ritual-gold"><stop stop-color="#936126"/><stop offset=".24" stop-color="#d7a74e"/><stop offset=".45" stop-color="#ffde8e"/><stop offset=".7" stop-color="#c99741"/><stop offset="1" stop-color="#8f5c20"/></linearGradient></defs>',
    "0 0 400 300",
  );
  defs.querySelector("linearGradient").id = id;
  n.append(defs.firstChild);
  const body =
    key === "haldi" || key === "mehendi"
      ? '<g fill="#426933" stroke="#294d24" stroke-width="1.5"><path d="M105 218C38 186 14 111 41 53c63 20 102 72 64 165Z"/><path d="M117 212C71 145 92 71 139 30c48 55 55 111-22 182Z"/><path d="M282 216c-10-76 21-135 86-150 17 64-14 119-86 150Z"/></g><path d="M105 218 41 53m76 159 22-182m143 186 86-150" fill="none" stroke="#a4b56c" stroke-width="2"/><ellipse cx="200" cy="251" rx="153" ry="15" fill="#a7742822"/><path class="bowl-metal" d="M88 170c1 72 52 91 112 91s111-19 112-91l-13-10H101Z" stroke="#85531d" stroke-width="2"/><ellipse cx="200" cy="171" rx="113" ry="34" fill="#ab772c" stroke="#f0d187" stroke-width="5"/><path class="powder" d="M104 169c10-4 15-34 39-40 12-17 26-20 41-43 10-16 22-11 31 4 25 9 28 37 48 42 21 3 29 25 34 37-28 20-162 23-193 0Z" fill="#eeb835" stroke="#cc921b" stroke-width="2"/><path d="M116 201q84 46 168 0m-159 13q75 43 150 0M136 233q64 30 128 0" fill="none" stroke="#f7da89" stroke-width="2"/><g fill="#f1be34" stroke="#c78b20"><path d="M66 250c-30-16-23-43 6-41 27-18 42 7 23 24 8 28-18 39-29 17ZM310 247c-23-20-13-39 10-32 22-12 43 9 23 26 0 25-23 28-33 6Z"/></g>'
      : '<ellipse cx="200" cy="277" rx="170" ry="14" fill="#a7742822"/><path class="bowl-metal" d="M25 270h350v14H25Zm18-17h314v17H43ZM58 86h30v165H58Zm254 0h30v165h-30ZM45 70h310v22H45Zm19-20h272v20H64Z" stroke="#93632c" stroke-width="2"/><path d="M68 97v141m9-141v141m245-141v141m9-141v141" stroke="#fff0b4" stroke-width="3"/><path d="M64 50c40 6 59-13 80-19 25-8 33-12 56-25 23 13 31 17 56 25 21 6 40 25 80 19" fill="#e4c079" stroke="#a57734" stroke-width="3"/><path d="M89 90q30 55 58 0 26 55 53 0 27 55 53 0 28 55 58 0" fill="none" stroke="#4b7436" stroke-width="9"/><path d="M89 93q30 55 58 0 26 55 53 0 27 55 53 0 28 55 58 0" fill="none" stroke="#f5dfab" stroke-width="4" stroke-dasharray="3 5"/><path class="bowl-metal" d="M147 253h106v-22H147Zm10-22h86v-10h-86Z" stroke="#94612a"/><path d="M178 221c-13-23 13-25 17-47 25 17 9 23 22 32 8-20 13-24 14-32 16 31 0 50-24 51Z" fill="#eaa82e"/><path d="M193 220q-12-14 9-25 14 10 7 25" fill="#fff1ae"/>';
  const art = svg(body, "0 0 400 300");
  while (art.firstChild) n.append(art.firstChild);
  n.querySelectorAll(".bowl-metal").forEach((e) =>
    e.setAttribute("fill", "url(#" + id + ")"),
  );
  if (key === "mehendi") {
    const powder = n.querySelector(".powder");
    powder.setAttribute("fill", "#63813a");
    powder.setAttribute("stroke", "#3e5c29");
    powder.setAttribute("d", "M105 168c12-37 171-42 190 0-30 24-160 24-190 0Z");
  }
  const xs =
    key === "haldi" || key === "mehendi"
      ? [70, 102, 285, 326]
      : [45, 95, 145, 200, 255, 305, 353];
  xs.forEach((x, i) => {
    const flower = svg(
      '<g fill="#d99c28" stroke="#c48a23" stroke-width=".7"><path d="M0-11c-13-14-20 5-9 9-15 6-2 20 6 10 4 15 20 5 13-6 15-4 4-19-7-10Z"/><circle r="4" fill="#fff3cc"/></g>',
      "-20 -20 40 40",
    );
    flower.setAttribute("x", String(x - 13));
    flower.setAttribute(
      "y",
      String(
        (key === "haldi" || key === "mehendi" ? 235 : 85 + (i % 2) * 16) - 13,
      ),
    );
    flower.setAttribute("width", "26");
    flower.setAttribute("height", "26");
    n.append(flower);
  });
  n.classList.add("ritual-object", "ritual-svg");
  n.setAttribute("aria-hidden", "true");
  return n;
}

// Compose motion with each theme's own transforms; never crop or zoom source images.
function initializeScrollChoreography(root) {
  const strength = 30;
  const visible = new Set();
  const entries = [
    ...root.querySelectorAll(
      ".section:not(.hero):not(.footer) > .wrap > h2, .section:not(.hero):not(.footer) > .wrap > .section-kicker, .person, .event-visual, .ritual-visual, .ritual-illustration, .photo",
    ),
  ].map((node, index) => ({
    node,
    index,
    y: 0,
    heading: node.matches("h2,.section-kicker"),
    photo: node.matches(".photo"),
    translate: node.style.translate,
    opacity: node.style.opacity,
    willChange: node.style.willChange,
  }));
  let frame = 0;
  const restore = (entry) => {
    entry.node.style.translate = entry.translate;
    entry.node.style.opacity = entry.opacity;
    entry.node.style.willChange = entry.willChange;
    entry.y = 0;
  };
  const paint = () => {
    frame = 0;
    if (document.hidden) return;
    if (reduced.matches) {
      entries.forEach(restore);
      return;
    }
    const height = innerHeight;
    const compact = innerWidth < 600;
    for (const entry of visible) {
      const { node, index, heading, photo } = entry;
      const rect = node.getBoundingClientRect();
      const top = rect.top - entry.y;
      let y;
      if (heading) {
        const progress = Math.max(
          0,
          Math.min(1, (height * 0.94 - top) / (height * 0.38)),
        );
        y = (1 - progress) * (compact ? 24 : 36);
        node.style.opacity = String(0.35 + 0.65 * progress);
      } else {
        const limit = photo
          ? compact
            ? 4
            : 6
          : strength * (compact ? 0.65 : 1);
        const depth = Math.max(
          -1,
          Math.min(
            1,
            (height * 0.5 - top - rect.height * 0.5) / (height * 0.65),
          ),
        );
        y = depth * limit * (index % 2 ? -1 : 1);
      }
      if (node.matches(":focus-within")) y = 0;
      entry.y = Math.round(y * 100) / 100;
      node.style.translate = "0 " + entry.y + "px";
      node.style.willChange = heading ? "translate, opacity" : "translate";
    }
  };
  const schedule = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      return;
    }
    if (!frame) frame = requestAnimationFrame(paint);
  };
  const byNode = new Map(entries.map((entry) => [entry.node, entry]));
  const observer = new IntersectionObserver(
    (changes) => {
      for (const change of changes) {
        const entry = byNode.get(change.target);
        if (change.isIntersecting) visible.add(entry);
        else {
          visible.delete(entry);
          // Keep the last pose outside the viewport; resetting it here can
          // bounce the observer across its boundary and create an idle loop.
          entry.node.style.willChange = entry.willChange;
        }
      }
      schedule();
    },
    { rootMargin: "12% 0px" },
  );
  entries.forEach((entry) => observer.observe(entry.node));
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  document.addEventListener("visibilitychange", schedule);
  reduced.addEventListener("change", schedule);
}

loadSample(renderInvitation, COPY.en);

