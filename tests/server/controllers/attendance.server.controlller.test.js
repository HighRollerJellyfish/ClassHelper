var should = require('chai').should();
var expect = require('chai').expect;

describe('Attendance Controller', function() {

  var Attendance = require('../../../server/controllers/attendance.server.controller');
  
  it('should have listAll and create methods', function() {
    Attendance.listAll.should.be.a('function');
    Attendance.create.should.be.a('function');
  });

});
