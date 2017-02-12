var express = require('express');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var MongoStore = require('connect-mongo/es5');


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
        resave: true,
        saveUninitialized: true,
        // store: new MongoStore({
        //   url: config.db,
        //   collection: 'sessions'
        // })
    }));


    app.use(passport.initialize());
    app.use(passport.session());

    // set current user
    app.use(function(req, res, next) {
        if (req.user) {
            res.locals.currentUser = req.user;
        }
        next();
    });
 // app.use(express.static(config.rootPath + 'public'))
};
