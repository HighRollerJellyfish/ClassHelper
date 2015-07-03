var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  path = require('path');
  favicon = require('serve-favicon');

module.exports = function() {
  var app = express();
  app.use(morgan('dev'));
  app.use(bodyParser.json());

  app.use(express.static(path.join(__dirname, '../../', 'client')));

  app.use(favicon(path.join(__dirname, '../../', 'client/assets', 'favicon.ico')));

  // Require our routes
  require('../routes/lessons.server.routes.js')(app);
  require('../routes/grades.server.routes.js')(app);
  require('../routes/users.server.routes.js')(app);
  require('../routes/classes.server.routes.js')(app);
  require('../routes/assignments.server.routes.js')(app);
  require('../routes/events.server.routes.js')(app);

  return app;
};
