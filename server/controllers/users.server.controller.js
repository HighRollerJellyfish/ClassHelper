var User = require('../models/user.server.model');
exports.list = function(req, res, next) {
  var data = [];
  new User().fetchAll().then(function(collection) {
    collection.forEach(function(el) {
      data.push(el);
    });
    res.json(data);
  });
};