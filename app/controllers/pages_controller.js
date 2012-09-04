var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Locomotive'
  this.render();
}

PagesController.login = function() {
  this.render();
}

module.exports = PagesController;
