var lessons = require('../controllers/lessons.server.controller.js');
var jwt = require('jwt-simple');

module.exports = function(app) {
  app.get('/lessons', function(req, res, next) {
      console.log("Authenticating...");
      var token = req.body.token || req.header['x-access-toekn'];
      if (token) {
        // We are hardcoding our secret token in for now but in
        // production it should be an env variable.
        var decoded = jwt.decode(token, 'abc');
        console.log(decoded);
        res.send(decoded);
      } else {
        res.send("No token...\n");
      }
    },
    lessons.list
  );
  app.post('/lessons', lessons.create);
};
