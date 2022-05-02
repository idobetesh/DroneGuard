#!/bin/bash

# Prerequisites: jq (https://stedolan.github.io/jq/)

# This script converts, uploads videos to S3 Bucket and creates record objects in DG DB
# Navigate to /DroneGuard/hardware/scripts/ and run => $./record-conversion.sh <BUCKET_URL> <USER_EMAIL> <USER_PASSWORD>

# args[1] => url to S3 bucket [should ends with `/`]
# args[2] => user email
# args[2] => user password
AWS_URL=$1 
EMAIL=$2
PASSWORD=$3

BUCKET_NAME=drone-guard-debriefing
DIR_NAME=/Users/ido/Desktop/local-videos/recordings/

# Make sure to have wifi connection
echo -e "GET http://google.com HTTP/1.0\n\n" | nc google.com 80 > /dev/null 2>&1

if [ $? -eq 0 ]; then
    # Convert .h264 videos to .mp4 using ffmpg and generate thumbnail (.png)
	echo "Start .h264 => .MP4 conversion..."
	for FILE in $DIR_NAME*;
	do
		if [[ "$FILE" == *.h264 ]]; then
			ffmpeg -framerate 24 -i "$FILE" -c copy "${FILE%.*}.mp4"
			ffmpeg -i "$FILE" -ss 00:00:01.000 -vframes 1 "${FILE%.*}.png"
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

	# Get user token in order to POST new recordings to DB
	TOKEN=$(curl --location --request POST 'http://localhost:3001/api/user/login' \
        -H 'Content-Type: application/json' \
        --data-raw '{
        "email": "'$EMAIL'",
        "password": "'$PASSWORD'"
        }' | jq -r '.token')

	sleep 1

	# POST request to DroneGuard BE to create new record
	for FILE in $DIR_NAME*;
	do
		if [[ "$FILE" == *.h264 ]]; then
			TMP="${FILE##*/}"
			VIDEO="$AWS_URL${TMP%.*}.mp4"
			TN="$AWS_URL${TMP%.*}.png"

			curl --location --request POST 'http://localhost:3001/api/record' \
			-H 'Authorization: Bearer '$TOKEN'' \
			-H 'Content-Type: application/json' \
			-d '{"url": "'$VIDEO'", "thumbnailUrl": "'$TN'"}'

			sleep 2
		fi
	done

	# [TBD] Remove all .h264 videos [Request confirmation]
	# echo "Remove .h264 videos..."
	# rm -i $DIR_NAME*.h264
else
    echo "No wifi connection... aborted"
	exit 0
fi
