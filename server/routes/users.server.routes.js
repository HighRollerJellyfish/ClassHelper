var users = require('../controllers/users.server.controller.js');

// Set our user routes on the app object.
// We pass in passport so that we have access to authentication.
module.exports = function(app, passport) {
  app.get('/users', users.list);

  // The below commented out was for testing/spike purposes.
  // It is no longer being used. The part it requires
  // from config/passport.js has also been commented out.
  // The reason we don't need it is that we aren't using sessions.
  // Since we are using JWT, we don't need passport to manage
  // sessions for us.

  // app.post('/users', function(req, res, next) {
  //     console.log(req.body);
  //     next();
  //   },
  //   passport.authenticate('login', {
  //     successRedirect: '/users',
  //     failureRedirect: 'http://www.bing.com',
  //   }),
  //   users.list
  // );

  app.post('/users/signup', users.create);
  app.post('/users/login', users.authenticate);
};
