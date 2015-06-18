var express = require('express'),
  app = express(),
  mysql = require('mysql');

/*
* Connect to the MySQL Database
* These variables are set for you automatically
* if you start this .js file with 'npm start'.
* You'll have to edit the example start.sh file
* to have your own username and password.
*/
var connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: 'classroom'
});

connection.connect();

connection.query('SELECT * FROM users', function(err, rows, fields) {
  if (err) throw err;
  console.log(rows[0]);
});

app.get('/', function(req, res) {
  var body = []
  connection.query('SELECT * FROM users', function(err, rows, fields) {
    rows.forEach(function(el, i, arr) {
      body.push(el);
    });
    res.json(body);
  });
});


var server = app.listen(3000)


/*
* Shutdown the server gracefully, closing
* the MySQL connection manually.
*/
process.on('SIGTERM', function() {
  console.log("\nClosing due to SIGTERM");
  server.close();
});

process.on('SIGINT', function() {
  console.log("\nClosing due ot SIGINT");
  server.close();
});

server.on('close', function() {
  console.log("Closing server");
  connection.end(function(err) {
    console.log("Mysql Connections closed");
  });;
});