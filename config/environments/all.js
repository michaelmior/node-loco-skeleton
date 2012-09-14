var express = require('express')
  , poweredBy = require('connect-powered-by')
  , util = require('util')
  , passport = require('../passport');

module.exports = function() {
  var app = this;

  // Warn of version mismatch between global "lcm" binary and local installation
  // of Locomotive.
  if (this.version !== require('locomotive').version) {
    console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
  }

  // Configure application settings.  Consult the Express API Reference for a
  // list of the available [settings](http://expressjs.com/api.html#app-settings).
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'dust');

  // Register Dust as a template engine for html.
  this.engine('dust', require('consolidate').dust);

  // Register the Mongoose adapter for our datastore
  this.datastore(require('locomotive-mongoose'));

  // Register formats for content negotiation.  Using content negotiation,
  // different formats can be served as needed by different clients.  For
  // example, a browser is sent an HTML response, while an API client is sent a
  // JSON or XML response.
  /* this.format('xml', { engine: 'xmlb' }); */

  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  this.use(poweredBy('Locomotive'));

  // Replace default logging with winston and
  // extend express with winston logging methods
  var logger = new (require('winston').Logger)({
    transports: []
  });
  this.use(express.logger({
    stream: {
      write: function(message, encoding) {
        logger.info(message.trim());
      }
    }
  }));

  logger.extend(this);
  this.set('logger', logger);

  this.use(express.favicon());
  this.use(require('less-middleware')({
    src: __dirname + '/../../src/less',
    dest: __dirname + '/../../public/css',
    prefix: '/css'
  }));
  this.use(express['static'](__dirname + '/../../public'));
  this.use(express.cookieParser());
  this.use(express.bodyParser());
  this.use(express.session({ secret: 'hr{@"ca69EfN;*>J7wy:-yVs&^}]b1C]&96N|[[{^xb&<B>jp*%D[[7gEqaU]%Q}' }));
  this.use(passport.initialize());
  this.use(passport.session());
  this.use(function(req, res, next) {
    res.locals.user = req.user;
    next();
  });
  this.use(this.router);
};
