var users = require('../controllers/users.server.controller.js');

module.exports = function(app, passport) {
  app.post('/users', users.list);
  app.get('/users',
    passport.authenticate('login', {
      successRedirect: '/users',
      failureRedirect: 'http://www.bing.com',
    }),
    users.list
  );
};
