from datetime import datetime
from djitellopy import tello

def log(drone):
    print(f' ============= {datetime.now()} ============= ')
    print(f'Battery: {drone.get_battery()}%')