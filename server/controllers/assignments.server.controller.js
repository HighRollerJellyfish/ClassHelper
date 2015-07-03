var Assignment = require('../models/assignment.server.model');
var User = require('../models/user.server.model');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

// Returns all lessons belonging to a class (the id of which is provided in params)
exports.getAssignments = function(req, res, next) {
  var user_id = req.param('user_id');
  var token = req.headers.authorization;
  if (token) {
    var decoded = jwt.decode(token, jwtSecret);
    if (user_id == decoded.id) {
      new User({id: user_id})
      .fetch()
      .then(function(user) {
        if (user.get('role') == 'student') {
          new Assignment.studentAssignments(user_id, function(data) {
            return res.json(data);
          });
        } else if (user.get('role') == 'teacher') {
          new Assignment.teacherAssignments(user_id, function(data) {
            return res.json(data);
          });
        }
      });
    } else {
      
    }
  } else {
    return res.send("Invalid credentials");
  }
};

exports.addAssignment = function(req, res, next) {
  Assignment.add(req.body, function(model) {
    res.send(model);
  });
};



