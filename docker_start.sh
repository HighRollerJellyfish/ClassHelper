docker stop classroom-db
docker stop classroom-web
docker rm classroom-db
docker rm classroom-web
docker run -d -p 3306:3306 --name classroom-db eihli/mysql:v2
docker run -d -p 3000:3000 --link classroom-db:classroom-db --name classroom-web eihli/node:v2
