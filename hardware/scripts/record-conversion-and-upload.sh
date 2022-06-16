#!/bin/bash

# This script converts, uploads videos to S3 Bucket and creates record objects in DG DB
# Navigate to /DroneGuard/hardware/scripts/ and run => $./record-conversion-and-upload.sh <BUCKET_URL>

# Run as a crontab job every hour [0 * * * *]

# args[1] => url to S3 bucket [should ends with `/`]
AWS_URL=$1 

BUCKET_NAME=mid-debriefing-bucket
DIR_NAME=/Users/ido/Desktop/local-videos/recordings/

ERR_MSG=$(tput setaf 1; tput bold) # Red & Bold
SUC_MSG=$(tput setaf 2; tput bold) # Green & Bold
NC=$(tput sgr0) # Clear tput

# In case this script gets executed from a make command,
# make sure to add the bucket URL to the Makefile.
if [ $AWS_URL == '<ENTER-BUCKET-URL>' ]; then 
    echo "${ERR_MSG}Add the bucket URL to the Makfile!${NC}"
    exit 0;
fi

if [ $# -lt 1 ]; then
  echo 1>&2 "${ERR_MSG} $0: Bucket URL is missing${NC}"
  echo '[$./record-conversion-and-upload.sh <BUCKET_URL>]'
  exit 0
fi

# Make sure to have wifi connection
echo -e "GET http://google.com HTTP/1.0\n\n" | nc google.com 80 > /dev/null 2>&1

if [ $? -eq 0 ]; then
    # Convert .h264 videos to .mp4 using ffmpg and generate thumbnail (.png)
	echo "Start .h264 => .MP4 conversion..."
	for FILE in $DIR_NAME*;
	do
		if [[ "$FILE" == *.h264 ]]; then
			ffmpeg -framerate 24 -i "$FILE" -c copy "${FILE%.*}.mp4"
			ffmpeg -i "$FILE" -ss 00:00:10.000 -vframes 1 "${FILE%.*}.png"
		fi
	done
	echo "${SUC_MSG}Done conversion${NC}"

	# Move mp4 videos and .png thumbnails to S3 bucket
	echo "Uploading..."
	for FILE in $DIR_NAME*;
	do
		if [[ "$FILE" == *.mp4 || "$FILE" == *.png ]]; then
			aws s3 mv $FILE s3://$BUCKET_NAME
		fi
	done
	echo "${SUC_MSG}Done upload${NC}"

	# [TBD] Remove all .h264 videos [Request confirmation]
	# echo "Remove .h264 videos..."
	# rm -i $DIR_NAME*.h264
else
    echo "${ERR_MSG}No wifi connection... aborted${NC}"
	exit 0
fi
