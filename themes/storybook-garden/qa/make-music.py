"""Original storybook waltz loop, synthesized locally; no third-party recording."""
import math,wave,array
rate=24000; duration=24
# Four eight-beat phrases in C pentatonic, lightly plucked strings and soft bells.
melody=[523.251,659.255,783.991,659.255,587.330,523.251,440.0,392.0,
        440.0,523.251,659.255,783.991,880.0,783.991,659.255,587.330,
        523.251,659.255,783.991,1046.502,880.0,783.991,659.255,523.251,
        440.0,523.251,587.330,659.255,587.330,523.251,440.0,523.251]
score=[(i*.75,f) for i,f in enumerate(melody)]
result=array.array('h')
for i in range(rate*duration):
 t=i/rate;value=0.0
 for start,freq in score:
  age=(t-start)%duration
  if age<1.8:
   env=(1-math.exp(-age*110))*math.exp(-age*4)
   value+=.11*env*(math.sin(2*math.pi*freq*age)+.2*math.sin(2*math.pi*freq*2*age)+.08*math.sin(2*math.pi*freq*3*age))
 for start in range(0,24,3):
  age=(t-start)%duration
  if age<2.5:value+=.035*math.exp(-age*2.5)*(math.sin(2*math.pi*130.8128*age)+.2*math.sin(2*math.pi*261.6256*age))
 result.append(round(30000*math.tanh(value)))
with wave.open('/tmp/storybook-loop.wav','wb') as out:
 out.setnchannels(1);out.setsampwidth(2);out.setframerate(rate);out.writeframes(result.tobytes())
