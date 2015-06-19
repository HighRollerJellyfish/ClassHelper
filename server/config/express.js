var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

module.exports = function() {
  var app = express();
  app.use(morgan('dev'));

  // Require our routes
  require('../routes/index.server.routes.js')(app);
  require('../routes/lessons.server.routes.js')(app);
  require('../routes/users.server.routes.js')(app);

  return app;
};