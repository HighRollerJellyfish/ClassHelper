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
      } 
    } 

    return res.send("Invalid credentials");
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
      }
    });

  } 

  return res.send("Invalid credentials");
};

// Greates a new grade
exports.create = function(req, res, next) {
  Grade.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};

