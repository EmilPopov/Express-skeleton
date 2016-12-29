var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.Promise = global.Promise;
var dbPath = 'mongodb://localhost:27017/express-skeleton';
var connection = dbPath;

mongoose.connect(connection)
    .then(function() {
        console.log('MongoDB up and runnings !!!');
    })
    .catch(console.log);

app.get('/', function(req, res){
  res.send('Welcome to my app');
});

app.listen(1234);
