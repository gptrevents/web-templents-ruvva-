import {
  createGuestClosing,
  setGuestClosing,
  mountGuestMotion,
} from "./recipient-motion.js";
import { el, add, button, svg } from "./core.js";
const text = (v, max = 160) =>
  typeof v === "string"
    ? Array.from(v.replace(/[\u0000-\u001f\u007f]/g, " ").trim())
        .slice(0, max)
        .join("")
    : "";
export function createRecipient(data, ctx, copy) {
  const supplied =
    data.guest && typeof data.guest === "object" && !Array.isArray(data.guest)
      ? data.guest
      : {};
  const query = text(ctx.guest),
    different = !!query && query !== text(supplied.name),
    params = new URLSearchParams(location.search);
  const parties = ["individual", "couple", "family"],
    party =
      params.get("party") || (!different ? supplied.partyType : "individual");
  const state = {
    name: query || text(supplied.name),
    honorific: different ? "" : text(supplied.honorific, 40),
    party: parties.includes(party) ? party : "individual",
    note: different ? "" : text(supplied.note, 600),
    response: "",
  };
  const listeners = [];
  const api = {
    state,
    get display() {
      return [state.name, state.honorific].filter(Boolean).join(" ");
    },
    bind(fn) {
      listeners.push(fn);
      fn();
    },
    update(next) {
      Object.assign(state, next);
      listeners.forEach((fn) => fn());
    },
  };
  return api;
}
export function recipientAddress(recipient, c) {
  const box = el("div", "salutation guest-address"),
    eyebrow = el("span", "guest-eyebrow", c.guestEyebrow),
    name = el("span", "guest-display"),
    party = el("span", "guest-party");
  add(box, eyebrow, name, party);
  recipient.bind(() => {
    name.textContent = recipient.display || c.dear + " " + c.guest + ",";
    eyebrow.hidden = !recipient.state.name;
    party.textContent =
      recipient.state.party === "family"
        ? c.guestFamily
        : recipient.state.party === "couple"
          ? c.guestCouple
          : "";
    party.hidden = !recipient.state.name || !party.textContent;
    box.classList.toggle("has-recipient", !!recipient.state.name);
  });
  return box;
}
export function personalizeRsvp(section, form, recipient, c, formCopy) {
  const title = section.querySelector("h2"),
    originalTitle = title.textContent,
    input = form.querySelector("[name=name]");
  const updateThanks = (name) => {
    formCopy.thanks = name
      ? c.guestThanksPrefix + name + c.guestThanksEnd
      : c.thanks;
  };
  recipient.bind(() => {
    section.classList.toggle("guest-rsvp", !!recipient.state.name);
    title.textContent = recipient.state.name
      ? recipient.display + ", " + c.guestRsvpQuestion
      : originalTitle;
    input.value = recipient.state.name;
    updateThanks(recipient.state.name);
  });
  form.addEventListener("submit", () => updateThanks(input.value.trim()), {
    capture: true,
  });
  let attendance = "";
  form.addEventListener(
    "submit",
    () => {
      attendance = new FormData(form).get("attendance") || "";
    },
    { capture: true },
  );
  const observer = new MutationObserver(() => {
    if (section.querySelector(".thanks")) {
      recipient.update({ response: attendance });
      details.hidden = true;
      observer.disconnect();
    }
  });
  observer.observe(form.parentElement, { childList: true });
  const details = el("div", "recipient-correction"),
    toggle = button(
      "",
      () => {
        editor.hidden = false;
        toggle.hidden = true;
        name.value = recipient.display;
        party.value = recipient.state.party;
        name.focus();
      },
      "guest-edit-toggle text-link",
    ),
    editor = el("form", "guest-editor");
  editor.hidden = true;
  const heading = el("h3", "", c.guestEditTitle),
    nameLabel = el("label", "", c.guestEditName),
    name = el("input");
  name.id = "recipient-name";
  name.name = "recipient-name";
  name.autocomplete = "name";
  name.maxLength = 160;
  name.required = true;
  nameLabel.htmlFor = name.id;
  const partyLabel = el("label", "", c.guestEditParty),
    party = el("select");
  party.id = "recipient-party";
  partyLabel.htmlFor = party.id;
  ["individual", "couple", "family"].forEach((value, index) => {
    const option = el("option", "", c.guestPartyChoices[index]);
    option.value = value;
    party.append(option);
  });
  const actions = el("div", "guest-edit-actions"),
    apply = button(c.guestApply, undefined, "button"),
    cancel = button(c.guestCancel, () => close(), "text-link"),
    clear = button(
      c.guestClear,
      () => {
        recipient.update({
          name: "",
          honorific: "",
          party: "individual",
          note: "",
          response: "",
        });
        close();
      },
      "text-link",
    );
  apply.type = "submit";
  add(actions, apply, cancel, clear);
  add(editor, heading, nameLabel, name, partyLabel, party, actions);
  function close() {
    editor.hidden = true;
    toggle.hidden = false;
    toggle.focus();
  }
  editor.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = text(name.value);
    if (!value) {
      name.setCustomValidity(c.guestNameError);
      name.reportValidity();
      return;
    }
    name.setCustomValidity("");
    recipient.update({
      name: value,
      honorific: "",
      party: party.value,
      note: "",
      response: "",
    });
    close();
  });
  name.addEventListener("input", () => name.setCustomValidity(""));
  editor.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });
  recipient.bind(() => {
    toggle.textContent = recipient.state.name ? c.guestCorrect : c.guestAdd;
  });
  add(details, toggle, editor);
  const sectionHeading = section.querySelector(".section-head");
  if (sectionHeading) sectionHeading.append(details);
  else form.before(details);
}

export function mountRecipient(root, ctx, c, makeLetter) {
  const recipient = ctx.recipient;
  const opening = root.querySelector(".opening");
  const salutation = opening.querySelector(".salutation,.opening-salutation");
  const address = recipientAddress(recipient, c);
  address.className = salutation.className + " guest-address";
  salutation.replaceWith(address);
  recipient.bind(() => {
    opening.classList.toggle("recipient-opening", !!recipient.state.name);
    opening.classList.toggle(
      "recipient-long",
      Array.from(recipient.display).length > 34,
    );
  });
  const letter = makeLetter(recipient, c);
  const blessing = root.querySelector("#blessing");
  (
    blessing?.querySelector(".wrap") ||
    blessing ||
    root.querySelector("#hero .wrap")
  ).append(letter);
  const rsvp = root.querySelector("#rsvp");
  const form = rsvp?.querySelector(".rsvp-form");
  if (form) personalizeRsvp(rsvp, form, recipient, c, ctx.recipientFormCopy);
  const footer = root.querySelector("#footer");
  const original = footer.querySelector(
    ".footer-note,.night-note,.closing-note p,p.closing-copy,.footer-bottom > p",
  );
  const closing = createGuestClosing();
  if (original) original.after(closing);
  else
    (
      footer.querySelector(".closing-copy,.footer-lower,.footer-top") ||
      footer.querySelector(".wrap")
    ).append(closing);
  recipient.bind(() => {
    closing.hidden = !recipient.state.name;
    if (original) original.hidden = !!recipient.state.name;
    const response = recipient.state.response;
    const line =
      response === "yes"
        ? c.guestClosingYes
        : response === "no"
          ? c.guestClosingNo
          : response === "maybe"
            ? c.guestClosingMaybe
            : c.guestClosingWaiting;
    setGuestClosing(closing, recipient.display, line);
  });
  mountGuestMotion(root, recipient);
}
