var bookshelf = require('../config/db');

var Attendance = bookshelf.Model.extend({
  tableName: 'attendance'
});

Attendance.add = function(attendanceData, callback) {
  grade = new Attendance(attendanceData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

module.exports = Attendance;