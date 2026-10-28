import { el, add, svg } from "../../shared/core.js";
export function makeGuestLetter(recipient, c) {
  const box = el("aside", "personal-invitation guest-botanical");
  const crest = svg(
    '<path d="M48 65q35-7 76-52M65 58Q35 32 61 29q21 5 14 20M84 42Q69 11 92 14q17 11 2 20M105 28q2-28 24-20 6 17-17 17M126 53q25-8 28-28-29-4-28 28ZM124 53l-7 10"/>',
    "0 0 200 80",
  );
  crest.classList.add("guest-crest");
  crest.setAttribute("aria-hidden", "true");
  const label = el("p", "guest-note-label", c.guestNoteTitle),
    name = el("h3", "guest-note-name"),
    message = el("p", "guest-note-copy", c.guestMessage),
    note = el("blockquote", "guest-note"),
    seal = el("span", "guest-seal");
  seal.setAttribute("aria-hidden", "true");
  add(box, crest, label, name, message, note, seal);
  recipient.bind(() => {
    box.hidden = !recipient.state.name;
    name.textContent = recipient.display + ",";
    note.textContent = recipient.state.note;
    note.hidden = !recipient.state.note;
    seal.textContent =
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
