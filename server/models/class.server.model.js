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

module.exports = Class;
