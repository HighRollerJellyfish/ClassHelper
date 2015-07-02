var Class = require('../models/class.server.model');
var User = require('../models/user.server.model');

// Returns an array of all of a users classes
exports.getClasses = function(req, res, next) {
  var student_id = req.param('student_id');
  var token = req.headers.authorization;
  if (token) {
    var decoded = jwt.decode(token, jwtSecret);

    new User({id: decoded.id})
    .fetch()
    .then(function(user) {

      console.log(user);
      // if (!user) {
      //   console.log("User not found: ", userData.email);
      //   callback("User not found.");
      // } else {
      //   bcrypt.compare(userData.password, user.get('password'), function(err, res) {
      //     console.log("Passwords match, logging in.");
      //     if (res) {
      //       callback(null, user);
      //     } else {
      //       console.log("Passwords don't match. Adios.");
      //       callback("Incorrect password", null);
      //     }
      //   });
      // }
    });

  } else {
    return res.send("Invalid credentials");
  }
};

