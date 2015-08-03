var lessons = require('../controllers/lessons.server.controller.js');

module.exports = function(app) {
  app.get('/lessons', lessons.classLessons);

  app.post('/lessons', lessons.addLesson);
};
