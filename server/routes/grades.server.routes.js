var grades = require('../controllers/grades.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {

  app.get('/grades/student', grades.studentGrades);
  app.get('/grades/class', grades.classGrades)

  app.get('/grades/class', function(req, res, next) {
    var teacher_id = req.param('teacher_id');
    var class_id = req.param('class_id');
    var token = req.headers.authorization;
    if (token) {
      var decoded = jwt.decode(token, jwtSecret);
      if (teacher_id === decoded.id) {
        grades.classGrades(class_id, req, res, next);
      }
    }

    grades.classGrades(class_id, req, res, next);
  });
  // app.get('/grades/:classId')

};
