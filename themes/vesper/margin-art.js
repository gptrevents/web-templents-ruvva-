import { el, svg, reduced } from "../../shared/core.js";

// Theme-specific background choreography. No invitation data enters the SVG.
export function mountMarginArt(root) {
  const layer = el("div", "margin-art vesper-margin-art");
  layer.setAttribute("aria-hidden", "true");
  layer.inert = true;
  for (const side of ["left", "right"]) {
    const rail = el("div", "margin-side margin-" + side);
    const depth = el("div", "margin-parallax");
    const art = svg(artwork(side), "0 0 220 1000");
    art.classList.add("margin-svg");
    art.querySelectorAll("path").forEach((path, i) => {
      path.setAttribute("pathLength", "1");
      path.setAttribute("vector-effect", "non-scaling-stroke");
      path.style.setProperty("--stroke-i", i);
    });
    depth.append(art);
    rail.append(depth);
    layer.append(rail);
  }
  root.prepend(layer);
  const visible = new Set();
  let frame = 0;
  const paint = () => {
    frame = 0;
    if (document.hidden) return;
    const max = Math.max(
      1,
      document.documentElement.scrollHeight - innerHeight,
    );
    const progress = Math.max(0, Math.min(1, scrollY / max));
    const reach = innerWidth < 600 ? 48 : 130;
    layer.style.setProperty(
      "--art-drift",
      `${reduced.matches ? 0 : Math.round(progress * reach * 100) / 100}px`,
    );
    let nearest = null,
      delta = Infinity;
    for (const section of visible) {
      const r = section.getBoundingClientRect();
      const distance = Math.abs(r.top + r.height / 2 - innerHeight / 2);
      if (distance < delta) {
        delta = distance;
        nearest = section;
      }
    }
    layer.classList.toggle(
      "is-calm",
      ["rsvp", "blessings", "venue"].includes(nearest?.id),
    );
  };
  const schedule = () => {
    if (document.hidden || reduced.matches) return;
    if (!frame) frame = requestAnimationFrame(paint);
  };
  const sync = () => {
    const playing =
      !document.hidden &&
      !reduced.matches &&
      !document.querySelector("dialog[open]");
    layer.classList.toggle("is-playing", playing);
    if (!playing) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
    if (reduced.matches) paint();
    else if (playing) schedule();
  };
  const observer = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) visible.add(e.target);
      else visible.delete(e.target);
    }
    if (reduced.matches) paint();
    else schedule();
  });
  root.querySelectorAll(".section").forEach((n) => observer.observe(n));
  new MutationObserver(sync).observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
  addEventListener("scroll", schedule, { passive: true });
  addEventListener(
    "resize",
    () => {
      if (reduced.matches) paint();
      else schedule();
    },
    { passive: true },
  );
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  sync();
}

// Original optical folds: parallel contours with restrained travelling highlights.
function artwork(side) {
  const paths = [];
  if (side === "left") {
    for (let i = 0; i < 9; i++)
      paths.push(
        `<path class="satin-line" d="M${-85 + i * 15} -50C${170 + i * 8} ${120 + i * 7} ${-160 + i * 14} ${290 + i * 8} ${-42 + i * 10} ${455 + i * 4}S${205 + i * 4} ${748 - i * 3} ${-35 + i * 12} 1055"/>`,
      );
    return `<g class="satin-fold">${paths.join("")}</g>
      <path class="contour-glint" d="M-25 -50C202 148-104 322-2 471S221 736 13 1055"/>
      <g class="lens-engraving"><ellipse cx="-22" cy="665" rx="118" ry="186"/><ellipse cx="-22" cy="665" rx="101" ry="168"/><path d="M-45 665H2m-23-23v46"/></g>`;
  }
  for (let i = 0; i < 8; i++)
    paths.push(
      `<path class="satin-line" d="M${-82 + i * 18} -40C${180 + i * 6} ${165 - i * 4} ${112 + i * 6} ${255 + i * 5} ${-30 + i * 12} ${408 + i * 7}S${146 + i * 10} ${765 + i * 5} ${-60 + i * 16} 1040"/>`,
    );
  return `<g class="satin-fold">${paths.join("")}</g>
    <path class="contour-glint" d="M8 -40C210 145 142 280 30 443S196 790 20 1040"/>
    <g class="lens-engraving"><ellipse cx="4" cy="245" rx="124" ry="156"/><ellipse cx="4" cy="245" rx="107" ry="139"/><path d="M-17 245h42m-21-21v42"/></g>`;
}
