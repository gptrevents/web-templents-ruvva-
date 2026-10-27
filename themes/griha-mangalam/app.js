import {
  createRecipient,
  recipientAddress,
  personalMessage,
  personalizeRsvp,
  closingMessage,
} from "./guest.js";
import { mountArtMotion } from "./art-motion.js";
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
    guestNoteTitle: "A personal invitation",
    guestMessage:
      "Your presence would make our new beginning even more special. We would love to celebrate this moment with you.",
    guestOpeningMessage:
      "We would be delighted to welcome you to our new home.",
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
    newBeginning: "Our New Beginning",
    houseTitle: "Griha Pravesh",
    homeTitle: "Our New Home",
    homeSub: "A Dream Turned Into Reality",
    homeStory:
      "With the blessings of our family, friends and well-wishers, we have built a new home. We are delighted to share this special moment with you.",
    familyTitle: "Our Family",
    familySub: "Grateful for Your Blessings",
    familyNote:
      "A new home, a new beginning, with the same values, traditions and your blessings.",
    openingMessage:
      "With divine grace and blessings, we are delighted to invite you to the Griha Pravesh of our new home.",
    presenceIntro:
      "We would be honoured to have you with us on this special occasion. Please let us know if you can grace our home with your presence.",
    closingFaith:
      "We seek the blessings of Lord Ganesha for happiness, prosperity and peace in our new home.",
    landmark: "Nearby Landmarks",
    warmWishes: "Warm Wishes",
    yesWarm: "With joy, we will be there",
    noWarm: "With regret, we cannot",
    closingHome: "We await your gracious presence and your blessings.",
    ourHome: "Our New Home",
    familyAlt: "Family portrait",
    loadFailure:
      "The invitation could not be loaded. Please refresh to try again.",
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "A new home, a new beginning.",
    singleTagline: "Built with love. Blessed by your presence.",
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
    otherEvents: "Griha Pravesh Journey",
    eventIntro: "A Day of Divine Rituals",
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
    otherVenue: "Location & Venue",
    directions: "Get Directions",
    call: "Call family",
    live: "Can't Make It? Watch Live!",
    liveSub: "Join us virtually as we celebrate this beautiful moment",
    liveNote: "The live stream will begin 30 minutes before the ceremony",
    watch: "Watch Live",
    rsvp: "Your Presence Means a Lot",
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
    otherMessage: "Your Wishes (Optional)",
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

function picture(src, cls = "", alt = "", eager = false) {
  const url = local(src);
  if (!url) return null;
  const img = el("img", cls);
  img.src = url;
  img.alt = alt;
  img.loading = eager ? "eager" : "lazy";
  img.decoding = "async";
  return img;
}
function ornament() {
  const n = svg(
    '<path d="M2 20h66m64 0h66M72 20c9-12 18-12 28 0 10-12 19-12 28 0-10 12-19 12-28 0-10 12-19 12-28 0Zm28-2c-15-7-17-20 0-16 17-4 15 9 0 16ZM87 32h26"/><g fill="currentColor"><circle cx="50" cy="20" r="2"/><circle cx="150" cy="20" r="2"/><path d="m98 20 2-2 2 2-2 2Z"/></g>',
    "0 0 200 40",
  );
  n.classList.add("ornament");
  return n;
}
function ganesha() {
  const n = svg(
    '<path d="M40 22q10-19 20 0M37 22h26M42 15h16M45 8l5-5 5 5M40 30c-9-12-25 0-20 15 2 8 10 11 17 6m23-21c9-12 25 0 20 15-2 8-10 11-17 6M41 28c-7 8-8 22 0 27 6 5 12 3 12 13 0 10-17 9-14-1m9-9c-2 8 4 10 8 6M46 37h1m7 0h1M34 56c-12 4-17 18-8 26 10 8 41 8 49-2 7-9 1-19-12-24M33 62q-7 9 2 15m29-15q7 9-2 15M36 82q14-8 28 0M23 73l-13 9 20 8m47-17 13 9-20 8M22 54l-8-14m64 14 8-14M14 40q-11-7-2-13 9 4 2 13m72 0q11-7 2-13-9 4-2 13M38 90h24"/>',
    "0 0 100 100",
  );
  n.classList.add("ganesha");
  return n;
}
function faithMark(d) {
  if (d.faithId === "hindu") return ganesha();
  if (d.faithId === "muslim") return icon("nikah");
  if (d.faithId === "christian") return icon("christian");
  return null;
}
function names(d, cls = "names", tag = "div") {
  const n = el(tag, cls);
  [d.name1, d.name2].filter(Boolean).forEach((name, i) => {
    if (i) n.append(el("span", "amp", COPY.en.amp));
    n.append(el("span", "name", name));
  });
  return n;
}
function canopy(node) {
  node.append(picture("assets/toran.webp", "canopy", ""));
}
function section(id, title, sub) {
  const s = el("section", "section " + id);
  s.id = id;
  const w = el("div", "wrap");
  if (title || sub) {
    const h = el("header", "section-head");
    if (title) h.append(el("h2", "", title));
    if (sub) h.append(el("p", "section-sub", sub));
    w.append(h);
  }
  s.append(w);
  if (!["hero", "footer"].includes(id)) {
    const o = ornament();
    o.classList.add("section-divider");
    s.append(o);
  }
  return s;
}
function meta(d, c, ctx) {
  const n = el("div", "invitation-meta");
  [
    ["calendar", dateText(d, ctx)],
    ["clock", timeText(d, ctx)],
    ["pin", d.venue],
  ].forEach(([key, value]) => {
    if (!value) return;
    const cell = el("div");
    add(cell, icon(key), el("p", "", value));
    n.append(cell);
  });
  n.style.setProperty("--meta-count", n.children.length);
  return n;
}
function welcomePainting() {
  const p = el("picture", "welcome-painting"),
    wide = el("source");
  wide.media = "(min-width:1024px)";
  wide.srcset = "assets/house-desktop.webp";
  const landscape = el("source");
  landscape.media = "(max-width:1023px) and (min-aspect-ratio:3/2)";
  landscape.srcset = "assets/house-wide.webp";
  p.append(wide, landscape, picture("assets/welcome.webp", "", "", true));
  return p;
}
function buildEnvelope(d, c, ctx) {
  const n = el("div", "opening");
  n.setAttribute("role", "dialog");
  n.setAttribute("aria-modal", "true");
  n.setAttribute("aria-label", c.openInvitation);
  const stage = el("div", "opening-stage");
  stage.append(welcomePainting());
  const copy = el("div", "opening-copy");
  add(copy, faithMark(d));
  if (c[d.faithId]) copy.append(el("p", "faith-line", c[d.faithId]));
  copy.append(recipientAddress(ctx.recipient, c));
  ctx.recipient.bind(() => {
    n.classList.toggle("guest-mode", !!ctx.recipient.state.name);
    n.classList.toggle(
      "guest-long",
      Array.from(ctx.recipient.display).length > 34,
    );
  });
  add(
    copy,
    el("p", "label", c.newBeginning),
    el(
      "h1",
      "invitation-title",
      d.eventType === "housewarming"
        ? c.houseTitle
        : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
    el(
      "p",
      "opening-message",
      ctx.recipient.state.name
        ? c.guestOpeningMessage
        : d.message || c.openingMessage,
    ),
    names(d, "host-names"),
  );
  stage.append(copy);
  const lower = el("div", "opening-lower");
  lower.append(meta(d, c, ctx));
  const b = button(c.openInvitation, async () => {
    if (n.dataset.preparing) return;
    n.dataset.preparing = "true";
    const content = document.querySelector(".page-content");
    content.hidden = false;
    startMusic(ctx.audio);
    await prepareHero(n);
    n.classList.add("opening-away");
    document.body.classList.add("opened");
    setTimeout(
      () => {
        n.remove();
        content.inert = false;
        document.body.classList.remove("locked");
        document.querySelector(".floating").hidden = false;
        document.getElementById("hero").focus({ preventScroll: true });
        window.dispatchEvent(new Event("resize"));
        window.dispatchEvent(new Event("scroll"));
      },
      reduced.matches ? 0 : 1100,
    );
  });
  add(lower, b, el("p", "tagline", c.tagline));
  add(n, stage, lower);
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
  const s = section(
    "hero",
    d.eventType === "housewarming"
      ? c.homeTitle
      : EVENT_NAMES.en[d.eventType] || c.ceremony,
    c.homeSub,
  );
  s.tabIndex = -1;
  const w = s.firstChild;
  w.querySelector(".section-head").prepend(faithMark(d) || el("span"));
  add(w, el("p", "home-intro", d.homeStory || c.homeStory));
  const img = picture(
    d.photoSlots?.hero,
    "home-portrait",
    d.venue || c.ourHome,
    false,
  );
  if (img) w.append(img);
  const info = el("div", "hero-info");
  add(
    info,
    names(d),
    el("p", "hero-date", dateText(d, ctx)),
    el("p", "hero-venue", d.venue),
  );
  w.append(info);
  const scroll = el("a", "scroll-hint");
  scroll.href = "#blessing";
  add(scroll, el("span", "", c.scroll), icon("chevron"));
  w.append(scroll);
  canopy(s);
  return s;
}
function buildBlessing(d, c, ctx) {
  const s = section("blessing"),
    w = s.firstChild;
  if (c[d.faithId]) add(w, faithMark(d), el("p", "faith-line", c[d.faithId]));
  w.append(el("p", "blessing-copy", d.message || c.blessing));
  w.append(personalMessage(ctx.recipient, c));
  return s;
}
function portrait(name, relation, photo, c) {
  const a = el("article", "person"),
    f = el("div", "portrait");
  const img = picture(photo, "", name);
  f.append(img || el("span", "monogram", Array.from(name || c.guest)[0]));
  add(a, f, el("h3", "", name));
  if (relation) a.append(el("p", "relation", relation));
  return a;
}
function buildCouple(d, c) {
  const members = Array.isArray(d.household)
    ? d.household.filter((x) => x?.name).slice(0, 8)
    : [];
  if (!members.length && !d.name1 && !d.name2) return null;
  const s = section(
      "couple",
      members.length ? c.familyTitle : c.coupleTitle,
      members.length ? c.familySub : c.coupleLabel,
    ),
    w = s.firstChild,
    row = el("div", "family-row");
  row.dataset.count = String(
    members.length || [d.name1, d.name2].filter(Boolean).length,
  );
  if (members.length)
    members.forEach((m) =>
      row.append(portrait(m.name, m.relation, m.photo, c)),
    );
  else
    ["groom", "bride"].forEach((side, i) => {
      const name = i ? d.name2 : d.name1;
      if (!name) return;
      const family = d.families?.find((f) => f.side === side);
      const a = portrait(
        name,
        family?.relation || (i ? c.daughter : c.son),
        d.photoSlots?.[side],
        c,
      );
      if (family?.names) a.append(el("p", "parents", family.names));
      row.append(a);
    });
  add(
    w,
    row,
    el("p", "family-note", c.familyNote),
    picture("assets/kalash.webp", "family-kalash", ""),
  );
  return s;
}
function calendar(d, c) {
  return coreCalendar(d, c, "Griha Mangalam");
}
function buildCountdown(d, c) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle),
    w = s.firstChild,
    clock = el("div", "count-clock"),
    row = el("div", "count-row"),
    status = el("p", "count-status");
  clock.append(picture("assets/doorway.webp", "count-door", ""));
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const a = el("div", "count-unit"),
      digit = el("span", "digit", "00");
    add(a, digit, el("span", "label", c[k]));
    row.append(a);
    return digit;
  });
  clock.append(row);
  mountCountdown(s, d, c, row, digits, status, (digit) => {
    if (!reduced.matches)
      digit.animate(
        [
          { opacity: 0.3, translate: "0 6px" },
          { opacity: 1, translate: "0 0" },
        ],
        { duration: 280 },
      );
  });
  add(w, clock, status, calendar(d, c));
  return s;
}
function vine() {
  const n = svg(
    '<path class="vine-base" d="M40 0C0 80 100 80 60 160S0 240 40 320 100 400 60 480 0 560 40 640 100 720 60 800 0 880 40 960"/><path class="vine-fill" pathLength="1" d="M40 0C0 80 100 80 60 160S0 240 40 320 100 400 60 480 0 560 40 640 100 720 60 800 0 880 40 960"/><circle class="vine-tip" cx="40" cy="0" r="2" fill="currentColor"/>',
    "0 0 100 960",
  );
  n.classList.add("ritual-vine");
  n.setAttribute("preserveAspectRatio", "none");
  return n;
}
function sprig() {
  const n = svg(
    '<path d="M1 25Q40 22 78 5M25 23Q9 1 10 3q21-3 23 17M40 18q2-20 20-17 0 13-15 16M57 12q13 6 21-1M6 25q15 16 27-1"/><path d="M85 12c-20-13-15-25 0-17 15-8 20 4 0 17Zm0 0c-21 5-25-10-12-12m12 12c21 5 25-10 12-12"/>',
    "0 0 105 42",
  );
  n.classList.add("sprig");
  return n;
}
function buildEvents(d, c, ctx) {
  if (!d.events?.length) return null;
  const s = section(
      "events",
      d.eventType === "housewarming" ? c.otherEvents : c.events,
      c.eventIntro,
    ),
    w = s.firstChild,
    trail = el("div", "ritual-trail");
  trail.dataset.count = d.events.length;
  trail.append(vine());
  d.events.forEach((e, i) => {
    const key = Object.hasOwn(paths, e.key)
      ? e.key
      : e.key === "lunch"
        ? "reception"
        : "puja";
    const card = el("article", "event-card event-" + key);
    card.style.setProperty("--i", i);
    const media = el("div", "event-visual");
    const asset = {
      vastu: "kalash",
      housewarming: "doorway",
      puja: "satyanarayana",
      lunch: "meal",
    }[e.key];
    if (
      asset &&
      (e.key !== "puja" || d.faithId === "hindu") &&
      (e.key !== "vastu" || d.faithId === "hindu")
    )
      media.append(picture("assets/" + asset + ".webp", "ritual-art", ""));
    else media.append(icon(key));
    const detail = el("div", "event-copy");
    add(detail, el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony));
    const time = el("p", "event-time");
    add(time, icon("clock"), el("span", "", timeText(e, ctx)));
    detail.append(time);
    if (e.description)
      detail.append(el("p", "event-description", e.description));
    const more = el("details", "event-details"),
      summary = el("summary", "event-detail-action");
    add(summary, icon("pin"), el("span", "", c.maps));
    add(
      more,
      summary,
      el("p", "event-date", dateText(e, ctx)),
      el("p", "event-venue", e.venue),
      el("p", "event-address", e.address),
    );
    if (e.venue || e.address)
      more.append(link(c.maps, mapSearch(e.venue, e.address), "text-link"));
    detail.append(more);
    add(card, media, detail, sprig());
    trail.append(card);
  });
  w.append(trail);
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery),
    grid = el("div", "gallery-grid");
  grid.dataset.count = photos.length;
  photos.forEach((src, i) => {
    const b = button("", () => openGallery(i, photos, c, { icon }), "photo");
    b.setAttribute("aria-label", c.photo + " " + (i + 1));
    b.append(picture(src, "", c.photo + " " + (i + 1)));
    grid.append(b);
  });
  s.firstChild.append(grid);
  return s;
}
function buildVideo(d, c) {
  const id = youtube(d.videoUrl);
  if (!id) return null;
  const s = section("video", c.video),
    frame = el("div", "video-frame"),
    b = button("", () => loadVideo(frame, id, c.video), "video-poster");
  b.setAttribute("aria-label", c.play);
  add(b, icon("play"), el("span", "", c.videoHint));
  frame.append(b);
  s.firstChild.append(frame);
  return s;
}
function buildVenue(d, c) {
  if (!d.venue && !d.address) return null;
  const s = section("venue", c.otherVenue, c.ourHome),
    w = s.firstChild,
    grid = el("div", "venue-grid"),
    info = el("div", "venue-details");
  const heading = el("div", "venue-address");
  add(heading, icon("pin"), el("h3", "", d.venue), el("p", "", d.address));
  add(info, heading, link(c.directions, mapDirections(d.venue, d.address)));
  [d.ph1, d.ph2].filter(Boolean).forEach((ph) => {
    const clean = ph.replace(/[^\d+]/g, "");
    if (/^\+?\d{7,15}$/.test(clean)) {
      const a = link(c.call + " · " + ph, "tel:" + clean, "text-link");
      a.removeAttribute("target");
      info.append(a);
    }
  });
  const iframe = el("iframe");
  iframe.src = mapEmbed(d.venue, d.address);
  iframe.title = c.otherVenue;
  iframe.loading = "lazy";
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  add(grid, info, iframe);
  w.append(grid);
  const landmarks = (d.landmarks || []).filter((x) => x?.label).slice(0, 6);
  if (landmarks.length) {
    const a = el("div", "landmarks");
    a.append(el("h3", "", c.landmark));
    const row = el("div", "landmark-row");
    landmarks.forEach((x, i) => {
      const cell = el("div");
      add(
        cell,
        icon(i === 0 ? "pin" : i === 1 ? "calendar" : "chevron"),
        el("p", "", x.label),
      );
      row.append(cell);
    });
    a.append(row);
    w.append(a);
  }
  w.append(
    picture("assets/house-wide.webp", "venue-landscape", d.venue || c.ourHome),
  );
  return s;
}
function buildLiveStream(d, c) {
  const url = https(d.liveStream?.url);
  if (!url) return null;
  const s = section("live"),
    text = el("div");
  add(
    text,
    el("h2", "", c.live),
    el("p", "", c.liveSub),
    el("p", "live-note", d.liveStream.note || c.liveNote),
  );
  add(s.firstChild, icon("play"), text, link(c.watch, url));
  return s;
}
function buildRsvp(d, c, ctx) {
  if (!d.rsvp?.enabled) return null;
  const s = section("rsvp", c.rsvp),
    w = s.firstChild;
  w.querySelector(".section-head").prepend(icon("housewarming"));
  w.append(el("p", "rsvp-intro", c.presenceIntro));
  const formCopy = { ...c };
  const form = createRsvpForm(d, formCopy, { ornament });
  addRsvpBlessingLink(form, d, c);
  w.append(form);
  personalizeRsvp(s, form, ctx.recipient, c, formCopy);
  const warm = el("div", "warm-wishes");
  warm.append(el("h3", "", c.warmWishes));
  [
    [c.yesWarm, "yes"],
    [c.noWarm, "no"],
  ].forEach(([label, value]) => {
    const b = button(
      label,
      () => {
        const radio = form.querySelector(
          'input[name="attendance"][value="' + value + '"]',
        );
        if (radio) {
          radio.checked = true;
          radio.dispatchEvent(new Event("change", { bubbles: true }));
          form.querySelector("input[name=name]").focus();
        }
      },
      "warm-choice",
    );
    b.prepend(icon(value === "yes" ? "engagement" : "calendar"));
    warm.append(b);
  });
  add(w, warm, namaste());
  return s;
}
function namaste() {
  const n = svg(
    '<path d="m48 9-5 40-22 35 17 12 12-20 12 20 17-12-22-35-5-40q-4-8-4 0v49m0-49q-4-8-4 0v49M30 70l-4-25q0-9 5-6l8 15m34 16 4-25q0-9-5-6l-8 15M17 86l24 18m42-18-24 18" fill="#edc886"/><path d="m24 81 19 15m33-15-19 15"/>',
    "0 0 100 110",
  );
  n.classList.add("namaste");
  return n;
}
function buildBlessings(d, c, ctx) {
  if (!validGifts(d)) return null;
  const s = section("blessings", c.blessTitle, d.gifts.note || c.blessSub);
  s.firstChild.append(
    createBlessingsContent(d, c, ctx, {
      ornament,
      celebrate(n) {
        if (!reduced.matches)
          n.animate([{ opacity: 0.4 }, { opacity: 1 }], { duration: 500 });
      },
    }),
  );
  return s;
}
function buildFooter(d, c, ctx) {
  const s = section("footer"),
    w = s.firstChild;
  canopy(s);
  add(w, faithMark(d));
  if (d.faithId === "hindu")
    w.append(el("p", "footer-invocation", c.closingFaith));
  const photo = picture(d.photoSlots?.closing, "closing-art", c.closing);
  if (photo) w.append(photo);
  add(
    w,
    ornament(),
    el("h2", "", c.closing),
    closingMessage(ctx.recipient, c),
    names(d, "footer-names"),
    el("p", "footer-date", dateText(d, ctx)),
    ornament(),
  );
  const actions = el("div", "share-actions");
  add(
    actions,
    button(c.share, () => share(d, c), "text-link"),
    button(
      c.copyLink,
      async () => {
        try {
          await navigator.clipboard.writeText(location.href);
          actions.querySelector(".copy-status").textContent = c.copied;
        } catch {
          actions.querySelector(".copy-status").textContent = c.copyFailed;
        }
      },
      "text-link",
    ),
    el("span", "copy-status"),
  );
  actions.lastChild.setAttribute("role", "status");
  w.append(actions);
  w.append(link(c.made, "https://ruvva.com", "brand-link"));
  return s;
}
async function share(d, c) {
  try {
    if (navigator.share)
      await navigator.share({ title: document.title, url: location.href });
    else
      window.open(
        "https://wa.me/?text=" + encodeURIComponent(location.href),
        "_blank",
        "noopener",
      );
  } catch {
    /* Dismissing native sharing is valid. */
  }
}
function buildFloating(d, c, ctx) {
  return createFloatingControls(d, c, ctx, { icon });
}
function initializeStoryMotion(root) {
  const events = root.querySelector(".events"),
    trails = root.querySelectorAll(".ritual-vine");
  let frame = 0,
    active = false;
  const paint = () => {
    frame = 0;
    if (!active || document.hidden || reduced.matches) return;
    const r = events.getBoundingClientRect(),
      p = Math.max(
        0,
        Math.min(
          1,
          (innerHeight * 0.7 - r.top) / (r.height - innerHeight * 0.2),
        ),
      );
    trails.forEach((t) => {
      t.style.setProperty("--draw", 1 - p);
      const path = t.querySelector(".vine-fill"),
        tip = t.querySelector(".vine-tip");
      if (tip) {
        const q = path.getPointAtLength(p * path.getTotalLength());
        tip.setAttribute("cx", q.x);
        tip.setAttribute("cy", q.y);
      }
    });
  };
  const schedule = () => {
    if (!frame && active && !document.hidden && !reduced.matches)
      frame = requestAnimationFrame(paint);
  };
  if (events)
    new IntersectionObserver((es) => {
      active = es[0].isIntersecting;
      schedule();
    }).observe(events);
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule);
  document.addEventListener("visibilitychange", schedule);
  reduced.addEventListener("change", () => {
    if (reduced.matches)
      trails.forEach((t) => t.style.setProperty("--draw", 0));
    else schedule();
  });
}
function renderInvitation(root, d, ctx) {
  ctx.recipient = createRecipient(d, ctx, COPY.en);
  ctx.lang = Object.hasOwn(LOCALE, ctx.lang) ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.dataset.faith = d.faithId || "none";
  document.title =
    [d.name1, d.name2].filter(Boolean).join(" & ") || COPY.en.houseTitle;
  ctx.copy = COPY.en;
  ctx.audio = createAudio(d.musicUrl);
  if (ctx.audio) ctx.audio.preload = "none";
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 7; i++) {
    const p = el("i", "petal");
    p.style.setProperty("--x", ((i * 37 + 11) % 100) + "%");
    p.style.setProperty("--duration", 14 + i * 1.67 + "s");
    p.style.setProperty("--delay", -i * 4.31 + "s");
    p.style.setProperty("--drift", ((i * 23) % 100) - 50 + "px");
    ambient.append(p);
  }
  root.append(ambient);
  const content = el("div", "page-content");
  content.hidden = true;
  content.inert = true;
  root.append(content);
  [
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
    const n = fn(d, COPY.en, ctx);
    if (n) content.append(n);
  });
  root.append(buildEnvelope(d, COPY.en, ctx));
  initializeReveals(
    root,
    ".section-head,.person,.event-card,.home-portrait,.photo,.rsvp-form,.venue-grid",
  );
  mountArtMotion(root);
  coreMotion(root, { selector: ".section,.opening,.ambient,.floating" });
  initializeWheelScroll();
  initControls(root);
  initializeStoryMotion(root);
}
loadSample(renderInvitation, COPY.en);
