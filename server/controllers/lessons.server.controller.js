var Lesson = require('../models/lesson.server.model');

// Returns an array of all the lessons
exports.list = function(req, res, next) {
  new Lesson().fetchAll().then(function(collection) {
    var data = [];
    collection.forEach(function(el) {
      data.push(el);
    });
    res.json(data);
  });
};

// Creates a new lesson
exports.create = function(req, res, next) {
  Lesson.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};