var bookshelf = require('../config/db');
var bcrypt = require('bcrypt');
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
  console.log('Attempting to add user...');
  // Create a new user object which we call
  // .fetch() on to search the database to see
  // if that user already exists
  new User({'email': userData.email})
  .fetch()
  // .fetch() returns a promise so we call .then()
  .then(function(user) {
    // If the username is not already in the database...
    if (!user) {
      // Create a new user with all of the info from userData
      bcrypt.genSalt(5, function(err, salt) {
        bcrypt.hash(userData.password, salt, function(err, hash) {
          userData.password = hash;
          user = new User(userData)
          .save()
          .then(function(user) {
            console.log("User doesn't exist. Adding to database: ", user);
            callback(null, user);
          });
        });
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
  console.log("Authenticating user...");
  // Create a new bookshelf User model to call 
  // .fetch() and see if we have that user in the database.
  new User({email: userData.email})
  .fetch()
  .then(function(user) {
    if (!user) {
      console.log("User not found: ", userData.email);
      callback("User not found.");
    } else {
      bcrypt.compare(userData.password, user.get('password'), function(err, res) {
        console.log("Passwords match, logging in.");
        if (res) {
          callback(null, user);
        } else {
          console.log("Passwords don't match. Adios.");
          callback("Incorrect password", null);
        }
      });
    }
  })
  .catch(function(err) {
    console.log("Error fetching from database: ", err);
    callback(err);
  });
};


User.findTeacherClasses = function(user_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM classes, users \
    WHERE classes.teacher_id = users.id \
      AND users.id ='  + user_id + ' \
      GROUP BY class_title \
    ')
  .then(function(data) {
    callback(data[0]);
  });
};

User.findStudentClasses = function(user_id, callback) {
  bookshelf.knex.raw(' \
    SELECT \
      classes.title AS class_title, \
      classes.id AS class_id \
    FROM classes, enrollment, users \
    WHERE classes.id = enrollment.class_id \
    AND enrollment.student_id = ' + user_id + ' \
    GROUP BY class_title \
  ')
  .then(function(data) {
    callback(data[0]);
  });
};


module.exports = User;