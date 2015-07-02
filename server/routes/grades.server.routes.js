var grades = require('../controllers/grades.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {

  app.get('/grades/student', grades.studentGrades);
  app.get('/grades/class', grades.classGrades);

};
