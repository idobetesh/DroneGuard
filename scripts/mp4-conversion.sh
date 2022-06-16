#!/bin/bash

# This script converts .h264 videos to .mp4 using ffmpg and generate thumbnail (.png)

DIR_NAME=/Users/ido/Desktop/local-videos/recordings/
SRC_DIR_NAME=/Users/ido/Desktop/local-videos/mp4

ERR_MSG=$(tput setaf 1; tput bold) # Red & Bold
SUC_MSG=$(tput setaf 2; tput bold) # Green & Bold
NC=$(tput sgr0) # Clear tput


echo "Start .h264 => .MP4 conversion..."
for FILE in $DIR_NAME*;
do
    if [[ "$FILE" == *.h264 ]]; then
        ffmpeg -framerate 24 -i "$FILE" -c copy "${FILE%.*}.mp4"
        ffmpeg -i "$FILE" -ss 00:00:20.000 -vframes 1 "${FILE%.*}.png"
    fi
done

echo "${SUC_MSG}Done conversion${NC}"

sleep 2

# Check for new mp4 videos and move them to the relevant folder
mp4_files=$(shopt -s nullglob dotglob; echo $DIR_NAME*.mp4)
if (( ${#mp4_files} ))
then
    echo "Move .mp4 and .png files"
    mv $DIR_NAME*.mp4 $DIR_NAME*.png $SRC_DIR_NAME
    echo "${SUC_MSG}Done${NC}"
else 
  echo "${ERR_MSG}No MP4 files were found${NC}"
fi
