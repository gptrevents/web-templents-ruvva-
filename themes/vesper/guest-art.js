import { el, add, svg } from "../../shared/core.js";
export function makeGuestLetter(recipient, c) {
  const box = el("aside", "personal-invitation guest-orbit");
  const crest = svg(
    '<path d="M35 40a65 23 0 1 0 130 0 65 23 0 1 0-130 0M100 8v64M78 40h44"/>',
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
