var express = require('express'),
  app = express(),
  mysql = require('mysql');

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

connection.end();