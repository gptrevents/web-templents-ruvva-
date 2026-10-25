import { el, svg, reduced } from "../../shared/core.js";
const ASSET = "assets/garden-sprig.webp";
const KIND = "garden";
function artwork(cls) {
  const image = el("img", cls);
  image.src = ASSET;
  image.alt = "";
  image.loading = "lazy";
  image.decoding = "async";
  return image;
}
function visitor() {
  const n = svg(
    '<g class="art-wing art-wing-a"><path d="M19 18C-3-8-5 24 19 21Z" fill="currentColor" fill-opacity=".8"/><path d="M19 21C-1 21 5 39 19 25Z" fill="currentColor" fill-opacity=".55"/></g><g class="art-wing art-wing-b"><path d="M21 18C43-8 45 24 21 21Z" fill="currentColor" fill-opacity=".8"/><path d="M21 21C41 21 35 39 21 25Z" fill="currentColor" fill-opacity=".55"/></g><path d="M20 15v14m0-14-4-6m4 6 4-6" stroke="currentColor"/>',
    "0 0 40 40",
  );
  n.classList.add("art-visitor");
  return n;
}
export function mountArtMotion(root) {
  const sections = [
      ...root.querySelectorAll(".section:not(.hero):not(.footer)"),
    ],
    active = new Set();
  let frame = 0;
  sections.forEach((section, index) => {
    const layer = el("div", "occasion-decor decor-" + KIND);
    layer.setAttribute("aria-hidden", "true");
    layer.inert = true;
    layer.style.setProperty("--chapter-phase", String(index % 3));
    for (const side of ["left", "right"]) {
      const rail = el("div", "occasion-rail rail-" + side);
      const float = el("div", "rail-float");
      float.append(artwork("rail-art"));
      rail.append(float);
      const echo = el("div", "rail-echo");
      echo.append(artwork("rail-art"));
      rail.append(echo);
      if (KIND === "garden") {
        const mid = el("div", "rail-mid");
        mid.append(artwork("rail-art"));
        rail.append(mid);
      }
      layer.append(rail);
    }
    const wash = el("div", "art-watermark");
    wash.append(artwork(""));
    layer.append(wash);
    if (
      (KIND === "rose" || KIND === "garden") &&
      (index % 2 === 0 || ["events", "rsvp"].includes(section.id))
    )
      layer.append(visitor());
    if (KIND === "ceremony" || KIND === "lantern") {
      for (let i = 0; i < 3; i++) {
        const light = el("i", "art-lamplight");
        light.style.setProperty("--light-index", i);
        layer.append(light);
      }
    }
    section.prepend(layer);
    new ResizeObserver(() => {
      section.dataset.artExtended = String(section.offsetHeight > 1000);
    }).observe(section);
  });
  function paint() {
    frame = 0;
    for (const section of active) {
      const r = section.getBoundingClientRect();
      const p = Math.max(
        -1,
        Math.min(
          1,
          (innerHeight * 0.5 - r.top) / Math.max(r.height, innerHeight),
        ),
      );
      section.style.setProperty(
        "--art-depth",
        reduced.matches
          ? "0px"
          : (p * (innerWidth < 600 ? 24 : 50)).toFixed(2) + "px",
      );
    }
  }
  const schedule = () => {
    if (!frame && !document.hidden) frame = requestAnimationFrame(paint);
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          active.add(e.target);
          e.target.classList.add("art-revealed");
        } else active.delete(e.target);
      }
      schedule();
    },
    { rootMargin: "80px" },
  );
  sections.forEach((s) => observer.observe(s));
  addEventListener("scroll", schedule, { passive: true });
  addEventListener("resize", schedule, { passive: true });
  reduced.addEventListener("change", schedule);
  const visibility = () => {
    root.classList.toggle("art-motion-paused", document.hidden);
    schedule();
  };
  document.addEventListener("visibilitychange", visibility);
  visibility();
}
