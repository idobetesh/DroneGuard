#!/bin/sh

tput setaf 6;
echo "   __  ____                        ____                     _      __ __   "
echo "  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \  "
echo " / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _' |  __/ _' |   / /   \ \ "
echo " \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / / "
echo "  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/  "

tput sgr0; 
echo

echo " ========= Starting camera ========= "
/home/pi/droneGuard/DroneGuard/Hardware/ v4l2rtspserver -W 640 -H 480 -F 15 -P 8554 /dev/video0
sleep 2

echo " ========= Starting ffmpeg convertion from rtsp to m3u8 ========= "
/home/pi/droneGuard/DroneGuard/Hardware/Camera ffmpeg -i rtsp://192.168.43.140:8554/unicast -fflags flush_packets -max_delay 2 -flags -global_header -hls_time 2 -hls_list_size 3 -vcodec copy -y ./index.m3u8
sleep 2

echo " ========= Starting hls server ========= "
/home/pi/droneGuard/DroneGuard/Hardware/Camera/server node hls-server.js
sleep 2

echo " ========= Starting cleaner ========= "
/home/pi/droneGuard/DroneGuard/Hardware/Camera/server node cleaner.js
sleep 2