import keyPressedModule as kp
from datetime import datetime
from djitellopy import tello
import droneStateLogger as logger
import uuid
import time
import cv2


kp.init()
drone = tello.Tello()
drone.connect()
global img
drone.streamon()

def getKeyboardInput() -> list:
    speed = 50
    lr = 0 # left/right
    fb = 0 # forward/backward
    ud = 0 # up/down
    yv = 0 # yaw/velocity

    if kp.getKey('LEFT'): # arrow key left => move left
        lr = -speed
    elif kp.getKey('RIGHT'): # arrow key right => move right
        lr = speed

    if kp.getKey('UP'): # arrow key up => move forward
        fb = speed
    elif kp.getKey('DOWN'): # arrow key down => move backward
        fb = -speed

    if kp.getKey('w'): # up
        ud = speed
    elif kp.getKey('s'): # down
        ud = -speed

    if kp.getKey('a'): # rotate left
        yv = -speed
    elif kp.getKey('d'): # rotate right
        yv = speed

    if kp.getKey('t'): # takeoff drone
        drone.takeoff()

    if kp.getKey('q'): # land drone
        drone.land()
        time.sleep(3)

    if kp.getKey('c'): # take a photo
        cv2.imwrite(f"./tello-captures/{str(uuid.uuid4()).split('-')[0]}-{datetime.now().date()}.jpg", img)
        time.sleep(0.3)

    if kp.getKey('l'): # write current state log
        logger.log(drone)
        time.sleep(0.3)

    if kp.getKey('x'): # exit program
        if drone.get_height() == 0:
            exit()

    return [lr, fb, ud, yv]



while True:
    vals = getKeyboardInput()
    # send_rc_control(left_right_velocity: int, forward_backward_velocity: int, up_down_velocity: int, yaw_velocity: int)
    drone.send_rc_control(vals[0],vals[1],vals[2],vals[3])
    img = drone.get_frame_read().frame
    img = cv2.resize(img, (360, 240))
    cv2.imshow('Image', img)
    cv2.waitKey(1)

