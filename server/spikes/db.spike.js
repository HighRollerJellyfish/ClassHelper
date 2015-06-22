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

var newUser2 = '{"name": "Bart Simpson2","email": "eatmyshorts2@springfield.gov","username": "Bart2","password": "biteme2","role": "student"}';


User.add(newUser, function(result) {
  console.log(result);
});