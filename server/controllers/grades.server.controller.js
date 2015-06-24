var Grade = require('../models/grade.server.model');

exports.list = function(req, res, next) {
  new Grade().fetchAll().then(function(collection) {
    var data = [];
    collection.forEach(function(el) {
      data.push(el);
    });
    res.json(data);
  });
};

exports.create = function(req, res, next) {
  Grade.add(req.body, function(model) {
    console.log(model);
    res.send(model);
  });
};