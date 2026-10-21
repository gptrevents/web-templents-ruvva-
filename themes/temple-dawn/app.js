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
    closing: "With love and gratitude",
    thankYou: "Thank you",
    cordiallyInvited: "You are cordially invited",
    dear: "Dear",
    guest: "Guest",
    openInvitation: "Open Invitation",
    tagline: "A new beginning. An everlasting bond.",
    singleTagline: "A beautiful day, made brighter by you.",
    shubh: "॥ Shubh Vivah ॥",
    scroll: "Scroll to discover",
    blessing:
      "With grateful hearts and the blessings of our families, we invite you to share in the joy of our new beginning.",
    hindu: "Shree Ganeshaya Namaha",
    muslim: "Bismillah ir-Rahman ir-Rahim",
    christian: "In the name of the Lord",
    coupleTitle: "Two hearts. One beginning.",
    coupleLabel: "Together with our families",
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
    eventIntro: "Little rituals. Beautiful memories. A lifetime of love.",
    maps: "View on Maps",
    gallery: "Our Journey Together",
    galleryIntro: "A few moments, a thousand feelings.",
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
    eyebrow: "An invitation to celebrate",
    moment: "Where forever begins",
    videoHint: "A little glimpse of our story",
    amp: "&",
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
// Original ornaments share fine rounded strokes and translucent brass shading.
const paths = {
  lamp: `<g class="flame"><path d="M32 5c2 7-7 10-5 16 1 5 8 6 11 1 4-7-4-10-6-17Z" fill="currentColor" fill-opacity=".16"/><path d="M32 13c-3 5-5 8 0 11 5-2 3-6 0-11Z" fill="currentColor" fill-opacity=".38" stroke="none"/></g><path d="M31 25v5M15 31c3 10 11 14 17 14s14-4 17-14" fill="currentColor" fill-opacity=".13"/><ellipse cx="32" cy="31" rx="17" ry="3"/><path d="M19 35q13 5 26 0M28 44h8l-1 5h-6ZM30 49v5m4-5v5M25 54h14l3 4H22Zm-5 4h24l3 3H17Z" fill="currentColor" fill-opacity=".12"/><path d="M32 47v7M25 58h14" stroke-opacity=".5"/>`,
  haldi: `<ellipse cx="32" cy="36" rx="22" ry="5"/><path d="M10 36c2 15 13 19 22 19s20-4 22-19" fill="currentColor" fill-opacity=".1"/><path d="M18 33c4-1 7-13 14-16 5 3 12 16 14 16M24 28l4-5m4 6 3-4m-2-12 3-5M23 56h18M26 60h12"/><path d="M13 41q19 8 38 0M18 47q14 6 28 0" stroke-opacity=".5"/>`,
  mehendi: `<path d="M18 59C29 46 32 28 40 7M29 38C14 38 12 26 12 26s18-2 17 12Zm5-14C21 21 24 10 24 10s14 4 10 14Zm0 14c14-1 17-13 17-13s-15-1-17 13Zm-9 11C10 48 8 38 8 38s14-3 17 11Zm2 1c14 7 24-3 24-3s-14-8-24 3Z" fill="currentColor" fill-opacity=".09"/><path d="m15 29 12 7m0-21 6 8m3 11 11-6M13 41l10 6m9 3 13-2" stroke-opacity=".45"/>`,
  sangeet: `<path d="M14 22q9-5 18 0l-3 31q-6 5-12 0Zm22-9q9-5 18 0l-3 35q-6 5-12 0Z" fill="currentColor" fill-opacity=".09"/><ellipse cx="23" cy="22" rx="9" ry="4"/><ellipse cx="45" cy="13" rx="9" ry="4"/><path d="m17 27 3 23m9-23-3 23M39 18l3 27m9-27-3 27M19 34h9m12-9h10M7 11l9 4M8 5l10 7m39 42 3 5"/>`,
  engagement: `<circle cx="25" cy="39" r="16"/><circle cx="25" cy="39" r="12" stroke-opacity=".45"/><path d="m32 13 8-8 12 7 1 10-16 7Z" fill="currentColor" fill-opacity=".1"/><path d="m32 13 21 9m-21-9 11 2 9-3m-9 3-3-10m3 10-6 14"/><path d="M39 29a16 16 0 1 1-5 19"/>`,
  wedding: `<path d="M8 55h48M5 59h54M12 53V21m5 32V21m30 32V21m5 32V21M7 21h50v-5H7Z" fill="currentColor" fill-opacity=".08"/><path d="M12 16C20 16 23 6 32 6s12 10 20 10M20 15q12-2 12-9 0 7 12 9M22 21q10 9 20 0M24 24v6m8-5v8m8-9v6M9 47h11m24 0h11M9 25h11m24 0h11M28 51h8m-4-4v4"/><path d="M26 42h12q-2 6-6 6t-6-6Zm6-4c-5-4 0-8 0-8s5 4 0 8Z" fill="currentColor" fill-opacity=".12"/>`,
  reception: `<path d="M8 11h16v12c0 9-16 9-16 0Zm32 0h16v12c0 9-16 9-16 0Z" fill="currentColor" fill-opacity=".08"/><path d="M8 18h16m16 0h16M16 30v23m32-23v23M8 55h16m16 0h16M31 8l1-4 1 4 4 1-4 1-1 4-1-4-4-1Z"/><path d="M12 33c0 9 9 13 20 13s20-4 20-13" stroke-opacity=".35"/>`,
  puja: `<ellipse cx="32" cy="24" rx="12" ry="4"/><path d="M20 24c-1 7-7 10-5 20 2 13 32 13 34 0 2-10-4-13-5-20" fill="currentColor" fill-opacity=".12"/><path d="M18 34q14 6 28 0M17 41q15 6 30 0M22 51h20M32 20C21 10 31 4 31 4s12 8 1 16ZM29 19C14 20 11 9 11 9s13-2 18 10Zm6 0c15 1 18-10 18-10s-13-2-18 10Z"/>`,
  housewarming: `<path d="m6 29 26-22 26 22M13 26v30h38V26M26 56V37h12v19"/><path d="m13 23 19-16 19 16M20 31h24M10 59h44M28 9V5h8v4M17 32v16m30-16v16" stroke-opacity=".5"/><path d="M7 22c2-4 4-4 6 0m38 0c2-4 4-4 6 0"/>`,
  birthday: `<path d="M10 56V30h44v26ZM6 59h52M10 38q6 8 11 0 5 8 11 0 5 8 11 0 5 8 11 0M18 29V18h5v11m9 0V14h5v15m8 0V18h5v11" fill="currentColor" fill-opacity=".06"/><path d="M20 14c-4-3 0-7 0-7s4 4 0 7Zm14-4c-4-3 0-7 0-7s4 4 0 7Zm13 4c-4-3 0-7 0-7s4 4 0 7Z"/><path d="M15 47h34" stroke-opacity=".4"/>`,
  nikah: `<path d="M40 6A25 25 0 1 0 58 43 23 23 0 0 1 40 6Z" fill="currentColor" fill-opacity=".08"/><path d="m48 13 2 6 6 1-5 4 1 6-5-3-5 3 1-6-4-4 6-1Z"/><path d="M12 39a20 20 0 0 0 15 14" stroke-opacity=".4"/>`,
  christian: `<path d="M28 5h8v17h17v8H36v29h-8V30H11v-8h17Z" fill="currentColor" fill-opacity=".06"/><path d="M32 10v44M16 26h32" stroke-opacity=".4"/>`,
  play: `<circle cx="32" cy="32" r="27" stroke-opacity=".35"/><circle cx="32" cy="32" r="22"/><path d="m27 22 16 10-16 10Z" fill="currentColor" fill-opacity=".1"/>`,
  bell: `<path d="M32 3v9m-4-4h8M28 13q4-5 8 0v5h-8Z" fill="currentColor" fill-opacity=".15"/><path d="M19 41c4-5 4-10 4-15a9 9 0 0 1 18 0c0 5 0 10 4 15l5 4H14Z" fill="currentColor" fill-opacity=".1"/><ellipse cx="32" cy="45" rx="18" ry="3"/><path d="M28 49v4a4 4 0 0 0 8 0v-4M25 31v5m14-5v5M21 40h22M27 21q5-4 10 0" stroke-opacity=".6"/>`,
  music: `<path d="M27 43V14l25-5v29M27 21l25-5"/><ellipse cx="19" cy="44" rx="8" ry="6" fill="currentColor" fill-opacity=".12"/><ellipse cx="44" cy="39" rx="8" ry="6" fill="currentColor" fill-opacity=".12"/>`,
  pause: `<path d="M23 15v34m18-34v34" stroke-width="5"/>`,
  share: `<circle cx="16" cy="32" r="6"/><circle cx="47" cy="14" r="6"/><circle cx="47" cy="50" r="6"/><path d="m21 29 21-12M21 35l21 12"/>`,
  chevron: `<path d="m17 25 15 15 15-15"/>`,
  previous: `<path d="m38 16-16 16 16 16M22 32h29"/>`,
  next: `<path d="m26 16 16 16-16 16M13 32h29"/>`,
  close: `<path d="m20 20 24 24m0-24L20 44"/>`,
  petal: `<path d="M9 34C4 19 19 6 35 5c4 16-5 35-20 34Z" fill="currentColor" fill-opacity=".7" stroke="none"/><path d="M11 35Q21 19 32 9" stroke-opacity=".25"/>`,
};
const icon = (k) => {
  const n = svg(paths[k] || paths.lamp, "0 0 64 64");
  n.classList.add("icon", "icon-" + k);
  n.querySelectorAll("path").forEach((path) =>
    path.setAttribute("pathLength", "1"),
  );
  return n;
};
function ornament() {
  const n = svg(
    `<path d="M8 37c26 0 40-2 62-9m100 0c22 7 36 9 62 9" stroke-opacity=".6"/><g fill="currentColor" fill-opacity=".08"><path d="M37 35c-10-1-15-10-15-10s14-2 15 10Zm11-3c-6-7-3-15-3-15s11 7 3 15Zm11-2c-1 9-14 11-14 11s3-12 14-11ZM203 35c10-1 15-10 15-10s-14-2-15 10Zm-11-3c6-7 3-15 3-15s-11 7-3 15Zm-11-2c1 9 14 11 14 11s-3-12-14-11Z"/><path d="M120 39c-16-10-12-24 0-34 12 10 16 24 0 34Z"/><path d="M120 39c-19-1-29-12-27-26 14 1 26 10 27 26Zm0 0c19-1 29-12 27-26-14 1-26 10-27 26Z"/><path d="M120 42c-24 4-36-4-41-17 16-4 30 1 41 17Zm0 0c24 4 36-4 41-17-16-4-30 1-41 17Z"/></g><path d="M90 46q30 18 60 0M99 51q21 12 42 0M120 13v24" stroke-opacity=".45"/><circle cx="72" cy="28" r="1.3" fill="currentColor"/><circle cx="168" cy="28" r="1.3" fill="currentColor"/>`,
    "0 0 240 64",
  );
  n.classList.add("lotus-ornament");
  return n;
}
function botanicalCorner() {
  const n = svg(
    `<path d="M6 77C30 68 45 50 58 13M26 65c-17-1-20-13-20-13s16-2 20 13Zm8-10C19 47 24 34 24 34s15 7 10 21Zm8-14c-9-11-1-23-1-23s11 12 1 23Zm7-12c-2-13 10-22 10-22s4 15-10 22ZM33 58c17 8 27-4 27-4s-17-7-27 4Zm10-17c17 4 24-9 24-9s-17-3-24 9Z" fill="currentColor" fill-opacity=".07"/><g fill="#fbf7eb"><path d="M62 53c-10-5-5-13 0-9 3-10 12-7 8 0 11-1 11 9 2 8 5 8-4 13-8 5-7 7-13-1-2-4Z"/><path d="M59 19c-6-3-3-9 1-6 2-7 8-5 5 0 7 0 7 6 1 5 3 6-3 9-5 4-5 4-9-1-2-3Z"/></g><circle cx="65" cy="50" r="1.6" fill="currentColor"/><circle cx="62" cy="17" r="1" fill="currentColor"/>`,
    "0 0 80 88",
  );
  n.classList.add("botanical-corner");
  return n;
}
function names(d, cls = "names", tag = "div") {
  const n = el(tag, cls);
  add(n, el("span", "", d.name1 || ""));
  if (d.name2) add(n, el("span", "amp", COPY.en.amp), el("span", "", d.name2));
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
  ctx.audio = local(data.musicUrl) ? new Audio(local(data.musicUrl)) : null;
  if (ctx.audio) {
    ctx.audio.loop = true;
    ctx.audio.volume = 0;
  }
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
  RuvvaUI.initControls(root);
  initializeMotion(root);
  initializeWheelScroll();
  initializeScrollChoreography(root);
}
function buildEnvelope(d, c, ctx) {
  const cover = el("div", "opening");
  cover.setAttribute("role", "dialog");
  cover.setAttribute("aria-modal", "true");
  cover.setAttribute("aria-label", c.openInvitation);
  for (const side of ["left", "right"]) {
    const door = el("div", "door " + side);
    cover.append(door);
  }
  const content = el("div", "opening-content");
  add(
    content,
    icon("bell"),
    el("p", "label", c.cordiallyInvited),
    el("p", "salutation", c.dear + " " + (ctx.guest || c.guest) + ","),
    names(d),
    ornament(),
  );
  const b = button(c.openInvitation, async () => {
    if (cover.classList.contains("opening-away") || cover.dataset.preparing)
      return;
    if (ctx.audio) {
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
    }
    await RuvvaUI.prepareHero(cover);
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
      reduced.matches ? 0 : 1450,
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
    names(d, "names", "h1"),
    ornament(),
    el("p", "hero-date", dateText(d, ctx)),
    el("p", "hero-venue", d.venue),
  );
  add(w, text);
  const hint = el("p", "scroll-hint");
  add(hint, el("span", "", c.scroll), icon("chevron"));
  add(s, hint);
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
        "PRODID:-//Ruvva//Temple Dawn//EN",
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
  const row = el("div", "lamps");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "lamp-unit");
    const n = el("span", "digit", "00");
    add(unit, n, el("span", "label", c[k]), icon("lamp"));
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
              { transform: "translateY(-7px)", opacity: 0.3 },
              { transform: "translateY(0)", opacity: 1 },
            ],
            { duration: 350 },
          );
      }
    });
  };
  let timer;
  new IntersectionObserver((es) => {
    clearInterval(timer);
    if (es[0].isIntersecting) {
      tick();
      timer = setInterval(tick, 1000);
    }
  }).observe(s);
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
  const list = el("div", "event-grid");
  const spine = el("div", "event-spine");
  list.append(spine);
  d.events.forEach((e, i) => {
    const card = el("article", "event-card " + e.key);
    const marker = el("div", "event-marker");
    add(marker, icon(e.key));
    add(
      card,
      el("span", "event-number", String(i + 1).padStart(2, "0")),
      marker,
      el("h3", "", e.label || EVENT_NAMES.en[e.key] || c.ceremony),
      el("p", "event-date", dateText(e, ctx)),
      el("p", "event-time", timeText(e, ctx)),
      el("p", "event-venue", e.venue),
      el("p", "event-address", e.address),
    );
    if (e.venue || e.address)
      add(
        card,
        link(
          c.maps,
          "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent([e.venue, e.address].filter(Boolean).join(", ")),
          "text-link",
        ),
      );
    list.append(card);
  });
  s.firstChild.append(list);
  let scheduled = 0;
  let visible = false;
  const update = () => {
    scheduled = 0;
    const r = list.getBoundingClientRect();
    if (!r.height) return;
    const progress = Math.max(
      0,
      Math.min(1, (innerHeight * 0.75 - r.top) / r.height),
    );
    spine.style.setProperty("--progress", reduced.matches ? 1 : progress);
  };
  const schedule = () => {
    if (visible && !scheduled) scheduled = requestAnimationFrame(update);
  };
  new IntersectionObserver(
    (entries) => {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    },
    { rootMargin: "100px" },
  ).observe(s);
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  return s;
}
function buildGallery(d, c) {
  const photos = (d.gallery || []).map(local).filter(Boolean).slice(0, 12);
  if (!photos.length) return null;
  const s = section("gallery", c.gallery, c.galleryIntro);
  const grid = el("div", "gallery-grid");
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
  painted.setAttribute("src", "assets/courtyard-desktop.webp");
  painted.setAttribute("alt", "");
  painted.setAttribute("loading", "lazy");
  illustration.append(painted, play);
  add(s.firstChild, illustration, text, link(c.watch, url));
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
  const copy = el("div", "closing-copy");
  add(
    copy,
    el("p", "footer-note", c.closing),
    el("h2", "", c.thankYou),
    names(d),
    el("p", "", dateText(d, ctx)),
    ornament(),
    link(c.made, "https://ruvva.com", "brand-link"),
  );
  w.append(copy);
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
  const moving = [...root.querySelectorAll(".section,.opening,.ambient")];
  const visible = new Set();
  const sync = () =>
    moving.forEach((node) =>
      node.classList.toggle(
        "motion-active",
        visible.has(node) && !document.hidden && !reduced.matches,
      ),
    );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) visible.add(entry.target);
      else visible.delete(entry.target);
    });
    sync();
  });
  moving.forEach((node) => observer.observe(node));
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
  const strength = 28;
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
