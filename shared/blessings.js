import { el, add, button, reduced } from "./core.js";

// Spread into each theme's COPY.en. Integrators supply translations explicitly.
export const BLESSINGS_COPY = {
  blessTitle: "Send Your Blessings",
  blessSub:
    "For those who cannot be with us, your blessings travel the distance.",
  blessAmount: "Choose an amount",
  blessOther: "Other",
  blessCustom: "Amount in whole rupees",
  blessName: "Your name",
  blessMessage: "Your blessing",
  blessCounter: "{count} / 300",
  blessPayPhone: "Pay {amount} with UPI",
  blessPayHint: "Opens GPay, PhonePe, Paytm or any UPI app.",
  blessScan: "Scan with any UPI app on your phone",
  blessCopyId: "Copy UPI ID",
  blessCopied: "UPI ID copied",
  blessCopyError: "Could not copy. Select and copy the UPI ID above.",
  blessRefHint: "Add this code in the payment note:",
  blessSent: "I've sent my blessing",
  blessThanks: "Thank you, {name}. Your blessing message has been recorded.",
  blessRecorded:
    "The couple will confirm the payment after checking their account.",
  blessDirectNote:
    "Payment goes directly to the couple. Ruvva does not handle or hold the money.",
  blessDemo: "Preview only — this is a fictional UPI ID. Do not send money.",
  blessAmountError: "Enter a whole amount from ₹1 to ₹1,00,000.",
  blessQrError:
    "The QR could not load. Please refresh, or use the UPI ID above.",
  blessQrLabel: "UPI payment QR code",
  rsvpNoBlessing: "Can't make it? You can still send your blessings.",
};
const UPI = /^[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z][a-zA-Z0-9.\-]{1,64}$/;
export const validGifts = (d) =>
  d.gifts?.enabled === true && UPI.test(d.gifts.upiId || "");
export const validAmount = (n) => Number.isInteger(n) && n >= 1 && n <= 100000;
export const money = (n) => "₹" + n.toLocaleString("en-IN");
const readSession = (key) => {
  try {
    return JSON.parse(sessionStorage.getItem(key));
  } catch {
    return null;
  }
};
const writeSession = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* Storage is optional; in-page state still prevents repeats. */
  }
};
export function guestReference(upiId) {
  const supplied = new URLSearchParams(location.search).get("ref");
  if (supplied && /^[A-Za-z0-9_-]{1,64}$/.test(supplied)) return supplied;
  const key = "ruvva:reference:" + location.pathname + ":" + upiId;
  const saved = readSession(key);
  if (
    typeof saved === "string" &&
    /^RUV-[23456789ABCDEFGHJKLMNPQRSTUVWXYZ]{6}$/.test(saved)
  )
    return saved;
  const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
  let ref = "RUV-";
  while (ref.length < 10) {
    const bytes = crypto.getRandomValues(new Uint8Array(12));
    for (const byte of bytes) {
      if (byte >= Math.floor(256 / alphabet.length) * alphabet.length) continue;
      ref += alphabet[byte % alphabet.length];
      if (ref.length === 10) break;
    }
  }
  writeSession(key, ref);
  return ref;
}
export function upiLink(gifts, amount, name, ref) {
  if (!UPI.test(gifts.upiId || "") || !validAmount(amount)) return "";
  // Keep the note short and plain; the optional blessing never enters the URI.
  const plain = Array.from(
    name.replace(
      /[\p{Extended_Pictographic}\p{Emoji_Presentation}\u200d\ufe0f\u0000-\u001f\u007f]/gu,
      "",
    ),
  )
    .slice(0, 40)
    .join("");
  return (
    "upi://pay?" +
    new URLSearchParams({
      pa: gifts.upiId,
      pn: gifts.payeeName || "",
      am: amount.toFixed(2),
      cu: "INR",
      tn: ref + " " + plain,
    })
  );
}
export async function paymentQr(uri, label, ink) {
  const { default: qrcode } = await import("./vendor/qrcode-generator.js");
  const qr = qrcode(0, "M");
  qr.addData(uri, "Byte");
  qr.make();
  const count = qr.getModuleCount(),
    size = count + 8;
  const ns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(ns, "svg");
  svg.setAttribute("viewBox", `0 0 ${size} ${size}`);
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", label);
  svg.setAttribute("class", "bless-qr");
  svg.setAttribute("shape-rendering", "crispEdges");
  const paper = document.createElementNS(ns, "rect");
  paper.setAttribute("width", size);
  paper.setAttribute("height", size);
  paper.setAttribute("fill", "#fff");
  const path = document.createElementNS(ns, "path");
  let cells = "";
  for (let y = 0; y < count; y++)
    for (let x = 0; x < count; x++)
      if (qr.isDark(y, x)) cells += `M${x + 4} ${y + 4}h1v1h-1z`;
  path.setAttribute("d", cells);
  path.setAttribute("fill", ink);
  svg.append(paper, path);
  return svg;
}

// A theme supplies the section and its ornament; all state and validation are shared.
export function createBlessingsContent(
  d,
  c,
  ctx,
  { ornament, celebrate } = {},
) {
  if (!validGifts(d)) return null;
  const gifts = d.gifts,
    ref = guestReference(gifts.upiId);
  const storageKey =
    "ruvva:gift:" + location.pathname + ":" + gifts.upiId + ":" + ref;
  const host = el("div", "bless-content");
  const direct = el("p", "bless-direct", c.blessDirectNote);
  const demo = gifts.demo === true;
  if (demo) host.append(el("p", "bless-demo", c.blessDemo));
  const form = el("form", "bless-form");
  form.noValidate = true;
  const fields = el("div", "bless-fields"),
    payment = el("div", "bless-payment");
  const amounts = [
    ...new Set(
      (Array.isArray(gifts.amounts) ? gifts.amounts : []).filter(validAmount),
    ),
  ].slice(0, 12);
  if (!amounts.length) amounts.push(101, 501, 1001, 1116, 2116);
  let selected = amounts[Math.floor(amounts.length / 2)],
    custom = false,
    busy = false,
    sent = false,
    revision = 0;
  const group = el("fieldset", "bless-amounts");
  group.append(el("legend", "label", c.blessAmount));
  const chips = el("div", "bless-chips");
  group.append(chips);
  const radios = [];
  const choose = (label, value) => {
    const l = el("label", "bless-chip"),
      r = el("input");
    r.type = "radio";
    r.name = "bless-amount";
    r.value = String(value);
    r.checked = value === selected;
    add(l, r, el("span", "", label));
    chips.append(l);
    radios.push(r);
    r.addEventListener("change", () => {
      custom = value === "other";
      if (!custom) selected = value;
      customField.hidden = !custom;
      update();
      if (custom) customInput.focus();
    });
  };
  amounts.forEach((n) => choose(money(n), n));
  if (gifts.allowCustom) choose(c.blessOther, "other");
  const field = (label, id, tag = "input") => {
    const wrap = el("div", "bless-field"),
      l = el("label", "label", label),
      input = el(tag);
    input.id = id;
    l.htmlFor = id;
    if (tag === "input") input.type = "text";
    wrap.append(l, input);
    return { wrap, input };
  };
  const cf = field(c.blessCustom, "bless-custom");
  const customField = cf.wrap,
    customInput = cf.input;
  customField.hidden = true;
  customInput.type = "number";
  customInput.min = "1";
  customInput.max = "100000";
  customInput.step = "1";
  customInput.inputMode = "numeric";
  const amountError = el("p", "error");
  amountError.id = "bless-amount-error";
  amountError.setAttribute("aria-live", "polite");
  customInput.setAttribute("aria-describedby", amountError.id);
  customField.append(amountError);
  const name = field(c.blessName, "bless-name");
  name.input.value = ctx.guest || "";
  name.input.required = true;
  name.input.autocomplete = "name";
  const nameError = el("p", "error");
  nameError.id = "bless-name-error";
  nameError.setAttribute("aria-live", "polite");
  name.input.setAttribute("aria-describedby", nameError.id);
  name.wrap.append(nameError);
  const message = field(c.blessMessage, "bless-message", "textarea");
  message.input.maxLength = 300;
  message.input.rows = 3;
  const counter = el("p", "bless-counter");
  counter.id = "bless-counter";
  message.input.setAttribute("aria-describedby", counter.id);
  message.wrap.append(counter);
  const count = () =>
    (counter.textContent = c.blessCounter.replace(
      "{count}",
      String(message.input.value.length),
    ));
  count();
  message.input.addEventListener("input", count);
  fields.append(group, customField, name.wrap, message.wrap);
  const pay = el("a", "button bless-pay");
  pay.append(el("span"));
  pay.addEventListener("click", (e) => {
    if (demo || !validate()) {
      e.preventDefault();
    }
  });
  const hint = el("p", "hint bless-phone-hint", c.blessPayHint);
  const qrWrap = el("div", "bless-qr-wrap");
  const scan = el("p", "bless-scan", c.blessScan);
  const id = el("p", "bless-upi", gifts.upiId);
  const copyStatus = el("p", "hint");
  copyStatus.setAttribute("role", "status");
  const copy = button(
    c.blessCopyId,
    async () => {
      try {
        await navigator.clipboard.writeText(gifts.upiId);
        copyStatus.textContent = c.blessCopied;
      } catch {
        copyStatus.textContent = c.blessCopyError;
      }
    },
    "button bless-copy",
  );
  const reference = el("p", "bless-ref");
  add(reference, el("span", "", c.blessRefHint + " "), el("strong", "", ref));
  const error = el("p", "error");
  error.setAttribute("role", "alert");
  const submit = button(c.blessSent);
  submit.type = "submit";
  submit.classList.add("bless-sent");
  payment.append(
    qrWrap,
    scan,
    pay,
    hint,
    id,
    copy,
    copyStatus,
    reference,
    submit,
    error,
  );
  form.append(fields, payment);
  host.append(form, direct);
  function amount() {
    return custom && customInput.value.trim() !== ""
      ? Number(customInput.value)
      : custom
        ? NaN
        : selected;
  }
  function validate() {
    const ok = validAmount(amount()),
      named = !!name.input.value.trim();
    amountError.textContent = ok ? "" : c.blessAmountError;
    customInput.setAttribute("aria-invalid", String(!ok));
    nameError.textContent = named ? "" : c.nameError;
    name.input.setAttribute("aria-invalid", String(!named));
    if (!ok) customInput.focus();
    else if (!named) name.input.focus();
    return ok && named;
  }
  // Only render a desktop QR when needed. Stale asynchronous imports cannot replace a newer amount.
  const desktop = matchMedia("(min-width:1024px)");
  async function update() {
    const n = amount(),
      valid = validAmount(n),
      named = !!name.input.value.trim(),
      version = ++revision;
    const uri =
      valid && named ? upiLink(gifts, n, name.input.value.trim(), ref) : "";
    if (uri && !demo) pay.setAttribute("href", uri);
    else pay.removeAttribute("href");
    pay.setAttribute("aria-disabled", String(!uri || demo));
    pay.firstChild.textContent = c.blessPayPhone.replace(
      "{amount}",
      valid ? money(n) : "₹—",
    );
    qrWrap.replaceChildren();
    if (!valid) amountError.textContent = c.blessAmountError;
    else amountError.textContent = "";
    if (desktop.matches && uri && !demo) {
      try {
        const ink =
          getComputedStyle(host).getPropertyValue("--bless-ink").trim() ||
          "#183e36";
        const qr = await paymentQr(uri, c.blessQrLabel, ink);
        if (version === revision && !sent) qrWrap.replaceChildren(qr);
      } catch {
        if (version === revision) qrWrap.textContent = c.blessQrError;
      }
    } else if (desktop.matches)
      qrWrap.append(el("p", "hint", demo ? c.blessDemo : c.nameError));
  }
  customInput.addEventListener("input", update);
  name.input.addEventListener("input", () => {
    nameError.textContent = "";
    update();
  });
  desktop.addEventListener("change", update);
  function showThanks() {
    sent = true;
    revision++;
    const thanks = el("div", "bless-thanks");
    thanks.tabIndex = -1;
    thanks.setAttribute("role", "status");
    if (ornament) thanks.append(ornament());
    add(
      thanks,
      el("h3", "", c.thanks),
      el(
        "p",
        "",
        c.blessThanks.replace(
          "{name}",
          name.input.value.trim() || ctx.guest || c.guest,
        ),
      ),
      el("p", "hint", c.blessRecorded),
      el("p", "bless-ref", c.blessRefHint + " " + ref),
    );
    form.replaceWith(thanks);
    if (!reduced.matches && celebrate) celebrate(thanks);
    return thanks;
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (sent || busy || !validate()) return;
    busy = true;
    submit.disabled = true;
    submit.textContent = c.sending;
    error.textContent = "";
    const claim = {
      name: name.input.value.trim(),
      amount: amount(),
      message: message.input.value.slice(0, 300),
      ref,
      upiId: gifts.upiId,
      at: new Date().toISOString(),
    };
    fields.inert = true;
    try {
      if (typeof window.onInviteGift === "function")
        await window.onInviteGift(claim);
      else await new Promise((r) => setTimeout(r, 600));
      writeSession(storageKey, { ref, amount: claim.amount, at: claim.at });
      showThanks().focus({ preventScroll: true });
    } catch {
      error.textContent = c.failure;
      submit.disabled = false;
      submit.textContent = c.blessSent;
    } finally {
      busy = false;
      fields.inert = false;
    }
  });
  const previous = readSession(storageKey);
  if (
    previous?.ref === ref &&
    validAmount(previous.amount) &&
    typeof previous.at === "string"
  )
    showThanks();
  else update();
  return host;
}

export function addRsvpBlessingLink(form, d, c) {
  if (!validGifts(d)) return;
  const line = el("p", "rsvp-no-blessing");
  line.hidden = true;
  const a = el("a", "", c.rsvpNoBlessing);
  a.href = "#blessings";
  line.append(a);
  const attendance = form.querySelector(".attendance");
  attendance.after(line);
  attendance.addEventListener("change", () => {
    line.hidden = new FormData(form).get("attendance") !== "no";
  });
}
