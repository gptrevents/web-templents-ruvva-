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
    guestNoteTitle: "A place beside the sea, for you",
    guestMessage:
      "As a new tide begins in our lives, we would love you to be there. Come share a beautiful moment with us.",
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
    tagline: "Where our forever meets the sea.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Two souls. One horizon.",
    coupleLabel: "At the heart of it all",
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
    eventIntro: "A few beautiful days by the sea",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "Collected along the way",
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
    eyebrow: "Together, with the tide",
    moment: "A new horizon awaits",
    videoHint: "A little glimpse of our story",
    amp: "&",
    nextEvent: "Next celebration",
    previousEvent: "Previous celebration",
    swipe: "Explore the celebrations",
    paperNote: "Side by side, always",
    chapter: "A day to remember",
    closing: "Our forever starts here",
    day: "Day",
    anyDay: "The celebration",
    openingNote: "Two hearts. An endless horizon.",
    story: "A shore to call our own",
    storyIntro: "Small moments, endless memories",
    storyCaptions: ["Side by side", "A little adventure", "The next horizon"],
    galleryPrevious: "Previous pictures",
    galleryNext: "Next pictures",
    galleryHint: "Swipe through our story",
    thankYou: "Thank you",
    closingNote: "For sharing this beautiful beginning with us.",
    trailEnd: "Different paths. One beautiful destination.",
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
let oceanArtId = 0;
function shell() {
  const n = svg(
    '<path d="M16 29C-4 21 0 2 8 6c1-8 10-7 12 0 8-4 12 4 8 12-2 5-6 8-12 11Z" fill="currentColor" fill-opacity=".06"/><path d="m16 28-8-20m8 20 4-20m-4 20-1-24m1 24L4 16m12 12 12-12M11 30h10"/>',
    "0 0 32 34",
  );
  n.classList.add("shell");
  return n;
}
function ornament() {
  const n = svg(
    '<path d="M1 17c20-9 30 9 48 0m52 0c18 9 28-9 48 0"/><path d="M75 27c-27-11-11-35-4-17 0-19 18-16 13 2 13-13 26 4-9 15Zm0 0-4-17m4 17 9-15M68 30h14" fill="currentColor" fill-opacity=".06"/>',
    "0 0 150 36",
  );
  n.classList.add("sea-divider");
  return n;
}
function gull() {
  const n = svg(
    '<g class="gull-left"><path d="M17 18C11 8 3 9 1 14"/></g><g class="gull-right"><path d="M17 18C23 8 31 9 33 14"/></g>',
    "0 0 34 28",
  );
  n.classList.add("gull");
  return n;
}
function cloud() {
  const n = svg(
    '<path d="M4 46c-6-15 8-25 18-18C21 2 59-5 66 22c14-13 34-2 31 13 18-3 28 11 22 18H5Z" fill="currentColor" stroke="none"/>',
    "0 0 125 58",
  );
  n.classList.add("cloud");
  return n;
}
function waveField() {
  const n = svg(
    '<g class="wave-track"><path d="M-180 47C-60-5 60-5 180 47s240 52 360 0 240-52 360 0 240 52 360 0 240-52 360 0 240 52 360 0"/><path d="M-180 65C-60 13 60 13 180 65s240 52 360 0 240-52 360 0 240 52 360 0 240-52 360 0 240 52 360 0" stroke-opacity=".4"/><path d="M-180 82C-60 30 60 30 180 82s240 52 360 0 240-52 360 0 240 52 360 0 240-52 360 0 240 52 360 0" stroke-opacity=".2"/></g>',
    "0 0 1440 120",
  );
  n.classList.add("wavefield");
  n.setAttribute("preserveAspectRatio", "none");
  return n;
}
function decorateScene(node, water = false) {
  const air = el("div", "coastal-atmosphere");
  air.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 2; i++) {
    const n = cloud();
    n.style.setProperty("--i", i);
    air.append(n);
  }
  const flock = el("div", "flock");
  for (let i = 0; i < 3; i++) {
    const bird = gull();
    bird.style.setProperty("--i", i);
    flock.append(bird);
  }
  air.append(flock, waveField());
  node.append(air);
  if (water) {
    const id = "ocean-ripple-" + ++oceanArtId;
    const defs = svg(
      '<defs><filter x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency=".012 .045" numOctaves="1" seed="8" result="seaNoise"><animate attributeName="baseFrequency" values=".012 .045;.016 .055;.012 .045" dur="18s" repeatCount="indefinite"/></feTurbulence><feDisplacementMap in="SourceGraphic" in2="seaNoise" scale="6" xChannelSelector="R" yChannelSelector="G"/></filter></defs>',
      "0 0 1 1",
    );
    defs.classList.add("ripple-defs");
    defs.querySelector("filter").setAttribute("id", id);
    node.append(defs);
    const surface = el("div", "water-surface");
    surface.style.setProperty("--ripple-filter", "url(#" + id + ")");
    surface.setAttribute("aria-hidden", "true");
    node.append(surface);
  }
}

function names(d, cls = "names", tag = "div") {
  const n = el(tag, cls);
  n.setAttribute(
    "data-long",
    String(
      [d.name1, d.name2].some((value) => String(value || " ").length > 28),
    ),
  );
  add(n, el("span", "", d.name1 || ""));
  if (d.name2) add(n, el("span", "amp", COPY.en.amp), el("span", "", d.name2));
  return n;
}

function section(id, title, eyebrow) {
  const s = el("section", id + " section");
  s.id = id;
  const w = el("div", "wrap");
  if (eyebrow) add(w, el("p", "label", eyebrow));
  if (title) add(w, el("h2", "", title));
  s.append(w);
  if (["couple", "countdown", "gallery", "rsvp"].includes(id)) {
    const detail = el("div", "continuity-detail");
    detail.setAttribute("aria-hidden", "true");
    detail.append(InviteArt.create());
    s.append(detail);
  }
  if (id !== "hero" && id !== "footer") {
    const divider = ornament();
    divider.classList.add("section-divider");
    s.append(divider);
  }
  decorateScene(s, id === "hero");
  return s;
}
function renderInvitation(root, data, ctx) {
  ctx.recipient = createRecipient(data, ctx, COPY.en);
  ctx.lang = LOCALE[ctx.lang] ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.setAttribute("data-faith", data.faithId || "none");
  document.title = [data.name1, data.name2].filter(Boolean).join(" & ");
  ctx.audio = createAudio(data.musicUrl);
  if (ctx.audio) ctx.audio.preload = "none";
  ctx.copy = COPY.en;
  const c = COPY.en;
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const a = el("i", "sea-spray");
    a.style.setProperty("--i", i);
    ambient.append(a);
  }
  RuvvaNatural.prepare(ambient, true);
  root.append(ambient);
  const pageContent = el("div", "page-content");
  pageContent.hidden = true;
  pageContent.inert = true;
  root.append(pageContent);
  [
    buildEnvelope,
    buildHero,
    buildBlessing,
    buildCouple,
    buildStory,
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
    if (n) (n.classList.contains("opening") ? root : pageContent).append(n);
  });
  mountRecipient(root, ctx, COPY.en, makeGuestLetter);
  initializeReveals(
    root,
    ".section .wrap,.person,.event-card,.story-page",
    0.08,
  );
  initControls(root);
  initializeMotion(root);
  initializeWheelScroll();
  initializeScrollChoreography(root);
}
function buildEnvelope(d, c, ctx) {
  const cover = el("div", "opening");
  cover.setAttribute("role", "dialog");
  cover.setAttribute("aria-modal", "true");
  cover.setAttribute("aria-label", c.openInvitation);
  decorateScene(cover, true);
  const curtain = el("div", "opening-tide");
  curtain.append(waveField());
  cover.append(curtain);
  const content = el("div", "opening-content");
  add(
    content,
    el("p", "label invitation-label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
  );
  add(content, el("p", "opening-note", c.openingNote), names(d));
  add(content, ornament(), el("p", "opening-date", dateText(d, ctx)));
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
        document.getElementById("hero").focus();
      },
      reduced.matches ? 0 : 1600,
    );
  });
  add(content, b, el("p", "tagline", d.name2 ? c.tagline : c.singleTagline));
  cover.append(content);
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
    el("p", "hero-overline", c.eyebrow),
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
  const photo = local(d.photoSlots?.hero);
  if (photo) {
    const img = el("img", "hero-memory");
    img.src = photo;
    img.alt = [d.name1, d.name2].filter(Boolean).join(" & ");
    img.loading = "lazy";
    w.append(img);
  }
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
  add(w, el("p", "blessing-copy", d.message || c.blessing), ornament());
  return s;
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
    if (i) {
      const join = el("div", "join");
      add(join, el("span", "", c.amp), shell());
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
function buildStory(d, c) {
  const photos = (d.photoSlots?.story || [])
    .map(local)
    .filter(Boolean)
    .slice(0, 3);
  if (!photos.length) return null;
  const s = section("story", c.story, c.storyIntro);
  const list = el("div", "story-spread");
  photos.forEach((src, i) => {
    const f = el("figure", "story-page");
    const img = el("img");
    img.src = src;
    img.alt = c.storyCaptions[i];
    img.loading = "lazy";
    const cap = el("figcaption");
    add(
      cap,
      el("span", "chapter-number", String(i + 1).padStart(2, "0")),
      el("span", "", c.storyCaptions[i]),
    );
    add(f, img, cap);
    list.append(f);
  });
  s.firstChild.append(list);
  return s;
}
function calendar(d, c) {
  return coreCalendar(d, c, "Ocean Serene");
}
function buildCountdown(d, c, ctx) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle);
  const row = el("div", "tide-count");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "tide-unit");
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
  add(s.firstChild, row, status, calendar(d, c));
  return s;
}
function buildEvents(d, c, ctx) {
  if (!d.events?.length) return null;
  const s = section(
    "events",
    d.eventType === "wedding" ? c.events : c.otherEvents,
    c.eventIntro,
  );
  const days = new Map();
  d.events.forEach((e) => {
    const day = e.date || "";
    if (!days.has(day)) days.set(day, []);
    days.get(day).push(e);
  });
  const nav = el("div", "day-tabs");
  nav.setAttribute("role", "tablist");
  nav.setAttribute("aria-label", c.events);
  const chart = svg(
    '<path d="M0 22C90 0 150 44 240 22s150-22 240 0 150 22 240 0 150-22 240 0 150 22 240 0" stroke-opacity=".2"/><path class="tide-path" pathLength="1" d="M0 22C90 0 150 44 240 22s150-22 240 0 150 22 240 0 150-22 240 0 150 22 240 0"/><circle class="tide-tip" cx="0" cy="22" r="5" fill="currentColor"/>',
    "0 0 1200 45",
  );
  chart.classList.add("day-tide");
  chart.setAttribute("preserveAspectRatio", "none");
  const panels = el("div", "day-panels"),
    buttons = [];
  const select = (index) => {
    buttons.forEach((b, i) => {
      b.setAttribute("aria-selected", String(i === index));
      b.tabIndex = i === index ? 0 : -1;
      panels.children[i].hidden = i !== index;
    });
  };
  [...days].forEach(([date, events], i) => {
    const tab = button("");
    tab.className = "day-tab";
    tab.id = "day-tab-" + i;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", "day-panel-" + i);
    const v = dateValue({ date });
    const short =
      v && !isNaN(v)
        ? v.toLocaleDateString(LOCALE[ctx.lang] || "en-IN", {
            day: "numeric",
            month: "short",
            timeZone: "Asia/Kolkata",
          })
        : c.anyDay;
    add(
      tab,
      el("span", "day-dot"),
      el("span", "label", c.day + " " + (i + 1)),
      el("span", "tab-date", short),
    );
    nav.append(tab);
    buttons.push(tab);
    const panel = el("div", "day-panel");
    panel.id = "day-panel-" + i;
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.append(el("p", "day-heading", dateText({ date }, ctx)));
    const list = el("div", "day-events");
    events.forEach((e) => {
      const key = Object.hasOwn(EVENT_NAMES.en, e.key) ? e.key : "wedding";
      const card = el("article", "event-card " + key),
        heading = el("div", "event-heading");
      add(heading, icon(key), el("p", "event-time", timeText(e, ctx)));
      add(
        card,
        heading,
        el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
        el("p", "event-date", dateText(e, ctx)),
        el("p", "event-venue", e.venue),
        el("p", "event-address", e.address),
      );
      if (e.venue || e.address)
        card.append(link(c.maps, mapSearch(e.venue, e.address), "text-link"));
      list.append(card);
    });
    panel.append(list);
    panels.append(panel);
    tab.addEventListener("click", () => select(i));
    tab.addEventListener("keydown", (event) => {
      let next = i;
      if (event.key === "ArrowRight") next = (i + 1) % days.size;
      else if (event.key === "ArrowLeft")
        next = (i + days.size - 1) % days.size;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = days.size - 1;
      else return;
      event.preventDefault();
      select(next);
      buttons[next].focus({ preventScroll: true });
      buttons[next].scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: reduced.matches ? "instant" : "smooth",
      });
    });
  });
  add(s.firstChild, nav, chart, panels);
  select(0);
  let frame = 0,
    visible = false;
  const update = () => {
    frame = 0;
    const r = s.getBoundingClientRect();
    const p = reduced.matches
      ? 1
      : Math.max(
          0,
          Math.min(1, (innerHeight - r.top) / (innerHeight + r.height * 0.2)),
        );
    chart.style.setProperty("--tide", p);
    const path = chart.querySelector(".tide-path"),
      tip = chart.querySelector(".tide-tip");
    const point = path.getPointAtLength(path.getTotalLength() * p);
    tip.setAttribute("cx", point.x);
    tip.setAttribute("cy", point.y);
  };
  const schedule = () => {
    if (visible && !frame) frame = requestAnimationFrame(update);
  };
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    schedule();
  }).observe(s);
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  const grid = el("div", "porthole-gallery");
  grid.tabIndex = 0;
  grid.setAttribute("role", "region");
  grid.setAttribute("aria-label", c.gallery);
  grid.dataset.count = String(photos.length);
  photos.forEach((src, i) => {
    const b = button("", () => openViewer(i), "photo photo-" + i);
    b.setAttribute("aria-label", c.photo + " " + (i + 1));
    const img = el("img");
    img.src = src;
    img.alt = c.photo + " " + (i + 1);
    img.loading = "lazy";
    add(b, img, el("span", "photo-number", String(i + 1).padStart(2, "0")));
    grid.append(b);
  });
  s.firstChild.append(grid);
  function openViewer(index) {
    openGallery(index, photos, c, { icon });
  }
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
  painted.setAttribute("src", "assets/venue.webp");
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
function buildFooter(d, c, ctx) {
  const s = section("footer"),
    w = s.firstChild;
  const closing = local(d.photoSlots?.closing);
  if (closing) {
    const img = el("img", "closing-photo");
    img.src = closing;
    img.alt = c.closing;
    img.loading = "lazy";
    w.append(img);
  }
  const text = el("div", "closing-copy");
  add(
    text,
    el("p", "label", c.closing),
    el("h2", "", c.thankYou),
    el("p", "footer-note", c.closingNote),
    names(d),
    el("p", "", dateText(d, ctx)),
    ornament(),
    link(c.made, "https://ruvva.com", "brand-link"),
  );
  w.append(text);
  return s;
}
function buildFloating(d, c, ctx) {
  return createFloatingControls(d, c, ctx, { icon });
}

// Keep decorative loops asleep outside the viewport and while the tab is hidden.
function initializeMotion(root) {
  coreMotion(root, {
    onActive(node, active) {
      node.querySelectorAll(".ripple-defs").forEach((s) => {
        if (active && matchMedia("(min-width:1024px)").matches)
          s.unpauseAnimations();
        else s.pauseAnimations();
      });
    },
  });
}

// Give all desktop wheel/trackpad deltas one consistent time-based easing curve.
// Scroll the real document, so focus, sticky controls and browser navigation still work.

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
  s.classList.add("blessings-ocean-serene");
  const content = createBlessingsContent(d, c, ctx, {
    ornament,
    celebrate(node) {
      node.animate(
        [
          { opacity: 0.4, transform: "translateX(-8px)" },
          { opacity: 1, transform: "translateX(0)" },
        ],
        { duration: 650, easing: "ease-out" },
      );
    },
  });
  s.firstChild.append(content);
  return s;
}
