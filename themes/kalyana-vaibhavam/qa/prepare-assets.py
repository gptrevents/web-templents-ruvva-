"""Prepare delivery derivatives. Generated originals remain untouched."""
from pathlib import Path
from PIL import Image
root=Path.home()/'.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464'
out=Path(__file__).resolve().parents[1]/'assets'
files={
 'palace-phone':('exec-2f342364-60bd-4f8e-b23e-0fb7f238e3eb.png',(570,1013),50),
 'palace-desktop':('exec-268c4b63-88b7-4720-8dfd-7ecda4689501.png',(1152,648),45),
 'kalyanam':('exec-75ea963e-57b6-497f-b6ac-8fee1960db20.png',(720,240),50),
 'banana-corner':('exec-5213c824-5479-4439-87b4-79b819bbae10.png',(320,427),52),
 'rituals':('exec-3d70d306-66d0-46ca-9589-2e04810f0edc.png',(640,214),54),
 'couple':('exec-8787afcf-4309-4785-bcaf-4da352d1c74c.png',(620,414),60),
 'vows':('exec-50962f5c-2c0e-4146-bf39-80fa16405055.png',(620,414),56),
 'evening':('exec-7a688224-30d9-4243-adab-86df71c4ff94.png',(620,414),54),
 'portrait-frame':('exec-ada08afd-6aa1-47e0-a700-bb92db8ff5aa.png',(330,440),52),
}
for name,(src,size,q) in files.items():
 im=Image.open(root/src);im.thumbnail(size,Image.Resampling.LANCZOS)
 if name in ['kalyanam','portrait-frame','rituals','banana-corner']:
  assert im.mode=='RGBA' and im.getextrema()[3][0]==0 and im.getextrema()[3][1]==255
  if name=='portrait-frame':assert im.getpixel((im.width//2,im.height//2))[3]==0
 im.save(out/(name+'.webp'),quality=q,method=6)
 print(name,im.size,(out/(name+'.webp')).stat().st_size)

im=Image.open(root/'exec-8787afcf-4309-4785-bcaf-4da352d1c74c.png')
for name,box in [('groom',(270,0,800,960)),('bride',(760,65,1260,1000))]:
 p=im.crop(box);p.thumbnail((250,450),Image.Resampling.LANCZOS);p.save(out/(name+'.webp'),quality=65,method=6)
 print(name,p.size,(out/(name+'.webp')).stat().st_size)
images=[f for f in out.rglob('*') if f.suffix=='.webp']
print('Common images',sum(f.stat().st_size for f in images if f.name!='palace-desktop.webp'))
