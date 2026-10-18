"""Original 24-second pentatonic garden loop; no third-party recording."""
import math, wave, array
rate=24000; duration=24; total=rate*duration
notes=[(0,523.25),(.75,659.25),(1.5,783.99),(2.25,880),(3.0,783.99),(3.75,659.25),(4.5,587.33),(5.25,523.25)]
score=[(time+bar*6,freq) for bar in range(4) for time,freq in notes]
samples=array.array('h')
for i in range(total):
 t=i/rate; value=0.
 for start,freq in score:
  age=(t-start)%duration
  if age<2.2:
   envelope=(1-math.exp(-age*90))*math.exp(-age*3.0)
   tone=math.sin(2*math.pi*freq*age)+.24*math.sin(2*math.pi*freq*2*age)+.07*math.sin(2*math.pi*freq*3*age)
   value+=.12*envelope*tone
 value+=.016*math.sin(2*math.pi*130.8128*t)*math.sin(math.pi*t/duration)**2
 samples.append(round(30000*math.tanh(value)))
with wave.open('/tmp/floral-garden-loop.wav','wb') as out:
 out.setnchannels(1);out.setsampwidth(2);out.setframerate(rate);out.writeframes(samples.tobytes())
