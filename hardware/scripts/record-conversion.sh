#!/bin/bash

# This script converts, uploads videos to S3 Bucket and creates record objects in DG DB
# Navigate to /DroneGuard/hardware/scripts/ and run => $./record-conversion.sh <BUCKET_URL> <BEARER_TOKEN>

# args[1] => url to S3 bucket [should ends with `/`]
# args[2] => bearer token [should not starts with `Bearer`] !!needs to be fixed!!
AWS_URL=$1 
TOKEN=$2

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

	### TODO ###
	# Get user token in order to POST new recordings to DB
	#
	# curl --location --request POST 'http://localhost:3001/api/user/login' \
	# -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMGI5ZTJkYWE0N2NiMzhmMDA0MDM1NyIsImlhdCI6MTY1MTE0NzgzMywiZXhwIjoxNjUzNzM5ODMzfQ.vQeAfMMGQFe0ICJLbAIn_MmXaWjgDfLz4XOOK8LqMtU' \
	# -H 'Content-Type: application/json' \
	# --data-raw '{
    # 	"email": "admin@gmail.com",
    # 	"password": "12345"
	# }'

	# POST request to DroneGuard BE to create new record
	for FILE in $DIR_NAME*;
	do
		if [[ "$FILE" == *.h264 ]]; then
			TMP="${FILE##*/}"
			VIDEO="$AWS_URL${TMP%.*}.mp4"
			TN="$AWS_URL${TMP%.*}.png"

			curl --location --request POST 'http://localhost:3001/api/record' \
			-H 'Authorization: Bearer "'$TOKEN'"' \
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
