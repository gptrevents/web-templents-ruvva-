import { buildWishbook } from "./wishbook.js";
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
    storyLabels: [
      "My First Smile",
      "First Steps",
      "Little Explorer",
      "Always Happy",
    ],
    party: "Birthday Celebration",
    partyJourney: "Let’s Celebrate!",
    openingNote: "A garden party, a little cake, and a whole lot of joy.",
    cloudNote: "From little smiles to a world of dreams.",
    nightNote:
      "Your love, wishes and presence make this birthday truly special. We can’t wait to celebrate, play and create more happy memories with you!",
    invitedTo: "You’re invited to",
    birthdayWord: "Birthday",
    possessive: "’s",
    yearsHappy: "Years of Happiness",
    ourStar: "Our Little Star",
    yourSpecial: "Be a Part of",
    specialDay: "Special Day",
    partyWelcome: "Welcome",
    nearby: "Nearby Landmarks",
    wishTitle: "Share Your Wishes",
    demoWishes: "Sample wishes",
    leaveWish: "Write a wish",
    wishName: "Your Name",
    wishMessage: "Your Birthday Wish",
    wishSend: "Save Your Wish",
    wishSending: "Saving…",
    wishRequired: "Please add your name and a birthday wish.",
    wishLocal: "Your wish is saved on this device.",
    wishReceived: "Your wish has been received. Thank you!",
    wishFailure: "Your wish could not be saved. Please try again.",
    wishCounter: "characters",
    wishCard: "Your wishes make this day even more special!",
    signWords: ["FUN", "GAMES", "MUSIC", "FOOD", "GIFTS", "SURPRISES"],
    milestone: "View memory",
    closingSub: "For being a part of",
    specialBirthday: "special day!",
    birthdayWishIntro: "With love, laughter and a little magic.",
    nextEvent: "Next events",
    previousEvent: "Previous events",
    eventTrack: "Browse the celebration itinerary",
    photoIndex: "Frame",
    together: "together",
    dateLabel: "Save the date",
    locationLabel: "Our celebration awaits",
    eventDetails: "View event details",
    chapterLabel: "The occasion",
    gallerySub: "Moments worth keeping",
    viewPortrait: "Portrait",
    closingThanks: "We look forward to celebrating with you.",
    quietScroll: "Discover her little world",
    allMoments: "Little moments to treasure",
    watchHint: "Join us from wherever you are.",
    mapTitle: "Venue location",
    errorGeneric: "The invitation could not be loaded.",
    heroTitle: "Our Little Star",
    openingTitle: "A day of wonder,",
    openingSecond: "made for you.",
    issue: "A day full of love, magic & smiles",
    heroCaption: "Small shoes. Very big adventures.",
    photoCaption: "A little moment of magic.",
    indexLabel: "Our keepsake collection",
    coupleSub: "Every little moment is a big adventure.",
    folio: "A birthday adventure",
    venueLabel: "Join us for a magical celebration",

    loadFailure:
      "The invitation could not be loaded. Please refresh to try again.",
    closing: "For being a part of this special day",
    thankYou: "Thank You",
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "A day full of love, magic and smiles.",
    singleTagline: "A little love. A little magic. A very special day.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Our Little Star",
    coupleLabel: "Our Little Star",
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
    eventIntro: "Event Schedule",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "Little memories, held close",
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
    rsvp: "Kindly Respond",
    rsvpSub: "We would be so happy if you can join us.",
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
    message: "Your Wishes",
    otherMessage: "Your Wishes",
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
  clock: '<circle cx="32" cy="32" r="23"/><path d="M32 17v16l12 7"/>',
  pin: '<path d="M32 58S10 38 10 23a22 22 0 0 1 44 0c0 15-22 35-22 35Z"/><circle cx="32" cy="24" r="7"/>',
  welcome:
    '<path d="M9 54 25 13l27 28ZM23 27l17 12M27 15l9 6M36 8l4-5m8 20 8-3M15 7l3 6"/>',
  games:
    '<path d="M14 23h36l8 24q-2 9-10 2l-7-7H23l-7 7q-8 7-10-2ZM19 28v12m-6-6h12m17-4h1m5 8h1"/>',
  dinner: '<path d="M8 41h48M12 40a20 20 0 0 1 40 0M29 17v-5h6v5M13 48h38"/>',
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
  if (/^assets\/(cover|moon)\.webp$/.test(clean)) {
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
  const size =
    clean.includes("cover") || clean.includes("moon")
      ? [720, 1080]
      : clean.includes("portrait")
        ? [448, 524]
        : clean.includes("venue")
          ? [900, 600]
          : [400, 400];
  image.width = size[0];
  image.height = size[1];
  p.append(image);
  return p;
}

function section(id, title, eyebrow) {
  const s = el("section", "section " + id);
  s.id = id;
  const w = el("div", "wrap");
  s.append(w, fallingMotifs(id));
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
  ctx.embeddedBirthday = d.eventType === "birthday" && !d.name2;
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
    ".section-head,.person,.event-card,.photo,.memory-polaroid,.blessing-copy,.rsvp-form,.bless-content",
  );
  mountFloralMargins(root);
  initializeMotion(root, {
    selector: ".section,.opening,.ambient,.floating,.floral-edges",
  });
  initializeWheelScroll();
  initControls(root);
  initializeFairytaleMotion(root);
  new ResizeObserver((entries) =>
    entries.forEach((e) =>
      e.target.style.setProperty("--fall-h", e.target.offsetHeight + 60 + "px"),
    ),
  ).observe(root.querySelector("#hero"));
  root
    .querySelectorAll(".section")
    .forEach((n) =>
      n.style.setProperty("--fall-h", n.offsetHeight + 60 + "px"),
    );
  addEventListener(
    "resize",
    () =>
      root
        .querySelectorAll(".section")
        .forEach((n) =>
          n.style.setProperty("--fall-h", n.offsetHeight + 60 + "px"),
        ),
    { passive: true },
  );
}
function buildBlessing(d, c, ctx) {
  if (ctx.embeddedBirthday && !ctx.inline) return null;
  const s = section("blessing"),
    w = s.firstChild;
  if (ctx.inline) s.classList.add("in-hero");
  w.append(crown());
  if (c[d.faithId]) {
    const mark = el("div", "faith-mark");
    add(
      mark,
      icon(
        d.faithId === "hindu"
          ? "lamp"
          : d.faithId === "muslim"
            ? "nikah"
            : "christian",
      ),
      el("p", "faith-line", c[d.faithId]),
    );
    w.append(mark);
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
  const s = section("countdown", c.countdownTitle, c.save),
    w = s.firstChild;
  const face = el("div", "ribbon-clock");
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
        { opacity: 0.3, transform: "translateY(5px)" },
        { opacity: 1, transform: "none" },
      ],
      { duration: 250, easing: "ease-out" },
    ),
  );
  add(w, face, status, calendar(d, c, "Fairytale Bloom"));
  s.append(
    picture("assets/gifts.webp", "countdown-gifts", ""),
    picture("assets/cake.webp", "countdown-cake", ""),
  );
  return s;
}

function eventContent(e, c, ctx, i) {
  const key = Object.hasOwn(paths, e.key) ? e.key : "birthday";
  const card = el("article", "event-card " + key);
  const marker = el("div", "event-marker");
  add(
    marker,
    el("span", "event-index", String(i + 1).padStart(2, "0")),
    icon(key),
  );
  const title = el("div", "event-title");
  add(
    title,
    el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
  );
  add(card, marker, title, el("p", "event-time", timeText(e, ctx)));
  if (e.description) card.append(el("p", "event-description", e.description));
  if (e.date || e.venue || e.address) {
    const place = el("details", "event-place");
    add(
      place,
      add(
        el("summary", "event-details-trigger button"),
        icon("pin"),
        el("span", "sr-only", c.eventDetails),
      ),
      el("p", "event-date", dateText(e, ctx)),
      el("p", "event-venue", e.venue),
      el("p", "event-address", e.address),
      e.venue || e.address ? link(c.maps, mapSearch(e.venue, e.address), "text-link") : null,
    );
    card.append(place);
  }
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
    w = s.firstChild;
  const stage = el("div", "venue-stage");
  const photo = picture(d.photoSlots?.venue, "venue-photo", d.venue);
  if (photo) stage.append(photo);
  const info = el("div", "venue-details");
  add(
    info,
    icon("housewarming"),
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
  stage.append(info);
  const map = el("iframe");
  map.src = mapEmbed(d.venue, d.address);
  map.title = c.mapTitle;
  map.loading = "lazy";
  map.referrerPolicy = "no-referrer-when-downgrade";
  const grid = el("div", "venue-grid");
  add(grid, stage, map);
  w.append(grid);
  if (d.landmarks?.length) {
    const landmarks = el("div", "landmarks");
    landmarks.append(el("h3", "", c.nearby));
    const row = el("div", "landmark-row");
    d.landmarks.slice(0, 3).forEach((place) => {
      const item = el("div");
      add(
        item,
        icon("pin"),
        el("p", "", place.label),
        el("small", "", place.detail),
      );
      row.append(item);
    });
    landmarks.append(row);
    w.append(landmarks);
  }
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
  const s = section("rsvp", c.yourSpecial, c.rsvpSub),
    w = s.firstChild;
  const title = el(
    "p",
    "rsvp-name-title",
    d.name1 ? d.name1 + c.possessive + " " + c.specialDay : c.specialDay,
  );
  w.querySelector(".section-head").append(title);
  const f = createRsvpForm(d, c, { ornament });
  addRsvpBlessingLink(f, d, c);
  w.append(f);
  if (!d.name2 && !d.rsvp.askEvents && !d.rsvp.askDiet) {
    f.classList.add("reference-compact");
    const hint = f.querySelector("#phone-hint");
    if (hint) f.querySelector(".form-columns").append(hint);
  }
  const aside = el("aside", "rsvp-aside");
  const wishes = buildWishbook(d, c);
  if (wishes) aside.append(wishes);
  const note = el("div", "wish-note", c.wishCard);
  note.append(ornament());
  aside.append(note);
  w.append(aside);
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
function initializeFairytaleMotion(root) {
  const regions = [...root.querySelectorAll(".events,.gallery")],
    visible = new Set();
  let frame = 0;
  const paint = () => {
    frame = 0;
    if (document.hidden) return;
    const edges = root.querySelector(".floral-edges");
    if (edges) {
      const clear = [
        root.querySelector("#hero"),
        root.querySelector("#footer"),
      ].some((n) => {
        const r = n.getBoundingClientRect();
        return r.top < innerHeight && r.bottom > 0;
      });
      edges.classList.toggle("is-clear", clear);
      edges.style.setProperty(
        "--floral-drift",
        reduced.matches
          ? "0px"
          : Math.min(innerWidth < 600 ? 18 : 40, scrollY * 0.004) + "px",
      );
    }
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
      s.querySelectorAll(".thread-fill").forEach(
        (thread) => (thread.style.strokeDashoffset = String(1 - p)),
      );
      s.querySelectorAll(".thread-tip").forEach((tip) =>
        tip.setAttribute(
          "cy",
          String(p * 1000),
        ),
      );
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
function fallingMotifs(id) {
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  const seed = Array.from(id).reduce((n, c) => n + c.charCodeAt(0), 0);
  for (let i = 0; i < 4; i++) {
    const m = el("i");
    m.style.setProperty("--x", ((i * 37 + seed) % 100) + "%");
    m.style.setProperty("--drift", ((i * 29 + seed) % 130) - 65 + "px");
    m.style.setProperty("--duration", 13 + ((i * 7 + seed) % 12) + "s");
    m.style.setProperty("--delay", -i * 3.71 - (seed % 11) + "s");
    m.append(
      svg(
        '<path d="M10 5C1-3-3 10 10 18 23 10 19-3 10 5Z" fill="currentColor" stroke="none"/>',
        "0 0 20 20",
      ),
    );
    ambient.append(m);
  }
  return ambient;
}
function mountFloralMargins(root) {
  const layer = el("div", "floral-edges");
  layer.setAttribute("aria-hidden", "true");
  layer.inert = true;
  for (const side of ["left", "right"]) {
    const rail = el("div", "floral-rail floral-" + side);
    rail.append(picture("assets/bouquet.webp", "edge-bouquet", ""));
    layer.append(rail);
  }
  root.prepend(layer);
}

function ornament() {
  const n = svg(
    '<path d="M3 18q22-6 41 0m92 0q19-6 41 0M90 12c-18-17-22 9 0 17 22-8 18-34 0-17Z"/><path d="M48 18q12-14 24 0-12 14-24 0Zm60 0q12-14 24 0-12 14-24 0Z"/>',
    "0 0 180 36",
  );
  n.classList.add("ornament");
  return n;
}
function crown() {
  const n = svg(
    '<path d="m9 20 8 8 15-18 15 18 8-8-6 29H15Z" fill="#f1bf64" stroke="#a66d22"/><path d="M15 42h34" stroke="#fff1bf"/><circle cx="9" cy="17" r="3" fill="#d99b3b"/><circle cx="32" cy="7" r="3" fill="#d99b3b"/><circle cx="55" cy="17" r="3" fill="#d99b3b"/><path d="m32 27 4 5-4 5-4-5Z" fill="#dc6482"/>',
    "0 0 64 56",
  );
  n.classList.add("crown");
  return n;
}
function butterfly() {
  const n = svg(
    '<g class="wing wing-left"><path d="M31 31C3 0 1 20 9 31 0 41 18 56 31 34Z" fill="#f5a5b3"/><path d="M28 30C11 10 10 21 15 28m-1 7q5 8 13 0"/></g><g class="wing wing-right"><path d="M33 31C61 0 63 20 55 31 64 41 46 56 33 34Z" fill="#f8d694"/><path d="M36 30C53 10 54 21 49 28m1 7q-5 8-13 0"/></g><path d="M32 27v17m0-16-4-8m4 8 4-8" stroke="#99603d"/>',
    "0 0 64 64",
  );
  n.classList.add("butterfly");
  return n;
}
function birthdayAge(d) {
  if (
    Number.isInteger(d.birthdayAge) &&
    d.birthdayAge > 0 &&
    d.birthdayAge < 126
  ) {
    const n = d.birthdayAge;
    const suffix =
      n % 100 >= 11 && n % 100 <= 13
        ? "th"
        : { 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th";
    return ["", String(n), suffix];
  }
  const e = d.events?.find((e) => e.key === d.mainEventKey);
  return /^([0-9]+)(st|nd|rd|th)\s+Birthday$/i.exec(e?.label || "");
}
function ageInscription(d, c) {
  const n = el("div", "age-inscription");
  const age = birthdayAge(d);
  if (age) {
    const a = el("span", "birthday-age", age[1]);
    a.append(el("sup", "", age[2]));
    add(n, a, el("span", "english-flourish birthday-word", c.birthdayWord));
  } else
    n.append(
      el("span", "occasion-word", EVENT_NAMES.en[d.eventType] || c.ceremony),
    );
  return n;
}
function metaStrip(d, c, ctx) {
  const strip = el("div", "invitation-meta");
  for (const [k, text] of [
    ["birthday", dateText(d, ctx)],
    ["clock", timeText(d, ctx)],
    ["pin", d.venue],
  ]) {
    if (!text) continue;
    const item = el("div");
    add(item, icon(k), el("p", "", text));
    strip.append(item);
  }
  strip.style.setProperty("--meta-count", Math.max(1, strip.children.length));
  if (!strip.children.length) strip.hidden = true;
  return strip;
}

function buildEnvelope(d, c, ctx) {
  const cover = el("div", "opening");
  cover.setAttribute("role", "dialog");
  cover.setAttribute("aria-modal", "true");
  cover.setAttribute("aria-label", c.openInvitation);
  const stage = el("div", "opening-stage");
  stage.append(picture("assets/cover.webp", "cover-scene", "", true));
  const copy = el("div", "opening-copy");
  add(
    copy,
    crown(),
    el("p", "invited-line", c.invitedTo),
    el("p", "opening-salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
    names(d, "names opening-names", "h2"),
    ageInscription(d, c),
    el("p", "cover-tagline", c.tagline),
  );
  if (d.eventType === "birthday" && !d.name2)
    copy
      .querySelector(".name-one")
      .append(document.createTextNode(c.possessive));
  stage.append(copy, butterfly());
  const lower = el("div", "opening-lower");
  lower.append(metaStrip(d, c, ctx));
  const open = button(c.openInvitation, async () => {
    if (cover.dataset.preparing) return;
    startMusic(ctx.audio);
    await prepareHero(cover);
    cover.classList.add("opening-away");
    if (!reduced.matches) await new Promise((r) => setTimeout(r, 1100));
    cover.remove();
    document.body.classList.remove("locked");
    document.querySelector(".page-content").inert = false;
    const floating = document.querySelector(".floating");
    if (floating) floating.hidden = false;
    document.getElementById("hero").focus({ preventScroll: true });
    dispatchEvent(new Event("scroll"));
    dispatchEvent(new Event("resize"));
  });
  open.append(icon("chevron"));
  add(lower, open, el("p", "tagline", c.singleTagline));
  const veilA = el("div", "petal-veil veil-left"),
    veilB = el("div", "petal-veil veil-right");
  cover.append(stage, lower, veilA, veilB);
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
  const head = el("header", "star-heading");
  add(
    head,
    crown(),
    el(
      "p",
      "hero-prelude",
      d.eventType === "birthday"
        ? c.ourStar
        : d.eventType === "wedding" && d.faithId === "hindu"
          ? c.shubh
          : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
    names(d, "names hero-names", "h1"),
  );
  const age = birthdayAge(d);
  head.append(
    el(
      "p",
      "hero-age",
      age
        ? age[1] + " " + c.yearsHappy
        : EVENT_NAMES.en[d.eventType] || c.ceremony,
    ),
  );
  w.append(head);
  const constellation = el("div", "memory-constellation");
  const child = person(d, c, "groom", 0);
  if (child) constellation.append(child);
  const memories = (d.photoSlots?.story || [])
    .map(local)
    .filter(Boolean)
    .slice(0, 4);
  memories.forEach((src, i) => {
    const info = d.milestones?.[i] || {};
    const m = button(
      "",
      () => openGallery(i, memories, c, { icon }),
      "memory-polaroid memory-" + i,
    );
    m.setAttribute(
      "aria-label",
      c.milestone + " " + (info.label || c.storyLabels[i]),
    );
    const caption = el(
      "span",
      "memory-caption",
      info.label || c.storyLabels[i],
    );
    if (info.year) caption.append(el("small", "", String(info.year)));
    add(
      m,
      picture(src, "memory-image", info.label || c.storyLabels[i]),
      caption,
    );
    constellation.append(m);
  });
  w.append(constellation);
  if (ctx.embeddedBirthday) {
    const blessing = buildBlessing(d, c, { ...ctx, inline: true });
    if (blessing) w.append(blessing);
  } else {
    w.append(
      ornament(),
      el("p", "hero-date", dateText(d, ctx)),
      el("p", "hero-venue", d.venue),
    );
  }
  const scroll = el("a", "scroll-hint", c.quietScroll);
  scroll.href = ctx.embeddedBirthday
    ? dateValue(d) && !isNaN(dateValue(d))
      ? "#countdown"
      : "#footer"
    : "#blessing";
  scroll.append(icon("chevron"));
  w.append(scroll);
  s.append(butterfly());
  return s;
}

function buildCouple(d, c, ctx) {
  if (ctx.embeddedBirthday || (!d.name1 && !d.name2)) return null;
  const s = section("couple", c.coupleTitle, c.coupleLabel),
    row = el("div", "paired-portraits"),
    a = person(d, c, "groom", 0),
    b = person(d, c, "bride", 1);
  if (!b) row.classList.add("solo");
  add(row, a, b ? el("p", "couple-join", c.amp) : null, b);
  s.firstChild.append(row);
  return s;
}

function buildEvents(d, c, ctx) {
  if (!d.events?.length) return null;
  const s = section("events", c.partyJourney, c.eventIntro),
    w = s.firstChild;
  const scene = el("aside", "party-signpost");
  scene.setAttribute("aria-hidden", "true");
  scene.append(picture("assets/signpost.webp", "signpost-image", ""));
  const words = el("div", "signpost-words");
  c.signWords.forEach((word) => words.append(el("span", "", word)));
  scene.append(words);
  s.append(scene);
  const list = el("div", "celebration-program");
  const line = svg(
    '<path class="thread-base" d="M5 0V1000"/><path class="thread-fill" pathLength="1" d="M5 0V1000"/><circle class="thread-tip" cx="5" cy="0" r="2.5" fill="currentColor"/>',
    "0 0 10 1000",
  );
  line.classList.add("timeline-thread");
  line.setAttribute("preserveAspectRatio", "none");
  list.append(line);
  const wide = svg(
    '<path class="thread-base" d="M5 0V1000"/><path class="thread-fill" pathLength="1" d="M5 0V1000"/><circle class="thread-tip" cx="5" cy="0" r="2.5" fill="currentColor"/>',
    "0 0 10 1000",
  );
  wide.classList.add("timeline-desktop");
  wide.setAttribute("preserveAspectRatio", "none");
  list.append(wide);
  const second = wide.cloneNode(true);
  second.classList.add("timeline-secondary");
  list.append(second);
  list.dataset.count = String(d.events.length);
  d.events.forEach((e, i) => {
    const card = eventContent(e, c, ctx, i);
    const artwork = {
      welcome: "welcome",
      birthday: "cake",
      games: "gifts",
      dinner: "dinner",
    }[e.key];
    if (artwork)
      card
        .querySelector(".event-marker")
        .append(picture("assets/" + artwork + ".webp", "event-painting", ""));
    list.append(card);
  });
  w.append(list);
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
  const s = section("gallery", c.gallery, c.galleryIntro),
    list = el("div", "keepsake-sheet");
  list.dataset.count = photos.length;
  photos.forEach((src, i) => {
    const card = el("figure", "keepsake");
    const b = button("", () => openGallery(i, photos, c, { icon }), "photo");
    b.setAttribute("aria-label", c.photo + " " + (i + 1));
    b.append(picture(src, "gallery-photo", c.photo + " " + (i + 1)));
    add(card, b, el("figcaption", "", c.photoCaption));
    list.append(card);
  });
  s.firstChild.append(list);
  return s;
}

function buildFooter(d, c, ctx) {
  const s = section("footer"),
    w = s.firstChild;
  s.prepend(
    picture(d.photoSlots?.closing || "assets/moon.webp", "moon-scene", ""),
  );
  const head = el("header", "closing-head");
  const closingNames = names(d);
  if (d.eventType === "birthday" && !d.name2)
    closingNames
      .querySelector(".name-one")
      .append(document.createTextNode(c.possessive));
  add(
    head,
    el("h2", "english-flourish", c.thankYou),
    el("p", "", c.closingSub),
    closingNames,
    el("p", "", c.specialBirthday),
  );
  const note = el("div", "closing-note");
  add(note, el("p", "", c.nightNote), ornament());
  add(w, head, note);
  const credits = el("div", "closing-credits");
  add(
    credits,
    el("p", "footer-date", dateText(d, ctx)),
    link(c.made, "https://ruvva.com", "brand-link"),
  );
  s.append(butterfly(), credits);
  return s;
}

loadSample(renderInvitation, COPY.en);
