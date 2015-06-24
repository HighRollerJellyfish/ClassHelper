var Attendance = require('../models/attendance.server.model');

exports.listAll = function(req, res, next) {
  new Attendance().fetchAll().then(function(collection) {
    res.json(collection);
  });
};

exports.listForUser = function(student, req, res, next) {
  new Attendance().where({student: student}).fetchAll().then(function(collection) {
    res.json(collection);
  });
};

exports.create = function(req, res, next) {
  Attendance.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};