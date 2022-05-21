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
v4l2rtspserver -W 640 -H 480 -F 15 -P 8554 /dev/video0 
&
node /home/pi/test/controll-server/app.js 
&& fg

