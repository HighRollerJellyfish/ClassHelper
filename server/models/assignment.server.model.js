var bookshelf = require('../config/db');

var Assignment = bookshelf.Model.extend({
  tableName: 'assignments'
});

Assignment.add = function(assignmentData, callback) {
  assignment = new Assignment(assignmentData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

Assignment.classLessons = function(class_id, callback) {
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

Assignment.studentAssignments = function(student_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      assignments.title AS assignment_title, \
      assignments.id AS assignment_id, \
      assignments.due_date AS assignment_due_date, \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM assignments, classes, enrollment \
    WHERE assignments.class_id = classes.id \
      AND classes.id = enrollment.class_id \
      AND enrollment.student_id = ' + student_id
  ).then(function(data) {
    callback(data[0]);
  });
};

Assignment.teacherAssignments = function(teacher_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      assignments.title AS assignment_title, \
      assignments.id AS assignment_id, \
      assignments.due_date AS assignment_due_date, \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM assignments, classes \
    WHERE assignments.class_id = classes.id \
      AND classes.teacher_id = ' + teacher_id
  ).then(function(data) {
    callback(data[0]);
  });
};

module.exports = Assignment;