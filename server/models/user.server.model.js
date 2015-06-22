var bookshelf = require('../config/db');
var User = bookshelf.Model.extend({
  tableName: 'users'
});


/**
* Add a user to the database
*
* @method add
* @param {Object} userData - Typically from the req.body
* of a form submission
* @param {Function} callback
*/
User.add = function(userData, callback) {
  // Create a new user object which we call
  // .fetch() on to search the database to see
  // if that user already exists
  console.log(userData.username);
  new User({'username': userData.username})
  .fetch()
  // .fetch() returns a promise so we call .then()
  .then(function(user) {
    // If the username is not already in the database...
    if (!user) {
      // Create a new user with all of the info from userData
      user = new User(userData)
      .save()
      .then(function(user) {
        console.log("User doesn't exist. Trying to add to database: ", user);
        callback(user);
      });
    } else {
      console.log("User already exists: ", user);
      callback("User already exists.\n");
    }
  })
  .catch(function(err) {
    console.log("Error fetching user from database. ", err);
    callback("Error fetching user.\n");
  });
};

/**
* Authenticate user
*
* @method authenticate
* @param {Object} userData{username: 'name', password: 'pass'}
* @param {Function} Callback
*/
User.authenticate = function(userData, callback) {
  console.log("Authenticating user: ", userData);
  new User({username: userData.username})
  .fetch()
  .then(function(user) {
    if (!user) {
      console.log("User not found: ", userData.username);
      callback("User not found.");
    } else {
      if (userData.password === user.get('password')) {
        console.log("Passwords match, logging in.");
        callback(null, user);
      } else {
        console.log("Passwords don't match. Adios.");
        callback("Incorrect password", null);
      }
    }
  })
  .catch(function(err) {
    console.log("Error fetching from database: ", err);
    callback(err);
  });
};

module.exports = User;
