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
    tagline: "Our favorite adventure begins with you.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Two hearts. One adventure.",
    coupleLabel: "The people in our story",
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
    eventIntro: "Follow the happy little trail",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "A picture-book of us",
    photo: "Celebration picture",
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
    eyebrow: "Once upon a beautiful day",
    moment: "The next chapter is ours",
    videoHint: "A little glimpse of our story",
    amp: "&",
    nextEvent: "Next celebration",
    previousEvent: "Previous celebration",
    swipe: "Explore the celebrations",
    paperNote: "Side by side, always",
    chapter: "A day to remember",
    closing: "And so, our forever begins",
    story: "Our little story",
    storyIntro: "The best adventures are shared",
    storyCaptions: ["A little joy", "Our happy place", "The road ahead"],
    galleryPrevious: "Previous pictures",
    galleryNext: "Next pictures",
    galleryHint: "Swipe through our story",
    thankYou: "Thank you",
    closingNote: "For being part of our beautiful beginning.",
    trailEnd: "Different paths. One beautiful destination.",
  },
};

// Original storybook pen icons: rounded outlines and small filled details.
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
function butterfly() {
  const n = svg(
    '<g class="wing wing-left"><path d="M30 25C-1-12-14 25 15 31-5 46 23 57 30 32" fill="#ed9a92"/><path d="M26 25C10 5 1 18 16 25m8 8C9 39 20 43 25 36" stroke="#fff3d4" stroke-width="2"/></g><g class="wing wing-right"><path d="M30 25C61-12 74 25 45 31c20 15-8 26-15 1" fill="#efb56f"/><path d="M34 25C50 5 59 18 44 25m-8 8c15 6 4 10-1 3" stroke="#fff3d4" stroke-width="2"/></g><path d="M30 20v18m0-16-5-7m5 7 5-7" stroke="#4c6040" stroke-width="2"/>',
    "0 0 60 52",
  );
  n.classList.add("butterfly");
  return n;
}
function ornament() {
  const n = svg(
    '<path d="M2 20c24-14 36 12 60-2m26 0c24 14 36-12 60 2" stroke-dasharray="2 5"/><path d="M65 18c-16-21-24 1-6 4-8 13 10 15 13 1m4-5c16-21 24 1 6 4 8 13-10 15-13 1m3-8v15" fill="#efb56f"/>',
    "0 0 150 38",
  );
  n.classList.add("trail-divider");
  return n;
}
let boardSerial = 0;
function woodBoard() {
  const n = svg(
    '<defs><linearGradient id="timber-wash" x1="0" y1="0" x2=".1" y2="1"><stop stop-color="#efcc95"/><stop offset=".45" stop-color="#e4b77d"/><stop offset="1" stop-color="#cca16c"/></linearGradient></defs><path d="M104 6c1 37-5 51 1 90m392-90c-1 37 5 51-1 90" stroke="#705330" stroke-width="5"/><path d="M100 6c1 37-5 51 1 90m392-90c-1 37 5 51-1 90" stroke="#e4c28e" stroke-width="1.5" stroke-dasharray="3 5"/><path d="m37 91 109-3 120 3 151-3 146 4-3 57 3 51-3 65 2 51-142 4-163-2-132 3-88-5 3-50-4-61 3-58Z" fill="url(#timber-wash)" stroke="#91613c" stroke-width="2"/><path d="M41 148c155 4 302-6 515 0M39 204c145-4 330 5 520-1M39 262c153 3 309-3 518 0" stroke="#bd8956" stroke-width="2"/><path d="m46 101 203 2m49-2 192-1M58 139c32-7 68 4 98-1m158-4c45 5 116-4 145 0M55 159c54-4 77 5 119 0m102 1 137 2m-260 52c-33-7-53 10-83 1m212 0c48-8 81 8 119-1M45 250l162-1m33-6 207 4M51 273c97 5 118-4 176 1m88 26 169 1" stroke="#a57647" stroke-opacity=".35"/><ellipse cx="494" cy="231" rx="20" ry="6" stroke="#b4814d"/><ellipse cx="494" cy="231" rx="9" ry="3" stroke="#b4814d"/><circle cx="104" cy="105" r="7" fill="#8b673f"/><circle cx="496" cy="105" r="7" fill="#8b673f"/><path d="M104 90v16m392-16v16" stroke="#e0bd84" stroke-width="4"/>',
    "0 0 600 335",
  );
  // Opening and hidden hero must not share an SVG paint-server ID.
  const paintId = "timber-" + ++boardSerial;
  n.querySelector("linearGradient").setAttribute("id", paintId);
  n.querySelector('[fill="url(#timber-wash)"]').setAttribute(
    "fill",
    "url(#" + paintId + ")",
  );
  n.classList.add("wood-board");
  n.setAttribute("viewBox", "0 85 600 250");
  n.setAttribute("preserveAspectRatio", "none");
  return n;
}
function sprig() {
  const n = svg(
    '<path d="M18 86C33 57 35 31 52 8" stroke="#3f6c4b" stroke-width="2"/><path d="M28 64C3 58 10 40 10 40s22 1 18 24Zm8-25C17 32 28 17 28 17s17 7 8 22Zm-7 28c29 8 30-12 30-12S36 52 29 67Zm14-37c27 3 23-17 23-17s-22 0-23 17Z" fill="#80a574" stroke="#4d7651"/><path d="M50 76c-12-8-21 7-6 12m6-12c7-13 23-4 14 7m-14-7c2 15 19 15 16 3" fill="#efa294" stroke="#ae604f"/><circle cx="53" cy="80" r="3" fill="#eed58a"/>',
    "0 0 80 100",
  );
  const leaves = n.querySelector('[fill="#80a574"]');
  if (leaves) leaves.classList.add("breeze-leaves");
  n.classList.add("sprig");
  return n;
}
function bench() {
  return svg(
    '<path d="M8 18h64v9H8Zm0 14h64v9H8ZM4 47h72v7H4ZM13 54v16m54-16v16M12 18V8m56 10V8" fill="#d2a26c" stroke="#75512e" stroke-width="2"/><path d="m27 11 5-7 5 7m-5-7v14M48 12c-9-11-18 1-7 8l7 5 7-5c11-7 2-19-7-8Z" fill="#d97c72" stroke="#976052"/>',
    "0 0 80 78",
  );
}

function names(d, cls = "names", tag = "div") {
  const n = el(tag, cls);
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
    const edge = sprig();
    edge.classList.add("garden-breeze");
    s.append(edge);
  }
  if (id !== "hero" && id !== "footer") {
    const divider = ornament();
    divider.classList.add("section-divider");
    s.append(divider);
  }
  return s;
}
function renderInvitation(root, data, ctx) {
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
    const a = butterfly();
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
    buildFooter,
    buildFloating,
  ].forEach((fn) => {
    const n = fn(data, c, ctx);
    if (n) (n.classList.contains("opening") ? root : pageContent).append(n);
  });
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("seen");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.08 },
  );
  root
    .querySelectorAll(
      ".section .wrap,.person,.event-card,.story-page,.closing-picture",
    )
    .forEach((n) => {
      n.classList.add("reveal");
      observer.observe(n);
    });
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
  const traveler = butterfly();
  traveler.classList.add("opening-butterfly");
  cover.append(traveler);
  const content = el("div", "opening-content");
  add(
    content,
    el("p", "label invitation-label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
  );
  const sign = el("div", "hanging-sign");
  add(sign, woodBoard(), names(d));
  content.append(sign);
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
      reduced.matches ? 0 : 1400,
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
  const text = el("div", "hero-copy");
  add(
    text,
    el(
      "p",
      "label",
      d.faithId === "hindu" && d.eventType === "wedding"
        ? c.shubh
        : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
    el("p", "hero-overline", c.eyebrow),
  );
  const sign = el("div", "hanging-sign");
  add(sign, woodBoard(), names(d, "names", "h1"));
  text.append(sign);
  add(
    text,
    ornament(),
    el("p", "hero-date", dateText(d, ctx)),
    el("p", "hero-venue", d.venue),
  );
  w.append(text);
  const flyer = butterfly();
  flyer.classList.add("hero-butterfly");
  s.append(flyer);
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
      add(join, el("span", "", c.amp), bench());
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
    frame.append(sprig());
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
  const s = section("story", c.story, c.storyIntro),
    pages = el("div", "story-pages");
  photos.forEach((src, i) => {
    const figure = el("figure", "story-page");
    const img = el("img");
    img.src = src;
    img.alt = c.storyCaptions[i];
    img.loading = "lazy";
    add(
      figure,
      img,
      el("figcaption", "", c.storyCaptions[i]),
      el("span", "page-number", String(i + 1).padStart(2, "0")),
    );
    pages.append(figure);
  });
  s.firstChild.append(pages);
  return s;
}
function calendar(d, c) {
  return coreCalendar(d, c, "Storybook Garden");
}
function buildCountdown(d, c, ctx) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle);
  const row = el("div", "count-pennants");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "pennant-unit");
    const n = el("span", "digit", "00");
    add(unit, n, el("span", "label", c[k]));
    row.append(unit);
    return n;
  });
  const status = el("p", "count-status");
  mountCountdown(s, d, c, row, digits, status, (digit) => {
    digit.animate(
      [
        { transform: "rotateX(-75deg)", opacity: 0.3 },
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
  const map = el("div", "itinerary-map");
  const trail = svg(
    '<path class="trail-base"/><path class="trail-progress"/><circle class="trail-tip" r="7"/>',
    "0 0 100 100",
  );
  trail.classList.add("trail-line");
  map.append(trail);
  d.events.forEach((e, i) => {
    const key = Object.hasOwn(EVENT_NAMES.en, e.key) ? e.key : "wedding";
    const card = el("article", "event-card " + key),
      stub = el("div", "ticket-stub"),
      body = el("div", "ticket-body");
    const marker = el("span", "event-marker", String(i + 1).padStart(2, "0"));
    add(stub, marker, icon(key), el("span", "event-time", timeText(e, ctx)));
    add(
      body,
      el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
      el("p", "event-date", dateText(e, ctx)),
      el("p", "event-venue", e.venue),
      el("p", "event-address", e.address),
    );
    if (e.venue || e.address)
      body.append(link(c.maps, mapSearch(e.venue, e.address), "text-link"));
    add(card, stub, body);
    map.append(card);
  });
  s.firstChild.append(map);
  s.firstChild.append(el("p", "trail-end", c.trailEnd));
  const cards = [...map.querySelectorAll(".event-card")],
    line = trail.querySelector(".trail-progress"),
    base = trail.querySelector(".trail-base"),
    tip = trail.querySelector(".trail-tip");
  let length = 0,
    visible = false,
    frame = 0;
  const paint = () => {
    frame = 0;
    const r = map.getBoundingClientRect();
    const progress = reduced.matches
      ? 1
      : Math.max(
          0,
          Math.min(
            1,
            (innerHeight * 0.75 - r.top) /
              Math.max(1, r.height - innerHeight * 0.25),
          ),
        );
    line.style.strokeDashoffset = length * (1 - progress);
    if (length) {
      const point = line.getPointAtLength(length * progress);
      tip.setAttribute("cx", point.x);
      tip.setAttribute("cy", point.y);
    }
  };
  const schedule = () => {
    if (visible && !frame) frame = requestAnimationFrame(paint);
  };
  const layout = () => {
    const rect = map.getBoundingClientRect();
    trail.setAttribute(
      "viewBox",
      "0 0 " + Math.max(1, rect.width) + " " + Math.max(1, rect.height),
    );
    const points = cards.map((card) => {
      const marker = card.querySelector(".event-marker"),
        stub = marker.parentElement;
      return {
        x:
          card.offsetLeft +
          card.clientLeft +
          stub.offsetLeft +
          marker.offsetLeft +
          marker.offsetWidth / 2,
        y:
          card.offsetTop +
          card.clientTop +
          stub.offsetTop +
          marker.offsetTop +
          marker.offsetHeight / 2,
      };
    });
    let path = "";
    points.forEach((p, i) => {
      if (!i) path = "M" + p.x + " " + p.y;
      else {
        const prev = points[i - 1];
        path +=
          " C" +
          prev.x +
          " " +
          (prev.y + 90) +
          " " +
          p.x +
          " " +
          (p.y - 90) +
          " " +
          p.x +
          " " +
          p.y;
      }
    });
    base.setAttribute("d", path);
    line.setAttribute("d", path);
    length = line.getTotalLength();
    line.style.strokeDasharray = length;
    paint();
  };
  new ResizeObserver(layout).observe(map);
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    schedule();
  }).observe(map);
  const arrivals = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("arrived");
          arrivals.unobserve(e.target);
        }
      }),
    { threshold: 0.2 },
  );
  cards.forEach((card) => arrivals.observe(card));
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  const grid = el("div", "gallery-filmstrip");
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
    add(b, img, el("span", "film-number", String(i + 1).padStart(2, "0")));
    grid.append(b);
  });
  s.firstChild.append(grid);
  const controls = el("div", "film-controls");
  const move = (direction) =>
    grid.scrollBy({
      left:
        direction *
        (grid.querySelector(".photo").getBoundingClientRect().width + 20),
      behavior: reduced.matches ? "instant" : "smooth",
    });
  const prev = button("", () => move(-1), "film-arrow");
  prev.append(icon("previous"));
  prev.setAttribute("aria-label", c.galleryPrevious);
  const next = button("", () => move(1), "film-arrow");
  next.append(icon("next"));
  next.setAttribute("aria-label", c.galleryNext);
  add(controls, prev, el("span", "label", c.galleryHint), next);
  s.firstChild.append(controls);
  const sync = () => {
    prev.disabled = grid.scrollLeft < 2;
    next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 2;
  };
  grid.addEventListener("scroll", sync, { passive: true });
  new ResizeObserver(sync).observe(grid);
  grid.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
      e.preventDefault();
      move(e.key === "ArrowRight" ? 1 : -1);
    }
  });
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
// Original static project SVG, inlined so section visibility can pause its parts.
function pavilionArtwork() {
  const drawing = svg(
    '\n<defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#e0eeeb"/><stop offset="1" stop-color="#fff8e8"/></linearGradient><linearGradient id="wood" x2=".3" y2="1"><stop stop-color="#e9c798"/><stop offset="1" stop-color="#cba375"/></linearGradient><g id="leaf"><path d="M0 0C-17-24-7-37 0-41 17-25 13-11 0 0Z" fill="#acc39b"/><path d="M0-3V-33" stroke="#7e9a72" stroke-width="1.2"/></g><g id="flower" stroke="#b67d67" stroke-width="1.3"><path d="M0-3C-16-22-28-2-9 4c-15 17 8 23 11 7 12 14 25-5 9-10 14-17-8-28-13-10Z" fill="#efbdab"/><circle r="3.5" fill="#edc878"/></g></defs>\n<path d="M73 371C31 299 43 208 95 136 151 56 275 41 369 74c128 42 170 165 131 278" fill="url(#sky)" stroke="none"/>\n<g opacity=".45" stroke="#a5b99c" stroke-width="1.4"><path d="M64 347c98-27 139-4 226-16s149-17 242 3M61 360c134-8 325-17 474 1M89 373c129-14 273-10 410 0M96 315c29-6 45-6 68-2m281 4 63-2"/><path d="M80 311c5-69 30-107 47-130-10 64-24 101-47 130m405 6c-11-53-1-93 12-117 14 55 9 93-12 117" fill="#d1dfbd"/></g>\n<g stroke="#9a7957" stroke-width="2"><path d="m121 161 181-91 181 91-8 14H128Z" fill="#e3c391"/><path d="m121 161 181-91 181 91M146 153l154-68 153 68M164 151h271"/><path d="m164 147 138-65 131 65M189 147l112-60 105 60M220 147l81-60 75 60M255 147l47-60 41 60" opacity=".38"/>\n<path d="M149 175h17v173h-18Zm285 0h17l1 173h-19Z" fill="url(#wood)"/><path d="M155 190v143m286-143 1 143" stroke="#b38f62"/><path d="M139 341h39v16h-39Zm285 0h39v16h-39Z" fill="#d3b17f"/><path d="M160 187c39 11 24 48 55 59m226-59c-39 11-24 48-55 59"/><path d="M170 179h260v12H170Z" fill="#debc89"/>\n<path d="M182 199c32 30 52 31 79 2 25 31 51 31 79 0 25 30 50 29 78-2" stroke="#718e67"/>\n</g>\n<g class="pavilion-flags" fill="#f6e6c4" stroke="#9a7957" stroke-width="1.4"><path d="m198 211 7 25 13-16m38-14 11 24 10-20m57-5 12 24 9-20m42-1 11 24 13-20"/></g>\n<g stroke="#987650" stroke-width="2"><path d="M219 285h160v14H219Zm0 20h160v14H219Zm-9 23h179v13H210Zm19 13-6 21m149-21 7 21M224 274v50m149-50v50" fill="url(#wood)"/><path d="M243 291h108m-115 21h121m-132 23h143" stroke="#b08a60" stroke-width="1"/></g>\n<g stroke="#829e77" stroke-width="1.7"><path d="M105 354c0-34-12-53-25-72m25 72c12-36 18-56 39-73m-34 77c18-14 31-17 47-15M481 356c-7-32-18-44-33-57m33 57c4-48 17-69 31-85m-34 85c23-15 36-16 52-12"/><use href="#leaf" transform="translate(95 324) rotate(-45)"/><use href="#leaf" transform="translate(118 325) rotate(33)"/><use href="#leaf" transform="translate(481 331) rotate(-30)"/><use href="#leaf" transform="translate(493 316) rotate(29)"/></g>\n<g fill="#d6a387" stroke="#a67d63" stroke-width="1.6"><path d="m79 351 55 2-9 41H89Zm380 3h51l-8 38h-35Z"/><path d="m83 362 47 1m334 1h40"/></g>\n<g><use href="#flower" transform="translate(83 308) scale(.7)"/><use href="#flower" transform="translate(134 294) scale(.7)"/><use href="#flower" transform="translate(107 338) scale(.6)"/><use href="#flower" transform="translate(468 314) scale(.65)"/><use href="#flower" transform="translate(510 296) scale(.65)"/></g>\n<g stroke="#718d6a" stroke-width="1.5"><path d="M163 177c-25-52-1-94 29-106m-33 69c-16-13-24-18-39-18m49-16c19-2 29-10 36-19M436 181c28-48 9-87-25-107m29 71c22-7 36-22 39-32"/><use href="#leaf" transform="translate(162 133) rotate(-64) scale(.65)"/><use href="#leaf" transform="translate(174 106) rotate(54) scale(.75)"/><use href="#leaf" transform="translate(442 138) rotate(52) scale(.7)"/><use href="#flower" transform="translate(184 78) scale(.8)"/><use href="#flower" transform="translate(427 88) scale(.7)"/></g>\n<g class="pavilion-bird" stroke="#63806d" stroke-width="1.5"><path d="M364 126c21 9 30 0 30-10 9-6 17-1 14 7-6 15-26 16-44 3Z" fill="#a7c3b5"/><path d="m364 126-14-3 8 13 12-6m38-11 8 4-9 2m-20 10-1 9m10-11 1 10"/><path class="pavilion-wing" d="M385 127c-3-9-10-12-16-10 1 9 8 14 16 10Z" fill="#86a99b"/><circle cx="402" cy="119" r="1.2" fill="#365d45"/></g>\n<g fill="#e3ceb0" stroke="#c2b595" stroke-width="1.1"><path d="m220 379 64-8 40 7-29 10-72 2Zm71 28 58-9 39 9-28 10-66 1Zm-63 26 56-9 44 8-26 10-70 1Z"/></g>\n<path d="M90 397c103-15 294-12 425-3M131 404l56-3m221 4 65-4M116 391l-7-13m14 13 5-21m323 22-4-18m14 17 9-12" stroke="#a1b08a" stroke-width="1.5"/>\n<g fill="#edc087" stroke="#bd9366" stroke-width="1.3"><path d="M84 158c-22-20-29 2-9 5-14 11 3 19 9 3 8 15 25 4 10-5 19-9 3-27-9-6Z"/><path d="m84 153 1 17"/></g>\n',
    "0 0 600 480",
  );
  drawing.classList.add("pavilion-drawing");
  drawing.setAttribute("stroke", "#54735a");
  return drawing;
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
  const pavilion = link("", url, "live-pavilion");
  pavilion.setAttribute("aria-label", c.watch);
  const drawing = pavilionArtwork();
  const badge = icon("play");
  pavilion.append(drawing, badge);
  text.classList.add("live-copy");
  const watch = link(c.watch, url);
  watch.append(icon("next"));
  add(s.firstChild, pavilion, text, watch);
  return s;
}
function buildRsvp(d, c) {
  if (!d.rsvp?.enabled) return null;
  const s = section("rsvp", c.rsvp, c.rsvpSub);
  s.firstChild.append(createRsvpForm(d, c, { ornament }));
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
    const picture = el("figure", "closing-picture");
    picture.append(img);
    const corner = sprig();
    corner.classList.add("closing-sprig");
    picture.append(corner);
    w.append(picture);
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
  coreMotion(root);
}

// Give all desktop wheel/trackpad deltas one consistent time-based easing curve.
// Scroll the real document, so focus, sticky controls and browser navigation still work.

// Compose motion with each theme's own transforms; never crop or zoom source images.
function initializeScrollChoreography(root) {
  const strength = 26;
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
        const limit = photo ? 6 : strength * (compact ? 0.85 : 1);
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

