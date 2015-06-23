var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSessiopn = require('express-session');
var User = require('../models/user.server.model');

// Helpful link explaining passport.js authentication flow
// http://toon.io/understanding-passportjs-authentication-flow/

// Export our passport config.
module.exports = function(passport){
  // passport.serializeUser can access
  // the user object and decide what data
  // from the user object we want attached to
  // the session. The result of this function
  // is attached to the session as req.session.passport.user
  // and also attached as req.user.
  // Here, we are storing all of the user's data.
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // deserializeUser takes the id and finds
  // the user in the session, giving you access
  // to the full user data.
  passport.deserializeUser(function(id, done) {
    new User({id: id}).fetch()
    .then(function(err, user) {
      done(err, user);
    })
    .catch(function(err) {
      done(err);
    });
  });

  // Helper function to validate password.
  // var isValidPassword = function(user, password) {
  //   return password === user.get('password');
  // };

  // We have passport.authenticate 
  // Middleware in our users.server.routes which uses
  // this strategy.
  // passport.use('login',
  //   new LocalStrategy(
  //     {
  //       passReqToCallback: true
  //     },
  //     function(req, username, password, done) {
  //       console.log("Authenticating user: ", username);
  //       new User({username: username})
  //       .fetch()
  //       .then(function(user) {
  //         if (!user) {
  //           console.log("User not found ", user);
  //           return done(null, false);
  //         }
  //         if(!isValidPassword(user, password)) {
  //           console.log("Invalid password", user);
  //           return done(null, false);
  //         }
  //         console.log("Logging in as ", user);
  //         return done(null, user);
  //       })
  //       .catch(function(err) {
  //         console.log("Error logging in as ");
  //         return done(err);
  //       });
  //     }
  //   )
  // );  
};
