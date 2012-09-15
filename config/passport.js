var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('../app/models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Unknown user'});
      }

      user.validPassword(password, function(valid) {
        if (!valid) {
          return done(null, false, { message: 'Invalid password' });
        } else {
          return done(null, user);
        }
      });
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
