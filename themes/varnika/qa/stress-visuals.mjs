import {chromium} from 'playwright';
const b=await chromium.launch();
try{for(const width of [390,1440]){
 const p=await b.newPage({viewport:{width,height:width===390?844:900},reducedMotion:'reduce'});const size=width===390?'phone':'desktop';
 await p.goto('http://127.0.0.1:4178/?data=telugu');await p.waitForTimeout(500);await p.screenshot({path:`themes/varnika/screenshots/${size}/telugu-opening.png`});
 await p.getByRole('button',{name:'Open Invitation',exact:true}).click();await p.locator('.opening').waitFor({state:'detached'});await p.locator('#footer').scrollIntoViewIfNeeded();await p.waitForTimeout(200);await p.locator('#footer').screenshot({path:`themes/varnika/screenshots/${size}/telugu-footer.png`});
 await p.close();
}}finally{await b.close();}
