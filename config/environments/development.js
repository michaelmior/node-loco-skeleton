var express = require('express')
  , winston = require('winston');

module.exports = function() {
  this.set('mongodb uri', 'mongodb://localhost/test');

  this.get('logger').add(
    winston.transports.Console
  ).cli();

  this.use(express.errorHandler());
}
