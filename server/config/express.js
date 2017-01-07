var express = require('express');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');


module.exports = function(config, app) {
    // set static files
    app.use(express.static(config.rootPath + 'public'));

    app.set('views', config.rootPath + './server/views/partials');
    app.engine('handlebars', hbs({
        partialsDir: config.rootPath + '/server/views/partials',
        defaultLayout: config.rootPath + '/server/views/layouts/default',
        // extname       : '.hbs',
        layoutsDir: config.rootPath + '/server/views/layouts'
    }));
    app.set('view engine', 'handlebars');

    // Authentication
    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(session({
      secret: 'something-secret!@&%',
      resave:false,
      saveUninitialized:false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

};
