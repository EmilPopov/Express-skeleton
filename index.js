var express = require('express');
var path = require('path');

var app = express();

// set environment
var currentEnv = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[currentEnv];


// set db
require('./server/config/database')(config);
// set express
require('./server/config/express')(config, app);
//set routes
require('./server/config/routes.js')(app);

app.listen(config.port);
