var should = require('chai').should();

describe('Lessons Controller', function() {
  var Lesson = require('../../../server/controllers/lessons.server.controller');
  it('should have list and create methods', function() {
    Lesson.list.should.be.a('function');
    Lesson.create.should.be.a('function');
  });
});