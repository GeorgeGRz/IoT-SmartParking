#!/usr/bin/env python

# srte.py
# 2017-01-11
# Public Domain

import time
import pigpio # http://abyz.me.uk/rpi/pigpio/python.html

SOS=340.29

class sonar:
   """
   Class to read distance using a sonar ranger.

   Instantiate with the Pi, trigger GPIO, and echo GPIO.

   Trigger a reading with trigger().

   Wait long enough for the maximum echo time and get the
   reading in centimetres with read().   A reading of 999.9
   indicates no echo.

   When finished call cancel() to tidy up.
   """
   def __init__(self, pi, trigger, echo,tag):
      self.pi = pi
      self.occupied = False
      self.trig = trigger
      self.tag = tag
      self._distance = 999.9
      self._one_tick = None

      if trigger is not None:
         pi.set_mode(trigger, pigpio.OUTPUT)

      pi.set_mode(echo, pigpio.INPUT)

      self._cb = pi.callback(echo, pigpio.EITHER_EDGE, self._cbf)

   def _cbf(self, gpio, level, tick):
      if level == 1:
         self._one_tick = tick
      else:
         if self._one_tick is not None:
            ping_micros = pigpio.tickDiff(self._one_tick, tick)
            self._distance = (ping_micros * SOS) / 2e4
            self._one_tick = None

   def trigger(self):
      self._distance = 999.9
      self._one_tick = None

      if self.trig is not None:
         self.pi.gpio_trigger(self.trig, 15) # 15 micros trigger pulse

   def read(self):
      return self._distance
   def __str__(self):
       return self.tag
    
   def cancel(self):
      self._cb.cancel()

if __name__ == "__main__":

   import time
   import pigpio

   pi = pigpio.pi()

   if not pi.connected:
      exit()

   S=[]
   S.append(sonar(pi, None, 20,"00"))
   S.append(sonar(pi, None, 12,"01"))
   S.append(sonar(pi, None, 16,"02"))
   S.append(sonar(pi, 26, 21,"03"))
   
   end = time.time() + 30.0

   r = 1

   import requests
   url = "https://192.168.1.2/update_status"
   try:
      while True:

         for s in S:
            s.trigger()

         time.sleep(0.03)

         for s in S:
            if s.read() <= 10 and s.occupied == False:
                s.occupied = True
                myobj = {'coordinates': str(s),"status":"true"}
                x = requests.post(url,verify=False,data = myobj)
                print(x)
                print("CAR ENTERED") 
                print("{} {:.1f} TAG={}".format(r, s.read(),str(s)))
            if s.read() > 15 and s.occupied == True:
                s.occupied = False
                print("CAR LEFT ")
                myobj = {'coordinates': str(s),"status":"false"}
                x = requests.post(url,verify=False,data = myobj)
                print("{} {:.1f} TAG={}".format(r, s.read(),str(s)))

         time.sleep(0.2)

         r += 1

   except KeyboardInterrupt:
      pass

   print("\ntidying up")

   for s in S:
      s.cancel()

   pi.stop()