var express = require('express');

module.exports = function() {
  this.set('mongodb uri', 'mongodb://localhost/test');
  this.use(express.errorHandler());
}
