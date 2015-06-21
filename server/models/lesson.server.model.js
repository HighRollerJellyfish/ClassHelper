var bookshelf = require('../config/db');

var Lesson = module.exports.Lesson = bookshelf.Model.extend({
  tableName: 'lessons'
});

module.exports = Lesson;