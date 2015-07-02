var bookshelf = require('../config/db');

var Class = bookshelf.Model.extend({
  tableName: 'classes'
});

Class.getTeacherId = function(class_id) {
  bookshelf.knex('classes')
  .select('teacher_id')
  .where('id', '=', class_id)
  .then(function(data) {
    callback(data);
  });
};

module.exports = Class;
