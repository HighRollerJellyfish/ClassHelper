var should = require('chai').should();
var expect = require('chai').expect;

describe('Users Model', function() {

  var User = require('../../../server/models/user.server.model.js');
  
  it('should hav eadd and authenticate functions', function() {
    User.add.should.be.a('function');
    User.authenticate.should.be.a('function');
  });

});
