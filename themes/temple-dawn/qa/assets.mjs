import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import {stat,appendFile} from 'node:fs/promises';
const browser=await chromium.launch();const notes=[];
for(const width of [390,1440]){
 const p=await browser.newPage({viewport:{width,height:900}});const requests=[];p.on('request',r=>{if(r.url().endsWith('.webp'))requests.push(r.url().split('/').pop());});await p.goto('http://127.0.0.1:4173/');await p.waitForTimeout(1200);const first=[...new Set(requests)];let total=0;for(const f of first){try{total+=(await stat('themes/temple-dawn/assets/'+f)).size;}catch{total+=(await stat('themes/temple-dawn/assets/sample/'+f)).size;}}assert.ok(total<=150000,`opening image budget ${width}: ${total}`);await p.getByRole('button',{name:'Open Invitation',exact:true}).click();await p.waitForTimeout(2000);const urls=[...new Set(requests)];if(width===390){assert.ok(urls.includes('courtyard-phone.webp'));assert.ok(!urls.some(x=>x.includes('desktop')));}else{assert.ok(urls.includes('courtyard-desktop.webp'));assert.ok(!urls.includes('courtyard-phone.webp'));assert.ok(!urls.includes('doors-phone.webp'));}notes.push(`${width}px opening image payload ${total} bytes; correct background variant only.`);await p.close();
}
await appendFile('themes/temple-dawn/verification.txt',notes.join('\n')+'\n');console.log(notes.join('\n'));await browser.close();
