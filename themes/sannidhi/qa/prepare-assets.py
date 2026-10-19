"""Lossy WebP delivery derivatives only; no creative image editing."""
from pathlib import Path
from PIL import Image
root=Path('/Users/raghuram/.codex/generated_images/01a14f05-92a1-7b71-ab6d-a7195658b464')
out=Path(__file__).resolve().parents[1]/'assets'
files={
 'temple-phone':('exec-b5b41bcd-9c7c-4295-89fe-8126dc33d25e.png',(700,1244),65),
 'temple-desktop':('exec-4d066046-ac58-43b4-8474-2758df8f946c.png',(1440,810),69),
 'toran':('exec-c3776efd-3cfd-42e4-842c-005627dd9db5.png',(900,300),60),
 'elephants':('exec-9a82222d-10ee-47f8-a60a-1ca6efb3d05f.png',(720,240),62),
 'walk':('exec-f88a9862-e5a4-429b-9386-c0b2ce6645f8.png',(650,434),64),
 'evening':('exec-4f818b9a-1b86-426f-a695-29195019a380.png',(650,434),64),
 'hands':('exec-d78a5f8a-6bee-475d-a6c1-8559f34e2b1c.png',(650,434),64),
 'courtyard':('exec-a5b13a01-9e65-4cca-b5a2-085610a7bc8d.png',(650,434),64),
}
for name,(src,size,q) in files.items():
 im=Image.open(root/src);im.thumbnail(size,Image.Resampling.LANCZOS)
 if name in ['toran','elephants']:
  assert im.mode=='RGBA' and im.getextrema()[3][0]==0 and im.getextrema()[3][1]==255
 im.save(out/(name+'.webp'),quality=q,method=6)
 print(name,im.size,(out/(name+'.webp')).stat().st_size)
im=Image.open(root/'exec-a5b13a01-9e65-4cca-b5a2-085610a7bc8d.png')
for name,box in [('groom',(420,15,800,1000)),('bride',(760,90,1115,1010))]:
 p=im.crop(box);p.thumbnail((300,550),Image.Resampling.LANCZOS);p.save(out/(name+'.webp'),quality=64,method=6)
 print(name,(out/(name+'.webp')).stat().st_size)
