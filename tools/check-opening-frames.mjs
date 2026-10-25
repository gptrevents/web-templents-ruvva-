import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const themes=['temple-dawn','floral-elegant','storybook-garden','ocean-serene','varnika','sannidhi','kalyana-vaibhavam'];
const b=await chromium.launch();const timings={};
try{
for(const id of themes){
 for(const width of [390,1440]){
 const p=await b.newPage({viewport:{width,height:width===390?844:900}});
 await p.goto(`http://127.0.0.1:4175/themes/${id}/?g=Rohit`);
 const dir=`/tmp/ruvva-opening-frames/${id}-${width}`;await mkdir(dir,{recursive:true});
 const button=p.getByRole('button',{name:'Open Invitation',exact:true});await button.waitFor();
 const start=Date.now();await button.click();
 const times=[];
 for(let i=0;i<13;i++){
  await p.waitForTimeout(Math.max(0,start+i*200-Date.now()));
  times.push(Date.now()-start);
  await p.screenshot({path:`${dir}/${String(i).padStart(2,'0')}.png`});
 }
 timings[id+'-'+width]=times;
 await p.locator('.opening').waitFor({state:'detached'});await p.close();
 }
 console.log('PASS frames',id);
}
await writeFile('/tmp/ruvva-opening-frames/timings.json',JSON.stringify(timings,null,2));
execFileSync('python3',['-c',`
from PIL import Image,ImageDraw,ImageStat
from pathlib import Path
import json
outcomes=[]
for folder in sorted(Path('/tmp/ruvva-opening-frames').iterdir()):
 if not folder.is_dir():continue
 files=sorted(folder.glob('*.png'));sheet=Image.new('RGB',(1300,230),'#eee');draw=ImageDraw.Draw(sheet)
 for i,p in enumerate(files):
  im=Image.open(p).convert('RGB');center=im.crop((im.width*.15,im.height*.1,im.width*.85,im.height*.9));tiny=center.resize((90,90));colors=len(tiny.getcolors(8101) or [])
  assert colors>48,(folder.name,p.name,'flat viewport',colors)
  im.thumbnail((98,205));sheet.paste(im,(i*100,20));draw.text((i*100,2),str(i*200)+' ms',fill='#222')
 dest=Path('themes')/folder.name.rsplit('-',1)[0]/'screenshots'/'opening-frames';dest.mkdir(exist_ok=True,parents=True);sheet.save(dest/(folder.name.rsplit('-',1)[1]+'.jpg'),quality=88)
 outcomes.append('PASS '+folder.name+': 13 frames at 200ms targets; central viewport retains content/artwork (no flat frame).')
Path('tools/opening-frames-report.txt').write_text('\\n'.join(outcomes)+'\\nActual capture times: '+json.dumps(json.loads(Path('/tmp/ruvva-opening-frames/timings.json').read_text()))+'\\n')
`]);
}finally{await b.close();}
