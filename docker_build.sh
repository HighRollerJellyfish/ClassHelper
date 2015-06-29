#!/bin/bash
./mysql_build.sh
./node_build.sh
echo "Docker containers should be up and running."
docker ps
echo "If you don't see any docker containers above... try running ./docker_start.sh"
