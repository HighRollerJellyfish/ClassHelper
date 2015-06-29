var attendance = require('../controllers/attendance.server.controller.js');
var jwt = require('jwt-simple');

module.exports = function(app) {
  app.get('/attendance', function(req, res, next) {
      console.log("Authenticating...");
      var studentName = req.param('student');
      var token = req.headers.authorization;
      if (token) {
        console.log("Token: ", token);
        // We are hardcoding our secret token in for now but in
        // production it should be an env variable.
        var decoded = jwt.decode(token, 'abc');
        console.log(decoded);
        if (studentName) {
          attendance.listForUser(studentName, req, res, next);
        } else {
          attendance.listAll(req, res, next);
        }
      } else {
        res.send("No token...\n");
      }
    },
    attendance.listForUser
  );
  app.post('/attendance', function(req, res, next) {
    var token = req.headers.authorization;
    var decoded = jwt.decode(token, 'abc');
    //check if user is a teacher
    if(decoded.role === 'teacher'){
      attendance.create(req, res);
    } else {
      res.send("You do not have permission to edit attendance.");
    }
  },
  attendance.create);
};
