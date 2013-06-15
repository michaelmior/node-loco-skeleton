var mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    locomotive = require('locomotive'),
    path = require('path'),
    async = require('async');

var emailSchema = new mongoose.Schema({
  email: { type: String },
  tmpl: { type: String }
});

emailSchema.statics.sendEmail = function(to, subject, tmpl, data, callback) {
  var email = new this({ email:to });
  async.waterfall([
    function(callback) {
      email.save(function(err) {
        callback(err);
      });
    },
    function(callback) {
      locomotive.render(path.join('email', tmpl), data, callback);
    },
    function(html, callback) {
      var mailOptions = {
        from: locomotive.get('from email'),
        to: to,
        subject: subject,
        html: html
      };

      locomotive.get('email transport').sendMail(mailOptions, callback);
    }
  ], callback);
  /*
  email.save(function(err) {
    if (err) { cb(err); }
    locomotive.render(path.join('email', tmpl), data, function(err, html){
      var mailOptions = {
        from: locomotive.get('from email'),
      to: to,
      subject: subject,
      html: html
      };

      locomotive.get('email transport').sendMail(mailOptions, cb);
    });
  });
  */
};

module.exports = mongoose.connection.model('Email', emailSchema);
