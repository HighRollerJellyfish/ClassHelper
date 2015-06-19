var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

module.exports = function() {
  var app = express();
  require('../routes/index.server.routes.js')(app);
  return app;
};