var bookshelf = require('../config/db');
var User = bookshelf.Model.extend({
  tableName: 'users'
});

User.add = function(userData, callback) {

  user = new User(userData)
  .save()
  .then(function(model) {
    callback(model);
  });
};

module.exports = User;
