var vows = require('vows'),
    should = require('should'),
    bcrypt = require('bcrypt'),
    User = require('../app/models/user.js');


vows.describe('User').addBatch({
  'when creating a user': {
    topic: function() {
      var cb = this.callback;
      User.prototype.save = function() { cb(null, this); };
      User.registerUser('test@example.com', 'password', function() {});
    },
    'the correct email is saved': function(err, user) {
      user.email.should.equal('test@example.com');
    },
    'a valid password hash is created': function(err, user) {
      bcrypt.compareSync('password', user.hash).should.be.ok;
    },
    'checking a valid password': {
      topic: function(user) { user.validPassword('password', this.callback); },
      'authenticates the user': function(err, valid) {
        valid.should.be.ok;
      }
    },
    'checking an invalid password': {
      topic: function(user) { user.validPassword('wrongpassword', this.callback); },
      'does not authenticate the user': function(err, valid) {
        valid.should.not.be.ok;
      }
    }
  }
}).exportTo(module);
