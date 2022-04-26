#!/bin/bash

# Convert and upload videos to S3 Bucket

BUCKET_NAME=drone-guard-debriefing
DIR_NAME=/Users/ido/Desktop/local-videos/recordings/

CNT_MP4=$(ls $DIR_NAME*.mp4 | wc -l)
CNT_H264=$(ls $DIR_NAME*.h264 | wc -l)

# Make sure to have wifi connection
echo -e "GET http://google.com HTTP/1.0\n\n" | nc google.com 80 > /dev/null 2>&1

if [ $? -eq 0 ]; then
    # Convert .h264 videos to .mp4 using ffmpg
	if [$CNT_H264 -eq 0] then;
		echo "Start .h264 => .MP4 conversion..."
		for FILE in $DIR_NAME*.h264;
		do
			ffmpeg -framerate 24 -i "$FILE" -c copy "${FILE%.*}.mp4"
		done
		echo "Done conversion"
	fi

	# Move mp4 videos to S3 bucket
	if [$CNT_MP4 -eq 0] then;
		echo "Uploading..."
		for FILE in $DIR_NAME*.mp4;
		do
			aws s3 mv $FILE s3://$BUCKET_NAME
		done
		echo "Done upload"
	fi

	# Remove all .h264 videos [Request confirmation]
	echo "Remove .h264 videos..."
	rm -i $DIR_NAME*.h264
else
    echo "No wifi connection... aborted"
	exit 1
fi
