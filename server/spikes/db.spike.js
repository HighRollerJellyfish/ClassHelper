var User = require('../models/user.server.model');

new User().fetchAll().then(function(collection) {
  collection.forEach(function(el) {
    console.log(el);
  });
});