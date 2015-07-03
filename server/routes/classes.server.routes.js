var classes = require('../controllers/classes.server.controller.js');

module.exports = function(app) {
  app.get('/classes', classes.getClasses);

  app.post('/classes', classes.addClass);

  app.post('/enrollment', classes.addEnrollment);

};