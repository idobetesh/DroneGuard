# Camera Setup

```
   __  ____                        ____                     _      __ __
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/

```

# Camera setup

1. In /DroneGuard/camera run </br>
   `$ v4l2rtspserver -W 640 -H 480 -F 15 -P 8554 /dev/video0`
2. In /DroneGuard/Hardware/Camera run:</br>
   `$ ffmpeg -i rtsp:/192.168.0.102:8554/unicast -fflags flush_packets -flags -global_header -hls_time 0 -hls_list_size 1 -vcodec copy -y ./video/ipcam/index.m3u8`
3. In /DroneGuard/Hardware/Camera/server run:

- `$ node cleaner.js`
- `$ node hls-server.js`

4. Check that in the relevant route `http://<RASPBERRY-PI-IP>:4000/index.m3u8` we need to see json content.
5. Run client check if we see stream.
