var passport = require('passport');
var LocalPassport = require('passport-local');
var User = require('mongoose').model('User');

module.exports = function() {
    passport.use(new LocalPassport({
      usernameField: 'username',
      passwordField: 'password'
    },
      function(username, password, done) {
        User.findOne({
                username: username
            })
            .then(function(user) {
              if (!user) {
                return done(null, false);
              }

              if (!user.authenticate(password)) {
                return done(null, false);
              }

              return done(null, user);
            });
    }));

    // set unique field in cookie for every user
    passport.serializeUser(function (user, done) {
      if (user) {
        return done(null, user._id);
      }
    });
   // get current user info from cookie
    passport.deserializeUser(function (id, done) {
      User.findById(id).then(function (user) {
        if (!user) {
          return done(null, false);
        }

        return done(null, user);
      });
    });
};
