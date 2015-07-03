var assignments = require('../controllers/assignments.server.controller.js');

module.exports = function(app) {
  app.get('/assignments/', assignments.getAssignments);

  app.post('/assignments/', assignments.addAssignment);
};
