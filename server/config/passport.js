var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSessiopn = require('express-session');
var User = require('../models/user.server.model');

module.exports = function(passport){
  passport.serializeUser(function(id, done) {
    done(null, id);
  });

  passport.deserializeUser(function(user, done) {
    var id = user.get('id');
    new User({id: id}).fetch()
    .then(function(err, user) {
      done(err, user);
    })
    .catch(function(err) {
      done(err);
    });
  });

  var isValidPassword = function(user, password) {
    return password === user.get('password');
  };

  passport.use('login',
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      function(req, username, password, done) {
        console.log(req.body);
        new User({username: username, password: password})
        .fetch()
        .then(function(user) {
          if (!user) {
            console.log("User not found ", user);
            return done(null, false);
          }
          if(!isValidPassword(user, password)) {
            console.log("Invalid password", user);
            return done(null, false);
          }
          console.log("Logging in as ", user);
          return done(null, user);
        })
        .catch(function(err) {
          console.log("Error logging in as ");
          return done(err);
        });
      }
    )
  );  
};
