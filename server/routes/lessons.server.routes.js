var lessons = require('../controllers/lessons.server.controller.js');
var jwt = require('jwt-simple');
var jwtSecret = require('../config/config.js').jwtSecret;

module.exports = function(app) {
  app.get('/lessons', function(req, res, next) {
      console.log("Authenticating...");
      console.log(req.headers.authorization);
      var token = req.headers.authorization;
      if (token) {
        console.log("Token: ", token);
        // We are hardcoding our secret token in for now but in
        // production it should be an env variable.
        var decoded = jwt.decode(token, jwtSecret);
        lessons.list(req, res, next);
      } else {
        res.send("No token...\n");
      }
    },
    lessons.list
  );
  app.post('/lessons', lessons.create);
};
