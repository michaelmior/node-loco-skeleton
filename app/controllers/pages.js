var locomotive = require('locomotive'),
    Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive';
  this.render();
};

PagesController.email = function() {
  var res = this.res;
  var Email = require('../models/email');
  Email.sendEmail('michael.mior@gmail.com', 'Test', 'foo', {}, function() {
    console.log(arguments);
    res.send('Done!');
  });
};

module.exports = PagesController;
