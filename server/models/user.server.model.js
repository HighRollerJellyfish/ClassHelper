var bookshelf = require('../config/db');
var User = bookshelf.Model.extend({
  tableName: 'users'
});

module.exports = User;