var Grade = require('../models/grade.server.model');

// Returns an object of all grades
exports.listAll = function(req, res, next) {
  new Grade().fetchAll().then(function(collection) {
    res.json(collection);
  });
};

// Returns an object of all grades for a given student
exports.listForUser = function(student_id, req, res, next) {
  new Grade().where({student_id: student_id}).fetchAll().then(function(collection) {
    console.log(collection.toJSON());
    res.json(collection);
  });
};

// Greates a new grade
exports.create = function(req, res, next) {
  Grade.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};

