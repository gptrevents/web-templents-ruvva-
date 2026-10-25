import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {readFile,readdir,stat,writeFile} from 'node:fs/promises';
import{gzipSync}from'node:zlib';
const b=await chromium.launch(),base='http://127.0.0.1:4179/',root='themes/sannidhi',notes=[];
const open=async p=>{await p.goto(base);await p.getByRole('button',{name:'Open Invitation',exact:true}).click();await p.locator('.opening').waitFor({state:'detached'});};
try{
 for(const width of[390,1440]){
  const p=await b.newPage({viewport:{width,height:width===390?844:900}}),images=new Set();
  p.on('response',r=>{if(r.url().endsWith('.webp'))images.add(r.url().split('/').pop());});
  await p.goto(base,{waitUntil:'networkidle'});assert.deepEqual([...images],['toran.webp']);
  await p.keyboard.press('Tab');assert.equal(await p.evaluate(()=>document.activeElement.textContent),'Open Invitation');
  await p.getByRole('button',{name:'Open Invitation',exact:true}).click();await p.waitForTimeout(850);
  assert.notEqual(await p.locator('.opening-light').evaluate(n=>getComputedStyle(n).transform),'matrix(0, 0, 0, 0, -10, -10)');
  await p.screenshot({path:`${root}/screenshots/${width===390?'phone':'desktop'}/opening-in-motion.png`});
  await p.locator('.opening').waitFor({state:'detached'});await p.waitForTimeout(150);
  assert(images.has(width===390?'temple-phone.webp':'temple-desktop.webp'));assert(!images.has(width===390?'temple-desktop.webp':'temple-phone.webp'));
  assert.equal(await p.locator('.page-content').evaluate(n=>n.inert),false);assert.equal(await p.evaluate(()=>document.body.classList.contains('locked')),false);
  assert.equal(await p.locator('#hero .toran').evaluate(n=>getComputedStyle(n).animationPlayState),'running');
  assert.equal(await p.locator('#footer .sky-bird').first().evaluate(n=>getComputedStyle(n).animationPlayState),'paused');
  const initialScene=await p.locator('#hero .temple-panorama').evaluate(n=>getComputedStyle(n).transform);
  await p.evaluate(()=>scrollTo({top:300,behavior:'instant'}));await p.waitForTimeout(150);assert.notEqual(await p.locator('#hero .temple-panorama').evaluate(n=>getComputedStyle(n).transform),initialScene);
  const digit=p.locator('.digit').last();await p.locator('#countdown').scrollIntoViewIfNeeded();await p.waitForTimeout(200);const before=await digit.textContent();await p.waitForTimeout(1200);assert.notEqual(await digit.textContent(),before);
  await p.locator('#hero').scrollIntoViewIfNeeded();await p.waitForTimeout(250);const stopped=await digit.textContent();await p.waitForTimeout(1200);assert.equal(await digit.textContent(),stopped);
  await p.locator('.event-card').last().scrollIntoViewIfNeeded();await p.waitForTimeout(200);
  assert.equal(await p.locator('.event-card').count(),5);assert.equal(await p.locator('.day-fold').count(),4);
  assert((await p.locator('.thread-tip').evaluateAll(ns=>ns.map(n=>Number(n.getAttribute('cy'))))).some(n=>n>0));
  await p.locator('#gallery').scrollIntoViewIfNeeded();await p.waitForTimeout(800);const oldPhoto=await p.locator('.photo[data-active=true] img').getAttribute('src');
  await p.locator('.fan-next').click();assert.notEqual(await p.locator('.photo[data-active=true] img').getAttribute('src'),oldPhoto);assert.equal(await p.locator('.fan-status').textContent(),'2 / 6');
  await p.locator('.photo[data-active=true]').focus();await p.keyboard.press('End');assert.equal(await p.locator('.fan-status').textContent(),'6 / 6');await p.keyboard.press('Home');assert.equal(await p.locator('.fan-status').textContent(),'1 / 6');
  await p.locator('.photo[data-active=true]').click();await p.locator('dialog').evaluate(n=>{
   n.dispatchEvent(new TouchEvent('touchstart',{changedTouches:[new Touch({identifier:1,target:n,clientX:240,clientY:100})]}));
   n.dispatchEvent(new TouchEvent('touchend',{changedTouches:[new Touch({identifier:1,target:n,clientX:70,clientY:100})]}));
  });assert.equal(await p.locator('.viewer-counter').textContent(),'2 / 6');await p.keyboard.press('Escape');
  await p.locator('.fan-deck').evaluate(n=>{
   n.dispatchEvent(new TouchEvent('touchstart',{changedTouches:[new Touch({identifier:1,target:n,clientX:240,clientY:100})]}));
   n.dispatchEvent(new TouchEvent('touchend',{changedTouches:[new Touch({identifier:1,target:n,clientX:70,clientY:100})]}));
  });assert.equal(await p.locator('.fan-status').textContent(),'2 / 6');
  await p.locator('.fan-index').nth(3).click();assert.equal(await p.locator('.fan-status').textContent(),'4 / 6');
  await p.locator('#gallery').screenshot({path:`${root}/screenshots/${width===390?'phone':'desktop'}/fan-selected-4.png`});
  await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
  assert(await p.locator('.toran,.sky-bird,.hanging-bell').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).animationPlayState==='paused')));
  await p.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:false});document.dispatchEvent(new Event('visibilitychange'));});
  await p.emulateMedia({reducedMotion:'reduce'});assert.equal(await p.locator('.ambient').isVisible(),false);
  assert(await p.locator('.toran,.sky-bird,.hanging-bell,.pond-shimmer').evaluateAll(ns=>ns.every(n=>getComputedStyle(n).animationName==='none')));
  notes.push(`PASS ${width}: initial toran-only request; matching scene image only; light spread and unlock; independent panorama movement; visible-only countdown; four day folds/five rituals; drawing thread; fan controls, Home/End, touch swipe; full viewer swipe; hidden/offscreen/reduced motion.`);
  await p.close();
 }
 const p=await b.newPage({viewport:{width:421,height:900}});await open(p);await p.mouse.move(210,400);await p.mouse.wheel(0,640);await p.waitForTimeout(1500);assert(Math.abs(await p.evaluate(()=>scrollY)-640)<3);notes.push('PASS fine-pointer wheel easing preserves intended 640px distance on the real document.');
 await p.context().grantPermissions(['clipboard-read','clipboard-write']);await p.getByRole('button',{name:'Copy Link',exact:true}).click();assert.equal(await p.locator('.copy-feedback').textContent(),'Link copied');assert.equal(await p.evaluate(()=>navigator.clipboard.readText()),base);notes.push('PASS Copy Link feedback and exact invitation URL. No WhatsApp message sent.');await p.close();
 const files=async dir=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(async e=>e.isDirectory()?await files(dir+'/'+e.name):[dir+'/'+e.name]))).flat();
 const images=(await files(root+'/assets')).filter(x=>/\.(webp|png|jpe?g|svg)$/.test(x));
 const common=(await Promise.all(images.filter(x=>!x.endsWith('temple-desktop.webp')).map(async x=>(await stat(x)).size))).reduce((a,b)=>a+b,0),desktop=(await stat(root+'/assets/temple-desktop.webp')).size,first=(await stat(root+'/assets/toran.webp')).size;
 const js=gzipSync(await readFile(root+'/app.js')).length,css=gzipSync(await readFile(root+'/style.css')).length;
 assert(common<=450000&&desktop<=400000&&first<=150000&&js<=60000&&css<=25000);
 notes.push(`PASS budgets: common images ${common}; desktop-only ${desktop}; first screen ${first}; JS gzip ${js}; CSS gzip ${css}.`);
 await writeFile(root+'/experience-report.txt',notes.join('\n')+'\n');console.log(notes.join('\n'));
}finally{await b.close();}
