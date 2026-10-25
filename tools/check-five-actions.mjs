import { chromium } from "playwright";
import assert from "node:assert/strict";
import { writeFile } from "node:fs/promises";
const b = await chromium.launch();
const results = [];
try {
  for (const id of [
    "temple-dawn",
    "floral-elegant",
    "ocean-serene",
    "varnika",
    "sannidhi",
  ]) {
    const p = await b.newPage({
      viewport: { width: 390, height: 844 },
      isMobile: true,
      hasTouch: true,
    });
    await p.goto("http://127.0.0.1:4175/themes/" + id + "/");
    await p
      .getByRole("button", { name: "Open Invitation", exact: true })
      .click();
    await p.locator(".opening").waitFor({ state: "detached" });
    const music = p.locator(".floating button[aria-pressed]");
    await music.focus();
    const playing = await music.getAttribute("aria-pressed");
    await music.press("Enter");
    await p.waitForTimeout(100);
    assert.notEqual(await music.getAttribute("aria-pressed"), playing);
    const down = p.waitForEvent("download");
    await p
      .getByRole("button", { name: "Apple / Outlook", exact: true })
      .click();
    assert.equal((await down).suggestedFilename(), "invitation.ics");
    await p.locator(".photo").first().click();
    assert(await p.locator("dialog").isVisible());
    await p.keyboard.press("Escape");
    await p.locator("dialog").waitFor({ state: "detached" });
    assert.equal(await p.locator(".video iframe").count(), 0);
    await p.getByRole("button", { name: "Play video", exact: true }).click();
    assert.equal(await p.locator(".video iframe").count(), 1);
    await p.getByRole("button", { name: "Send RSVP", exact: true }).click();
    assert.equal(
      await p.locator("#rsvp-name").getAttribute("aria-invalid"),
      "true",
    );
    await p.locator("#rsvp-name").fill("Sample Guest");
    await p.locator("#rsvp-phone").fill("9876543210");
    if (await p.locator(".event-choices input").count())
      await p.locator(".event-choices input").first().check();
    await p.evaluate(() => {
      window.onInviteRsvp = async (payload) => {
        window.checkedPayload = payload;
      };
    });
    await p.getByRole("button", { name: "Send RSVP", exact: true }).click();
    await p.locator(".thanks").waitFor();
    assert(await p.evaluate(() => Boolean(window.checkedPayload)));
    const text =
      "PASS " +
      id +
      ": music, ICS, gallery/Escape, deferred video, RSVP validation and local callback success";
    results.push(text);
    console.log(text);
    await p.close();
  }
  await writeFile("tools/five-actions-report.txt", results.join("\n") + "\n");
} finally {
  await b.close();
}
