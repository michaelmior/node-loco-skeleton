var express = require('express')
  , winston = require('winston');

module.exports = function() {
  this.set('mongodb uri', 'mongodb://localhost/test');

  // Set up nice defaults for console logging
  var logger = this.get('logger');
  logger.add(
    winston.transports.Console
  ).cli();

  // Log all queries going through MongoDB
  require('mongoose').set('debug', function(collection, method, query, options) {
    logger.debug('mongoose - ' + collection + '.' + method + '(' + JSON.stringify(query) + ') - ' + JSON.stringify(options));
  });

  this.use(express.errorHandler());
}
