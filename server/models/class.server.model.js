var bookshelf = require('../config/db');

var Class = bookshelf.Model.extend({
  tableName: 'classes'
});

Class.getTeacherId = function(class_id, callback) {
  bookshelf.knex('classes')
  .select('teacher_id')
  .where('id', '=', class_id)
  .then(function(data) {
    callback(data[0].teacher_id);
  });
};

Class.add = function(classData, callback) {
  newClass = new Class(classData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

module.exports = Class;
