/*jshint loopfunc:true */

var vows = require('vows'),
    should = require('should'),
    Router = require('locomotive/lib/locomotive/router'),
    routes = require('../config/routes');

function resolvesTo(path) {
  var context = {
    topic: function(controller) {
      // Apply the routes
      var router = new Router(require('locomotive'));
      router.init(require('express')());
      router.draw(routes);

      // Extract the name of the controller and action
      var req = this.context.name.split(/[ \.]+/),
          action = req[1];

      return this.callback(null, router.find(controller, action));
    }
  };

  context['should be accessible at ' + path] = function(err, route) {
    route.pattern.should.equal(path);
  };

  return context;
}

vows.describe('Routes').addBatch({
  'Authentication controller': {
    topic: 'AuthController',

    'action login': resolvesTo('/login'),
    'action signup': resolvesTo('/signup'),
    'action logout': resolvesTo('/logout')
  },

  'Static pages controller': {
    topic: 'PagesController',

    'action main': resolvesTo('/')
  }
}).exportTo(module);
