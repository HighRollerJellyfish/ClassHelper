#!/bin/bash
source config.sh

echo "Stopping and removing any old classroom-db containers."
docker stop classroom-db
docker rm classroom-db

echo "Building a new classroom/mysql:v1 image from mysql_Dockerfile."
docker build -t classroom/mysql:v1 -f mysql_Dockerfile .

echo "Running a new classroom/mysql:v1 container and naming it classroom-db."
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=$CLASSROOM_MYSQL_PASS --name classroom-db classroom/mysql:v1

# Sleep 10 seconds to give time for the daemon to start up.
echo "Waiting a few seconds for the mysql daemon to start up so we can import our schema."
sleep 10

# Initialize the database
echo "Importing the schema to initialize a new database."
docker exec classroom-db /bin/bash -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD" < schema.sql'
