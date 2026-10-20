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
const icon = (k) => {
  const n = svg(paths[k] || paths.wedding, "0 0 32 32");
  n.classList.add("icon", "icon-" + k);
  return n;
};
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
    ctx.audio.preload = "none";
    ctx.audio.loop = true;
    ctx.audio.volume = 0;
  }
  ctx.copy = COPY.en;
  const c = COPY.en;
  const ambient = el("div", "ambient");
  ambient.setAttribute("aria-hidden", "true");
  for (let i = 0; i < 6; i++) {
    const a = butterfly();
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
    .querySelectorAll(".section .wrap,.person,.event-card,.story-page")
    .forEach((n) => {
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
  const b = button(c.openInvitation, () => {
    if (cover.classList.contains("opening-away")) return;
    document.querySelector(".page-content").hidden = false;
    cover.classList.add("opening-away");
    document.body.classList.add("opened");
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
        "PRODID:-//Ruvva//Storybook Garden//EN",
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
  const row = el("div", "count-pennants");
  const digits = ["days", "hours", "minutes", "seconds"].map((k) => {
    const unit = el("div", "pennant-unit");
    const n = el("span", "digit", "00");
    add(unit, n, el("span", "label", c[k]));
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
              { transform: "rotateX(-75deg)", opacity: 0.3 },
              { transform: "scale(1)", opacity: 1 },
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
      body.append(
        link(
          c.maps,
          "https://www.google.com/maps/search/?api=1&query=" +
            encodeURIComponent([e.venue, e.address].filter(Boolean).join(", ")),
          "text-link",
        ),
      );
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
          restore(entry);
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
