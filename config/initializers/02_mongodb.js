var mongoose = require('mongoose');

module.exports = function() {
  mongoose.connection.open(this.get('mongodb uri'));
}
