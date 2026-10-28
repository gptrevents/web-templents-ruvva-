const COPY = {
  en: {
    brand: "ruvva",
    browse: "The collection",
    headerNote: "Made for your kind of celebration",
    skip: "Skip to templates",
    eyebrow: "The invitation collection",
    headline: "A beautiful beginning.",
    headlineSecond: "A style that’s yours.",
    intro:
      "Some stories begin with a grand entrance. Others, with a flower. Find the invitation that feels like you.",
    explore: "Find your invitation",
    collection: "Explore the collection",
    all: "All styles",
    searchLabel: "Search templates",
    searchPlaceholder: "Search the collection",
    preview: "Open personalized preview",
    demoGuest: "Kiran Garu",
    previewLabel: "Open the {title} invitation preview",
    screens: "Designed for every screen",
    empty: "No invitations match your search. Try another style or name.",
    reset: "Show all invitations",
    error:
      "The collection could not load. Please refresh the page to try again.",
    noteTitle: "A growing collection of beautiful beginnings.",
    note: "Different worlds, one thoughtful invitation experience. New designs will find their home here, too.",
    back: "Back to collection",
    footer: "Ruvva · Thoughtfully made for your celebrations.",
    footerNote: "Explore. Open. Fall in love.",
    count: "{count} invitations",
    found: "{count} invitations shown",
  },
};
const copy = COPY.en;
document.querySelectorAll("[data-copy]").forEach((node) => {
  node.textContent = copy[node.dataset.copy];
});
const search = document.querySelector("#search");
search.placeholder = copy.searchPlaceholder;
const grid = document.querySelector("#grid");
let themes = [],
  active = "";
const el = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
function localPath(path) {
  if (
    typeof path !== "string" ||
    !/^(themes|gallery)\/[a-zA-Z0-9_./-]+$/.test(path) ||
    path.split("/").includes("..")
  )
    return "";
  return new URL(path, document.baseURI).href;
}
function image(src, className) {
  const wrap = el("span", className),
    img = el("img");
  img.setAttribute("src", localPath(src));
  img.setAttribute("alt", "");
  img.setAttribute("loading", "lazy");
  img.setAttribute("decoding", "async");
  img.addEventListener("error", () => wrap.remove(), { once: true });
  wrap.append(img);
  return wrap;
}
function card(theme, index) {
  const item = el("article", "theme-card");
  const previewUrl = new URL(localPath(`themes/${theme.id}/`));
  const params = new URLSearchParams(location.search);
  previewUrl.searchParams.set("g", params.get("g")?.trim() || copy.demoGuest);
  const party = params.get("party");
  previewUrl.searchParams.set(
    "party",
    ["individual", "couple", "family"].includes(party) ? party : "family",
  );
  const url = previewUrl.href,
    label = copy.previewLabel.replace("{title}", theme.title);
  const preview = el("a", "preview");
  preview.href = url;
  preview.setAttribute("aria-label", label);
  if (/^#[0-9a-f]{6}$/i.test(theme.stage))
    preview.style.setProperty("--stage", theme.stage);
  preview.append(el("span", "stage-tag", theme.category));
  if (localPath(theme.desktop))
    preview.append(image(theme.desktop, "desktop-preview"));
  else preview.append(el("span", "fallback-preview", theme.title));
  if (localPath(theme.phone))
    preview.append(image(theme.phone, "phone-preview"));
  const bottom = el("span", "stage-bottom");
  bottom.append(el("span", "", copy.screens), el("span", "preview-icon", "↗"));
  preview.append(bottom);
  const meta = el("div", "card-meta"),
    tags = el("span");
  tags.append(
    el("span", "card-number", String(index + 1).padStart(2, "0")),
    el("span", "category", theme.category),
  );
  const palette = el("span", "palette");
  palette.setAttribute("aria-hidden", "true");
  (theme.palette || [])
    .filter((color) => /^#[0-9a-f]{6}$/i.test(color))
    .forEach((color) => {
      const dot = el("span", "swatch");
      dot.style.backgroundColor = color;
      palette.append(dot);
    });
  meta.append(tags, palette);
  const title = el("h3", "card-title");
  const titleLink = el("a", "", theme.title);
  titleLink.href = url;
  title.append(titleLink);
  const foot = el("div", "card-bottom");
  const link = el("a", "open-link", copy.preview);
  link.href = url;
  link.setAttribute("aria-label", label);
  // Static, authored SVG only. All catalog content uses textContent / attributes.
  const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  arrow.setAttribute("viewBox", "0 0 24 24");
  arrow.setAttribute("aria-hidden", "true");
  arrow.innerHTML =
    '<path d="M5 19 19 5M5 5h14v14" fill="none" stroke="currentColor" stroke-width="1.4"/>';
  link.append(arrow);
  foot.append(el("span", "detail", theme.detail), link);
  item.append(
    preview,
    meta,
    title,
    el("p", "card-description", theme.description),
    foot,
  );
  return item;
}
function render() {
  const query = search.value.trim().toLocaleLowerCase("en");
  const matched = themes.filter(
    (theme) =>
      (!active || theme.category === active) &&
      `${theme.title} ${theme.category} ${theme.description} ${theme.detail}`
        .toLocaleLowerCase("en")
        .includes(query),
  );
  grid.replaceChildren(
    ...matched.map((theme) => card(theme, themes.indexOf(theme))),
  );
  document.querySelector("#empty").hidden = matched.length > 0;
  document.querySelector("#status").textContent = copy.found.replace(
    "{count}",
    matched.length,
  );
  document
    .querySelectorAll(".filter")
    .forEach((button) =>
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.category === active),
      ),
    );
}
function filters() {
  const root = document.querySelector("#filters");
  ["", ...new Set(themes.map((theme) => theme.category))].forEach(
    (category) => {
      const button = el("button", "filter", category || copy.all);
      button.type = "button";
      button.dataset.category = category;
      button.addEventListener("click", () => {
        active = category;
        render();
      });
      root.append(button);
    },
  );
}
search.addEventListener("input", render);
document.querySelector("#reset").addEventListener("click", () => {
  active = "";
  search.value = "";
  render();
  search.focus();
});
fetch("gallery/themes.json")
  .then((response) => {
    if (!response.ok) throw Error("Catalog unavailable");
    return response.json();
  })
  .then((data) => {
    if (!Array.isArray(data)) throw Error("Invalid catalog");
    themes = data.filter(
      (theme) =>
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(theme.id) &&
        typeof theme.title === "string",
    );
    document.querySelector("#total").textContent = copy.count.replace(
      "{count}",
      themes.length,
    );
    filters();
    render();
    grid.setAttribute("aria-busy", "false");
  })
  .catch(() => {
    grid.setAttribute("aria-busy", "false");
    document.querySelector("#error").hidden = false;
  });
