import { el, add, button, svg } from "../../shared/core.js";
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
function letterCorner() {
  const n = svg(
    '<path d="M8 94V25Q8 8 25 8H94M15 80V29q0-14 14-14h51"/><path d="M21 56q2-25 30-35M21 40Q3 29 20 21q14 3 8 14M32 29Q30 8 47 16q7 11-8 15M43 24q9-18 22-8-2 12-17 12M24 48q17-2 16-18-16 1-16 18ZM27 62q20-3 17-19-16 1-17 19Z" fill="currentColor" fill-opacity=".12"/><path d="M29 76q-10-12 1-20 13 1 12 12-1 12-13 8Zm27-47q-12-10-20 1 1 13 12 12 12-1 8-13Z"/><circle cx="23" cy="23" r="3" fill="currentColor"/><circle cx="76" cy="15" r="1.5" fill="currentColor"/><circle cx="15" cy="76" r="1.5" fill="currentColor"/>',
    "0 0 100 100",
  );
  n.classList.add("letter-corner");
  n.setAttribute("aria-hidden", "true");
  return n;
}
function letterCrest() {
  const n = svg(
    '<path d="M12 46h46m84 0h46M100 56c-30-17-26-37 0-52 26 15 30 35 0 52ZM100 56C69 46 57 26 70 12q28 7 30 44Zm0 0c31-10 43-30 30-44q-28 7-30 44ZM100 56C64 61 47 44 50 31q32-3 50 25Zm0 0c36 5 53-12 50-25q-32-3-50 25Z" fill="currentColor" fill-opacity=".08"/><path d="M67 62q33-8 66 0M76 67q24-4 48 0M100 14v36M24 42l5 4-5 4m152-8-5 4 5 4"/><circle cx="60" cy="46" r="2" fill="currentColor"/><circle cx="140" cy="46" r="2" fill="currentColor"/>',
    "0 0 200 76",
  );
  n.classList.add("letter-crest");
  n.setAttribute("aria-hidden", "true");
  return n;
}
export function personalMessage(recipient, c) {
  const box = el("aside", "personal-invitation guest-letter"),
    art = el("div", "letter-art");
  art.setAttribute("aria-hidden", "true");
  for (const position of ["tl", "tr", "bl", "br"]) {
    const corner = letterCorner();
    corner.classList.add("corner-" + position);
    art.append(corner);
  }
  const content = el("div", "letter-content"),
    title = el("p", "guest-note-label", c.guestNoteTitle),
    name = el("h3", "guest-note-name"),
    message = el("p", "guest-note-copy"),
    note = el("blockquote", "guest-note");
  const seal = el("div", "guest-seal");
  seal.setAttribute("aria-hidden", "true");
  const initial = el("span", "seal-initial");
  seal.append(initial);
  const rule = svg(
    '<path d="M2 10h62m36 0h62M72 10l10-7 10 7-10 7Z"/><circle cx="82" cy="10" r="2" fill="currentColor"/>',
    "0 0 164 20",
  );
  rule.classList.add("letter-rule");
  rule.setAttribute("aria-hidden", "true");
  add(content, letterCrest(), title, name, rule, message, note, seal);
  add(box, art, content);
  recipient.bind(() => {
    box.hidden = !recipient.state.name;
    name.textContent = recipient.display + ",";
    message.textContent = c.guestMessage;
    note.textContent = recipient.state.note;
    note.hidden = !recipient.state.note;
    initial.textContent =
      typeof Intl.Segmenter === "function"
        ? [
            ...new Intl.Segmenter(undefined, {
              granularity: "grapheme",
            }).segment(recipient.state.name),
          ][0]?.segment || ""
        : Array.from(recipient.state.name)[0] || "";
  });
  return box;
}
export function personalizeRsvp(section, form, recipient, c, formCopy) {
  const title = section.querySelector("h2"),
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
      : c.rsvp;
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
  section.querySelector(".rsvp-intro").after(details);
}
export function closingMessage(recipient, c) {
  const p = el("p", "closing-copy guest-closing");
  recipient.bind(() => {
    const response = recipient.state.response;
    const message =
      response === "yes"
        ? c.guestClosingYes
        : response === "no"
          ? c.guestClosingNo
          : response === "maybe"
            ? c.guestClosingMaybe
            : c.guestClosingWaiting;
    p.textContent = recipient.state.name
      ? recipient.display + ", " + message
      : c.closingHome;
  });
  return p;
}
