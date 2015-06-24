#!/bin/bash
./mysql_start.sh
sleep 5
./node_start.sh
echo "Docker containers up and running. Server is live!"
docker ps
echo "If you don't see any docker containers above... run ./docker_start.sh"
