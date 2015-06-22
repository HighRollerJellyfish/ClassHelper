var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  path = require('path'),
  passport = require('passport'),
  expressSession = require('express-session');
require('./passport')(passport);

module.exports = function() {
  var app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(expressSession({secret: 'mySecretKey'}));
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(__dirname, '../../', 'client')));

  // Require our routes
  require('../routes/index.server.routes.js')(app);
  require('../routes/lessons.server.routes.js')(app);
  require('../routes/users.server.routes.js')(app, passport);

  return app;
};
