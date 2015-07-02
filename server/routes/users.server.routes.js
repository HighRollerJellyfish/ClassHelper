var users = require('../controllers/users.server.controller.js');

// Set our user routes on the app object.
// We pass in passport so that we have access to authentication.
module.exports = function(app, passport) {
  app.get('/users', users.list);
  app.get('/users/refresh', users.refresh);

  app.post('/users/signup', users.signup);
  app.post('/users/login', users.authenticate);
};
