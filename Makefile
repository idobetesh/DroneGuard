#!/bin/bash

IMAGES=$(shell docker images -aq)
VOLUMES=$(shell docker volume ls -q)

########################## Installations ##########################
## Install all DroneGuard dependencies [no need if using docker] ##
###################################################################

.SILENT install:
	cd ./control-server && npm install; \
	cd ../debriefing-service/server && npm install; \
	cd ../../debriefing-service/client && npm install; \
	cd ../../droneguard-app && npm install --force;



################# Docker #################
## Easy interaction with docker-compose ##
##########################################

# Build DroneGuard project images from internal docker files
build:
	docker-compose down \
	&& docker-compose build mongo_db dg_server debriefing_app control_server navigation_app

# Start DroneGuard project containers [see specific ports in docker-compose file]
start:
	docker-compose up mongo_db dg_server debriefing_app control_server navigation_app \
	&& open http://localhost:3000 http://localhost:3003

# Stop DroneGuard project and remove containers
stop:
	docker-compose down

# Clear all DroneGuard volumes and images
clear:
	docker volume rm $(VOLUMES); docker rmi -f $(IMAGES)

# Run all `make` commands one by one [use carefully]
all:
	@read -p "Are you sure? [Y/n] " response; \
	if [[ $$response == y || $$response == Y ]]; then \
        make stop; make clear; make build; make start; \
	fi



############## Scripts ##############
## Videos, Conversions and Uploads ##
#####################################

# Copy videos from RP to local machine
copy:
	cd ./scripts && ./scp-videos.sh;

# Convert all .h264 videos to .mp4
convert:
	cd ./scripts && ./mp4-conversion.sh;
	
# Convert videos to MP4 and upload to S3 bucket, 
# add bucket URL before running the command
upload:
	cd ./scripts && ./record-conversion-and-upload.sh '<ENTER-BUCKET-URL>';
	