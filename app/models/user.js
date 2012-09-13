var mongoose = require('mongoose')
  , bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: { type: String, index: { unique: true }},
  hash: String
});

userSchema.statics.registerUser = function(email, password, cb) {
  var Model = this;

  bcrypt.hash(password, 8, function(err, hash) {
    var user = new Model({ email:email, hash:hash });
    user.save(function(err) {
      cb(err, user);
    });
  });
};

userSchema.methods.validPassword = function(password, cb) {
  bcrypt.compare(password, this.hash, function(err, same) {
    cb(!err && same);
  });
};

module.exports = mongoose.connection.model('User', userSchema);
