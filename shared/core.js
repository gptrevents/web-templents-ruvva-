// Shared invitation behavior. Theme markup and choreography stay in app.js.

export const EVENT_NAMES = {
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

export const LOCALE = {
  en: "en-IN",
  te: "te-IN",
  hi: "hi-IN",
  ta: "ta-IN",
  ml: "ml-IN",
  kn: "kn-IN",
};

export const reduced = matchMedia("(prefers-reduced-motion: reduce)");

export const el = (tag, cls, text) => {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text !== undefined) n.textContent = text;
  return n;
};

export const add = (parent, ...children) => {
  children.filter(Boolean).forEach((n) => parent.append(n));
  return parent;
};

export const button = (text, fn, cls = "button") => {
  const b = el("button", cls, text);
  b.type = "button";
  if (fn) b.addEventListener("click", fn);
  return b;
};

export const link = (text, url, cls = "button") => {
  const a = el("a", cls, text);
  a.setAttribute("href", url);
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  return a;
};

export function https(v) {
  try {
    const u = new URL(v);
    return u.protocol === "https:" ? u.href : "";
  } catch {
    return "";
  }
}

export function local(v) {
  return typeof v === "string" &&
    /^assets\/[a-zA-Z0-9_./-]+$/.test(v) &&
    !v.includes("..")
    ? v
    : "";
}

export function svg(path, view = "0 0 48 48") {
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

export const dateValue = (d) =>
  d.date ? new Date(d.date + "T" + (d.time || "00:00") + ":00+05:30") : null;

export function dateText(d, ctx) {
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

export function timeText(d, ctx) {
  return d.time && dateValue(d)
    ? dateValue(d).toLocaleTimeString(LOCALE[ctx.lang] || "en-IN", {
        hour: "numeric",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      })
    : "";
}

export function youtube(value) {
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

export function initializeWheelScroll() {
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

export function calendar(d, c, product = "Ruvva") {
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
        "PRODID:-//Ruvva//" + product + "//EN",
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

export function createRsvpForm(d, c, { ornament }) {
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
  return form;
}

export function createFloatingControls(d, c, ctx, { icon }) {
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

export function openGallery(index, photos, c, { icon }) {
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

export function mountCountdown(s, d, c, row, digits, status, animateDigit) {
  const target = dateValue(d);
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
        if (!reduced.matches) animateDigit(digits[i]);
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
}
export function initializeMotion(
  root,
  { selector = ".section,.opening,.ambient", onActive = () => {} } = {},
) {
  const moving = [...root.querySelectorAll(selector)],
    visible = new Set();
  const sync = () =>
    moving.forEach((node) => {
      const active = visible.has(node) && !document.hidden && !reduced.matches;
      node.classList.toggle("motion-active", active);
      onActive(node, active);
    });
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    });
    sync();
  });
  moving.forEach((node) => observer.observe(node));
  sync();
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  addEventListener("resize", sync, { passive: true });
}
export function initializeReveals(root, selector, threshold = 0.08) {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("seen");
          observer.unobserve(e.target);
        }
      }),
    { threshold },
  );
  root.querySelectorAll(selector).forEach((n) => {
    n.classList.add("reveal");
    observer.observe(n);
  });
}
export function createAudio(url) {
  const audio = local(url) ? new Audio(local(url)) : null;
  if (audio) {
    audio.loop = true;
    audio.volume = 0;
  }
  return audio;
}
export function startMusic(audio) {
  if (!audio) return;
  audio
    .play()
    .then(() => {
      let v = 0;
      const timer = setInterval(() => {
        v = Math.min(0.25, v + 0.025);
        audio.volume = v;
        if (v >= 0.25) clearInterval(timer);
      }, 160);
    })
    .catch(() => {});
}
export async function loadSample(renderInvitation, copy) {
  const p = new URLSearchParams(location.search);
  const files = {
    empty: "sample-empty.json",
    birthday: "sample-birthday.json",
    telugu: "sample-telugu.json",
  };
  try {
    const response = await fetch(
      "./" + (files[p.get("data")] || "sample-data.json"),
    );
    if (!response.ok) throw Error("Sample could not be loaded");
    const data = await response.json();
    renderInvitation(document.getElementById("app"), data, {
      guest: p.get("g") || "",
      lang: p.get("lang") || data.invLang || "en",
    });
  } catch (error) {
    document.getElementById("app").textContent = copy.loadFailure;
    console.error(error);
  }
}

export function initControls(root) {
  const dock = root.querySelector(".floating");
  const footer = root.querySelector(".footer");
  if (!dock) return;
  let frame = 0;
  const initialPadding = footer?.style.paddingBottom || "";
  const selector =
    'h1,h2,h3,input,textarea,select,[contenteditable="true"],.button';
  let protectedNodes = [...root.querySelectorAll(selector)].filter(
    (n) => !dock.contains(n),
  );
  const overlaps = (a, b) =>
    a.left < b.right &&
    a.right > b.left &&
    a.top < b.bottom &&
    a.bottom > b.top;
  const paint = () => {
    frame = 0;
    if (document.hidden || dock.hidden) return;
    const buttons = [...dock.querySelectorAll("button")].map((n) =>
      n.getBoundingClientRect(),
    );
    const focused = dock.contains(document.activeElement);
    const collision =
      !focused &&
      protectedNodes.some((n) => {
        const r = n.getBoundingClientRect();
        if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight)
          return false;
        return buttons.some((b) => overlaps(b, r));
      });
    dock.classList.toggle("controls-obscured", collision);
  };
  const schedule = () => {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      return;
    }
    if (!frame) frame = requestAnimationFrame(paint);
  };
  const layout = () => {
    if (footer) {
      footer.style.paddingBottom = initialPadding;
      const base = parseFloat(getComputedStyle(footer).paddingBottom) || 0;
      footer.style.paddingBottom =
        "calc(" + base + "px + 144px + env(safe-area-inset-bottom, 0px))";
    }
    schedule();
  };
  new MutationObserver(schedule).observe(dock, {
    attributes: true,
    attributeFilter: ["hidden"],
  });
  new MutationObserver((records) => {
    if (
      records.some((r) =>
        [...r.addedNodes].some(
          (n) =>
            n.nodeType === 1 &&
            (n.matches(selector) || n.querySelector(selector)),
        ),
      )
    ) {
      protectedNodes = [...root.querySelectorAll(selector)].filter(
        (n) => !dock.contains(n),
      );
      schedule();
    }
  }).observe(root, { childList: true, subtree: true });
  // Reveals and font/image layout can move content after the scroll event.
  new ResizeObserver(schedule).observe(root);
  new MutationObserver((records) => {
    if (records.some((r) => !dock.contains(r.target))) schedule();
  }).observe(root, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class", "hidden"],
  });
  root.addEventListener("transitionend", schedule);
  document.fonts.ready.then(schedule);
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", layout, { passive: true });
  root.addEventListener("focusin", schedule);
  root.addEventListener("focusout", schedule);
  document.addEventListener("visibilitychange", schedule);
  layout();
}

export async function prepareHero(cover) {
  cover.dataset.preparing = "true";
  cover.setAttribute("aria-busy", "true");
  const content = document.querySelector(".page-content");
  if (content) content.hidden = false;
  // Theme CSS defers hero backgrounds until this state is active.
  // The opening stays above the inert page until decoding completes.
  document.body.classList.add("opened");
  const hero = document.getElementById("hero");
  if (!hero) return;
  hero.querySelectorAll(".reveal").forEach((n) => n.classList.add("seen"));
  await new Promise((resolve) => requestAnimationFrame(resolve));
  const sources = new Set();
  for (const node of [hero, ...hero.querySelectorAll("div,img")]) {
    if (node instanceof HTMLImageElement && (node.currentSrc || node.src))
      sources.add(node.currentSrc || node.src);
    for (const pseudo of [null, "::before", "::after"]) {
      const background = getComputedStyle(node, pseudo).backgroundImage;
      for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g))
        sources.add(match[1]);
    }
  }
  await Promise.all(
    [...sources].map(async (source) => {
      const url = new URL(source, location.href);
      if (url.origin !== location.origin) return;
      const image = new Image();
      image.src = url.href;
      try {
        await image.decode();
      } catch {
        /* Live hero text remains the fallback. */
      }
    }),
  );
  await new Promise((resolve) =>
    requestAnimationFrame(() => requestAnimationFrame(resolve)),
  );
  cover.removeAttribute("aria-busy");
}

// URL construction is centralized; section composition stays with the theme.
export const mapSearch = (venue, address) =>
  "https://www.google.com/maps/search/?api=1&query=" +
  encodeURIComponent([venue, address].filter(Boolean).join(", "));
export const mapEmbed = (venue, address) =>
  "https://maps.google.com/maps?q=" +
  encodeURIComponent([venue, address].filter(Boolean).join(", ")) +
  "&z=15&output=embed";
export const mapDirections = (venue, address) =>
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent((venue || "") + " " + (address || ""));
export function loadVideo(frame, id, title) {
  if (!/^[\w-]{11}$/.test(id)) return;
  const iframe = el("iframe");
  iframe.src = "https://www.youtube.com/embed/" + id + "?autoplay=1";
  iframe.title = title;
  iframe.allow = "autoplay; encrypted-media; fullscreen";
  iframe.allowFullscreen = true;
  frame.replaceChildren(iframe);
}
export function createIcon(paths, key, { normalize = false } = {}) {
  const n = svg(paths[key] || paths.lamp, "0 0 64 64");
  n.classList.add("icon", "icon-" + key);
  if (normalize)
    n.querySelectorAll("path").forEach((p) =>
      p.setAttribute("pathLength", "1"),
    );
  return n;
}
