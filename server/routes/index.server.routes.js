var express = require('express');
module.exports = function(app) {
  var index = require('../controllers/index.server.controller');
  // This isn't getting triggered because the static middleware is catching this route. It
  // could be commented out and the app will work just the same right now.
  app.get('/', index.render);
};
