#!/bin/bash
# Import environment variables with 'source config.sh'
source config.sh

echo "Stopping and removing any old classroom-db containers."
docker stop classroom-db
docker rm classroom-db

echo "Running a new classroom/mysql:v1 container and naming it classroom-db."
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=$CLASSROOM_MYSQL_PASS --name classroom-db classroom/mysql:v1
