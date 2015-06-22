var User = require('../models/user.server.model');

new User().fetchAll().then(function(collection) {
  collection.forEach(function(el) {
    console.log(el);
  });
});

var newUser = {
  name: "Lisa Simpson",
  email: "eatme@springfield.gov",
  username: "Lisa1",
  password: "bite",
  role: "student"
};

User.add(newUser, function(result) {
  console.log(result);
});