"""High-resolution delivery exports. Originals remain untouched; no alpha quantization."""
from pathlib import Path
from PIL import Image
root=Path.home()/'.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464'
out=Path(__file__).resolve().parents[1]/'assets'
files={
 'palace-phone':('exec-2f342364-60bd-4f8e-b23e-0fb7f238e3eb.png',(1080,1920),88),
 'palace-desktop':('exec-268c4b63-88b7-4720-8dfd-7ecda4689501.png',(1920,1080),88),
 'paanigrahanam':('exec-a313ca52-fc11-4697-bd37-3a9600a99afa.png',(2172,724),90),
 'sacred-fire':('exec-f39b691b-2273-48e7-a5b6-2532e9dd5d44.png',(2172,724),90),
 'kalyanam':('exec-75ea963e-57b6-497f-b6ac-8fee1960db20.png',(2172,724),90),
 'rituals':('exec-3d70d306-66d0-46ca-9589-2e04810f0edc.png',(2172,728),88),
 'couple':('exec-8787afcf-4309-4785-bcaf-4da352d1c74c.png',(1536,1024),90),
 'vows':('exec-50962f5c-2c0e-4146-bf39-80fa16405055.png',(1536,1024),90),
 'evening':('exec-7a688224-30d9-4243-adab-86df71c4ff94.png',(1536,1024),90),
 'portrait-frame':('exec-ada08afd-6aa1-47e0-a700-bb92db8ff5aa.png',(1000,1400),90),
 'scene-canopy':('exec-a3f61af6-da54-408c-9dc7-8abc28fd1d2a.png',(2172,724),88),
 'countdown-phone':('exec-b4a003ec-2496-4192-a693-a9bbaec4a93c.png',(1122,1402),88),
 'countdown-desktop':('exec-b8b77f02-6b56-461d-a028-c666cc40bf3f.png',(1672,941),88),
}
for name,(src,size,q) in files.items():
 im=Image.open(root/src);im.thumbnail(size,Image.Resampling.LANCZOS)
 if name in ['kalyanam','paanigrahanam','sacred-fire','portrait-frame','rituals','scene-canopy']:
  assert im.mode=='RGBA' and im.getextrema()[3][0]==0
 im.save(out/(name+'.webp'),quality=q,method=6)
 if name in ['kalyanam','paanigrahanam','sacred-fire']:
  for width in [960,1440]:
   variant=Image.open(root/src);variant.thumbnail((width,500),Image.Resampling.LANCZOS)
   variant.save(out/(name+'-'+str(width)+'.webp'),quality=90,method=6)
 print(name,im.size,(out/(name+'.webp')).stat().st_size,flush=True)
im=Image.open(root/'exec-8787afcf-4309-4785-bcaf-4da352d1c74c.png')
for name,box in [('groom',(270,0,800,960)),('bride',(760,65,1260,1000))]:
 p=im.crop(box);p.save(out/(name+'.webp'),quality=92,method=6)
images=[f for f in out.rglob('*') if f.suffix in ['.webp','.svg']]
print('All image variants',sum(f.stat().st_size for f in images))
