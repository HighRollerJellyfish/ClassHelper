var classes = require('../controllers/classes.server.controller.js');

module.exports = function(app) {
  app.get('/classes', classes.getClasses);

};