var bookshelf = require('../config/db');

var Grade = bookshelf.Model.extend({
  tableName: 'grades'
});

Grade.add = function(gradeData, callback) {
  grade = new Grade(gradeData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

module.exports = Grade;