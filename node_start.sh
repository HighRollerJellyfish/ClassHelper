#!/bin/bash
docker stop classroom-web
docker rm classroom-web
docker build --no-cache -t eihli/node:v2 -f node_Dockerfile .
docker run -d -p 3000:3000 --name classroom-web --link classroom-db:classroom-db eihli/node:v2
