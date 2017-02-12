var encryption = require('../utilities/encryption');
var User = require('mongoose').model('User');

module.exports = {
    register: function(req, res) {
        res.render('users/register');
    },
    create: function(req, res) {
        var user = req.body;

        if (user.password !== user.confirmPassword) {
            user.globalError = "Passwords do not match !";
            res.render('users/register', user);
        } else {
            user.salt = encryption.generateSalt();
            user.hashedPass = encryption.generateHashedPassword(user.salt, user.password);

            User.create(user)
                .then(function(user) {
                    req.logIn(user, function(err, user) {
                        if (err) {
                            res.render('users/register', {
                                globalError: 'Error 500'
                            });
                        } else {
                            res.redirect('/');
                        }
                    });
                });

        }
        console.log(user);

    },
    login: function(req, res) {
        res.render('users/login');
    },
    authenticate: function(req, res) {
        var inputUser = req.body;

        User.findOne({
            username: inputUser.username
        }).then(function (user) {

          if(!user){
             res.render('users/login', {globalError:'Invalid username or password'});
          }

          if (!user.authenticate(inputUser.password)) {
            res.render('users/login', {globalError:'Invalid username or password'});
          } else{
           req.logIn(user, function (err, user) {
             if (err) {
               res.render('users/login', {globalError:'Error 500'});
             }else {
               res.redirect('/');
             }
           });
          }
        });
    },
    logout: function(req, res){
      req.logout();
      res.redirect('/');
    }
};
