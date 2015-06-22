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
  var userData = req.body;
  User.add(userData, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log(result);
      next(result);
    }
  });
};

exports.authenticate = function(req, res, next) {
  var userData = req.body;
  console.log(userData);
  User.authenticate(userData, function(err, result) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("User is authenticated.", result);
      res.send(result);
    }
  });
};
