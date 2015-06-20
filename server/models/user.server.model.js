var bookshelf = require('../config/db');
var User = module.exports = bookshelf.Model.extend({
  tableName: 'users'
});