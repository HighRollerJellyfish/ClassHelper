var Lesson = require('../models/lesson.server.model');

exports.list = function(req, res, next) {
  new Lesson().fetchAll().then(function(collection) {
    var data = [];
    collection.forEach(function(el) {
      data.push(el);
    });
    res.json(data);
  });
};