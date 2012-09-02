var express = require('express')
  , poweredBy = require('connect-powered-by')
  , util = require('util');

module.exports = function() {
  // Warn of version mismatch between global "lcm" binary and local installation
  // of Locomotive.
  if (this.version !== require('locomotive').version) {
    console.warn(util.format('version mismatch between local (%s) and global (%s) Locomotive module', require('locomotive').version, this.version));
  }

  // Configure application settings.  Consult the Express API Reference for a
  // list of the available [settings](http://expressjs.com/api.html#app-settings).
  this.set('views', __dirname + '/../../app/views');
  this.set('view engine', 'hbs');

  // Register Handlebars as a template engine for html.
  this.engine('hbs', require('consolidate').handlebars);

  // Register formats for content negotiation.  Using content negotiation,
  // different formats can be served as needed by different clients.  For
  // example, a browser is sent an HTML response, while an API client is sent a
  // JSON or XML response.
  /* this.format('xml', { engine: 'xmlb' }); */

  // Use middleware.  Standard [Connect](http://www.senchalabs.org/connect/)
  // middleware is built-in, with additional [third-party](https://github.com/senchalabs/connect/wiki)
  // middleware available as separate modules.
  this.use(poweredBy('Locomotive'));
  this.use(express.logger());
  this.use(express.favicon());
  this.use(express.static(__dirname + '/../../public'));
  this.use(express.bodyParser());
  this.use(this.router);
}
