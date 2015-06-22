var users = require('../controllers/users.server.controller.js');

// Set our user routes on the app object.
// We pass in passport so that we have access to authentication.
module.exports = function(app, passport) {
  app.get('/users', users.list);
  app.post('/users', function(req, res, next) {
      console.log(req.body);
      next();
    },
    passport.authenticate('login', {
      successRedirect: '/users',
      failureRedirect: 'http://www.bing.com',
    }),
    users.list
  );
  app.post('/users/signup', users.create);
  app.post('/users/login', users.authenticate);
};
