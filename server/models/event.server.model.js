var bookshelf = require('../config/db');

var Event = bookshelf.Model.extend({
  tableName: 'events'
});

Event.add = function(eventData, callback) {
  event = new Event(eventData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

Event.studentEvents = function(student_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      events.title AS title, \
      events.description AS description, \
      events.id AS event_id, \
      events.start_date AS start, \
      events.end_date AS end, \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM events, classes, enrollment \
    WHERE events.class_id = classes.id \
      AND classes.id = enrollment.class_id \
      AND enrollment.student_id = ' + student_id
  ).then(function(data) {
    callback(data[0]);
  });
};

Event.teacherEvents = function(teacher_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      events.title AS title, \
      events.description AS description, \
      events.id AS event_id, \
      events.start_date AS start, \
      events.end_date AS end, \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM events, classes \
    WHERE events.class_id = classes.id \
      AND classes.teacher_id = ' + teacher_id
  ).then(function(data) {
    callback(data[0]);
  });
};

module.exports = Event;