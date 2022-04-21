#!/bin/bash

# Easy interaction with docker-compose

IMAGES=$(shell docker images -aq)
VOLUMES=$(shell docker volume ls -q)

# Build DroneGuard Project
build:
	docker-compose down \
	&& docker-compose build mongo_db dg_server debriefing_app control_server navigation_app

# Start DroneGuard Project [see specific ports in docker-compose file]
start:
	docker-compose up mongo_db dg_server debriefing_app control_server navigation_app \
	&& open http://localhost:3000 http://localhost:3003

# Stop DroneGuard Project containers
stop:
	docker-compose down

# Clear all DroneGuard volumes and images
clear:
	docker volume rm $(VOLUMES); docker rmi -f $(IMAGES)

# Run all `make` commands one by one [use carefully]
all:
	@read -p "Are you sure? [Y/n] " response; \
	if [[ $$response == y || $$response == y ]]; then \
        make stop; make clear; make build; make start; \
	fi