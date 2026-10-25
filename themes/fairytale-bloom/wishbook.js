import { el, add, button, svg } from "../../shared/core.js";
export function buildWishbook(d, c) {
  if (!d.wishbook?.enabled && !d.wishes?.length) return null;
  const section = el("section", "wishbook");
  section.id = "wishbook";
  const heading = el("div", "wishbook-heading");
  add(heading, el("h3", "", c.wishTitle));
  const samples = (d.wishes || [])
    .filter((w) => w && typeof w.message === "string")
    .slice(0, 6);
  if (samples.some((w) => w.demo))
    heading.append(el("p", "wish-demo", c.demoWishes));
  section.append(heading);
  const key =
    "ruvva-fairytale-wishes:" +
    encodeURIComponent(
      String(d.name1 || "").slice(0, 80) + "|" + String(d.date || ""),
    );
  let posts = [];
  try {
    const a = JSON.parse(localStorage.getItem(key) || "[]");
    if (Array.isArray(a))
      posts = a
        .filter(
          (w) => typeof w?.name === "string" && typeof w.message === "string",
        )
        .slice(0, 8)
        .map((w) => ({
          name: w.name.slice(0, 60),
          message: w.message.slice(0, 300),
        }));
  } catch {
    /* A fresh local wishbook is a valid fallback. */
  }
  const list = el("div", "wish-list");
  const render = () => {
    list.replaceChildren();
    [...posts, ...samples].forEach((w) => {
      const card = el("article", "wish-card");
      const avatar = el("span", "wish-avatar");
      avatar.append(
        svg(
          '<path d="M20 12C4-3-3 20 20 32 43 20 36-3 20 12Z" fill="currentColor"/>',
          "0 0 40 36",
        ),
      );
      const text = el("div");
      add(text, el("p", "wish-message", w.message));
      if (w.name) text.append(el("p", "wish-author", w.name));
      add(card, avatar, text);
      list.append(card);
    });
  };
  render();
  section.append(list);
  const form = el("form", "wish-compose");
  form.noValidate = true;
  form.hidden = true;
  const make = (label, id, tag) => {
    const group = el("div", "field");
    const l = el("label", "label", label);
    l.htmlFor = id;
    const input = el(tag);
    input.id = id;
    input.name = id;
    input.required = true;
    add(group, l, input);
    form.append(group);
    return input;
  };
  const name = make(c.wishName, "wish-name", "input");
  name.autocomplete = "name";
  name.maxLength = 60;
  const message = make(c.wishMessage, "wish-message", "textarea");
  message.maxLength = 300;
  const counter = el("p", "wish-counter", "0 / 300 " + c.wishCounter);
  message.addEventListener("input", () => {
    counter.textContent = message.value.length + " / 300 " + c.wishCounter;
  });
  form.append(counter);
  const status = el("p", "wish-status");
  status.setAttribute("role", "status");
  const error = el("p", "error");
  error.setAttribute("role", "alert");
  const submit = button(c.wishSend);
  submit.type = "submit";
  add(form, error, submit);
  const toggle = button(
    c.leaveWish,
    () => {
      form.hidden = !form.hidden;
      toggle.setAttribute("aria-expanded", String(!form.hidden));
      if (!form.hidden) {
        if (!name.value)
          name.value = document.getElementById("rsvp-name")?.value || "";
        name.focus();
      }
    },
    "wish-toggle text-link",
  );
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", "wish-compose");
  form.id = "wish-compose";
  section.append(toggle, form, status);
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const payload = { name: name.value.trim(), message: message.value.trim() };
    if (!payload.name || !payload.message) {
      error.textContent = c.wishRequired;
      (!payload.name ? name : message).focus();
      return;
    }
    submit.disabled = true;
    submit.textContent = c.wishSending;
    error.textContent = "";
    const callback = typeof window.onInviteWish === "function";
    try {
      if (callback) await window.onInviteWish(payload);
      const next = [payload, ...posts].slice(0, 8);
      if (callback) {
        try {
          localStorage.setItem(key, JSON.stringify(next));
        } catch {
          /* Callback already accepted this wish. */
        }
      } else localStorage.setItem(key, JSON.stringify(next));
      posts = next;
      render();
      message.value = "";
      counter.textContent = "0 / 300 " + c.wishCounter;
      form.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      status.textContent = callback ? c.wishReceived : c.wishLocal;
      status.tabIndex = -1;
      status.focus();
    } catch {
      error.textContent = c.wishFailure;
    } finally {
      submit.disabled = false;
      submit.textContent = c.wishSend;
    }
  });
  return section;
}
