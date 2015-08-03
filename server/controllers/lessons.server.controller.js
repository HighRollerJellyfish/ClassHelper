var Lesson = require('../models/lesson.server.model');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

// Returns all lessons belonging to a class (the id of which is provided in params)
// TODO: validate that user has access to class
exports.classLessons = function(req, res, next) {
  var class_id = req.param('class_id');
  var token = req.headers.authorization;
  if (token) {
      Lesson.classLessons(class_id, function(data) {
        return res.json(data);
      });
  } else {
    return res.send("Invalid credentials");
  } 
};

// Adds a lesson to a given class
// TODO: validate that user has access to class
exports.addLesson = function(req, res, next) {
  Lesson.add(req.body, function(model) {
    res.send(model);
  });
};


