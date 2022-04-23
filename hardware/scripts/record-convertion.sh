#!/bin/bash

for file in  /home/pi/recordings/*.h264;
do
	ffmpeg -framerate 24 -i "$file" -c copy "${file%.*}.mp4"
done

for file in /home/pi/recordings/*.mp4;
do
	aws s3 mv $file s3:<bucket_name>
done