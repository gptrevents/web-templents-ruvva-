/* Shared UI source; generated local copies intentionally have no cross-folder imports. */
window.RuvvaUI = (() => {
  function initControls(root) {
    const dock = root.querySelector(".floating");
    const footer = root.querySelector(".footer");
    if (!dock) return;
    let frame = 0;
    const initialPadding = footer?.style.paddingBottom || "";
    const selector =
      'h1,h2,h3,input,textarea,select,[contenteditable="true"],.button';
    let protectedNodes = [...root.querySelectorAll(selector)].filter(
      (n) => !dock.contains(n),
    );
    const overlaps = (a, b) =>
      a.left < b.right &&
      a.right > b.left &&
      a.top < b.bottom &&
      a.bottom > b.top;
    const paint = () => {
      frame = 0;
      if (document.hidden || dock.hidden) return;
      const buttons = [...dock.querySelectorAll("button")].map((n) =>
        n.getBoundingClientRect(),
      );
      const focused = dock.contains(document.activeElement);
      const collision =
        !focused &&
        protectedNodes.some((n) => {
          const r = n.getBoundingClientRect();
          if (!r.width || !r.height || r.bottom < 0 || r.top > innerHeight)
            return false;
          return buttons.some((b) => overlaps(b, r));
        });
      dock.classList.toggle("controls-obscured", collision);
    };
    const schedule = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        return;
      }
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const layout = () => {
      if (footer) {
        footer.style.paddingBottom = initialPadding;
        const base = parseFloat(getComputedStyle(footer).paddingBottom) || 0;
        footer.style.paddingBottom =
          "calc(" + base + "px + 144px + env(safe-area-inset-bottom, 0px))";
      }
      schedule();
    };
    new MutationObserver(schedule).observe(dock, {
      attributes: true,
      attributeFilter: ["hidden"],
    });
    new MutationObserver((records) => {
      if (
        records.some((r) =>
          [...r.addedNodes].some(
            (n) =>
              n.nodeType === 1 &&
              (n.matches(selector) || n.querySelector(selector)),
          ),
        )
      ) {
        protectedNodes = [...root.querySelectorAll(selector)].filter(
          (n) => !dock.contains(n),
        );
        schedule();
      }
    }).observe(root, { childList: true, subtree: true });
    // Reveals and font/image layout can move content after the scroll event.
    new ResizeObserver(schedule).observe(root);
    new MutationObserver((records) => {
      if (records.some((r) => !dock.contains(r.target))) schedule();
    }).observe(root, {
      attributes: true,
      subtree: true,
      attributeFilter: ["class", "hidden"],
    });
    root.addEventListener("transitionend", schedule);
    document.fonts.ready.then(schedule);
    addEventListener("scroll", schedule, { passive: true });
    addEventListener("resize", layout, { passive: true });
    root.addEventListener("focusin", schedule);
    root.addEventListener("focusout", schedule);
    document.addEventListener("visibilitychange", schedule);
    layout();
  }

  async function prepareHero(cover) {
    cover.dataset.preparing = "true";
    cover.setAttribute("aria-busy", "true");
    const content = document.querySelector(".page-content");
    if (content) content.hidden = false;
    // Theme CSS defers hero backgrounds until this state is active.
    // The opening stays above the inert page until decoding completes.
    document.body.classList.add("opened");
    const hero = document.getElementById("hero");
    if (!hero) return;
    hero.querySelectorAll(".reveal").forEach((n) => n.classList.add("seen"));
    await new Promise((resolve) => requestAnimationFrame(resolve));
    const sources = new Set();
    for (const node of [hero, ...hero.querySelectorAll("div,img")]) {
      if (node instanceof HTMLImageElement && (node.currentSrc || node.src))
        sources.add(node.currentSrc || node.src);
      for (const pseudo of [null, "::before", "::after"]) {
        const background = getComputedStyle(node, pseudo).backgroundImage;
        for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g))
          sources.add(match[1]);
      }
    }
    await Promise.all(
      [...sources].map(async (source) => {
        const url = new URL(source, location.href);
        if (url.origin !== location.origin) return;
        const image = new Image();
        image.src = url.href;
        try {
          await image.decode();
        } catch {
          /* Live hero text remains the fallback. */
        }
      }),
    );
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    cover.removeAttribute("aria-busy");
  }
  return Object.freeze({ initControls, prepareHero });
})();
