var bookshelf = require('../config/db');

var Lesson = bookshelf.Model.extend({
  tableName: 'lessons'
});

Lesson.add = function(lessonData, callback) {
  lesson = new Lesson(lessonData)
    .save()
    .then(
    function(model) {
      callback(model);
    }
  );
};

module.exports = Lesson;