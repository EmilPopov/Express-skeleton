var express = require('express');
var mongoose = require('mongoose');
var hbs = require('express-handlebars');
var path = require('path');

var app = express();
// set static files
app.use(express.static('public'));

app.set('views', path.join(__dirname, './server/views/partials'));
app.engine('handlebars', hbs({
  partialsDir   : __dirname +'/server/views/partials',
  defaultLayout : __dirname +'/server/views/layouts/default',
  // extname       : '.hbs',
  layoutsDir    : __dirname +'/server/views/layouts'
}));
app.set('view engine', 'handlebars');

// set environment
var env = process.env.NODE_ENV || 'development';
var port = process.env.port || 1234;

// set db
mongoose.Promise = global.Promise;
var connection = 'mongodb://localhost:27017/express-skeleton';
mongoose.connect(connection)
    .then(function() {
        console.log('MongoDB up and runnings !!!');
    })
    .catch(console.log);


app.get('/', function(req, res){
  res.render('index', {title:'Welcome to my app'});
});

app.listen(port);
