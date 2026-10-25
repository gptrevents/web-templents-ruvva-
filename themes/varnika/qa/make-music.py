"""Original 24-second quiet plucked-string and breath-tone wedding loop; no recordings."""
import math,wave,array
rate=24000;duration=24;out=array.array('h')
notes=[293.665,369.994,440,493.883,440,369.994,329.628,293.665,246.942,293.665,369.994,329.628]
for i in range(rate*duration):
 t=i/rate;v=0
 for j,f in enumerate(notes):
  age=(t-j*2)%duration
  if age<5:
   env=(1-math.exp(-age*35))*math.exp(-age*1.15)
   v+=env*.07*(math.sin(2*math.pi*f*age)+.23*math.sin(2*math.pi*f*2.001*age)+.08*math.sin(2*math.pi*f*3.002*age))
 for f in [146.832,220.0]:v+=.012*math.sin(math.pi*t/duration)**2*math.sin(2*math.pi*f*t)
 v*=min(1,t/1.5,(duration-t)/1.5)
 out.append(round(29000*math.tanh(v)))
with wave.open('/tmp/varnika-original-loop.wav','wb') as f:f.setnchannels(1);f.setsampwidth(2);f.setframerate(rate);f.writeframes(out.tobytes())
