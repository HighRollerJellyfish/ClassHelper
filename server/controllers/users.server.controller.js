var User = require('../models/user.server.model');
var jwt = require('jwt-simple');
var jwtSecret = 'abc'; // CHANGE THIS BEFORE PRODUCTION! It should be an ENV var.

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
      var token = jwt.encode(result, jwtSecret);
      console.log("Created token: ", token);
      res.json({token: token});
    }
  });
};
