/* Stable variation: no per-frame random work or touch-scroll interception. */
window.RuvvaNatural = Object.freeze({
  prepare(ambient, birds) {
    const motifs = [...ambient.children];
    motifs.forEach((motif, i) => {
      const flight = document.createElement("span");
      flight.className = "natural-motif";
      const values = [9, 73, 31, 89, 48, 16, 62, 95];
      flight.style.setProperty("--x", values[i % values.length] + "%");
      flight.style.setProperty("--duration", 18 + ((i * 7) % 19) + "s");
      flight.style.setProperty("--phase", -3.7 - i * 8.31 + "s");
      flight.style.setProperty(
        "--drift",
        (i % 2 ? -1 : 1) * (24 + i * 9) + "px",
      );
      flight.style.setProperty("--flutter", 3.1 + i * 0.37 + "s");
      flight.style.setProperty("--size", 0.65 + ((i * 3) % 7) / 10);
      flight.append(motif);
      ambient.append(flight);
    });
    if (!birds) return;
    const ns = "http://www.w3.org/2000/svg";
    for (let pair = 0; pair < 2; pair++) {
      const passage = document.createElement("span");
      passage.className = "natural-bird-pair";
      passage.style.setProperty("--pair", pair);
      passage.setAttribute("aria-hidden", "true");
      for (let i = 0; i < 2; i++) {
        const bird = document.createElementNS(ns, "svg");
        bird.setAttribute("viewBox", "0 0 64 36");
        bird.setAttribute("fill", "none");
        bird.style.setProperty("--bird", i);
        for (const [cls, d] of [
          ["flight-wing far-wing", "M32 22C24 15 17 8 3 10C15 11 22 19 30 24"],
          ["flight-body", "M28 24Q34 19 39 21L44 23L38 24Q33 27 28 24L22 27"],
          ["flight-wing near-wing", "M32 23C39 13 48 5 61 5C48 8 42 18 34 25"],
        ]) {
          const path = document.createElementNS(ns, "path");
          path.setAttribute("class", cls);
          path.setAttribute("d", d);
          bird.append(path);
        }
        passage.append(bird);
      }
      ambient.append(passage);
    }
    // Passing birds belong to scene chapters, never across portraits or form fields.
    requestAnimationFrame(() => {
      const visible = new Set();
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) visible.add(entry.target);
            else visible.delete(entry.target);
          }
          ambient.classList.toggle("sky-active", visible.size > 0);
        },
        { threshold: 0.08 },
      );
      ambient.parentElement
        .querySelectorAll(".opening,.hero,.live,.footer")
        .forEach((section) => observer.observe(section));
    });
  },
});
