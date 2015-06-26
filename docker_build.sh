#!/bin/bash
./mysql_start.sh
sleep 5
./node_start.sh
sleep 5
echo "Docker containers up and running. Server is live!"
docker ps
echo "If you don't see any docker containers above... run ./docker_start.sh"
echo "I tell you what... I'll go ahead and run it for you just in case..."
./docker_start.sh
docker ps
echo "There..."
