from datetime import datetime
from djitellopy import tello

def log(drone: tello.Tello) -> None:
    with open('./logs/logs.txt', 'a') as file:
        file.write(f'''============= {datetime.now()} =============
                       Battery: {drone.get_battery()}%
                       Height: {drone.get_height()}cm
                       Barometer: {drone.get_barometer()}
                       YAW: {drone.get_yaw()}    
                       Current State: {drone.get_current_state()}
                ''')