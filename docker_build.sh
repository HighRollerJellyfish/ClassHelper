#!/bin/bash

echo "Running ./mysql_build.sh"
./mysql_build.sh

echo "Running ./node_build.sh"
./node_build.sh

echo "Docker containers should be up and running. List of docker containers currently running:"
docker ps

echo "If you don't see any docker containers above... try running ./docker_start.sh"
