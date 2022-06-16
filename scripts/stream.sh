#!/bin/sh

tput setaf 6;
echo "   __  ____                        ____                     _      __ __   "
echo "  / / |  _ \ _ __ ___  _ __   ___ / ___|_   _  __ _ _ __ __| |    / / \ \  "
echo " / /  | | | | '__/ _ \| '_ \ / _ \ |  _| | | |/ _' |  __/ _' |   / /   \ \ "
echo " \ \  | |_| | | | (_) | | | |  __/ |_| | |_| | (_| | | | (_| |  / /    / / "
echo "  \_\ |____/|_|  \___/|_| |_|\___|\____|\__,_|\__,_|_|  \__,_| /_/    /_/  "

tput sgr0; 
echo

###################
### RTSP => HLS ###         
###################

# option 1 
ffmpeg -i http://169.254.232.194:8554/unicast -f hls -acodec copy -movflags frag_keyframe+empty_moov -hls_flags delete_segments+append_list -hls_time 2 -hls_list_size 5 ./video/ipcam/index.m3u8

# option 2
# ffmpeg -i rtsp://<RASPBERRY-PI-IP>:8554/unicast -fflags flush_packets -flags -global_header -hls_time 0 -hls_list_size 1 -vcodec copy -y ./video/ipcam/index.m3u8