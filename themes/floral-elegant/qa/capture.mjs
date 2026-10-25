import {chromium} from 'playwright';
const browser=await chromium.launch();
for(const [kind,width,height] of [['phone',390,844],['desktop',1440,900]]){
 const page=await browser.newPage({viewport:{width,height}});await page.goto('http://127.0.0.1:4174/');await page.getByRole('button',{name:'Open Invitation',exact:true}).click();await page.locator('.opening').waitFor({state:'detached'});await page.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
 for(const node of await page.locator('.person,.event-card').all()){await node.scrollIntoViewIfNeeded();await page.waitForTimeout(800);}
 await page.locator('.event-rail').evaluate(n=>n.scrollTo({left:0,behavior:'instant'}));
 for(const section of await page.locator('section').all()){await section.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);await section.screenshot({path:`themes/floral-elegant/screenshots/${kind}/section-${await section.getAttribute('id')}.png`});}
 await page.close();
}
const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});await page.goto('http://127.0.0.1:4174/?data=telugu');await page.getByRole('button',{name:'Open Invitation',exact:true}).waitFor();await page.screenshot({path:'themes/floral-elegant/screenshots/phone/telugu-opening.png'});await page.getByRole('button',{name:'Open Invitation',exact:true}).click();await page.locator('.opening').waitFor({state:'detached'});for(const id of ['hero','couple','footer']){await page.locator('#'+id).scrollIntoViewIfNeeded();await page.locator('#'+id).screenshot({path:`themes/floral-elegant/screenshots/phone/telugu-${id}.png`});}
await browser.close();console.log('Section and Telugu detail screenshots refreshed.');
