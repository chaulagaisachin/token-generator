const crypto = require('crypto');

exports.generateToken = function () {
    return crypto.randomBytes(32).toString('hex');
  }