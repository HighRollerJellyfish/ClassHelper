var lessons = require('../controllers/classes.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {

  app.get('/classes', classes.getClasses);

};