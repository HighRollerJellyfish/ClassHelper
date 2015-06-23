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

// Respond with a json object that contains the token
// and whatever user data we need to send to the client.
// Any time the client makes a request to change something
// on the server, we'll verify the token. 
// For everything else client-side, we'll use this user
// object by storing it in localStorage.
exports.authenticate = function(req, res, next) {
  var userData = req.body;
  console.log(userData);
  User.authenticate(userData, function(err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      console.log("User is authenticated.", user);
      var token = jwt.encode(user, jwtSecret);
      console.log("Created token: ", token);
      res.json({
        token: token,
        username: user.get('username'),
        role: user.get('role')
      });
    }
  });
};
