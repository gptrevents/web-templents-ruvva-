import { chromium } from "playwright";
import { readdir, mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const browser = await chromium.launch(),
  report = [];
for (const id of (await readdir("themes", { withFileTypes: true }))
  .filter((x) => x.isDirectory())
  .map((x) => x.name)) {
  for (const [width, height] of [
    [390, 844],
    [1440, 900],
    [320, 740],
    [820, 1180],
    [844, 390],
  ]) {
    const p = await browser.newPage({
      viewport: { width, height },
      reducedMotion: "reduce",
    });
    await p.goto(
      "http://127.0.0.1:4175/themes/" + id + "/?g=Kiran%20Garu&party=family",
    );
    await p.locator(".guest-display").waitFor();
    await p.evaluate(() => document.fonts.ready);
    const details = await p.locator(".opening").evaluate((n) => {
      const g = n.querySelector(".guest-display"),
        host = n.querySelector(".names:not(.guest-display),.host-names"),
        r = g.getBoundingClientRect(),
        a = n.querySelector("button").getBoundingClientRect();
      return {
        size: parseFloat(getComputedStyle(g).fontSize),
        hostSize: host ? parseFloat(getComputedStyle(host).fontSize) : 0,
        guestRect: r.toJSON(),
        action: a.toJSON(),
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    assert(!details.overflow, id + " overflow " + width);
    assert(
      details.size > details.hostSize,
      id + " guest should lead hosts " + width,
    );
    assert(
      details.size >= (height < 500 ? 30 : width < 600 ? 38 : 52),
      id + " guest font " + width + " " + details.size,
    );
    if ([390, 1440].includes(width)) {
      await p.screenshot({
        path: "themes/" + id + "/screenshots/guest/" + width + "-opening.png",
      });
    }
    const action = p.getByRole("button", {
      name: "Open Invitation",
      exact: true,
    });
    await action.scrollIntoViewIfNeeded();
    let r = await action.boundingBox();
    await p.mouse.move(r.x + r.width / 2, r.y + r.height / 2);
    await p.waitForTimeout(100);
    r = await action.boundingBox();
    await p.mouse.click(r.x + r.width / 2, r.y + r.height / 2);
    await p.locator(".opening").waitFor({ state: "detached" });
    assert(
      await p.locator(".personal-invitation").isVisible(),
      id + " letter missing",
    );
    assert.match(await p.locator(".guest-closing").textContent(), /Kiran Garu/);
    await p.close();
    report.push(
      id +
        " " +
        width +
        ": " +
        details.size +
        "px guest; " +
        details.hostSize +
        "px hosts; four touchpoints PASS",
    );
  }
  for (const [kind, name] of [["telugu", "కిరణ్ కుమార్ వెంకట సత్యనారాయణ గారు"], ["long", "Venkata Satya Sai Lakshmi Narasimha and Padmavathi Family"]]) {
    const q=await browser.newPage({viewport:{width:390,height:844},reducedMotion:"reduce"});
    await q.goto("http://127.0.0.1:4175/themes/"+id+"/?g="+encodeURIComponent(name)+"&party=family");
    await q.locator(".guest-display").waitFor();await q.evaluate(()=>document.fonts.ready);
    assert.equal(await q.locator(".guest-display").textContent(),name);
    assert.equal(await q.evaluate(()=>document.documentElement.scrollWidth),390);
    assert(await q.locator(".guest-address").evaluate(n=>n.scrollHeight<=n.clientHeight+2),id+" salutation clips "+kind);
    await q.screenshot({path:"themes/"+id+"/screenshots/guest/390-opening-"+kind+".png"});
    await q.close();report.push(id+" "+kind+": long guest name and family line are unclipped PASS");
  }
  await writeFile(
    "themes/" + id + "/opening-report.txt",
    report.filter((x) => x.startsWith(id + " ")).join("\n") + "\n",
  );
  console.log(id + " opening PASS");
}
const p = await browser.newPage();
await p.goto("http://127.0.0.1:4175/");
await p.locator(".theme-card").first().waitFor();
const links = await p
  .locator(".theme-card .open-link")
  .evaluateAll((ns) => ns.map((x) => x.href));
assert.equal(links.length, 13);
for (const l of links) {
  const u = new URL(l);
  assert.equal(u.searchParams.get("g"), "Kiran Garu");
  assert.equal(u.searchParams.get("party"), "family");
}
report.push("Home: all 13 personalized preview links PASS");
await p.goto("http://127.0.0.1:4175/?g=Raju&party=couple");
await p.locator(".theme-card").first().waitFor();
for (const l of await p
  .locator(".theme-card .open-link")
  .evaluateAll((ns) => ns.map((x) => x.href))) {
  assert.equal(new URL(l).searchParams.get("g"), "Raju");
  assert.equal(new URL(l).searchParams.get("party"), "couple");
}
report.push("Home preserves explicit recipient and party PASS");
await p.close();
await writeFile(
  "gallery/guest-preview-report.txt",
  report.slice(-2).join("\n") + "\n",
);
await writeFile("/tmp/opening-report.txt", report.join("\n"));
await browser.close();
