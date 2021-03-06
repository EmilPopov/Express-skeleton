var crypto = require('crypto');

module.exports = {
   generateSalt: function () {
     return crypto.randomBytes(128).toString('base64');
   },
   generateHashedPassword: function (salt, password) {
     return crypto.createHmac('sha256',salt).update(password).digest('hex');
   }
};
