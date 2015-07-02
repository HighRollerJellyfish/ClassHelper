var Lesson = require('../models/lesson.server.model');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;
// // Returns an array of all the lessons
// exports.list = function(req, res, next) {
//   new Lesson().fetchAll().then(function(collection) {
//     var data = [];
//     collection.forEach(function(el) {
//       data.push(el);
//     });
//     res.json(data);
//   });
// };

// // Creates a new lesson
// exports.create = function(req, res, next) {

//   Lesson.add(req.body, function(model) {
//     console.log(model);
//     res.send(model);
//   });
// };

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



