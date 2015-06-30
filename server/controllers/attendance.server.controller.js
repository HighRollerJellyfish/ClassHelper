var Attendance = require('../models/attendance.server.model');

// Returns an object with all attendance data
exports.listAll = function(req, res, next) {
  new Attendance().fetchAll().then(function(collection) {
    res.json(collection);
  });
};

// Returns an object with all attendance data for a specific user
exports.listForUser = function(student, req, res, next) {
  new Attendance().where({student: student}).fetchAll().then(function(collection) {
    res.json(collection);
  });
};

// Creates new attendance data
exports.create = function(req, res, next) {
  Attendance.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};