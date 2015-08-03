var bookshelf = require('../config/db');

var Lesson = bookshelf.Model.extend({
  tableName: 'lessons'
});

Lesson.add = function(lessonData, callback) {
  lesson = new Lesson(lessonData)
  .save()
  .then(function(model) {
    console.log("Lesson successfully saved");
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

Lesson.classLessons = function(class_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      classes.id AS class_id, \
      lessons.id AS lesson_id, \
      lessons.title AS lesson_title, \
      lessons.description AS lesson_description, \
      lessons.content AS lesson_content \
    FROM lessons, classes \
    WHERE lessons.class_id = classes.id \
      AND classes.id = ' + class_id
  )
  .then(function(data) {
    callback(data[0]);
  });
};


module.exports = Lesson;