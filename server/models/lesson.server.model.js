var bookshelf = require('../config/db');

var Lesson = bookshelf.Model.extend({
  tableName: 'lessons'
});

module.exports = Lesson;