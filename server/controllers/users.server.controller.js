var User = require('../models/user.server.model');
var jwt = require('jwt-simple');
var jwtSecret = 'abc'; // CHANGE THIS BEFORE PRODUCTION! It should be an ENV var.

// Returns an array of all users
exports.list = function(req, res, next) {
  var data = [];
  new User().fetchAll().then(function(collection) {
    collection.forEach(function(el) {
      data.push(el);
    });
    res.json(data);
  });
};

// Creates a new user
exports.signup = function(req, res, next) {
  var userData = req.body;
  User.add(userData, function(err, user) {
    if (err) {
      console.log(err);
      res.status(409).send(err);
    } else {
      console.log(user);
      res.json(user);
    }
  });
};

// Refresh token
exports.refresh = function (req, res, next) {
  var token = req.headers.authorization;
  var decoded = jwt.decode(token, 'abc');
  var userInfo = {name: decoded.first_name + ' ' + decoded.last_name, role: decoded.role, id: decoded.id, token: token};
  res.json(userInfo);
};

// Respond with a json object that contains the token
// and whatever user data we need to send to the client.
// Any time the client makes a request to change something
// on the server, we'll verify the token. 
// For everything else client-side, we'll use this user
// object by storing it in $rootScope.
exports.authenticate = function(req, res, next) {
  var userData = req.body;
  User.authenticate(userData, function(err, user) {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      var token = jwt.encode(user, jwtSecret);
      res.json({
        token: token,
        name: user.get('first_name') + ' ' + user.get('last_name'),
        role: user.get('role'),
        id: user.get('id')
      });
    }
  });
};
