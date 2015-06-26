var should = require('chai').should();
var request = require('request');
var expect = require('chai').expect;

describe('Lessons routes', function() {
  var url = 'http://localhost:3000/lessons';
  it('should respond with status code 200 on get request to /lessons', function(done) {
    request(url, function(err, res, body) {
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('should respond with status code 201 on post request to /lessons', function(done) {
    var options = {
      method: 'POST',
      url: url,
      json: {"name": "eric"}
    }
    request(options, function(err, res, body) {
      console.log(res.statusCode);
      res.statusCode.should.equal(201);
      done();
    });

  });
});