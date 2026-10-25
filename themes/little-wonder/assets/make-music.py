"""Original 24-second garden music-box loop; no sampled or third-party melody."""
import math, wave, struct
from pathlib import Path
rate=22050; length=24; samples=[0.0]*(rate*length)
def note(midi,start,duration,volume):
 f=440*2**((midi-69)/12)
 for i in range(int(duration*rate)):
  t=i/rate; idx=int(start*rate)+i
  if idx>=len(samples):break
  env=(1-math.exp(-t*65))*math.exp(-t*3.3)*(min(1,(duration-t)*8))
  tone=math.sin(2*math.pi*f*t)+.18*math.sin(2*math.pi*f*2.01*t)+.06*math.sin(2*math.pi*f*3*t)
  samples[idx]+=tone*env*volume
melody=[72,76,79,76,74,77,81,77,76,79,84,79,74,77,79,71]
for i in range(48):
 note(melody[i%16],i*.5,1.4,.21)
 if i%4==0:note([48,53,55,48][(i//4)%4],i*.5,1.9,.10)
peak=max(abs(x) for x in samples)
out=Path('/tmp/little-wonder-music.wav')
with wave.open(str(out),'wb') as w:
 w.setparams((1,2,rate,0,'NONE','not compressed'));w.writeframes(b''.join(struct.pack('<h',int(x/max(peak,1)*24000)) for x in samples))
print(out)
