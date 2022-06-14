# Hardware Configuration 

```
   __  ____                        ____                     _      __ __  
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \ 
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/ 

```
## Hardware Overview
- Drone - DJI Tello
- GPS Receiver GT U7 _[6g]_
- Battery - Lithium Ion Polymer Battery-3.7v 350mAh _[9g]_
- Camera - Module V2 8MP _[3g]_
- Current Converter _[1.6g]_
- Raspberry pi (zero WH) _[12g]_
- microSD

## High-Level Architecture Design
![high-level-data-architecture-design-v2](https://github.com/idobetesh/DroneGuard/blob/master/assets/high-level-data-architecture-design-v2.png)

### Data Transfer Overview
Since the drone we purchased could not connect multiple devices, we had to create an internal network in which communication with the drone takes place.
All data traffic passes through an extender to which all system components are connected and can communicate.

#### Two servers run simultaniasly on the Raspberry Pi:
1. Camera server through which the camera output reaches the ui and is also responsible for saving the video.
2. Control server to which the information about the click performed by the rescuer [point (x, y)] is sent, on the control server our algorithm calculates the commands that must be performed in order to reach the desired point
These commands sent (via the extender) to the drone that performs the movement.