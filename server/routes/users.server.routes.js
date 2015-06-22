var users = require('../controllers/users.server.controller.js');

module.exports = function(app) {
  app.get('/users', users.list);
  app.post('/users', users.create);
};
