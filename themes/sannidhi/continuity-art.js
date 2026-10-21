/* Original static vector artwork. No data is inserted into SVG markup. */
window.InviteArt = (() => {
  const scene =
    '<g xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#b8976b" stroke-width="1.3"><path d="M74 341V190h49v151m254 0V190h49v151M61 342h79m220 0h79M64 184h69v10H64Zm303 0h69v10h-69Z" /><path d="M80 188v-51l18-18 18 18v51m268 0v-51l18-18 18 18v51M123 177q127-116 254 0M136 177q114-96 228 0" /><path d="M81 217h34m-34 24h34m-34 24h34m-34 24h34m270-72h34m-34 24h34m-34 24h34m-34 24h34M245 110v28h10v-28" /></g><g xmlns="http://www.w3.org/2000/svg" class="scene-moving scene-bell" stroke="#9c703e" stroke-width="1.7"><path d="M250 143v27m-9-3h18l3 18h-24Z" fill="#d4af70" /><path d="M223 230c15-9 4-45 27-47 23 2 12 38 27 47l9 10h-72Z" fill="#e4c990" /><path d="M220 232q30 14 60 0m-30 9v12m-14 2h28M241 193c-6 10-1 22-8 30m25-30c6 10 1 22 8 30" /><circle cx="250" cy="257" r="5" fill="#b88f51" /></g><g xmlns="http://www.w3.org/2000/svg" fill="#e7d3b1" stroke="#b99b74" stroke-width="1.2"><g transform="translate(98 348) scale(.5)"><path d="M0 0C-32-9-36-36-29-48-10-42-1-22 0 0ZM0 0C32-9 36-36 29-48 10-42 1-22 0 0ZM0 0C-18-28-9-48 0-61 9-48 18-28 0 0ZM0 0c-31 1-48-13-51-29C-29-30-9-14 0 0Zm0 0c31 1 48-13 51-29C29-30 9-14 0 0Z" /></g><g transform="translate(403 348) scale(.5)"><path d="M0 0C-32-9-36-36-29-48-10-42-1-22 0 0ZM0 0C32-9 36-36 29-48 10-42 1-22 0 0ZM0 0C-18-28-9-48 0-61 9-48 18-28 0 0ZM0 0c-31 1-48-13-51-29C-29-30-9-14 0 0Zm0 0c31 1 48-13 51-29C29-30 9-14 0 0Z" /></g></g><g xmlns="http://www.w3.org/2000/svg" fill="none" stroke="#c4a57d" stroke-width="1.2"><path d="m181 314 69-42 69 42-69 42ZM197 314l53-32 53 32-53 32Z" /><circle cx="250" cy="314" r="12" /></g>';
  function create() {
    const n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    n.setAttribute("viewBox", "0 0 500 400");
    n.setAttribute("fill", "none");
    n.setAttribute("aria-hidden", "true");
    n.setAttribute("focusable", "false");
    n.classList.add("continuity-scene");
    n.innerHTML = scene;
    return n;
  }
  return Object.freeze({ create });
})();
