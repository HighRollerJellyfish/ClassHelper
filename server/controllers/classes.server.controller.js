var Class = require('../models/class.server.model');
var User = require('../models/user.server.model');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

// Returns an array of all of a users classes
exports.getClasses = function(req, res, next) {
  var user_id = req.param('user_id');
  var token = req.headers.authorization;
  if (token) {
    var decoded = jwt.decode(token, jwtSecret);
    if (user_id == decoded.id) {
      new User({id: user_id})
      .fetch()
      .then(function(user) {

        new User.findClasses(user.id);
        // user.findClasses(function(data) {
        //   json(data);
        // });
      });
    }
    

  } else {
    return res.send("Invalid credentials");
  }
};

