#!/bin/bash

# This script converts, uploads videos to S3 Bucket and creates record objects in DG DB
# Navigate to /DroneGuard/hardware/scripts/ and run => $./record-conversion.sh <BUCKET_URL>

# args[1] => url to S3 bucket [should ends with `/`]
AWS_URL=$1 

BUCKET_NAME=mid-debriefing-bucket
DIR_NAME=/Users/ido/Desktop/local-videos/recordings/

if [ $# -lt 1 ]; then
  echo 1>&2 "$0: Bucket URL is missing"
  echo '[$./record-conversion.sh <BUCKET_URL>]'
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
	echo "Done conversion"

	# Move mp4 videos and .png thumbnails to S3 bucket
	echo "Uploading..."
	for FILE in $DIR_NAME*;
	do
		if [[ "$FILE" == *.mp4 || "$FILE" == *.png ]]; then
			aws s3 mv $FILE s3://$BUCKET_NAME
		fi
	done

	# [TBD] Remove all .h264 videos [Request confirmation]
	# echo "Remove .h264 videos..."
	# rm -i $DIR_NAME*.h264
else
    echo "No wifi connection... aborted"
	exit 0
fi
