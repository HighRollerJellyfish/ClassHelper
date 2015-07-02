var assignments = require('../controllers/assignments.server.controller.js');

module.exports = function(app) {
  app.get('/assignments/', assignments.getAssignments);
};
