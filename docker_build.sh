#!/bin/bash
./mysql_start.sh
./node_start.sh
echo "Docker containers up and running. Server is live!"
docker ps
