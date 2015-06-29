echo "Stopping and removing any old classroom-web containers."
docker stop classroom-web
docker rm classroom-web

echo "Building a new classroom/node:v1 image from node_Dockerfile."
docker build -t classroom/node:v1 -f node_Dockerfile .

echo "Running a new container from the classroom/node:v1 image, naming the container classroom-web, and linking the container to classroom-db."
docker run -d -p 3000:3000 --name classroom-web --link classroom-db:classroom-db classroom/node:v1
