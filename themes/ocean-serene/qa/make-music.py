"""Original 24-second airy ocean pad and soft synthesized surf; no external recording."""
import math,wave,array
rate=24000;duration=24
chords=[[146.832,184.997,220.0],[196.0,246.942,293.665],[123.471,146.832,184.997],[110.0,138.591,164.814]]
lead=[587.33,659.255,739.989,880.0,739.989,659.255]
out=array.array('h');noise=0.;state=1701
for i in range(rate*duration):
 t=i/rate;value=0.
 for bar,chord in enumerate(chords):
  age=(t-bar*6)%duration
  if age<6:
   env=math.sin(math.pi*age/6)**2
   value+=.022*env*sum(math.sin(2*math.pi*f*t)+.15*math.sin(2*math.pi*f*2*t) for f in chord)
 for index,f in enumerate(lead):
  age=(t-index*4)%duration
  if age<4:value+=.025*math.sin(math.pi*age/4)**2*math.sin(2*math.pi*f*t)
 state=(1664525*state+1013904223)&0xffffffff;raw=state/2147483648.-1;noise=.96*noise+.04*raw
 value+=.05*noise*(.6-.4*math.cos(2*math.pi*t/8))
 out.append(round(30000*math.tanh(value)))
with wave.open('/tmp/ocean-serene-loop.wav','wb') as f:
 f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(out.tobytes())
