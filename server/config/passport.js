var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSessiopn = require('express-session');
var User = require('../models/user.server.model');

module.exports = function(passport){
  passport.serializeUser(function(user, done) {
    done(null, user._id)
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('login',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      function(req, username, password, done) {
        new User({username: username, password: password})
        .fetch()
        .then(function(user) {
          if (!user) {
            console.log("User not found ", user);
            return done(null, false);
          }
          console.log("Logging in as ", user);
          return done(null, user);
        })
        .catch(function(err) {
          console.log("Error logging in as ", user);
          return done(err);
        });
      }
    )
  );  
};
