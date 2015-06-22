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

exports.create = function(req, res, next) {
  var newUser = {
    name: "Bart Simpson1",
    email: "eatmyshorts1@springfield.gov",
    username: "Bart11",
    password: "biteme1",
    role: "student"
  };

  User.add(newUser);
};