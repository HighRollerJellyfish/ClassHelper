#!/bin/bash
docker stop classroom-db
docker rm classroom-db
docker build --no-cache -t eihli/mysql:v2 -f mysql_Dockerfile .
docker run -d -p 3306:3306 --name classroom-db eihli/mysql:v2
sleep 5
docker exec classroom-db /bin/bash -c "mysql -uroot -ppassword < schema.sql"
sleep 5
