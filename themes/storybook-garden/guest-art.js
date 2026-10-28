import { el, add, svg } from "../../shared/core.js";
export function makeGuestLetter(recipient, c) {
  const box = el("aside", "personal-invitation guest-storybook");
  const crest = svg(
    '<path d="M35 22q35-13 65 3 30-16 65-3v40q-35-13-65 3-30-16-65-3ZM100 25v40M45 34q20-6 42 1m-42 9q20-6 42 1m26-10q20-7 42-1m-42 11q20-7 42-1"/>',
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
