var Grade = require('../models/grade.server.model');
var Class = require('../models/class.server.model')
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

// Returns a list of all of a single students grades in all 
// of her assignments in all of her classes
exports.studentGrades = function(req, res, next) {
    var student_id = req.param('student_id');
    var token = req.headers.authorization;
    if (token) {

      var decoded = jwt.decode(token, jwtSecret);
      if (student_id == decoded.id) {
        Grade.studentGrades(student_id, function(data) {
          return res.json(data);
        });
      } else {
        return res.send("Invalid credentials");
      }
    } else {
      return res.send("Invalid credentials");
    }
};


// Returns a list of every student's grades in all assignments
// for a given class
exports.classGrades = function(req, res, next) {
  var class_id = req.param('class_id');
  var token = req.headers.authorization;
  if (token) {
    var decoded = jwt.decode(token, jwtSecret);
    Class.getTeacherId(class_id, function(classTeacherId) {
      if (decoded.id == classTeacherId) {
        Grade.classGrades(class_id, function(data) {
          res.json(data);
        });
      } else {
        return res.send("Invalid credentials");
      }
    });
  } else {
    return res.send("Invalid credentials");
  }

};


// Adds a grade or edits an existing grade
exports.addOrEditGrade = function(req, res, next) {
  Grade.addOrEdit(req.body, function(model) {
    res.send(model);
  });
};

