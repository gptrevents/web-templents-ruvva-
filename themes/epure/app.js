import {
  el,
  add,
  button,
  link,
  svg,
  local,
  https,
  dateValue,
  dateText,
  timeText,
  EVENT_NAMES,
  LOCALE,
  reduced,
  calendar,
  createRsvpForm,
  createFloatingControls,
  openGallery,
  mountCountdown,
  initializeMotion,
  initializeReveals,
  initializeWheelScroll,
  createAudio,
  startMusic,
  loadSample,
  initControls,
  prepareHero,
  mapSearch,
  mapEmbed,
  mapDirections,
  youtube,
  loadVideo,
} from "../../shared/core.js";
import {
  BLESSINGS_COPY,
  validGifts,
  createBlessingsContent,
  addRsvpBlessingLink,
} from "../../shared/blessings.js";
const COPY = {
  en: {
    ...BLESSINGS_COPY,
    nextEvent: "Next events",
    previousEvent: "Previous events",
    eventTrack: "Browse the celebration itinerary",
    photoIndex: "Frame",
    together: "together",
    dateLabel: "Save the date",
    locationLabel: "The setting",
    chapterLabel: "The occasion",
    gallerySub: "Moments worth keeping",
    viewPortrait: "Portrait",
    closingThanks: "We look forward to celebrating with you.",
    quietScroll: "Continue the story",
    allMoments: "Our story, in three frames",
    watchHint: "Join us from wherever you are.",
    mapTitle: "Venue location",
    errorGeneric: "The invitation could not be loaded.",
    heroTitle: "A life, together.",
    openingTitle: "An invitation,",
    openingSecond: "just for you.",
    issue: "A celebration of us",
    heroCaption: "The beginning of everything.",
    photoCaption: "A few quiet moments, kept forever.",
    indexLabel: "The photographic index",
    coupleSub: "Better, together.",
    folio: "A personal invitation",
    venueLabel: "The gathering place",

    loadFailure:
      "The invitation could not be loaded. Please refresh to try again.",
    closing: "There is a place for you here.",
    thankYou: "With love, always.",
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "A day for love. A lifetime to follow.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Individually wonderful.",
    coupleLabel: "Two people. One beautiful decision.",
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
    eventIntro: "The order of a beautiful day.",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "Nothing extraordinary. Just everything.",
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
    rsvpSub: "A seat, saved for you.",
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
    eyebrow: "An invitation to celebrate",
    moment: "The wedding of",
    videoHint: "A little glimpse of our story",
    amp: "&",
  },
};

const paths = {
  lamp: '<path d="M18 37h28c-2 9-7 13-14 13s-12-4-14-13Zm14-5c-9-9 0-20 0-20s9 11 0 20Zm0 18v7m-9 0h18"/>',
  haldi:
    '<path d="M12 36h40c-1 12-11 18-20 18S13 48 12 36Zm9-5 11-16 11 16M24 57h16"/>',
  mehendi:
    '<path d="M18 54C35 37 30 19 46 10M29 37C10 37 13 20 13 20s17 1 16 17Zm6-10c17 1 17-13 17-13s-15-2-17 13Z"/>',
  sangeet:
    '<path d="M27 45V15l23-5v30M27 24l23-5"/><ellipse cx="19" cy="45" rx="8" ry="6"/><ellipse cx="42" cy="40" rx="8" ry="6"/>',
  engagement:
    '<circle cx="26" cy="39" r="15"/><path d="m32 15 8-8 12 8-12 11Zm3 14a15 15 0 1 1-2 22"/>',
  wedding:
    '<circle cx="24" cy="34" r="14"/><circle cx="41" cy="34" r="14"/><path d="m20 14 4-6 4 6m9 0 4-6 4 6"/>',
  reception:
    '<path d="M11 13h15v13c0 11-15 11-15 0Zm27 0h15v13c0 11-15 11-15 0ZM18 35v18m27-18v18M11 55h15m12 0h15"/>',
  puja: '<path d="M20 28h24c-1 7 7 12 6 20-2 12-34 12-36 0-1-8 7-13 6-20Zm12-7C19 8 32 5 32 5s13 9 0 16ZM20 39h24"/>',
  housewarming: '<path d="m7 29 25-21 25 21M15 24v32h34V24M27 56V38h10v18"/>',
  birthday:
    '<path d="M12 54V30h40v24ZM8 58h48M12 39q6 8 13 0 7 8 14 0 6 8 13 0M22 29V18m20 11V18M32 29V14m0-4v-4"/>',
  nikah:
    '<path d="M41 8A25 25 0 1 0 56 44 23 23 0 0 1 41 8Zm8 5 2 5 5 2-4 3v5l-4-3-5 1 2-5-2-4 5 1Z"/>',
  christian: '<path d="M28 7h8v17h16v8H36v25h-8V32H12v-8h16Z"/>',
  play: '<path d="m25 17 23 15-23 15Z"/>',
  pause: '<path d="M25 17v30m14-30v30" stroke-width="3"/>',
  music:
    '<path d="M27 45V15l23-5v30M27 24l23-5"/><ellipse cx="19" cy="45" rx="8" ry="6"/><ellipse cx="42" cy="40" rx="8" ry="6"/>',
  share:
    '<circle cx="16" cy="32" r="5"/><circle cx="47" cy="15" r="5"/><circle cx="47" cy="49" r="5"/><path d="m21 29 21-12M21 35l21 12"/>',
  next: '<path d="M12 32h40M37 17l15 15-15 15"/>',
  previous: '<path d="M52 32H12m15-15L12 32l15 15"/>',
  close: '<path d="m18 18 28 28m0-28L18 46"/>',
  chevron: '<path d="m19 25 13 13 13-13"/>',
};
function icon(k) {
  const key = Object.hasOwn(paths, k) ? k : "lamp";
  const n = svg(paths[key], "0 0 64 64");
  n.classList.add("icon", "icon-" + key);
  n.setAttribute("stroke-width", "1.6");
  return n;
}
function names(d, cls = "names", tag = "div") {
  const n = el(tag, cls);
  add(n, el("span", "name-one", d.name1 || COPY.en.together));
  if (d.name2)
    add(n, el("span", "amp", COPY.en.amp), el("span", "name-two", d.name2));
  n.dataset.long = String(
    Math.max((d.name1 || "").length, (d.name2 || "").length) > 18,
  );
  return n;
}
function picture(src, cls, alt, eager = false) {
  const clean = local(src);
  if (!clean) return null;
  const p = el("picture", cls);
  if (/^assets\/(main|groom|bride)\.webp$/.test(clean)) {
    const source = el("source");
    source.media = "(min-width:1024px)";
    source.srcset = clean.replace(".webp", "-desktop.webp");
    p.append(source);
  }
  const image = el("img");
  image.src = clean;
  image.alt = alt;
  image.loading = eager ? "eager" : "lazy";
  image.decoding = "async";
  p.append(image);
  return p;
}
function section(id, title, eyebrow) {
  const s = el("section", "section " + id);
  s.id = id;
  const w = el("div", "wrap");
  s.append(w);
  if (title || eyebrow) {
    const head = el("header", "section-head");
    if (eyebrow) head.append(el("p", "label", eyebrow));
    if (title) head.append(el("h2", "", title));
    w.append(head);
  }
  if (id !== "hero" && id !== "footer") {
    const line = ornament();
    line.classList.add("section-divider");
    s.append(line);
  }
  return s;
}
function renderInvitation(root, d, ctx) {
  ctx.lang = Object.hasOwn(LOCALE, ctx.lang) ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.dataset.faith = d.faithId || "none";
  document.title =
    [d.name1, d.name2].filter(Boolean).join(" & ") || COPY.en.ceremony;
  ctx.audio = createAudio(d.musicUrl);
  if (ctx.audio) ctx.audio.preload = "none";
  ctx.copy = COPY.en;
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 3; i++) {
    const mote = el("i");
    mote.style.setProperty("--i", i);
    ambient.append(mote);
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
    ".section-head,.person,.event-card,.photo,.blessing-copy,.rsvp-form,.bless-content",
  );
  initializeMotion(root, { selector: ".section,.opening,.ambient,.floating" });
  initializeWheelScroll();
  initControls(root);
  initializeEditorialMotion(root);
}
function buildBlessing(d, c, ctx) {
  const s = section("blessing"),
    w = s.firstChild;
  w.append(ornament());
  if (c[d.faithId]) {
    const f = el("div", "faith-mark");
    f.append(
      icon(
        d.faithId === "hindu"
          ? "lamp"
          : d.faithId === "muslim"
            ? "nikah"
            : "christian",
      ),
    );
    f.append(el("p", "faith-line", c[d.faithId]));
    w.append(f);
  }
  w.append(el("p", "blessing-copy", d.message || c.blessing));
  return s;
}
function person(d, c, side, index) {
  const name = index ? d.name2 : d.name1;
  if (!name) return null;
  const p = el("article", "person person-" + side),
    figure = el("div", "portrait");
  const image = picture(d.photoSlots?.[side], "person-photo", name);
  if (image) figure.append(image);
  else {
    const mono = el("span", "monogram", Array.from(name)[0]);
    mono.setAttribute("aria-label", name);
    figure.append(mono);
  }
  const meta = el("div", "person-copy");
  add(
    meta,
    el("p", "label person-index", String(index + 1).padStart(2, "0")),
    el("h3", "", name),
  );
  const family = d.families?.find((f) => f.side === side);
  if (family?.names)
    add(
      meta,
      el(
        "p",
        "label relation",
        family.relation || (index ? c.daughter : c.son),
      ),
      el("p", "parents", family.names),
    );
  p.append(figure, meta);
  return p;
}
function buildCountdown(d, c, ctx) {
  if (!dateValue(d) || isNaN(dateValue(d))) return null;
  const s = section("countdown", c.countdownTitle, c.dateLabel),
    w = s.firstChild;
  const face = el("div", "specimen-clock");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "clock-unit");
    const digit = el("span", "digit", "00");
    add(unit, digit, el("span", "label", c[k]));
    face.append(unit);
    return digit;
  });
  const status = el("p", "count-status");
  mountCountdown(s, d, c, face, digits, status, (digit) =>
    digit.animate(
      [
        { opacity: 0.25, transform: "translateY(4px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      { duration: 220, easing: "ease-out" },
    ),
  );
  add(w, face, status, calendar(d, c, "Epure"));
  return s;
}
function eventContent(e, c, ctx, i) {
  const key = Object.hasOwn(EVENT_NAMES.en, e.key) ? e.key : "wedding";
  const card = el("article", "event-card " + key);
  card.style.setProperty("--n", i);
  const index = el("div", "event-marker");
  add(
    index,
    el("span", "event-index", String(i + 1).padStart(2, "0")),
    icon(key),
  );
  const title = el("div", "event-title");
  add(
    title,
    el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
    el("p", "event-date", dateText(e, ctx)),
  );
  const time = el("p", "event-time", timeText(e, ctx));
  const where = el("div", "event-place");
  add(
    where,
    el("p", "event-venue", e.venue),
    el("p", "event-address", e.address),
  );
  if (e.venue || e.address)
    where.append(link(c.maps, mapSearch(e.venue, e.address), "text-link"));
  card.append(index, title, time, where);
  return card;
}
function buildVideo(d, c, ctx) {
  const id = youtube(d.videoUrl);
  if (!id) return null;
  const s = section("video", c.video, c.videoHint),
    frame = el("div", "video-frame");
  const b = button("", () => loadVideo(frame, id, c.video), "video-poster");
  b.setAttribute("aria-label", c.play);
  const image = picture(
    d.photoSlots?.hero || d.gallery?.[0],
    "video-image",
    c.photo,
  );
  if (image) b.append(image);
  const mark = el("span", "play-mark");
  mark.append(icon("play"));
  add(b, mark, el("span", "video-label", c.videoHint));
  frame.append(b);
  s.firstChild.append(frame);
  return s;
}
function buildVenue(d, c, ctx) {
  if (!d.venue && !d.address) return null;
  const s = section(
      "venue",
      d.eventType === "wedding" ? c.venue : c.otherVenue,
      c.venueLabel,
    ),
    grid = el("div", "venue-grid");
  const map = el("iframe");
  map.src = mapEmbed(d.venue, d.address);
  map.title = c.mapTitle;
  map.loading = "lazy";
  map.referrerPolicy = "no-referrer-when-downgrade";
  const info = el("div", "venue-details");
  add(
    info,
    el("p", "label", c.locationLabel),
    el("h3", "", d.venue),
    el("p", "address", d.address),
    link(c.directions, mapDirections(d.venue, d.address)),
  );
  [d.ph1, d.ph2].filter(Boolean).forEach((ph) => {
    const clean = String(ph).replace(/[^\d+]/g, "");
    if (/^\+?\d{7,15}$/.test(clean)) {
      const a = link(c.call + " · " + ph, "tel:" + clean, "text-link");
      a.removeAttribute("target");
      info.append(a);
    }
  });
  add(grid, map, info);
  s.firstChild.append(grid);
  return s;
}
function buildLiveStream(d, c, ctx) {
  const url = https(d.liveStream?.url);
  if (!url) return null;
  const s = section("live"),
    row = el("div", "live-line"),
    mark = el("span", "live-mark");
  mark.append(icon("play"));
  const text = el("div", "live-copy");
  add(
    text,
    el("p", "label", c.watchHint),
    el("h2", "", c.live),
    el("p", "", c.liveSub),
    el("p", "hint", d.liveStream.note || c.liveNote),
  );
  add(row, mark, text, link(c.watch, url));
  s.firstChild.append(row);
  return s;
}
function buildRsvp(d, c, ctx) {
  if (!d.rsvp?.enabled) return null;
  const s = section("rsvp", c.rsvp, c.rsvpSub);
  const f = createRsvpForm(d, c, { ornament });
  addRsvpBlessingLink(f, d, c);
  s.firstChild.append(f);
  return s;
}
function buildBlessings(d, c, ctx) {
  if (!validGifts(d)) return null;
  const s = section("blessings", c.blessTitle, d.gifts.note || c.blessSub);
  s.firstChild.append(
    createBlessingsContent(d, c, ctx, {
      ornament,
      celebrate(n) {
        n.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 600 });
      },
    }),
  );
  return s;
}
function buildFloating(d, c, ctx) {
  return createFloatingControls(d, c, ctx, { icon });
}
function initializeEditorialMotion(root) {
  const regions = [...root.querySelectorAll(".events,.gallery")],
    visible = new Set();
  let frame = 0;
  const paint = () => {
    frame = 0;
    if (document.hidden) return;
    for (const s of visible) {
      const rect = s.getBoundingClientRect(),
        p = reduced.matches
          ? 1
          : Math.max(
              0,
              Math.min(
                1,
                (innerHeight * 0.8 - rect.top) / (rect.height * 0.85),
              ),
            );
      s.style.setProperty("--progress", p);
      const thread = s.querySelector(".thread-fill");
      if (thread) thread.style.strokeDashoffset = String(1 - p);
      const tip = s.querySelector(".thread-tip");
      if (tip) tip.setAttribute("cy", String(p * 1000));
    }
  };
  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
  };
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) visible.add(e.target);
        else visible.delete(e.target);
      }
      schedule();
    },
    { rootMargin: "100px" },
  );
  regions.forEach((s) => io.observe(s));
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  document.addEventListener("visibilitychange", schedule);
}
function ornament() {
  const n = svg('<path d="M0 8h41m9 0h70M46 3v10m-5-5h10"/>', "0 0 120 16");
  n.classList.add("ornament");
  return n;
}
function buildEnvelope(d, c, ctx) {
  const cover = el("div", "opening opening-print");
  cover.setAttribute("role", "dialog");
  cover.setAttribute("aria-modal", "true");
  cover.setAttribute("aria-label", c.openInvitation);
  const upper = el("div", "paper paper-top"),
    lower = el("div", "paper paper-bottom");
  cover.append(upper, lower);
  const copy = el("div", "opening-copy");
  const top = el("div", "opening-top");
  add(
    top,
    el("p", "label", c.cordiallyInvited),
    el("p", "opening-salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
  );
  const line = el("h2", "opening-statement");
  add(line, el("span", "", c.openingTitle), el("span", "", c.openingSecond));
  const bottom = el("div", "opening-bottom");
  add(
    bottom,
    names(d, "opening-names names"),
    ornament(),
    el("p", "opening-date", dateText(d, ctx)),
  );
  const open = button(c.openInvitation, async () => {
    if (cover.dataset.preparing) return;
    startMusic(ctx.audio);
    await prepareHero(cover);
    cover.classList.add("opening-away");
    if (!reduced.matches) await new Promise((r) => setTimeout(r, 1150));
    cover.remove();
    document.body.classList.remove("locked");
    document.querySelector(".page-content").inert = false;
    document.querySelector(".floating").hidden = false;
    document.getElementById("hero").focus({ preventScroll: true });
  });
  const arrow = icon("next");
  open.append(arrow);
  bottom.append(
    open,
    el("p", "tagline", d.name2 ? c.tagline : c.singleTagline),
  );
  copy.append(top, line, bottom);
  cover.append(copy);
  document.body.classList.add("locked");
  cover.tabIndex = -1;
  setTimeout(() => cover.focus({ preventScroll: true }), 0);
  cover.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      open.focus();
    }
  });
  return cover;
}
function buildHero(d, c, ctx) {
  const s = section("hero"),
    w = s.firstChild;
  s.tabIndex = -1;
  const caption = el("div", "hero-caption");
  add(
    caption,
    el(
      "p",
      "label",
      d.eventType === "wedding" && d.faithId === "hindu"
        ? c.shubh
        : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
    el("span", "label", c.folio),
  );
  const type = el("div", "hero-type");
  add(
    type,
    el("p", "hero-prelude", c.heroTitle),
    names(d, "names hero-names", "h1"),
  );
  const image = picture(d.photoSlots?.hero, "hero-photo", c.photo, true);
  if (image) s.classList.add("has-photo");
  const meta = el("div", "hero-meta");
  const when = el("div");
  add(when, el("p", "label", c.dateLabel), el("p", "", dateText(d, ctx)));
  const where = el("div");
  add(where, el("p", "label", c.locationLabel), el("p", "", d.venue));
  add(meta, when, where);
  const aside = el("p", "hero-annotation", c.heroCaption);
  const scroll = el("a", "scroll-hint", c.quietScroll);
  scroll.href = "#blessing";
  scroll.append(icon("next"));
  add(w, caption, type, image, meta, aside, scroll);
  return s;
}
function buildCouple(d, c, ctx) {
  if (!d.name1 && !d.name2) return null;
  const s = section("couple", c.coupleTitle, c.coupleLabel),
    w = s.firstChild;
  w.querySelector(".section-head").append(el("p", "section-sub", c.coupleSub));
  const row = el("div", "portrait-diptych");
  const a = person(d, c, "groom", 0),
    b = person(d, c, "bride", 1);
  if (!b) row.classList.add("solo");
  add(row, a, b ? el("p", "couple-join", c.amp) : null, b);
  w.append(row);
  return s;
}
function buildEvents(d, c, ctx) {
  if (!d.events?.length) return null;
  const s = section(
    "events",
    d.eventType === "wedding" ? c.events : c.otherEvents,
    c.eventIntro,
  );
  const list = el("div", "event-ledger");
  const line = svg(
    '<path class="thread-base" d="M1 0V1000"/><path class="thread-fill" pathLength="1" d="M1 0V1000"/><circle class="thread-tip" cx="1" cy="0" r="1" fill="currentColor"/>',
    "0 0 2 1000",
  );
  line.classList.add("timeline-thread");
  line.setAttribute("preserveAspectRatio", "none");
  list.append(line);
  d.events.forEach((e, i) => list.append(eventContent(e, c, ctx, i)));
  s.firstChild.append(list);
  return s;
}
function viewerPhotos(photos) {
  return photos.map((src) =>
    matchMedia("(min-width:1024px)").matches &&
    /^assets\/(main|groom|bride)\.webp$/.test(src)
      ? src.replace(".webp", "-desktop.webp")
      : src,
  );
}
function buildGallery(d, c, ctx) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.indexLabel),
    list = el("div", "photographic-index");
  photos.forEach((src, i) => {
    const row = el("div", "index-row");
    const count = el(
      "span",
      "label index-number",
      String(i + 1).padStart(2, "0"),
    );
    const b = button(
      "",
      () => openGallery(i, viewerPhotos(photos), c, { icon }),
      "photo",
    );
    b.setAttribute("aria-label", c.photo + " " + (i + 1));
    b.append(picture(src, "index-photo", c.photo + " " + (i + 1)));
    const caption = el("p", "index-caption", c.photoCaption);
    row.append(count, b, caption);
    list.append(row);
  });
  s.firstChild.append(list);
  return s;
}
function buildFooter(d, c, ctx) {
  const s = section("footer"),
    w = s.firstChild;
  const upper = el("div", "footer-upper");
  add(
    upper,
    el("p", "label", c.closing),
    names(d),
    el("p", "footer-date", dateText(d, ctx)),
  );
  const lower = el("div", "footer-lower");
  add(
    lower,
    el("h2", "", c.thankYou),
    link(c.made, "https://ruvva.com", "brand-link"),
  );
  add(w, upper, ornament(), lower);
  return s;
}

loadSample(renderInvitation, COPY.en);
