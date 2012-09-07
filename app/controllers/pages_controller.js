var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , User = require('../models/user');

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive'
  this.render();
}

PagesController.login = function() {
  this.render();
}

PagesController.logout = function() {
  this.req.logOut();
  this.res.redirect('/');
}

PagesController.signup = function() {
  if (this.req.method == 'GET') {
    this.render();
  } else {
    var controller = this;
    User.registerUser(this.param('email'), this.param('password'), function(err, user) {
      if (err) {
        controller.error(err);
      } else {
        controller.redirect('/');
      }
    });
  }
}

module.exports = PagesController;
