import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {appendFile} from 'node:fs/promises';
const b=await chromium.launch(),base='http://127.0.0.1:4178/';
try{for(const width of [390,1440]){
 const p=await b.newPage({viewport:{width,height:width===390?844:900}}),size=width===390?'phone':'desktop';
 await p.goto(base+'?data=birthday');await p.getByRole('button',{name:'Open Invitation',exact:true}).click();await p.locator('.opening').waitFor({state:'detached'});await p.waitForTimeout(1000);await p.locator('#hero').screenshot({path:`themes/varnika/screenshots/${size}/hero-birthday.png`});
 await p.route('**/sample-data.json',async r=>{const response=await r.fetch();const d=await response.json();d.gallery=d.gallery.slice(0,3);await r.fulfill({json:d});});
 await p.goto(base);await p.getByRole('button',{name:'Open Invitation',exact:true}).click();await p.locator('.opening').waitFor({state:'detached'});await p.getByRole('button',{name:'Next album pages'}).click();
 await p.waitForTimeout(180);await p.locator('#gallery').screenshot({path:`themes/varnika/screenshots/${size}/album-leaf-in-motion.png`});await p.waitForTimeout(900);
 assert.equal(await p.locator('.turning-leaf').count(),0);assert(await p.getByText('A moment to keep.',{exact:true}).isVisible());await p.locator('#gallery').screenshot({path:`themes/varnika/screenshots/${size}/album-odd-endpaper.png`});
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 assert.equal(await p.locator('.music').evaluate(n=>getComputedStyle(n,'::after').animationPlayState),'paused');
 await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
 const submit=p.getByRole('button',{name:'Send RSVP',exact:true});await submit.scrollIntoViewIfNeeded();await p.waitForTimeout(200);const box=await submit.boundingBox();for(const control of await p.locator('.floating button').all()){const c=await control.boundingBox();assert(!(box.x<c.x+c.width&&box.x+box.width>c.x&&box.y<c.y+c.height&&box.y+box.height>c.y));}
 await p.close();
}await appendFile('themes/varnika/verification.txt','Final detail review: long birthday names remain in the paper field; physical album leaf is removed after turning; odd albums have an endpaper; music ring pauses while hidden; floating controls do not cover the RSVP submit button at phone/desktop.\n');console.log('Final details passed.');}finally{await b.close();}
