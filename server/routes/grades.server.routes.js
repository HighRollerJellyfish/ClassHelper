var grades = require('../controllers/grades.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {
  app.get('/grades', function(req, res, next) {
      console.log("AAA");
      console.log(req.body);
      var studentName = req.param('student');
      console.log("Student name:", studentName);
      var token = req.headers.authorization;
      console.log("Token: ", token);

      if (token) {
        var decoded = jwt.decode(token, jwtSecret);
        console.log(decoded);
        console.log("CCC")
        if (studentName) {
          grades.listForUser(5, req, res, next);
        } else {
          grades.listAll(req, res, next);
        }
      } else {
        res.send("No token...\n");
      }
    },
    grades.listForUser
  );

  app.post('/grades', function(req, res, next) {
    var token = req.headers.authorization;
    var decoded = jwt.decode(token, 'abc');
    //check if user is a teacher
    if(decoded.role === 'teacher'){
      grades.create(req, res);
    } else {
      res.send("You do not have permission to edit grades.");
    }
  },
  grades.create);

  app.get('/grades/student', function(req, res, next) {
    var student_id = req.param('student_id');
    var token = req.headers.authorization;
    if (token) {
      var decoded = jwt.decode(token, jwtSecret);
      if (student_id === decoded.id) {
        grades.studentGrades(student_id, req, res, next);
      } 
    } else {
      res.send("No token...\n");
    }
  });


  // app.get('/grades/:classId')

};
