"""Original 24-second veena-like modal loop, synthesized without recordings."""
import math,wave,array
rate=24000;duration=24;out=array.array('h')
notes=[261.626,293.665,349.228,391.995,523.251,391.995,349.228,293.665,261.626,349.228,293.665,261.626]
for i in range(rate*duration):
 t=i/rate;v=0
 for j,f in enumerate(notes):
  age=(t-j*2)%duration
  if age<5:
   env=(1-math.exp(-age*45))*math.exp(-age*1.25)
   v+=env*.075*(math.sin(2*math.pi*f*age)+.32*math.sin(2*math.pi*f*2.002*age)+.1*math.sin(2*math.pi*f*3.004*age))
 for f in [130.813,195.998]:v+=.011*math.sin(math.pi*t/duration)**2*math.sin(2*math.pi*f*t)
 v*=min(1,t/1.5,(duration-t)/1.5);out.append(round(29000*math.tanh(v)))
with wave.open('/tmp/sannidhi-original-loop.wav','wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(out.tobytes())
