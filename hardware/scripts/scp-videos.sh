#!/bin/bash

# Secure copy videos from RP to our local machine

ERR_MSG=$(tput setaf 1; tput bold) # Red & Bold
SUC_MSG=$(tput setaf 2; tput bold) # Green & Bold
NC=$(tput sgr0) # Clear tput

# Path to the videos folder in RP
SRC_DIR_NAME="pi@169.254.232.194:'~/recordings/*.h264'"
# Path to the videos folder in local machine
DEST_DIR_NAME=/Users/ido/Desktop/local-videos/recordings

# Check connection with RP
if ping -q -c 1 -W 1 raspberrypi.local >/dev/null; then
    scp -r $SRC_DIR_NAME $DEST_DIR_NAME
    echo "${ERR_MSG}Done${NC}"
else
    echo "${ERR_MSG}No connection to RP... aborted${NC}"
fi
