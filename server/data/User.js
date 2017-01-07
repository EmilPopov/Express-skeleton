var mongoose = require('mongoose');
var encryption = require('../utilities/encryption');

var requiredValidationMessage = '{PATH} is required';

var userSchema = new mongoose.Schema({
  username:{type:String, required: requiredValidationMessage, unique:true},
  firstName:{type:String, required: requiredValidationMessage},
  lastName:{type:String, required: requiredValidationMessage},
  salt:String,
  hashedPass:String,
  roles: [String]
});
userSchema.method({
  authenticate: function(password){
     var inputHashedPassword = encryption.generateHashedPassword(this.salt, password);
     if (inputHashedPassword === this.hashedPass) {
       return true;
     }  else {
       return false;
     }
  }
});


var User = mongoose.model('User', userSchema);

module.exports.seedAdminUser = function () {
  var salt = encryption.generateSalt();
  var hashedPass = encryption.generateHashedPassword(salt, 'Admin1234Pass');

  User.find({}).then(function(users){
    if (users.length === 0) {
      User.create({
        username:'Admin',
        filename:'Admin',
        lastName:'Admin',
        salt:salt,
        hashedPass:hashedPass,
        roles:['Admin']
      });
    }
  });
};
