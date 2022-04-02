#!/bin/sh

tput setaf 6;
echo "   __  ____                        ____                     _      __ __   "
echo "  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \  "
echo " / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _' |  __/ _' |   / /   \ \ "
echo " \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / / "
echo "  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/  "

tput sgr0; 
echo

echo ================ Starting camera and control-server ================ 
cd /Users/ido/Desktop/test &&
ffmpeg -i rtsp://169.254.232.194:8554/unicast -acodec copy -f hls -hls_flags delete_segments+append_list ./video/ipcam/index.m3u8 
&
cd /Users/ido/Documents/Shenkar-Software-Engineering/4TH/DroneGuard/hardware/camera/server && 
npm start 
&&
fg
