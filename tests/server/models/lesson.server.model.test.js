var should = require('chai').should();
var expect = require('chai').expect;

describe('Lesson Model', function() {

  var Lesson = require('../../../server/model/lessons.server.model');
  
  it('should have add method', function() {
    Lesson.add.should.be.a('function');
  });

});
