var mongoose = require('mongoose'),
    models = require('../../app/models');

module.exports = function() {
  mongoose.connect(this.get('mongodb uri'));
};
