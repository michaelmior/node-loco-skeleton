var mongoose = require('mongoose')
  , bcrypt = require('bcrypt');

var userSchema = new mongoose.Schema({
  email: String,
  hash: String
});

userSchema.methods.validPassword = function(password, cb) {
  bcrypt.compare(password, this.hash, function(err, same) {
    cb(!err && same);
  });
};

module.exports = mongoose.connection.model('User', userSchema);
