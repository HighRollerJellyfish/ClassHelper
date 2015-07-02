var Grade = require('../models/grade.server.model');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

// Returns a list of all of a single students grades in all 
// of her assignments in all of her classes
exports.studentGrades = function(req, res, next) {
  console.log("AAAA");
    var student_id = req.param('student_id');
    var token = req.headers.authorization;
    if (token) {
      var decoded = jwt.decode(token, jwtSecret);
      if (student_id === decoded.id) {
        Grade.studentGrades(student_id, function(data) {
          return res.json(data);
        });
      } 
    } else {
      return res.send("No token...\n");
    }
    next();
};

// OLD TO DELETE
// exports.studentGrades = function(student_id, req, res, next) {
//   Grade.studentGrades(student_id, function(data) {
//     res.json(data);
//   });
// });

// Returns a list of every student's grades in all assignments
// for a given class
exports.classGrades = function(class_id, req, res, next) {
  Grade.classGrades(class_id, function(data) {
    res.json(data);
  });
};

// Greates a new grade
exports.create = function(req, res, next) {
  Grade.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};

