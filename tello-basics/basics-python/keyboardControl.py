import keyPressedModule as kp
from djitellopy import tello
import time


kp.init()
drone = tello.Tello()
drone.connect()
print(f'Battery: {drone.get_battery()}%')

def getKeyboardInput():
    speed = 50
    lr = 0 # left/right
    fb = 0 # forward/backward
    ud = 0 # up/down
    yv = 0 # yaw/velocity

    if kp.getKey('LEFT'):
        lr = -speed
    elif kp.getKey('RIGHT'):
        lr = speed

    if kp.getKey('UP'):
        fb = speed
    elif kp.getKey('DOWN'):
        fb = -speed

    if kp.getKey('w'): # up
        ud = speed
    elif kp.getKey('s'): # down
        ud = -speed

    if kp.getKey('a'): # rotate left
        yv = speed
    elif kp.getKey('d'): # rotate right
        yv = -speed

    if kp.getKey('t'): # takeoff drone
        drone.takeoff()

    if kp.getKey('q'): # land drone
        drone.land()

    return [lr, fb, ud, yv]


while True:
    vals = getKeyboardInput()
    #send_rc_control(left_right_velocity: int, forward_backward_velocity: int, up_down_velocity: int, yaw_velocity: int)
    drone.send_rc_control(vals[0],vals[1],vals[2],vals[3])
    time.sleep(0.05)
