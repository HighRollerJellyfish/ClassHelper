var events = require('../controllers/events.server.controller.js');

module.exports = function(app) {
  app.get('/events/', events.getEvents);
};
