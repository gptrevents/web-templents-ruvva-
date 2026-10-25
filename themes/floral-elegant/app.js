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
    tagline: "A little magic. A lifetime of love.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Better, together.",
    coupleLabel: "The sweetest beginning",
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
    eventIntro: "A celebration in full bloom",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "The moments we keep",
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
    eyebrow: "Together, forever",
    moment: "Every love story deserves a celebration",
    videoHint: "A little glimpse of our story",
    amp: "&",
    nextEvent: "Next celebration",
    previousEvent: "Previous celebration",
    swipe: "Explore the celebrations",
    paperNote: "With love, always",
    chapter: "A day to remember",
    closing: "See you among the flowers",
  },
};

// Original floral monoline icons: compact, rounded, rose-coloured stationery marks.
const paths = {
  lamp: '<path d="M7 19h18c-1 7-17 7-18 0Zm9-3c-5-4 0-10 0-10s5 6 0 10ZM11 27h10"/>',
  haldi: '<path d="M5 18h22c-2 12-20 12-22 0Zm5-4 6-8 6 8M9 28h14"/>',
  mehendi:
    '<path d="M9 28C18 21 16 11 24 4M16 17C6 16 7 7 7 7s11 2 9 10Zm1 6c12 1 12-10 12-10s-11 0-12 10Z"/>',
  sangeet:
    '<path d="M11 24V8l15-3v16M11 12l15-3"/><ellipse cx="7" cy="25" rx="4" ry="3"/><ellipse cx="22" cy="22" rx="4" ry="3"/>',
  engagement:
    '<circle cx="16" cy="21" r="9"/><path d="m11 6 5-4 5 4-5 6ZM12 6h8"/>',
  wedding:
    '<path d="M4 25V9h24v16M2 28h28M3 9l13-6 13 6M9 10q7 8 14 0M8 13v12m16-12v12"/><path d="M13 22c-6-4 0-8 3-4 3-4 9 0 3 4l-3 3Z"/>',
  reception:
    '<path d="M4 5h9v8a4 4 0 0 1-9 0Zm15 0h9v8a4 4 0 0 1-9 0ZM8 18v9m15-9v9M3 28h10m5 0h10M4 10h9m6 0h9"/>',
  puja: '<path d="M10 11h12c-1 7 7 7 4 14-2 5-18 5-20 0-3-7 5-7 4-14ZM16 10c-8-8 0-8 0-8s8 0 0 8ZM8 19h16M10 24h12"/>',
  housewarming:
    '<path d="m3 15 13-11 13 11M7 12v16h18V12M13 28V18h6v10M4 29h24"/>',
  birthday:
    '<path d="M5 28V14h22v14ZM3 29h26M5 19q4 5 7 0 4 5 7 0 4 5 8 0M10 14V8m6 6V8m6 6V8M10 5V3m6 2V3m6 2V3"/>',
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
function flower() {
  const n = svg("", "0 0 100 100");
  n.classList.add("flower");
  for (let i = 0; i < 8; i++) {
    const g = document.createElementNS(n.namespaceURI, "g");
    g.setAttribute("transform", "rotate(" + i * 45 + " 50 50)");
    const petal = document.createElementNS(n.namespaceURI, "path");
    petal.setAttribute(
      "d",
      "M50 52C31 40 32 12 44 10c7-2 10 6 11 10 8-5 16 3 12 12-3 8-10 15-17 20Z",
    );
    petal.setAttribute("class", "bloom-petal");
    g.append(petal);
    n.append(g);
  }
  const center = document.createElementNS(n.namespaceURI, "circle");
  center.setAttribute("cx", "50");
  center.setAttribute("cy", "50");
  center.setAttribute("r", "9");
  center.setAttribute("class", "flower-center");
  n.append(center);
  return n;
}
function ornament() {
  const n = svg(
    '<path d="M2 20c22 0 31-3 45-12m56 0c14 9 23 12 45 12M23 18c-7-1-10-7-10-7s9-2 10 7Zm12-2c-3-7 2-11 2-11s5 7-2 11Zm90 2c7-1 10-7 10-7s-9-2-10 7Zm-12-2c3-7-2-11-2-11s-5 7 2 11Z"/><path d="M75 12c-10-16-25 0-11 10l11 8 11-8c14-10-1-26-11-10Z" fill="currentColor" fill-opacity=".08"/>',
    "0 0 150 36",
  );
  n.classList.add("floral-divider");
  return n;
}
function botanicalCorner() {
  const n = svg(
    '<path d="M6 60C25 45 30 25 43 4M20 45C3 43 6 30 6 30s17 1 14 15Zm8-18C14 21 23 10 23 10s10 10 5 17Zm-5 16c18 4 23-10 23-10s-17-2-23 10Z"/><circle cx="41" cy="19" r="6" fill="currentColor" fill-opacity=".1"/><circle cx="48" cy="42" r="7" fill="currentColor" fill-opacity=".1"/>',
    "0 0 60 66",
  );
  n.classList.add("botanical-corner");
  return n;
}
function dial() {
  return svg(
    '<circle cx="60" cy="60" r="52" stroke-opacity=".2"/><path d="M60 8a52 52 0 1 1-45 26"/><path d="M13 20c-12-7-4-18 4-10 8-8 16 3 4 10l-4 3Z" fill="currentColor" fill-opacity=".12"/>',
    "0 0 120 120",
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
  return s;
}
function renderInvitation(root, data, ctx) {
  ctx.lang = LOCALE[ctx.lang] ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.setAttribute("data-faith", data.faithId || "none");
  document.title = [data.name1, data.name2].filter(Boolean).join(" & ");
  ctx.audio = createAudio(data.musicUrl);
  ctx.copy = COPY.en;
  const c = COPY.en;
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const a = icon("petal");
    a.style.setProperty("--i", i);
    ambient.append(a);
  }
  RuvvaNatural.prepare(ambient, false);
  root.append(ambient);
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
    const n = fn(data, c, ctx);
    if (n) root.append(n);
  });
  initializeReveals(root, ".section .wrap,.person,.event-card", 0.08);
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
  const seal = el("div", "bloom-seal");
  seal.append(flower());
  cover.append(seal);
  const content = el("div", "opening-content");
  add(
    content,
    el("p", "label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
    names(d),
    ornament(),
  );
  const b = button(c.openInvitation, async () => {
    if (cover.classList.contains("opening-away") || cover.dataset.preparing)
      return;
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
      reduced.matches ? 0 : 1500,
    );
  });
  add(content, b, el("p", "tagline", d.name2 ? c.tagline : c.singleTagline));
  cover.append(content);
  document.body.classList.add("locked");
  setTimeout(() => {
    const nodes = [
      ...document.querySelectorAll("#app > :not(.opening):not(.ambient)"),
    ];
    const container = el("div", "page-content");
    nodes.forEach((n) => container.append(n));
    document.getElementById("app").append(container);
    container.inert = true;
    b.focus({ preventScroll: true });
  }, 0);
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
    names(d, "names", "h1"),
    ornament(),
    el("p", "hero-date", dateText(d, ctx)),
    el("p", "hero-venue", d.venue),
  );
  w.append(text);
  const src = local(d.photoSlots?.hero);
  if (src) {
    const figure = el("figure", "hero-photo");
    const image = el("img");
    image.src = src;
    image.alt = [d.name1, d.name2].filter(Boolean).join(" & ");
    image.loading = "lazy";
    add(figure, image, el("figcaption", "", c.paperNote), botanicalCorner());
    w.append(figure);
  }
  const hint = el("p", "scroll-hint");
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
    if (i) add(row, el("div", "join", c.amp));
    const card = el("article", "person");
    const frame = el("div", "portrait");
    const src = local(d.photoSlots?.[side]);
    if (src) {
      const img = el("img");
      img.src = src;
      img.alt = name;
      img.loading = "lazy";
      frame.append(img);
    } else frame.append(el("span", "monogram", Array.from(name)[0]));
    frame.append(botanicalCorner());
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
  return coreCalendar(d, c, "Floral Elegant");
}
function buildCountdown(d, c, ctx) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle);
  const row = el("div", "bloom-dials");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "dial-unit");
    const n = el("span", "digit", "00");
    add(unit, dial(), n, el("span", "label", c[k]));
    row.append(unit);
    return n;
  });
  const status = el("p", "count-status");
  mountCountdown(s, d, c, row, digits, status, (digit) => {
    digit.animate(
      [
        { transform: "scale(.86)", opacity: 0.3 },
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
  const rail = el("div", "event-rail");
  rail.tabIndex = 0;
  rail.setAttribute("role", "region");
  rail.setAttribute("aria-label", c.events);
  const list = el("div", "event-track");
  const spine = el("div", "event-spine");
  list.append(spine);
  d.events.forEach((e, i) => {
    const card = el("article", "event-card " + e.key);
    const marker = el("div", "event-marker");
    marker.append(flower());
    add(
      card,
      marker,
      el("span", "event-number", String(i + 1).padStart(2, "0")),
      icon(e.key),
      el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
      el("p", "event-date", dateText(e, ctx)),
      el("p", "event-time", timeText(e, ctx)),
      el("p", "event-venue", e.venue),
      el("p", "event-address", e.address),
    );
    if (e.venue || e.address)
      card.append(link(c.maps, mapSearch(e.venue, e.address), "text-link"));
    list.append(card);
  });
  rail.append(list);
  s.firstChild.append(rail);
  const actions = el("div", "rail-controls");
  const move = (direction) =>
    rail.scrollBy({
      left:
        direction *
        (rail.querySelector(".event-card").getBoundingClientRect().width + 24),
      behavior: reduced.matches ? "instant" : "smooth",
    });
  const prev = button("", () => move(-1), "rail-arrow");
  prev.append(icon("previous"));
  prev.setAttribute("aria-label", c.previousEvent);
  const next = button("", () => move(1), "rail-arrow");
  next.append(icon("next"));
  next.setAttribute("aria-label", c.nextEvent);
  add(actions, prev, el("p", "label", c.swipe), next);
  s.firstChild.append(actions);
  rail.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      e.preventDefault();
      move(e.key === "ArrowLeft" ? -1 : 1);
    }
  });
  const observer = new IntersectionObserver(
    (es) =>
      es.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("arrived");
          observer.unobserve(e.target);
        }
      }),
    { root: rail, threshold: 0.2 },
  );
  list.querySelectorAll(".event-card").forEach((n) => observer.observe(n));
  let scheduled = 0;
  let visible = false;
  const update = () => {
    scheduled = 0;
    const r = s.getBoundingClientRect();
    const pageProgress = Math.max(
      0,
      Math.min(1, (innerHeight - r.top) / (innerHeight + r.height * 0.4)),
    );
    const railProgress =
      (rail.scrollLeft + rail.clientWidth) / Math.max(1, rail.scrollWidth);
    spine.style.setProperty(
      "--progress",
      reduced.matches ? 1 : Math.min(1, pageProgress * railProgress),
    );
  };
  const schedule = () => {
    if (visible && !scheduled) scheduled = requestAnimationFrame(update);
  };
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    schedule();
  }).observe(s);
  addEventListener("scroll", schedule, { passive: true });
  rail.addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  const grid = el("div", "gallery-masonry");
  grid.dataset.count = String(photos.length);
  photos.forEach((src, i) => {
    const b = button("", () => openViewer(i), "photo photo-" + i);
    b.setAttribute("aria-label", c.photo + " " + (i + 1));
    const img = el("img");
    img.src = src;
    img.alt = c.photo + " " + (i + 1);
    img.loading = "lazy";
    b.append(img);
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
  painted.setAttribute("src", "assets/garden.webp");
  painted.setAttribute("alt", "");
  painted.setAttribute("loading", "lazy");
  illustration.append(painted, play);
  add(s.firstChild, illustration, text, link(c.watch, url));
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
    w.append(img);
  }
  const copy = el("div", "closing-copy");
  add(
    copy,
    el("p", "footer-note", c.closing),
    names(d),
    el("p", "", dateText(d, ctx)),
    ornament(),
    link(c.made, "https://ruvva.com", "brand-link"),
  );
  w.append(copy);
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
  const strength = 22;
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

