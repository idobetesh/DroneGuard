# Camera Setup

```
   __  ____                        ____                     _      __ __
  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \
 / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _` | '__/ _` |   / /   \ \
 \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / /
  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/

```

1. In /DroneGuard/hardware/camera run:</br>
   `$ v4l2rtspserver -W 640 -H 480 -F 15 -P 8554 /dev/video0`
2. Open a new terminal tab, go to /DroneGuard/hardware/camera and run:</br>
   `$ ffmpeg -i rtsp://<RASPBERRY-PI-IP>:8554/unicast -fflags flush_packets -flags -global_header -hls_time 0 -hls_list_size 1 -vcodec copy -y ./video/ipcam/index.m3u8`
3. Open a new terminal tab go to /DroneGuard/hardware/camera/server and run:
- `$ node cleaner.js`
- `$ node hls-server.js`

4. Test video streaming:
- Open or Curl `http://<RASPBERRY-PI-IP>:4000/index.m3u8`, you should see the following output:</br>

```
#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:1
#EXT-X-MEDIA-SEQUENCE:45
#EXTINF:1.497733,
index45.ts
```

5. On your local machine go to `droneguard-app/src`</br>
run `$ npm start` </br>
You should see the video stream!

### Relevan links:
- <a href='https://github.com/muhdmirzamz/hls-stream' target='_blank'>hls-stream</a>
- <a href='https://www.youtube.com/watch?v=Acmng0FHHqI' target='_blank'>How to stream IP Camera RTSP stream into browser</a>
- <a href='https://siytek.com/raspberry-pi-rtsp-to-home-assistant/' target='_blank'>Raspberry Pi RTSP Camera</a>
- <a href='https://github.com/mpromonet/v4l2rtspserver' target='_blank'>v4l2rtspserver</a>
- <a href='https://www.ffmpeg.org/ffmpeg-protocols.html#rtsp' target='_blank'>ffmpeg-protocols</a>

