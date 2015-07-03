var bookshelf = require('../config/db');

var Enrollment = bookshelf.Model.extend({
  tableName: 'enrollment'
});

Enrollment.add = function(enrollmentData, callback) {
  console.log(enrollmentData);
  enrollment = new Enrollment(enrollmentData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

module.exports = Enrollment;
