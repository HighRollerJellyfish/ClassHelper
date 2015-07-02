var bookshelf = require('../config/db');

var Class = bookshelf.Model.extend({
  tableName: 'classes'
});

// Attendance.add = function(attendanceData, callback) {
//   grade = new Attendance(attendanceData)
//   .save()
//   .then(function(model) {
//     callback(model);
//   })
//   .catch(function(err) {
//     callback(err);
//   });
// };

module.exports = Class;