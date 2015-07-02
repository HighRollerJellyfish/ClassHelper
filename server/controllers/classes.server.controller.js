var Class = require('../models/class.server.model');
var User = require('../models/user.server.model');

// Returns an array of all of a users classes
exports.getClasses = function(req, res, next) {

  var user_id = req.param('id');
  new User.
  // new Lesson().fetchAll().then(function(collection) {
  //   var data = [];
  //   collection.forEach(function(el) {
  //     data.push(el);
  //   });
  //   res.json(data);
  // });
};

