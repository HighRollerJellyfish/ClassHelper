var Grade = require('../models/grade.server.model');

exports.listAll = function(req, res, next) {
  new Grade().fetchAll().then(function(collection) {
    res.json(collection);
  });
};

exports.listForUser = function(student, req, res, next) {
  new Grade().where({student: student}).fetchAll().then(function(collection) {
    res.json(collection);
  });
};

exports.create = function(req, res, next) {
  Grade.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};