var grades = require('../controllers/grades.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {
  app.get('/grades', function(req, res, next) {
      console.log("Authenticating...");
      var studentName = req.param('student');
      var token = req.headers.authorization;
      if (token) {
        console.log("Token: ", token);
        // We are hardcoding our secret token in for now but in
        // production it should be an env variable.
        var decoded = jwt.decode(token, jwtSecret);
        console.log(decoded);
        if (studentName) {
          grades.listForUser(studentName, req, res, next);
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


  // app.get('/grades/:classId')

};
