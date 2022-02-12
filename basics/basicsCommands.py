from djitellopy import tello
import time

drone = tello.Tello()
drone.connect()
print(drone.get_battery())
print(drone.get_height())
drone.takeoff()
time.sleep(2)
drone.send_rc_control(0,20,20,0)
time.sleep(4)
drone.land()