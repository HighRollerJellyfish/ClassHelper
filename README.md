# Classroom

## To start the server for development purposes

### Web Server
- git clone from your fork
- npm install
- bower install
- chmod +x start.sh to make the start script executable
- (Follow database setup instructions below)
- npm start

### Database
- The schema is in /server/config/schema.sql
- Set your machine's mysql username and password in the /start.sh script.
- Install mysql and start the mysql service with 'mysql.server start'
- Once you get mysql installed on your machine, you can create/seed the database with 'mysql -u <username> -p tmp/schema.sql'


## Team

Product Owner: Richard Stanley
Scrum Lord: Eric Ihli
Product Team: Jake Lee, Devon Harvey
