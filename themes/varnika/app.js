const p = new URLSearchParams(location.search);
const SAMPLE = {
  empty: "sample-empty.json",
  birthday: "sample-birthday.json",
  telugu: "sample-telugu.json",
};
fetch("./" + (SAMPLE[p.get("data")] || "sample-data.json"))
  .then((r) => r.json())
  .then((data) => {
    renderInvitation(document.getElementById("app"), data, {
      guest: p.get("g") || "",
      lang: p.get("lang") || data.invLang || "en",
    });
  });
const COPY = {
  en: {
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "A celebration, painted with love.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Two lives, beautifully entwined.",
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
    eventIntro: "The chapters of our celebration",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "A book of beautiful beginnings",
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
    eyebrow: "A celebration to treasure",
    moment: "A beautiful beginning awaits",
    videoHint: "A little glimpse of our story",
    amp: "&",
    nextEvent: "Next celebration",
    previousEvent: "Previous celebration",
    swipe: "Explore the celebrations",
    paperNote: "Side by side, always",
    chapter: "A day to remember",
    closing: "A memory in the making",
    day: "Day",
    folio: "Celebration",
    unfold: "Explore each celebration",
    album: "The wedding album",
    albumEnd: "A moment to keep.",
    spread: "Album spread",
    albumPrevious: "Previous album pages",
    albumNext: "Next album pages",
    albumHint: "Turn the pages, revisit the moments",
    hostNote: "With love, from our families",
    scene: "An original miniature garden",
    anyDay: "The celebration",
    openingNote: "An invitation to our forever.",
    story: "A shore to call our own",
    storyIntro: "Small moments, endless memories",
    storyCaptions: ["Side by side", "A little adventure", "Our next chapter"],
    galleryPrevious: "Previous pictures",
    galleryNext: "Next pictures",
    galleryHint: "Swipe through our story",
    thankYou: "Thank you",
    closingNote: "Your presence makes our story complete.",
    trailEnd: "Different paths. One beautiful destination.",
  },
};
const EVENT_NAMES = {
  en: {
    haldi: "Haldi",
    mehendi: "Mehendi",
    sangeet: "Sangeet",
    engagement: "Engagement",
    wedding: "Wedding",
    reception: "Reception",
    puja: "Puja",
    housewarming: "Housewarming",
    birthday: "Birthday",
    nikah: "Nikah",
  },
};
const LOCALE = {
  en: "en-IN",
  te: "te-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  ml: "ml-IN",
  kn: "kn-IN",
};
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};
const add = (parent, ...children) => {
  children.filter(Boolean).forEach((n) => parent.append(n));
  return parent;
};
const button = (text, fn, cls = "button") => {
  const b = el("button", cls, text);
  b.type = "button";
  if (fn) b.addEventListener("click", fn);
  return b;
};
const link = (text, url, cls = "button") => {
  const a = el("a", cls, text);
  a.setAttribute("href", url);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
};
function https(v) {
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.href : "";
  } catch {
    return "";
  }
}
function local(v) {
  return typeof v === "string" &&
    /^assets\/[a-zA-Z0-9_./-]+$/.test(v) &&
    !v.includes("..")
    ? v
    : "";
}
function svg(path, view = "0 0 48 48") {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("viewBox", view);
  s.setAttribute("fill", "none");
  s.setAttribute("stroke", "currentColor");
  s.setAttribute("stroke-width", "1.15");
  s.setAttribute("stroke-linecap", "round");
  s.setAttribute("stroke-linejoin", "round");
  s.setAttribute("focusable", "false");
  s.setAttribute("aria-hidden", "true");
  s.innerHTML = path;
  return s;
}
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
const icon = (k) => {
  const n = svg(paths[k] || paths.wedding, "0 0 32 32");
  n.classList.add("icon", "icon-" + k);
  return n;
};
// Original botanical margin, painted parakeet and folio ornament.
function ornament() {
  const n = svg(
    '<path d="M1 24h38c15 0 13-12 23-12s8 12 18 12 8-12 18-12 8 12 23 12h38M54 24l26-20 26 20-26 20Z"/><path d="M65 24q15-29 30 0-15 20-30 0Zm15-17v33M12 19l5 5-5 5m136-10-5 5 5 5"/><circle cx="80" cy="24" r="3" fill="currentColor"/>',
    "0 0 160 48",
  );
  n.classList.add("folio-divider");
  return n;
}
function botanical() {
  const n = svg(
    '<path class="stem" d="M17 319C69 239 10 180 63 112S117 56 104 3"/><g class="leaves"><path d="M37 275C4 279-2 248 6 239c26 3 40 16 31 36ZM42 254c8-34 45-42 54-27-6 21-30 35-54 27ZM43 217c-29-1-46-31-34-43 30 3 43 22 34 43ZM44 192c1-30 26-45 41-37-1 23-19 36-41 37ZM51 144c-23 1-46-15-40-31 26-6 43 9 40 31ZM66 115c-1-32 20-47 34-37-1 20-12 31-34 37ZM86 80C58 76 48 58 55 43c22 0 37 16 31 37ZM104 44c8-24 31-27 39-16-5 18-20 21-39 16Z"/></g><path class="veins" d="m37 275-22-25m27 4 42-22m-41-15-25-33m26 8 30-28m-23-20-30-23m45-6 24-27M86 80 63 52m41-8 29-13"/><g class="flowers"><g transform="translate(33 267)"><path d="M0 0C-30-7-19-27-5-13c-9-26 15-28 13-9 14-21 28-2 11 8 27-3 22 20 4 17 11 18-12 27-18 7-15 17-31 0-16-10Z"/><circle r="5"/></g><g transform="translate(56 157) scale(.65)"><path d="M0 0C-30-7-19-27-5-13c-9-26 15-28 13-9 14-21 28-2 11 8 27-3 22 20 4 17 11 18-12 27-18 7-15 17-31 0-16-10Z"/><circle r="5"/></g><g transform="translate(102 54) scale(.5)"><path d="M0 0C-30-7-19-27-5-13c-9-26 15-28 13-9 14-21 28-2 11 8 27-3 22 20 4 17 11 18-12 27-18 7-15 17-31 0-16-10Z"/><circle r="5"/></g></g>',
    "0 0 160 330",
  );
  n.classList.add("botanical");
  return n;
}
let birdId = 0;
function bird() {
  const n = svg(
    '<path class="bird-tail" d="M58 49c-4 38-16 58-22 68 25-10 38-38 35-66Z"/><path class="bird-body" d="M72 44c17-17 9-40-6-39-10 1-13 7-14 15-1 11-16 22-30 24 8 24 37 23 50 0Z"/><path class="bird-wing" d="M28 44c9-5 22-13 32-12 7 17-7 30-32 12Z"/><path class="feather" d="m32 45 26-7M39 49l19-6m-11 8 10-3m-2 13-12 38m19-41-12 35"/><path class="bird-beak" d="m79 15 14 8-13 3Z"/><circle cx="71" cy="15" r="2" fill="#142e26" stroke="none"/><circle cx="71" cy="14.5" r=".5" fill="#fff" stroke="none"/><path class="bird-collar" d="m56 25 22 8M54 60l-2 7m8-5-1 6m-10 0h9m-1 0h8"/>',
    "0 0 100 122",
  );
  const id = "varnika-bird-" + ++birdId;
  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML =
    '<linearGradient id="' +
    id +
    '" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#91a771"/><stop offset=".4" stop-color="#467c58"/><stop offset="1" stop-color="#244c40"/></linearGradient>';
  n.prepend(defs);
  n.querySelector(".bird-body").style.fill = "url(#" + id + ")";
  const feathers = svg(
    '<path d="M33 43q13 6 24-8M36 46q13 6 22-7m-18 10q10 3 16-6M46 51l9-6M56 54 45 90m16-36L49 92M64 53 53 86M61 9q5-3 10-1m-16 10q5 4 10 1M53 28q6 6 15 8M27 47q11 9 23 10" stroke="#b9c89a" stroke-width=".7"/><path d="M75 17q7-1 9 4l-5 2" stroke="#663d29" stroke-width="1.1"/>',
    "0 0 100 122",
  );
  [...feathers.children].forEach((x) => n.append(x));
  n.classList.add("painted-bird");
  return n;
}
function decorateFolio(node, rich = false) {
  const art = el("div", "folio-art");
  art.setAttribute("aria-hidden", "true");
  if (rich) {
    const a = botanical(),
      b = botanical();
    a.classList.add("vine-left");
    b.classList.add("vine-right");
    add(art, a, b);
    const p = bird();
    p.classList.add("perched-bird");
    art.append(p);
  } else {
    const a = botanical();
    a.classList.add("margin-vine");
    art.append(a);
  }
  if (rich) {
    const ripples = svg(
      '<ellipse cx="90" cy="30" rx="70" ry="17"/><ellipse cx="90" cy="30" rx="48" ry="11"/><ellipse cx="90" cy="30" rx="26" ry="6"/>',
      "0 0 180 60",
    );
    ripples.classList.add("lotus-ripples");
    art.append(ripples);
  }
  node.append(art);
}
function spindle() {
  const n = el("div", "spindle");
  n.setAttribute("aria-hidden", "true");
  add(n, el("i"), el("span"), el("i"));
  return n;
}

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
const dateValue = (d) =>
  d.date ? new Date(d.date + "T" + (d.time || "00:00") + ":00+05:30") : null;
function dateText(d, ctx) {
  const v = dateValue(d);
  return v && !isNaN(v)
    ? v.toLocaleDateString(LOCALE[ctx.lang] || "en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "";
}
function timeText(d, ctx) {
  return d.time && dateValue(d)
    ? dateValue(d).toLocaleTimeString(LOCALE[ctx.lang] || "en-IN", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      })
    : "";
}
function section(id, title, eyebrow) {
  const s = el("section", id + " section");
  s.id = id;
  const w = el("div", "wrap");
  if (eyebrow) add(w, el("p", "label section-kicker", eyebrow));
  if (title) add(w, el("h2", "", title));
  s.append(w);
  if (!["hero", "footer"].includes(id)) {
    const line = ornament();
    line.classList.add("section-divider");
    s.append(line);
  }
  decorateFolio(s, id === "hero");
  return s;
}
function renderInvitation(root, data, ctx) {
  ctx.lang = LOCALE[ctx.lang] ? ctx.lang : "en";
  document.documentElement.lang = ctx.lang;
  document.body.setAttribute("data-faith", data.faithId || "none");
  document.title = [data.name1, data.name2].filter(Boolean).join(" & ");
  ctx.audio = local(data.musicUrl) ? new Audio(local(data.musicUrl)) : null;
  if (ctx.audio) {
    ctx.audio.preload = "none";
    ctx.audio.loop = true;
    ctx.audio.volume = 0;
  }
  ctx.copy = COPY.en;
  const c = COPY.en;
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const a = el("i", "pigment-fleck");
    a.style.setProperty("--i", i);
    ambient.append(a);
  }
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
  root.querySelectorAll(".section .wrap,.person,.event-card").forEach((n) => {
    n.classList.add("reveal");
    observer.observe(n);
  });
  initializeMotion(root);
  initializeWheelScroll();
  initializeScrollChoreography(root);
}
function buildEnvelope(d, c, ctx) {
  const cover = el("div", "opening");
  cover.setAttribute("role", "dialog");
  cover.setAttribute("aria-modal", "true");
  cover.setAttribute("aria-label", c.openInvitation);
  const paper = el("div", "manuscript");
  decorateFolio(paper, true);
  const content = el("div", "opening-content");
  add(
    content,
    el("p", "label invitation-label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
    ornament(),
    names(d),
    el("p", "opening-date", dateText(d, ctx)),
  );
  const b = button(c.openInvitation, () => {
    if (cover.classList.contains("opening-away")) return;
    document.querySelector(".page-content").hidden = false;
    cover.classList.add("opening-away");
    document.body.classList.add("opened");
    if (ctx.audio)
      ctx.audio
        .play()
        .then(() => {
          let v = 0;
          const t = setInterval(() => {
            v = Math.min(0.25, v + 0.025);
            ctx.audio.volume = v;
            if (v >= 0.25) clearInterval(t);
          }, 160);
        })
        .catch(() => {});
    setTimeout(
      () => {
        cover.remove();
        document.body.classList.remove("locked");
        document.querySelector(".page-content").inert = false;
        document.querySelector(".floating").hidden = false;
        document.getElementById("hero").focus();
      },
      reduced.matches ? 0 : 1800,
    );
  });
  add(content, b, el("p", "tagline", d.name2 ? c.tagline : c.singleTagline));
  add(paper, content);
  add(cover, paper, spindle());
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
    s.append(img);
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
  const v = dateValue(d),
    end = new Date(v.getTime() + 7200000);
  const stamp = (x) =>
    x
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "");
  const title = [d.name1, d.name2].filter(Boolean).join(" & ");
  const where = [d.venue, d.address].filter(Boolean).join(", ");
  const box = el("div", "calendar");
  add(box, el("p", "label", c.save));
  const actions = el("div", "actions");
  const u = new URL("https://calendar.google.com/calendar/render");
  u.search = new URLSearchParams({
    action: "TEMPLATE",
    text: title,
    dates: stamp(v) + "/" + stamp(end),
    location: where,
    details: c.calendarDescription,
  });
  add(
    actions,
    link(c.google, u.href),
    button(c.apple, () => {
      const esc = (s) =>
        String(s)
          .replace(/\\/g, "\\\\")
          .replace(/\r?\n/g, "\\n")
          .replace(/,/g, "\\,")
          .replace(/;/g, "\\;");
      const lines = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Ruvva//Varnika//EN",
        "BEGIN:VEVENT",
        "UID:" + stamp(v) + "@ruvva.com",
        "DTSTAMP:" + stamp(new Date()),
        "DTSTART:" + stamp(v),
        "DTEND:" + stamp(end),
        "SUMMARY:" + esc(title),
        "LOCATION:" + esc(where),
        "DESCRIPTION:" + esc(c.calendarDescription),
        "END:VEVENT",
        "END:VCALENDAR",
      ];
      const fold = (line) => {
        let result = "",
          count = 0;
        for (const char of line) {
          const size = new TextEncoder().encode(char).length;
          if (count + size > 73) {
            result += "\r\n ";
            count = 1;
          }
          result += char;
          count += size;
        }
        return result;
      };
      const url = URL.createObjectURL(
        new Blob([lines.map(fold).join("\r\n") + "\r\n"], {
          type: "text/calendar;charset=utf-8",
        }),
      );
      const a = el("a");
      a.href = url;
      a.download = "invitation.ics";
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }),
  );
  box.append(actions);
  return box;
}
function buildCountdown(d, c, ctx) {
  const target = dateValue(d);
  if (!target || isNaN(target)) return null;
  const s = section("countdown", c.countdownTitle);
  const row = el("div", "inlay-count");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "inlay-unit");
    const n = el("span", "digit", "00");
    const etching = svg(
      '<polygon points="24,2 136,2 158,25 158,155 136,178 24,178 2,155 2,25"/><polygon points="28,9 132,9 151,29 151,151 132,171 28,171 9,151 9,29"/><path d="M30 20q15 4 18-5m-8 3 5 8m-8-6-4 5m79-5q15 4 18-5m-8 3 5 8m-8-6-4 5M30 160q15-4 18 5m-8-3 5-8m-8 6-4-5m79 5q15-4 18 5m-8-3 5-8m-8 6-4-5M17 45v90m126-90v90" stroke-width=".7"/>',
      "0 0 160 180",
    );
    etching.classList.add("inlay-etching");
    add(unit, etching, n, el("span", "label", c[k]));
    row.append(unit);
    return n;
  });
  const status = el("p", "count-status");
  const tick = () => {
    const now = new Date();
    const today = now.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
    const delta = target - now;
    row.hidden = today === d.date || delta < 0;
    status.textContent = today === d.date ? c.today : delta < 0 ? c.past : "";
    const sec = Math.max(0, Math.floor(delta / 1000));
    [
      Math.floor(sec / 86400),
      Math.floor(sec / 3600) % 24,
      Math.floor(sec / 60) % 60,
      sec % 60,
    ].forEach((n, i) => {
      const val = String(n).padStart(2, "0");
      if (digits[i].textContent !== val) {
        digits[i].textContent = val;
        if (!reduced.matches)
          digits[i].animate(
            [
              { transform: "translateY(8px)", opacity: 0.3 },
              { transform: "scale(1)", opacity: 1 },
            ],
            { duration: 350 },
          );
      }
    });
  };
  let timer,
    visible = false;
  const sync = () => {
    clearInterval(timer);
    if (visible && !document.hidden) {
      tick();
      timer = setInterval(tick, 1000);
    }
  };
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    sync();
  }).observe(s);
  document.addEventListener("visibilitychange", sync);
  tick();
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
  const ledger = el("div", "ceremony-ledger");
  const line = svg(
    '<path class="ledger-base" d="M6 0V1000"/><path class="ledger-ink" pathLength="1" d="M6 0V1000"/><circle class="ledger-tip" cx="6" cy="0" r="4" fill="currentColor"/>',
    "0 0 12 1000",
  );
  line.classList.add("ledger-line");
  line.setAttribute("preserveAspectRatio", "none");
  ledger.append(line);
  const cards = [];
  d.events.forEach((e, i) => {
    const key = Object.hasOwn(EVENT_NAMES.en, e.key) ? e.key : "wedding";
    const card = el("article", "event-card " + key);
    const head = button("", null, "event-toggle");
    head.id = "event-toggle-" + i;
    head.setAttribute("aria-expanded", String(i === 0));
    head.setAttribute("aria-controls", "event-panel-" + i);
    const marker = el("span", "event-marker", String(i + 1).padStart(2, "0"));
    const title = el("span", "event-title");
    add(
      title,
      el("span", "label", c.folio + " " + String(i + 1).padStart(2, "0")),
      el("span", "event-name", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
    );
    const when = el("span", "event-when");
    add(
      when,
      el("span", "event-date", dateText(e, ctx)),
      el("span", "event-time", timeText(e, ctx)),
    );
    add(head, marker, title, when, icon("chevron"));
    const panel = el("div", "event-panel");
    panel.id = "event-panel-" + i;
    panel.setAttribute("role", "region");
    panel.setAttribute("aria-labelledby", head.id);
    panel.hidden = i !== 0;
    const painting = el("div", "event-painting");
    painting.dataset.ritual = String(
      {
        haldi: 0,
        mehendi: 1,
        sangeet: 2,
        wedding: 3,
        reception: 4,
        engagement: 3,
        puja: 4,
        housewarming: 4,
        birthday: 2,
        nikah: 3,
      }[key] ?? 3,
    );
    add(
      painting,
      botanical(),
      el("div", "ritual-illustration"),
      icon(key),
      ornament(),
    );
    const detail = el("div", "event-detail");
    add(
      detail,
      el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
      el("p", "event-full-date", dateText(e, ctx)),
      el("p", "event-full-time", timeText(e, ctx)),
      el("p", "event-venue", e.venue),
      el("p", "event-address", e.address),
    );
    if (e.venue || e.address)
      detail.append(
        link(
          c.maps,
          "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent([e.venue, e.address].filter(Boolean).join(", ")),
          "text-link",
        ),
      );
    add(panel, painting, detail);
    add(card, head, panel);
    ledger.append(card);
    cards.push(card);
    head.addEventListener("keydown", (event) => {
      const all = [...ledger.querySelectorAll(".event-toggle")];
      let next = i;
      if (event.key === "ArrowDown") next = (i + 1) % all.length;
      else if (event.key === "ArrowUp")
        next = (i + all.length - 1) % all.length;
      else if (event.key === "Home") next = 0;
      else if (event.key === "End") next = all.length - 1;
      else return;
      event.preventDefault();
      all[next].focus();
    });
    head.addEventListener("click", () => {
      const open = head.getAttribute("aria-expanded") !== "true";
      cards.forEach((n) => {
        const b = n.querySelector(".event-toggle"),
          p = n.querySelector(".event-panel");
        const active = n === card && open;
        b.setAttribute("aria-expanded", String(active));
        p.hidden = !active;
      });
      if (open && !reduced.matches)
        panel.animate(
          [
            { opacity: 0.2, transform: "translateY(-10px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 500, easing: "cubic-bezier(.2,.7,.2,1)" },
        );
    });
  });
  s.firstChild.append(ledger);
  let frame = 0,
    visible = false;
  const update = () => {
    frame = 0;
    const r = ledger.getBoundingClientRect();
    const progress = reduced.matches
      ? 1
      : Math.max(
          0,
          Math.min(1, (innerHeight * 0.8 - r.top) / Math.max(1, r.height)),
        );
    line.style.setProperty("--progress", progress);
    line
      .querySelector(".ledger-tip")
      .setAttribute("cy", String(progress * 1000));
  };
  const schedule = () => {
    if (visible && !frame) frame = requestAnimationFrame(update);
  };
  new IntersectionObserver((es) => {
    visible = es[0].isIntersecting;
    schedule();
  }).observe(ledger);
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  const book = el("div", "album-book");
  book.setAttribute("role", "region");
  book.setAttribute("aria-label", c.album);
  book.dataset.count = String(photos.length);
  const spreads = el("div", "album-spreads");
  const spreadNodes = [];
  for (let i = 0; i < photos.length; i += 2) {
    const spread = el("div", "album-spread");
    spread.setAttribute("role", "group");
    spread.setAttribute("aria-label", c.spread + " " + (i / 2 + 1));
    for (let j = i; j < Math.min(i + 2, photos.length); j++) {
      const page = el("div", "album-page");
      const b = button("", () => openViewer(j), "photo photo-" + j);
      b.setAttribute("aria-label", c.photo + " " + (j + 1));
      const img = el("img");
      img.src = photos[j];
      img.alt = c.photo + " " + (j + 1);
      img.loading = "lazy";
      add(b, img);
      add(page, b, el("span", "photo-number", String(j + 1).padStart(2, "0")));
      spread.append(page);
    }
    if (spread.children.length === 1) {
      const end = el("div", "album-page album-endpaper");
      add(end, bird(), ornament(), names(d), el("p", "", c.albumEnd));
      spread.append(end);
    }
    spread.hidden = i !== 0;
    spreads.append(spread);
    spreadNodes.push(spread);
  }
  const controls = el("div", "album-controls");
  const status = el("p", "album-status");
  status.setAttribute("aria-live", "polite");
  let current = 0;
  const turn = (to) => {
    if (to < 0 || to >= spreadNodes.length) return;
    const changed = to !== current,
      direction = to > current ? 1 : -1;
    let leaf;
    spreads.querySelectorAll(".turning-leaf").forEach((n) => n.remove());
    if (changed && !reduced.matches) {
      leaf = el("div", "turning-leaf");
      leaf.setAttribute("aria-hidden", "true");
      leaf.inert = true;
      const front =
        spreadNodes[current].children[direction > 0 ? 1 : 0].cloneNode(true);
      front.classList.add("leaf-front");
      front.querySelectorAll("button").forEach((n) => {
        n.className = "leaf-picture";
        n.tabIndex = -1;
      });
      const back = el("div", "leaf-verso");
      back.append(ornament());
      add(leaf, front, back);
      leaf.style.transformOrigin =
        direction > 0 ? "left center" : "right center";
      leaf.style[direction > 0 ? "right" : "left"] = "0";
      spreads.append(leaf);
    }
    current = to;
    spreadNodes.forEach((n, i) => (n.hidden = i !== current));
    if (leaf) {
      const animation = leaf.animate(
        [
          { transform: "rotateY(0deg)" },
          { transform: "rotateY(" + -180 * direction + "deg)" },
        ],
        {
          duration: 850,
          easing: "cubic-bezier(.32,.05,.25,1)",
          fill: "forwards",
        },
      );
      animation.onfinish = () => leaf.remove();
    }
    status.textContent =
      String(current + 1).padStart(2, "0") +
      " / " +
      String(spreadNodes.length).padStart(2, "0");
    previous.disabled = current === 0;
    next.disabled = current === spreadNodes.length - 1;
  };
  const previous = button(
    "",
    () => turn(current - 1),
    "album-previous control",
  );
  previous.setAttribute("aria-label", c.albumPrevious);
  previous.append(icon("previous"));
  const next = button("", () => turn(current + 1), "album-next control");
  next.setAttribute("aria-label", c.albumNext);
  next.append(icon("next"));
  add(controls, previous, status, next);
  add(book, spreads, controls, el("p", "album-hint", c.albumHint));
  s.firstChild.append(book);
  turn(0);
  book.addEventListener("keydown", (e) => {
    if (e.target.closest("button") && !e.target.closest(".photo")) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      turn(current + 1);
      spreadNodes[current]
        .querySelector(".photo")
        .focus({ preventScroll: true });
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      turn(current - 1);
      spreadNodes[current]
        .querySelector(".photo")
        .focus({ preventScroll: true });
    }
  });
  let touchX = 0;
  spreads.addEventListener(
    "touchstart",
    (e) => (touchX = e.changedTouches[0].clientX),
    { passive: true },
  );
  spreads.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 55) turn(current + (dx < 0 ? 1 : -1));
    },
    { passive: true },
  );
  function openViewer(index) {
    const focus = document.activeElement;
    const dialog = el("dialog", "lightbox");
    const img = el("img");
    const counter = el("p", "viewer-counter");
    const show = () => {
      img.src = photos[index];
      img.alt = c.photo + " " + (index + 1);
      counter.textContent = index + 1 + " / " + photos.length;
    };
    const close = button("", () => dialog.close(), "viewer-close");
    close.append(icon("close"));
    close.setAttribute("aria-label", c.close);
    const prev = button(
      "",
      () => {
        index = (index + photos.length - 1) % photos.length;
        show();
      },
      "viewer-prev",
    );
    prev.setAttribute("aria-label", c.previous);
    prev.append(icon("previous"));
    const next = button(
      "",
      () => {
        index = (index + 1) % photos.length;
        show();
      },
      "viewer-next",
    );
    next.setAttribute("aria-label", c.next);
    next.append(icon("next"));
    add(dialog, img, close, prev, next, counter);
    document.body.append(dialog);
    document.body.classList.add("locked");
    dialog.showModal();
    show();
    close.focus();
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") next.click();
      if (e.key === "ArrowLeft") prev.click();
    });
    let x;
    dialog.addEventListener(
      "touchstart",
      (e) => (x = e.changedTouches[0].clientX),
      { passive: true },
    );
    dialog.addEventListener(
      "touchend",
      (e) => {
        const dx = e.changedTouches[0].clientX - x;
        if (Math.abs(dx) > 45) (dx < 0 ? next : prev).click();
      },
      { passive: true },
    );
    dialog.addEventListener("close", () => {
      dialog.remove();
      document.body.classList.remove("locked");
      focus.focus();
    });
  }
  return s;
}
function youtube(value) {
  try {
    const u = new URL(https(value));
    if (!["www.youtube.com", "youtube.com", "youtu.be"].includes(u.hostname))
      return "";
    const id =
      u.hostname === "youtu.be"
        ? u.pathname.slice(1)
        : u.searchParams.get("v") || u.pathname.split("/").filter(Boolean)[1];
    return /^[\w-]{11}$/.test(id || "") ? id : "";
  } catch {
    return "";
  }
}
function buildVideo(d, c) {
  const id = youtube(d.videoUrl);
  if (!id) return null;
  const s = section("video", c.video);
  const frame = el("div", "video-frame");
  const b = button(
    "",
    () => {
      const iframe = el("iframe");
      iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
      iframe.title = c.video;
      iframe.allow = "autoplay; encrypted-media; fullscreen";
      iframe.allowFullscreen = true;
      frame.replaceChildren(iframe);
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
  iframe.src =
    "https://maps.google.com/maps?q=" +
    encodeURIComponent([d.venue, d.address].filter(Boolean).join(", ")) +
    "&z=15&output=embed";
  iframe.loading = "lazy";
  iframe.title = c.venue;
  iframe.referrerPolicy = "no-referrer-when-downgrade";
  const details = el("div", "venue-details");
  add(
    details,
    icon("housewarming"),
    el("h3", "", d.venue),
    el("p", "", d.address),
    link(
      c.directions,
      "https://www.google.com/maps/dir/?api=1&destination=" +
        encodeURIComponent(d.venue + " " + d.address),
    ),
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
  const s = section("rsvp", c.rsvp, c.rsvpSub);
  const form = el("form", "rsvp-form");
  form.noValidate = true;
  const field = (label, type, name) => {
    const wrap = el("div", "field");
    const l = el("label", "label", label);
    l.htmlFor = "rsvp-" + name;
    const input = el(type === "textarea" ? "textarea" : "input");
    input.id = l.htmlFor;
    input.name = name;
    if (type !== "textarea") input.type = type;
    add(wrap, l, input);
    return { wrap, input };
  };
  const select = (label, name, options) => {
    const f = field(label, "text", name);
    const input = el("select");
    input.id = f.input.id;
    input.name = name;
    options.forEach((v) => {
      const o = el("option", "", v);
      o.value = v;
      input.append(o);
    });
    f.input.replaceWith(input);
    return { wrap: f.wrap, input };
  };
  const attendance = el("fieldset", "attendance");
  add(attendance, el("legend", "label", c.attendance));
  [c.yes, c.no, c.maybe].forEach((v, i) => {
    const l = el("label");
    const r = el("input");
    r.type = "radio";
    r.name = "attendance";
    r.value = ["yes", "no", "maybe"][i];
    r.checked = i === 0;
    add(l, r, el("span", "", v));
    attendance.append(l);
  });
  form.append(attendance);
  const columns = el("div", "form-columns");
  const name = field(c.name, "text", "name"),
    phone = field(c.phone, "tel", "phone");
  name.input.autocomplete = "name";
  phone.input.autocomplete = "tel";
  phone.input.inputMode = "tel";
  [name, phone].forEach((f, i) => {
    f.input.required = true;
    const err = el("p", "error");
    err.id = f.input.id + "-error";
    err.setAttribute("aria-live", "polite");
    f.input.setAttribute("aria-describedby", err.id + (i ? " phone-hint" : ""));
    f.wrap.append(err);
    f.error = err;
    columns.append(f.wrap);
  });
  const hint = el("p", "hint", c.phoneHint);
  hint.id = "phone-hint";
  phone.wrap.append(hint);
  form.append(columns);
  const guests = select(
    c.guests,
    "guests",
    Array.from(
      { length: Math.min(100, Math.max(1, Number(d.rsvp.maxGuests) || 10)) },
      (_, i) => String(i + 1),
    ),
  );
  form.append(guests.wrap);
  attendance.addEventListener("change", () => {
    guests.wrap.hidden = new FormData(form).get("attendance") === "no";
  });
  if (d.rsvp.askEvents && d.events?.length) {
    const group = el("fieldset", "event-choices");
    group.append(el("legend", "label", c.attending));
    d.events.forEach((e) => {
      const l = el("label");
      const input = el("input");
      input.type = "checkbox";
      input.name = "events";
      input.value = e.key;
      add(
        l,
        input,
        el("span", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
      );
      group.append(l);
    });
    form.append(group);
  }
  if (d.rsvp.askDiet) form.append(select(c.diet, "diet", c.diets).wrap);
  form.append(
    field(d.name2 ? c.message : c.otherMessage, "textarea", "message").wrap,
  );
  const error = el("p", "error");
  error.setAttribute("role", "alert");
  const submit = button(c.send);
  submit.type = "submit";
  add(form, error, submit);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const validName = !!name.input.value.trim();
    const validPhone = /^(?:\+?91)?[6-9]\d{9}$/.test(
      phone.input.value.replace(/[\s()-]/g, ""),
    );
    name.error.textContent = validName ? "" : c.nameError;
    phone.error.textContent = validPhone ? "" : c.phoneError;
    name.input.setAttribute("aria-invalid", !validName);
    phone.input.setAttribute("aria-invalid", !validPhone);
    if (!validName || !validPhone) {
      (!validName ? name.input : phone.input).focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = c.sending;
    error.textContent = "";
    const fd = new FormData(form);
    const payload = {
      attendance: fd.get("attendance"),
      name: fd.get("name").trim(),
      phone: fd.get("phone"),
      guests: fd.get("attendance") === "no" ? 0 : Number(fd.get("guests")),
      events: fd.getAll("events"),
      diet: fd.get("diet") || "",
      message: fd.get("message"),
    };
    try {
      if (typeof window.onInviteRsvp === "function")
        await window.onInviteRsvp(payload);
      else await new Promise((r) => setTimeout(r, 600));
      const thanks = el("div", "thanks");
      thanks.tabIndex = -1;
      add(
        thanks,
        ornament(),
        el("h3", "", c.thanks),
        el("p", "", payload.attendance === "no" ? c.declineSuccess : c.success),
      );
      form.replaceWith(thanks);
      thanks.focus();
      if (!reduced.matches) {
        const burst = el("div", "confetti");
        for (let i = 0; i < 28; i++) {
          const bit = el("i");
          bit.style.setProperty("--i", i);
          burst.append(bit);
        }
        document.body.append(burst);
        setTimeout(() => burst.remove(), 2400);
      }
    } catch {
      error.textContent = c.failure;
      submit.disabled = false;
      submit.textContent = c.send;
    }
  });
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
  decorateFolio(s, true);
  return s;
}
function buildFloating(d, c, ctx) {
  const box = el("div", "floating");
  box.hidden = true;
  if (ctx.audio) {
    const b = button(
      "",
      () => {
        if (ctx.audio.paused) {
          ctx.audio.volume = 0.25;
          ctx.audio.play().catch(() => {});
        } else ctx.audio.pause();
      },
      "control music",
    );
    const sync = () => {
      b.setAttribute("aria-pressed", !ctx.audio.paused);
      b.setAttribute("aria-label", ctx.audio.paused ? c.music : c.pause);
      b.classList.toggle("playing", !ctx.audio.paused);
      b.replaceChildren(icon(ctx.audio.paused ? "music" : "pause"));
    };
    ctx.audio.addEventListener("play", sync);
    ctx.audio.addEventListener("pause", sync);
    sync();
    box.append(b);
  }
  const share = button(
    "",
    async () => {
      if (navigator.share) {
        try {
          await navigator.share({ title: document.title, url: location.href });
        } catch (e) {
          if (e.name !== "AbortError")
            window.open(
              "https://wa.me/?text=" + encodeURIComponent(location.href),
              "_blank",
              "noopener",
            );
        }
      } else
        window.open(
          "https://wa.me/?text=" + encodeURIComponent(location.href),
          "_blank",
          "noopener",
        );
    },
    "control",
  );
  share.setAttribute("aria-label", c.share);
  share.append(icon("share"));
  box.append(share);
  return box;
}

// Keep decorative loops asleep outside the viewport and while the tab is hidden.
function initializeMotion(root) {
  const moving = [
      ...root.querySelectorAll(".section,.opening,.ambient,.floating"),
    ],
    visible = new Set();
  const sync = () =>
    moving.forEach((n) =>
      n.classList.toggle(
        "motion-active",
        visible.has(n) && !document.hidden && !reduced.matches,
      ),
    );
  const io = new IntersectionObserver((es) => {
    es.forEach((e) => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    sync();
  });
  moving.forEach((n) => io.observe(n));
  sync();
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
}

// Give all desktop wheel/trackpad deltas one consistent time-based easing curve.
// Scroll the real document, so focus, sticky controls and browser navigation still work.
function initializeWheelScroll() {
  const eligible = matchMedia("(pointer:fine)");
  let frame = 0;
  let position = 0;
  let target = 0;
  let previousTime = 0;
  let direction = 0;
  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    position = target = window.scrollY;
    previousTime = 0;
    direction = 0;
  };
  const locked = () =>
    document.body.classList.contains("locked") ||
    !!document.querySelector("dialog[open]");
  const step = (time) => {
    if (locked() || reduced.matches || !eligible.matches) {
      stop();
      return;
    }
    const dt = previousTime ? Math.min(40, time - previousTime) : 16.67;
    previousTime = time;
    position += (target - position) * (1 - Math.exp(-dt / 210));
    if (Math.abs(target - position) < 0.4) position = target;
    window.scrollTo({ top: position, behavior: "instant" });
    if (position === target) {
      frame = 0;
      previousTime = 0;
    } else frame = requestAnimationFrame(step);
  };
  addEventListener(
    "wheel",
    (event) => {
      if (
        !eligible.matches ||
        reduced.matches ||
        locked() ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)
      )
        return;
      if (
        event.target.closest("input,textarea,select,[contenteditable],dialog")
      ) {
        stop();
        return;
      }
      let parent = event.target;
      while (parent && parent !== document.body) {
        const style = getComputedStyle(parent);
        if (
          /(auto|scroll)/.test(style.overflowY) &&
          parent.scrollHeight > parent.clientHeight + 1
        ) {
          stop();
          return;
        }
        parent = parent.parentElement;
      }
      const scale =
        event.deltaMode === 1 ? 32 : event.deltaMode === 2 ? innerHeight : 1;
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - innerHeight,
      );
      if (!frame) position = target = window.scrollY;
      const nextDirection = Math.sign(event.deltaY);
      // Reverse immediately instead of dragging the guest toward the old target.
      if (direction && nextDirection && nextDirection !== direction)
        position = target = window.scrollY;
      if (nextDirection) direction = nextDirection;
      // Preserve the full gesture distance, including fast multi-screen trackpad swipes.
      const next = Math.max(0, Math.min(max, target + event.deltaY * scale));
      if (next === target) {
        if (frame) event.preventDefault();
        return;
      }
      event.preventDefault();
      target = next;
      if (!frame) frame = requestAnimationFrame(step);
    },
    { passive: false },
  );
  ["pointerdown", "touchstart", "keydown", "focusin"].forEach((type) =>
    addEventListener(type, stop, { passive: true }),
  );
  document.addEventListener("visibilitychange", stop);
  reduced.addEventListener("change", stop);
  eligible.addEventListener("change", stop);
  addEventListener("resize", stop, { passive: true });
  addEventListener("hashchange", stop);
  addEventListener("popstate", stop);
}

// Compose motion with each theme's own transforms; never crop or zoom source images.
function initializeScrollChoreography(root) {
  const strength = 20;
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
