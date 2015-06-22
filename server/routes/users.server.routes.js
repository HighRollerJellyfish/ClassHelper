var users = require('../controllers/users.server.controller.js');

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
};
