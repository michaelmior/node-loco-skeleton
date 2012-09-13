var express = require('express')
  , winston = require('winston');

module.exports = function() {
  this.set('mongodb uri', 'mongodb://localhost/test');

  var logger = this.get('logger');
  logger.add(
    winston.transports.Console
  ).cli();

  require('mongoose').set('debug', function(collection, method, query, options) {
    logger.debug('mongoose - ' + collection + '.' + method + '(' + JSON.stringify(query) + ') - ' + JSON.stringify(options));
  });

  this.use(express.errorHandler());
}
