# Classroom

## Development
- __Web App__
  - Fork the repo.
  - Clone from your fork
  - npm install
  - bower install
- __Database__
  - The schema is in /server/config/schema.sql
  - [Install mysql](https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html) (or brew install mysql) and start the mysql service with ``mysql.server start``
  - Import the schema with the command ``mysql -u root -p < server/config/schema.sql``
- __Running the app__
  - Rename start.sh.example to start.sh and edit it to use the username and password for your mysql database.
  - Run ``chmod +x start.sh`` to make the start.sh file executable.
  - Run ``npm start`` to start the server with nodemon.


## Directory Layout and Description of Files

- /
  - client/
    - app/
    - lib/
    - style/
    index.html
  - node_modules/ -- Self explanatory.
  - server/
    - config/
    - controllers/
    - models/
    - routes/
    - views/
    server.js
  - tests/
    - server
      - controllers
      - routes
  - .bowerrc
  - .dockerignore
  - .gitignore
  - bower.json
  - CONTRIBUTING.md
  - docker_build.sh
  - docker_start.sh
  - mysql_Dockerfile
  - msyql_start.sh
  - node_Dockerfile
  - node_start.sh
  - package.json
  - README.md
  - start.sh.example
  - STYLE-GUIDE.md

## Deployment

### Docker

- If you're using Mac, you'll have to install boot2docker and docker: https://docs.docker.com/installation/mac/
- Make sure you set up boot2docker correctly (boot2docker init, boot2docker up, boot2docker start, boot2docker shellinit, etc...). *Don't forget to type ``$(boot2docker shellinit)`` every time you open a new terminal window and want to use docker commands.*
- Scripts have been created to handle docker instance setup.
  - docker_build.sh (Necessary on the first build and every time you want to push changes you make locally to the docker containers).
  - docker_start.sh (Necessary every time you want to spin up a container of the image you made with docker_build).
  - node_start.sh (Only necessary if you want to spin up the node container by itself for testing purposes or if it crashed).
  - mysql_start.sh (Only necessary if you want to spin up the mysql container by itself for testing purposes or if it crashed).
- Once the containers are up and running, you should be able to access them at 192.168.59.103:3000 on your local machine.

## Problems you might run into during deployment/development
- [ERROR] InnoDB: Cannot allocate memory for the buffer pool
  - You might receive this error while trying to start the MySQL server on a VPS with limited resourcs (such as a $5 DigitalOcean droplet.
  - This is caused by not having enough memory. The solution https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-12-04
- MySQL ERROR! The server quit without updating PID file...
  - Seems to be fixed with a reboot.
  - This could be because of an edit to your my.cnf file that MySQL is unhappy with.
  - It could also be for some other reason I haven't been able to narrow down.

## Team

Product Owner: Richard Stanley
Scrum Lord: Eric Ihli
Product Team: Jake Lee, Devon Harvey
