var bookshelf = require('../config/db');
// var knex = require('knex');

var Grade = bookshelf.Model.extend({
  tableName: 'grades'
});

//
Grade.addOrEdit = function(gradeData, callback) {
  new Grade().query({where: {student_id: gradeData.student_id, assignment_id: gradeData.assignment_id}})
  .fetch()
  .then(function(grade){
    if (!grade) {
      console.log("GRADE DOESNT EXIST")
      newGrade = new Grade(gradeData)
      .save()
      .then(function(model) {
        callback(model);
      })
      .catch(function(err) {
        callback(err);
      });
    } else {
      grade.set('score', gradeData.score);
      grade.save()
      .then(function(model) {
         callback(model);
      });
     
    }
  });
};


  // grade = new Grade(gradeData)
  // .save()
  // .then(function(model) {
  //   callback(model);
  // })
  // .catch(function(err) {
  //   callback(err);
  // });


  








Grade.studentGrades = function(student_id, callback) {
  // bookshelf.knex('grades')
  // .join('assignments', 'grades.assignment_id', '=', 'assignments.id')
  // .join('classes', 'assignments.class_id', '=', 'classes.id')
  // .select('grades.id', 'assignments.title', 'grades.score', 'grades.student_id', 'grades.assignment_id', 'assignments.class_id', 'classes.title')
  // .where('grades.student_id', '=', student_id)
  // .then(function(data) {
  //   callback(data);
  // });

  bookshelf.knex.raw(' \
    SELECT \
      grades.score AS grade, \
      assignments.title AS assignment_title, \
      assignments.id AS assignment_id, \
      assignments.due_date AS assignment_date, \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM grades, assignments, classes \
    WHERE grades.assignment_id = assignments.id \
      AND assignments.class_id = classes.id \
      AND grades.student_id = ' + student_id
  )
  .then(function(data) {
    callback(data[0]);
  });
};


Grade.classGrades = function(class_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      CONCAT(users.first_name, \' \', users.last_name) AS student_name, \
      grades.score AS grade, \
      assignments.title AS assignment_title, \
      assignments.id AS assignment_id, \
      assignments.due_date AS assignment_date \
    FROM users, grades, assignments  \
    WHERE users.id = grades.student_id \
      AND grades.assignment_id = assignments.id \
      AND assignments.class_id = ' + class_id 
  )
  .then(function(data) {
    callback(data[0]);
  });
};

module.exports = Grade;
