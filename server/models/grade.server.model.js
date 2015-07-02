var bookshelf = require('../config/db');
// var knex = require('knex');

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

Grade.studentGrades = function(student_id, callback) {
  // bookshelf.knex('grades')
  // .join('assignments', 'grades.assignment_id', '=', 'assignments.id')
  // .join('classes', 'assignments.class_id', '=', 'classes.id')
  // .select('grades.id', 'assignments.title', 'grades.score', 'grades.student_id', 'grades.assignment_id', 'assignments.class_id', 'classes.title')
  // .where('grades.student_id', '=', student_id)
  // .then(function(data) {
  //   callback(data);
  // });
  bookshelf.knex.from('grades')
  .innerJoin('assignments', 'grades.assignment_id', 'assignments.id')
  .innerJoin('classes', 'assignments.class_id', 'classes.id')
  .select('grades.id', 'assignments.title', 'grades.score', 'grades.student_id', 'grades.assignment_id', 'assignments.class_id', 'classes.title')
  .where('grades.student_id', '=', student_id)
  .then(function(data) {
    callback(data);
  });
};

module.exports = Grade;

Grade.studentGrades('5', function(data) {
  console.log(data);
});