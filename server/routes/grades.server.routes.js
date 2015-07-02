var grades = require('../controllers/grades.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {
  // app.get('/grades', function(req, res, next) {
  //     var studentName = req.param('student');
  //     var token = req.headers.authorization;

  //     if (token) {
  //       var decoded = jwt.decode(token, jwtSecret);
  //       if (studentName) {
  //         grades.listForUser(5, req, res, next);
  //       } else {
  //         grades.listAll(req, res, next);
  //       }
  //     } else {
  //       res.send("No token...\n");
  //     }
  //   },
  //   grades.listForUser
  // );

  // app.post('/grades', function(req, res, next) {
  //   var token = req.headers.authorization;
  //   var decoded = jwt.decode(token, 'abc');
  //   //check if user is a teacher
  //   if(decoded.role === 'teacher'){
  //     grades.create(req, res);
  //   } else {
  //     res.send("You do not have permission to edit grades.");
  //   }
  // },
  // grades.create);

  app.get('/grades/student', grades.studentGrades);


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
