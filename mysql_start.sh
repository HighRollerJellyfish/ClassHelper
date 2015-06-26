#!/bin/bash
docker stop classroom-db
docker rm classroom-db
# docker build -t eihli/mysql:v2 -f mysql_Dockerfile .
docker run -d -p 3306:3306 --name classroom-db eihli/mysql:v2
sleep 10
docker exec classroom-db /bin/bash -c "mysql -uroot -ppassword < schema.sql"
