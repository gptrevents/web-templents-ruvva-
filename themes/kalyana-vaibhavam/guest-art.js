import { el, add, svg } from "../../shared/core.js";
export function makeGuestLetter(recipient, c) {
  const box = el("aside", "personal-invitation guest-lotus");
  const crest = svg(
    '<path d="M100 62C62 40 77 18 100 5c23 13 38 35 0 57Zm0 0C64 62 47 42 57 24q37 0 43 38Zm0 0c36 0 53-20 43-38-37 0-43 38ZM65 69h70M20 50h31m98 0h31"/>',
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
