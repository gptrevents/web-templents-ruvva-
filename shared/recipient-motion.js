import { el, reduced } from "./core.js";

// Live text stays intact: no letter splitting, masks, blur, or repeated name loops.
export function createGuestClosing(className = "guest-closing") {
  const p = el("p", className);
  p.append(
    el("span", "guest-closing-name"),
    el("span", "guest-closing-message"),
  );
  return p;
}
export function setGuestClosing(p, name, message) {
  const label = p.querySelector(".guest-closing-name");
  label.textContent = name ? name + "," : "";
  label.hidden = !name;
  p.dataset.longGuest = String(Array.from(name).length > 28);
  p.querySelector(".guest-closing-message").textContent =
    (name ? " " : "") + message;
}
export function mountGuestMotion(root, recipient) {
  const opening = root.querySelector(".opening .guest-display");
  const closing = root.querySelector("#footer .guest-closing");
  const enter = (node) => {
    if (!node || node.dataset.guestEntered) return;
    node.dataset.guestEntered = "true";
    node.classList.add("guest-name-enter");
  };
  if (recipient.state.name) enter(opening);
  if (!closing) return;
  // Observe the actual closing text, not a several-screen-tall illustrated footer.
  const observer = new IntersectionObserver(
    (entries) => {
      if (recipient.state.name && entries.some((e) => e.isIntersecting)) {
        enter(closing);
        observer.disconnect();
      }
    },
    { threshold: 0.25 },
  );
  observer.observe(closing);
  const visibility = () =>
    root.classList.toggle("guest-motion-paused", document.hidden);
  document.addEventListener("visibilitychange", visibility);
  visibility();
  // The CSS media rule cancels motion immediately while retaining visible text.
  reduced.addEventListener("change", () => {
    if (reduced.matches)
      root
        .querySelectorAll(".guest-name-enter")
        .forEach((n) =>
          n.getAnimations({ subtree: true }).forEach((a) => a.cancel()),
        );
  });
}
