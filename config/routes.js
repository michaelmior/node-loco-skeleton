// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
var passport = require('./passport');

module.exports = function routes() {
  this.root('pages#main');
  this.match('email', 'pages#email');

  this.match('login', 'auth#login');
  this.match('login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  }), { via: 'post' });
  this.match('logout', 'auth#logout');

  this.match('signup', 'auth#signup', { via: ['get', 'post'] });
};
