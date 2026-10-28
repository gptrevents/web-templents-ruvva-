import { createRecipient, mountRecipient } from "../../shared/recipient.js";
import { makeGuestLetter } from "./guest-art.js";
import {
  BLESSINGS_COPY,
  validGifts,
  createBlessingsContent,
  addRsvpBlessingLink,
} from "../../shared/blessings.js";
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
    ...BLESSINGS_COPY,
    guestEyebrow: "An invitation especially for",
    guestFamily: "Together with your family",
    guestCouple: "Together with your partner",
    guestNoteTitle: "An invitation with love and blessings",
    guestMessage:
      "Your presence and blessings would bring special joy to our celebration. Please join us as this new chapter begins.",
    guestRsvpQuestion: "will you join us?",
    guestClosingWaiting: "we look forward to welcoming you.",
    guestClosingYes: "we are so happy you will be joining us.",
    guestClosingNo: "thank you for letting us know. You will be missed.",
    guestClosingMaybe: "thank you for your reply. We hope you can make it.",
    guestThanksPrefix: "Thank you, ",
    guestThanksEnd: "!",
    guestCorrect: "Not you? Update guest details",
    guestAdd: "Add your name to this invitation",
    guestEditTitle: "Who is joining us?",
    guestEditName: "Your name",
    guestEditParty: "Invitation for",
    guestPartyChoices: ["Just me", "Me and my partner", "Me and my family"],
    guestApply: "Use these details",
    guestCancel: "Cancel",
    guestClear: "Continue without a personal name",
    guestNameError: "Please enter your name.",

    loadFailure:
      "The invitation could not be loaded. Please refresh to try again.",
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "In the presence of joy.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Two hearts. One sacred beginning.",
    coupleLabel: "The ones we celebrate",
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
    eventIntro: "Days of joy, woven together",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "A handful of forever",
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
    videoHint: "A little glimpse of our story",
    amp: "&",
    closing: "A memory in the making",
    hostNote: "With love, from our families",
    anyDay: "The celebration",
    thankYou: "Thank you",
    closingNote: "Your presence makes our story complete.",
    divineNote: "With the blessings of Lord Venkateswara",
    lightNote: "Light the beginning of our forever",
    copyLink: "Copy Link",
    copied: "Link copied",
    copyFailed: "Please copy this page address from your browser",
    shareTitle: "Share this invitation",
    fanHint: "Swipe, explore, and hold a moment a little longer",
    photoSelect: "Show photograph",
  },
};

// Compact authored pen icons for ceremony and media controls.
const paths = {
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
      const img = el("img");
      img.src = src;
      img.alt = name;
      img.loading = "lazy";
      frame.append(img);
    } else frame.append(el("span", "monogram", Array.from(name)[0]));

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
  return coreCalendar(d, c, "Sannidhi");
}
function buildCountdown(d, c, ctx) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle);
  const row = el("div", "bell-count");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "bell-unit");
    const n = el("span", "digit", "00");
    const bell = svg(
      '<path d="M40 0v20m-5 0h10v8H35ZM16 87c10-9 7-34 14-43 12-15 31-7 35 5 4 10 0 26 13 38ZM12 89h70v7H12ZM37 100c0 13 20 13 20 0"/><path d="M28 49h35M20 79h53m-40-43q15-9 29 0M19 93h56"/><path d="M45 42v32m-9-21h19" stroke-opacity=".25"/>',
      "0 0 94 116",
    );
    bell.classList.add("bell-art");
    add(unit, bell, n, el("span", "label", c[k]));
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
  add(s.firstChild, row, status, calendar(d, c));
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
  s.firstChild.append(frame);
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
  text.classList.add("live-copy");
  const illustration = link("", url, "live-illustration");
  illustration.setAttribute("aria-label", c.watch);
  const play = el("span", "live-play");
  play.append(icon("play"));
  const painted = el("img", "painted-scene");
  painted.setAttribute("src", "assets/courtyard.webp");
  painted.setAttribute("alt", "");
  painted.setAttribute("loading", "lazy");
  illustration.append(painted, play);
  add(s.firstChild, illustration, text, link(c.watch, url));
  return s;
}
function buildRsvp(d, c, ctx) {
  if (!d.rsvp?.enabled) return null;
  const s = section("rsvp", c.rsvp, c.rsvpSub);
  const form = createRsvpForm(d, (ctx.recipientFormCopy = { ...c }), { ornament });
  addRsvpBlessingLink(form, d, c);
  s.firstChild.append(form);
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

// Original rice-flour artwork, with real grain and traditional interlacing.
function kolam() {
  const n = el("span", "kolam");
  n.setAttribute("aria-hidden", "true");
  const ns = "http://www.w3.org/2000/svg";
  const drawing = document.createElementNS(ns, "svg");
  drawing.setAttribute("viewBox", "0 0 240 240");
  drawing.setAttribute("fill", "none");
  drawing.classList.add("kolam-orbit");
  let index = 0;
  const ink = (d, angle = 0) => {
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", d);
    path.setAttribute("pathLength", "1");
    path.setAttribute("transform", "rotate(" + angle + " 120 120)");
    path.classList.add("kolam-line");
    path.style.setProperty("--line", index++);
    drawing.append(path);
  };
  // Interlaced rice-flour loops around pulli dots; eight lotus petals at the heart.
  for (let q = 0; q < 4; q++) {
    ink(
      "M120 18C94 18 92 49 111 59C133 71 148 52 139 38C129 23 109 31 109 48C109 72 154 77 166 96C182 119 204 112 204 94C204 78 181 74 171 88C158 108 185 135 203 126C224 115 222 92 206 83C188 73 173 90 174 105",
      q * 90,
    );
    ink(
      "M120 64C100 45 73 59 79 80C84 99 111 96 110 80C108 63 87 66 88 83C89 109 60 122 45 110C29 97 43 75 58 84C76 96 58 115 45 104",
      q * 90,
    );
  }
  for (let a = 0; a < 360; a += 45)
    ink("M120 120C102 112 102 91 120 82C138 91 138 112 120 120Z", a);
  for (let y = 45; y <= 195; y += 30)
    for (let x = 45; x <= 195; x += 30) {
      if (Math.abs(x - 120) + Math.abs(y - 120) > 110) continue;
      const dot = document.createElementNS(ns, "circle");
      dot.setAttribute("cx", x);
      dot.setAttribute("cy", y);
      dot.setAttribute("r", "2.1");
      dot.setAttribute("fill", "currentColor");
      dot.classList.add("kolam-dot");
      drawing.append(dot);
    }
  n.append(drawing);
  return n;
}
function initializeKolamDrawing(root) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("kolam-drawn");
          io.unobserve(entry.target);
        }
      }),
    { threshold: 0.15 },
  );
  root.querySelectorAll(".kolam").forEach((n) => io.observe(n));
}
function devotionalPicture(kind, cls) {
  const picture = el("picture", "devotional-picture " + cls);
  const assetKind = kind === "darshan" ? kind : kind + "-cutout";
  {
    const source = el("source");
    source.setAttribute("media", "(min-width: 1024px)");
    source.setAttribute(
      "srcset",
      "assets/srivari-" + assetKind + "-desktop.webp",
    );
    picture.append(source);
  }
  const image = art(
    "assets/srivari-" + assetKind + ".webp",
    "devotional-image",
  );
  image.loading = kind === "darshan" ? "eager" : "lazy";
  image.width = kind === "darshan" ? 360 : 800;
  image.height = kind === "darshan" ? 480 : kind === "ceremony" ? 446 : 450;
  picture.append(image);
  return picture;
}
function ornament() {
  const n = el("div", "divider");
  n.setAttribute("aria-hidden", "true");
  n.append(el("span", "ornament-rule"), kolam(), el("span", "ornament-rule"));
  return n;
}
function art(src, cls) {
  const i = el("img", cls);
  i.src = src;
  i.alt = "";
  i.setAttribute("aria-hidden", "true");
  i.loading = src.includes("toran") ? "eager" : "lazy";
  if (src.includes("toran")) {
    i.width = 900;
    i.height = 300;
  }
  if (src.includes("elephants")) {
    i.width = 720;
    i.height = 240;
  }
  return i;
}
function canopy() {
  const n = el("div", "canopy");
  n.setAttribute("aria-hidden", "true");
  const garland = el("picture");
  const wide = el("source");
  wide.setAttribute("media", "(min-width: 1024px)");
  wide.setAttribute("srcset", "assets/toran-desktop.webp");
  garland.append(wide, art("assets/toran.webp", "toran"));
  n.append(garland);
  for (let i = 0; i < 2; i++) {
    const b = svg(
      '<path d="M20 0v39M15 39h10v8H15Zm-7 50h25c-6-6-3-20-9-25-5-5-12-2-14 4-2 7 1 14-5 21Zm-6 1h36v5H2ZM15 99q5 10 10 0"/><path d="M12 69h16M9 83h22M10 92h20"/>',
      "0 0 40 110",
    );
    b.classList.add("hanging-bell", "hanging-bell-" + i);
    n.append(b);
  }
  return n;
}
function decorateTemple(s, rich = false) {
  const bg = el("div", "temple-art");
  bg.setAttribute("aria-hidden", "true");
  const a = kolam();
  a.classList.add("margin-kolam");
  bg.append(a);
  if (rich) {
    const scene = el("div", "temple-panorama");
    bg.append(scene);
    const water = el("div", "pond-shimmer");
    bg.append(water);
    for (let i = 0; i < 3; i++) {
      const bird = svg(
        '<path class="wing-left" d="M32 18Q13 2 2 13q17-4 30 5Z"/><path class="wing-right" d="M32 18Q49 0 62 10q-17-1-30 8Z"/><path d="m27 20 5-3 6 3-6-1Z" fill="currentColor"/>',
        "0 0 64 28",
      );
      bird.classList.add("sky-bird");
      bird.style.setProperty("--i", i);
      bg.append(bird);
    }
  }
  s.append(bg);
}
function section(id, title, eyebrow) {
  const s = el("section", id + " section");
  s.id = id;
  const w = el("div", "wrap");
  if (eyebrow) w.append(el("p", "label section-kicker", eyebrow));
  if (title) w.append(el("h2", "", title));
  s.append(w);
  if (!["hero", "footer"].includes(id)) {
    const line = ornament();
    line.classList.add("section-divider");
    s.append(line);
  }
  decorateTemple(s, id === "hero" || id === "footer");
  return s;
}
function renderInvitation(root, data, ctx) {
  ctx.recipient = createRecipient(data, ctx, COPY.en);
  ctx.lang = LOCALE[ctx.lang] ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.dataset.faith = data.faithId || "none";
  document.title = [data.name1, data.name2].filter(Boolean).join(" & ");
  ctx.audio = createAudio(data.musicUrl);
  if (ctx.audio) ctx.audio.preload = "none";
  const c = COPY.en;
  ctx.copy = c;
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const a = el("i", "jasmine-petal");
    a.style.setProperty("--i", i);
    ambient.append(a);
  }
  RuvvaNatural.prepare(ambient, true);
  root.append(ambient);
  const content = el("div", "page-content");
  content.hidden = true;
  content.inert = true;
  root.append(content);
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
    buildBlessings,
    buildFooter,
    buildFloating,
  ].forEach((fn) => {
    const n = fn(data, c, ctx);
    if (n) (n.classList.contains("opening") ? root : content).append(n);
  });
  mountRecipient(root, ctx, COPY.en, makeGuestLetter);
  initializeReveals(root, ".section .wrap,.person,.event-card,.day-fold", 0.08);
  initControls(root);
  initializeMotion(root);
  initializeKolamDrawing(root);
  initializeWheelScroll();
  initializeScrollChoreography(root);
  initializeTempleScroll(root);
}
function diya() {
  const n = art("assets/ceremonial-diya-v1.webp", "diya");
  n.loading = "eager";
  n.width = 420;
  n.height = 417;
  return n;
}
function buildEnvelope(d, c, ctx) {
  const cover = el("div", "opening");
  cover.setAttribute("role", "dialog");
  cover.setAttribute("aria-modal", "true");
  cover.setAttribute("aria-label", c.openInvitation);
  add(cover, canopy());
  const lattice = kolam();
  lattice.classList.add("opening-kolam");
  const content = el("div", "opening-content");
  const sacred = d.faithId === "hindu";
  if (sacred) cover.classList.add("devotional-opening");
  add(
    content,
    el("p", "label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
    names(d),
    ornament(),
  );
  if (sacred) {
    const shrine = devotionalPicture("darshan", "welcome-darshan");
    content.insertBefore(shrine, content.querySelector(".names"));
  }
  const lamp = el("div", "lamp-stage");
  lattice.loading = "eager";
  add(lamp, lattice, el("span", "lamp-aura"), diya());
  if (!sacred) add(content, lamp, el("p", "light-note", c.lightNote));
  else content.append(el("p", "divine-note", c.divineNote));
  const light = el("div", "opening-light");
  light.setAttribute("aria-hidden", "true");
  const b = button(c.openInvitation, async () => {
    if (cover.classList.contains("opening-away") || cover.dataset.preparing)
      return;
    document.querySelector(".page-content").hidden = false;
    startMusic(ctx.audio);
    await prepareHero(cover);
    cover.classList.add("opening-away");
    document.body.classList.add("opened");
    setTimeout(
      () => {
        cover.remove();
        document.body.classList.remove("locked");
        document.querySelector(".page-content").inert = false;
        document.querySelector(".floating").hidden = false;
        document.getElementById("hero").focus({ preventScroll: true });
      },
      reduced.matches ? 0 : 1650,
    );
  });
  add(content, b, el("p", "tagline", d.name2 ? c.tagline : c.singleTagline));
  add(cover, content, light);
  document.body.classList.add("locked");
  setTimeout(() => b.focus({ preventScroll: true }), 0);
  cover.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      b.focus();
    }
  });
  return cover;
}
function buildHero(d, c, ctx) {
  const s = section("hero");
  s.tabIndex = -1;
  const w = s.firstChild;
  add(
    w,
    el(
      "p",
      "label",
      d.faithId === "hindu" && d.eventType === "wedding"
        ? c.shubh
        : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
    el("p", "hero-overline", c.hostNote),
    names(d, "names", "h1"),
    ornament(),
  );
  const facts = el("div", "hero-facts");
  add(
    facts,
    el("p", "hero-date", dateText(d, ctx)),
    el("p", "hero-venue", d.venue),
  );
  w.append(facts);
  if (d.faithId === "hindu") {
    s.classList.add("devotional-hero");
    w.append(devotionalPicture("ceremony", "kalyanam-tableau"));
    const mandala = kolam();
    mandala.classList.add("hero-mandala");
    s.append(mandala);
  }
  s.append(canopy());
  const hint = el("a", "scroll-hint");
  hint.href = "#blessing";
  add(hint, el("span", "", c.scroll), icon("chevron"));
  s.append(hint);
  return s;
}
function buildBlessing(d, c) {
  const s = section("blessing");
  const w = s.firstChild;
  add(w, ornament());
  if (c[d.faithId])
    add(
      w,
      icon(
        d.faithId === "hindu"
          ? "lamp"
          : d.faithId === "muslim"
            ? "nikah"
            : "christian",
      ),
      el("p", "faith-line", c[d.faithId]),
    );
  add(
    w,
    el("p", "blessing-copy", d.message || c.blessing),
    art("assets/elephants.webp", "elephant-frieze"),
    ornament(),
  );
  return s;
}
function buildEvents(d, c, ctx) {
  if (!d.events?.length) return null;
  const s = section(
    "events",
    d.eventType === "wedding" ? c.events : c.otherEvents,
    c.eventIntro,
  );
  const wall = el("div", "calendar-wall");
  const groups = new Map();
  d.events.forEach((e) => {
    const key = e.date || "";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(e);
  });
  wall.style.setProperty("--days", Math.min(4, groups.size));
  let index = 0;
  for (const [date, events] of groups) {
    const fold = el("div", "day-fold");
    const head = el("div", "day-heading");
    const number = el("span", "day-marker", String(index + 1).padStart(2, "0"));
    index++;
    const v = dateValue({ date });
    add(
      head,
      number,
      el(
        "p",
        "day-date",
        v && !isNaN(v)
          ? v.toLocaleDateString(LOCALE[ctx.lang] || "en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              timeZone: "Asia/Kolkata",
            })
          : c.anyDay,
      ),
    );
    fold.append(head);
    const stem = svg(
      '<path class="thread-base" d="M5 0V1000"/><path class="thread-fill" pathLength="1" d="M5 0V1000"/><circle class="thread-tip" cx="5" cy="0" r="3" fill="currentColor"/>',
      "0 0 10 1000",
    );
    stem.classList.add("thread");
    stem.setAttribute("preserveAspectRatio", "none");
    fold.append(stem);
    for (const e of events) {
      const key = Object.hasOwn(EVENT_NAMES.en, e.key) ? e.key : "wedding";
      const card = el("article", "event-card " + key);
      const marker = el("span", "event-marker");
      marker.append(icon(key));
      add(
        card,
        marker,
        el("p", "event-time", timeText(e, ctx)),
        el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
        el("p", "event-date", dateText(e, ctx)),
        el("p", "event-venue", e.venue),
        el("p", "event-address", e.address),
      );
      if (e.venue || e.address)
        card.append(link(c.maps, mapSearch(e.venue, e.address), "text-link"));
      fold.append(card);
    }
    wall.append(fold);
  }
  s.firstChild.append(wall);
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  const fan = el("div", "photo-fan");
  fan.setAttribute("role", "region");
  fan.setAttribute("aria-label", c.gallery);
  const deck = el("div", "fan-deck");
  let current = 0;
  const nodes = [];
  const selectors = [];
  const show = (to, focus = false) => {
    current = (to + photos.length) % photos.length;
    nodes.forEach((n, i) => {
      let offset = i - current;
      if (offset > photos.length / 2) offset -= photos.length;
      if (offset < -photos.length / 2) offset += photos.length;
      n.style.setProperty("--offset", Math.max(-3, Math.min(3, offset)));
      n.style.zIndex = String(20 - Math.abs(offset));
      n.dataset.active = String(i === current);
      n.setAttribute("aria-current", i === current ? "true" : "false");
      n.tabIndex = i === current ? 0 : -1;
      n.style.visibility = Math.abs(offset) > 2 ? "hidden" : "visible";
      n.inert = Math.abs(offset) > 2;
      selectors[i].setAttribute("aria-pressed", String(i === current));
    });
    status.textContent = current + 1 + " / " + photos.length;
    if (focus) nodes[current].focus({ preventScroll: true });
  };
  photos.forEach((src, i) => {
    const b = button(
      "",
      () => {
        show(i);
        openViewer(i);
      },
      "photo",
    );
    b.setAttribute("aria-label", c.photo + " " + (i + 1));
    const img = el("img");
    img.src = src;
    img.alt = c.photo + " " + (i + 1);
    img.loading = "lazy";
    add(b, img, el("span", "photo-number", String(i + 1).padStart(2, "0")));
    deck.append(b);
    nodes.push(b);
    const select = button(
      String(i + 1).padStart(2, "0"),
      () => show(i),
      "fan-index",
    );
    select.setAttribute("aria-label", c.photoSelect + " " + (i + 1));
    selectors.push(select);
  });
  const controls = el("div", "fan-controls");
  const status = el("p", "fan-status");
  status.setAttribute("aria-live", "polite");
  const prev = button("", () => show(current - 1), "control fan-previous");
  prev.setAttribute("aria-label", c.previous);
  prev.append(icon("previous"));
  const next = button("", () => show(current + 1), "control fan-next");
  next.setAttribute("aria-label", c.next);
  next.append(icon("next"));
  const indices = el("div", "fan-indices");
  indices.append(...selectors);
  add(controls, prev, status, next);
  add(fan, deck, controls, indices, el("p", "fan-hint", c.fanHint));
  s.firstChild.append(fan);
  show(0);
  fan.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      show(current + 1, true);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(current - 1, true);
    }
    if (e.key === "Home") {
      e.preventDefault();
      show(0, true);
    }
    if (e.key === "End") {
      e.preventDefault();
      show(photos.length - 1, true);
    }
  });
  let touchX = 0,
    touchY = 0;
  deck.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].clientX;
      touchY = e.changedTouches[0].clientY;
    },
    { passive: true },
  );
  deck.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchX,
        dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.3)
        show(current + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
  function openViewer(index) {
    openGallery(index, photos, c, { icon });
  }
  return s;
}
function buildFooter(d, c, ctx) {
  const s = section("footer"),
    w = s.firstChild;
  const text = el("div", "closing-copy");
  add(
    text,
    el("p", "label", c.closing),
    el("h2", "", c.thankYou),
    el("p", "footer-note", c.closingNote),
    names(d),
    el("p", "", dateText(d, ctx)),
    ornament(),
  );
  const shareRow = el("div", "share-row");
  shareRow.append(el("p", "label", c.shareTitle));
  const actions = el("div", "actions");
  actions.append(
    link(
      c.share,
      "https://wa.me/?text=" + encodeURIComponent(location.href),
      "text-link",
    ),
  );
  const feedback = el("p", "copy-feedback");
  feedback.setAttribute("role", "status");
  actions.append(
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
  add(shareRow, actions, feedback);
  add(text, shareRow, link(c.made, "https://ruvva.com", "brand-link"));
  const closing = local(d.photoSlots?.closing);
  if (closing) {
    const photo = el("img", "closing-photo");
    photo.src = closing;
    photo.alt = c.closing;
    photo.loading = "lazy";
    w.append(photo);
  }
  w.append(text);
  if (d.faithId === "hindu") {
    s.classList.add("devotional-footer");
    w.append(devotionalPicture("benediction", "benediction-tableau"));
  }
  return s;
}
// All scroll-linked artwork follows the real document. No persistent render loop.
function initializeTempleScroll(root) {
  const watched = [
    ...root.querySelectorAll(".hero,.footer,.calendar-wall,.photo-fan"),
  ];
  const visible = new Set();
  let frame = 0;
  const update = () => {
    frame = 0;
    if (document.hidden) return;
    for (const n of visible) {
      const r = n.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(
          1,
          (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.25),
        ),
      );
      if (n.matches(".hero,.footer"))
        n.style.setProperty(
          "--scene-shift",
          (reduced.matches
            ? 0
            : Math.max(
                -60,
                Math.min(100, -r.top * (innerWidth >= 1024 ? 0.13 : 0.065)),
              )) + "px",
        );
      if (n.matches(".photo-fan"))
        n.style.setProperty(
          "--spread",
          reduced.matches ? 1 : Math.min(1, 0.62 + progress * 0.7),
        );
      if (n.matches(".calendar-wall")) {
        n.style.setProperty("--progress", reduced.matches ? 1 : progress);
        n.querySelectorAll(".day-fold").forEach((f) => {
          const b = f.getBoundingClientRect();
          const p = reduced.matches
            ? 1
            : Math.max(
                0,
                Math.min(
                  1,
                  (innerHeight * 0.78 - b.top) / Math.max(1, b.height),
                ),
              );
          f.style.setProperty("--progress", p);
          f.querySelector(".thread-tip").setAttribute("cy", String(p * 1000));
        });
      }
    }
  };
  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(update);
  };
  const io = new IntersectionObserver(
    (es) => {
      es.forEach((e) =>
        e.isIntersecting ? visible.add(e.target) : visible.delete(e.target),
      );
      schedule();
    },
    { rootMargin: "100px" },
  );
  watched.forEach((n) => io.observe(n));
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  document.addEventListener("visibilitychange", schedule);
}

// Compose motion with each theme's own transforms; never crop or zoom source images.
function initializeScrollChoreography(root) {
  const strength = 24;
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
            ? 6
            : 6
          : strength * (compact ? 0.85 : 1);
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

function buildBlessings(d, c, ctx) {
  if (!validGifts(d)) return null;
  const s = section("blessings", c.blessTitle, d.gifts.note || c.blessSub);
  s.classList.add("blessings-sannidhi");
  const content = createBlessingsContent(d, c, ctx, {
    ornament,
    celebrate(node) {
      node.animate(
        [
          { opacity: 0.4, transform: "scale(.985)" },
          { opacity: 1, transform: "scale(1)" },
        ],
        { duration: 650, easing: "ease-out" },
      );
    },
  });
  s.firstChild.append(content);
  return s;
}
