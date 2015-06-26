# Classroom

## Deployment
- https://www.digitalocean.com/community/tutorials/how-to-add-swap-on-ubuntu-12-04

## Docker
- You'll have to install boot2docker and docker: https://docs.docker.com/installation/mac/
- Make sure you set up boot2docker correctly (boot2docker init, boot2docker start, boot2docker shellinit, etc...)
- Scripts have been created to handle docker instance setup
- Make the following files executable with chmod +x
  - docker_build.sh
  - docker_start.sh
- If ./docker_build.sh doesn't start the containers, follow it up with a ./docker_start.sh
- Once the containers are up and running, you should be able to access them at 192.168.59.103:3000 on your local machine.

## Dev Notes!
- The schema.sql test users will no longer authenticate now that
  we are using bcrypt to compare passwords.
  If you need a test user for dev purposes, create one using:
  curl -X POST -H 'Content-Type:application/json' -d '{"username":"batman", "name":"batman", "password":"robin", "email":"batman@gmail.com", "role":"student"}' http://localhost:3000/users/signup
  or
  The signup page (it works!)

## To start the server for development purposes

### Web Server
- git clone from your fork
- npm install
- bower install
- (Follow database setup instructions below)
- make sure mysql is installed (brew install mysql or however you want to install it)
- make sure the mysql server is started (mysql.server start)
- edit the start.sh.example file to use the mysql username/password from your local machine and rename it to start.sh
- chmod +x start.sh to make the start script executable
- npm start

### Database
- The schema is in /server/config/schema.sql
- Set your machine's mysql username and password in the /start.sh script.
- Install mysql and start the mysql service with 'mysql.server start'
- Once you get mysql installed on your machine, you can create/seed the database with 'mysql -u <username> -p server/config/schema.sql'


## Team

Product Owner: Richard Stanley
Scrum Lord: Eric Ihli
Product Team: Jake Lee, Devon Harvey
