/*jshint loopfunc:true */

var should = require('should'),
    Router = require('locomotive/lib/locomotive/router'),
    routes = require('../config/routes');

describe('routes', function() {
  var router = new Router(require('locomotive'));
  router.init(require('express')());
  router.draw(routes);

  var route_map = {
    'AuthController': {
      'login': '/login',
      'signup': '/signup',
      'logout': '/logout'
    },
    'PagesController': {
      'main': '/'
    }
  };

  // Test that the actions for the above controllers
  // map to GET requests at the specified URLs
  for (var key1 in route_map) {
    for (var key2 in route_map[key1]) {
      describe(key1, function() {
        var controller = key1;

        describe(key2, function() {
          var action = key2;

          it('should map to ' + route_map[controller][action], function() {
            var route = router.find(controller, action);

            route.method.should.equal('get');
            route.pattern.should.equal(route_map[controller][action]);
          });
        });
      });
    }
  }
});
