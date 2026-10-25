import { el, svg, reduced } from "../../shared/core.js";

// Theme-specific background choreography. No invitation data enters the SVG.
export function mountMarginArt(root) {
  const layer = el("div", "margin-art epure-margin-art");
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

// Original botanical engraving: asymmetric ginkgo fans and individually drawn veins.
function artwork(side) {
  if (side === "left")
    return `
    <g class="ink-sprig">
      <path class="ink-line ink-stem" d="M-22 1012C74 856-8 676 44 513S140 204 66-25"/>
      <path class="ink-line" d="M44 513C58 482 68 455 75 426"/>
      <path class="ink-line" d="M75 426C42 410 22 372 31 340C39 307 68 282 86 275C94 289 104 293 111 281C139 296 163 326 173 354C144 387 112 413 75 426Z"/>
      <path class="ink-line ink-vein" d="M75 426C70 378 75 323 86 275M75 426C86 374 100 321 111 281M75 426C100 378 122 329 133 302M75 426C115 388 147 349 156 323M75 426C128 398 151 374 173 354M75 426C54 383 43 352 48 320M75 426C60 390 37 366 31 340"/>
      <path class="ink-line" d="M21 727C4 712-9 698-15 675"/>
      <path class="ink-line" d="M-15 675C-44 670-68 645-75 618C-63 590-41 570-18 563C-11 573-3 575 4 563C35 575 59 596 73 619C51 652 17 674-15 675Z"/>
      <path class="ink-line ink-vein" d="M-15 675C-14 635-18 597-18 563M-15 675C-3 638 1 591 4 563M-15 675C12 639 29 601 31 579M-15 675C26 652 58 631 73 619M-15 675C-31 631-43 603-48 581"/>
      <path class="ink-line" d="M42 171C66 155 82 131 89 105"/>
      <path class="ink-line" d="M89 105C64 87 50 56 62 33C80 14 102 4 120 10C121 22 130 27 138 17C165 31 183 52 190 76C162 98 120 115 89 105Z"/>
      <path class="ink-line ink-vein" d="M89 105C98 68 111 32 120 10M89 105C116 69 132 42 138 17M89 105C131 82 165 60 177 49M89 105C79 76 70 48 62 33"/>
    </g>
    <path class="ink-glint" d="M-22 1012C74 856-8 676 44 513S140 204 66-25"/>`;
  return `
    <g class="ink-sprig">
      <path class="ink-line ink-stem" d="M-18 1044C56 940 20 776 61 641S129 369 51 129C33 76 37 22 60-24"/>
      <path class="ink-line" d="M49 683C74 665 88 644 96 624"/>
      <path class="ink-line" d="M96 624C72 604 50 576 54 545C62 516 85 490 112 480C118 492 129 500 138 487C166 501 185 526 197 553C172 589 132 617 96 624Z"/>
      <path class="ink-line ink-vein" d="M96 624C96 572 101 526 112 480M96 624C116 569 129 521 138 487M96 624C130 583 155 540 169 513M96 624C145 601 180 575 197 553M96 624C76 589 62 565 54 545"/>
      <path class="ink-line" d="M75 407C49 394 31 372 23 350"/>
      <path class="ink-line" d="M23 350C-5 352-37 331-50 307C-45 277-25 249-3 237C5 250 14 251 21 239C49 249 73 267 86 292C78 319 50 344 23 350Z"/>
      <path class="ink-line ink-vein" d="M23 350C11 311 3 270-3 237M23 350C24 308 23 268 21 239M23 350C39 316 57 282 63 262M23 350C49 335 77 311 86 292M23 350C-1 320-21 289-25 252"/>
    </g>
    <path class="ink-glint" d="M-18 1044C56 940 20 776 61 641S129 369 51 129C33 76 37 22 60-24"/>`;
}
