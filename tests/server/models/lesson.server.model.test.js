var should = require('chai').should();
var expect = require('chai').expect;

describe('Lesson Model', function() {

  var Lesson = require('../../../server/models/lesson.server.model.js');
  
  it('should have add method', function() {
    Lesson.add.should.be.a('function');
  });

});
