var express = require('express');
var hbs = require('express-handlebars');

module.exports = function (config, app) {
  // set static files
  app.use(express.static(config.rootPath + 'public'));

  app.set('views', config.rootPath + './server/views/partials');
  app.engine('handlebars', hbs({
    partialsDir   : config.rootPath + '/server/views/partials',
    defaultLayout : config.rootPath + '/server/views/layouts/default',
    // extname       : '.hbs',
    layoutsDir    : config.rootPath + '/server/views/layouts'
  }));
  app.set('view engine', 'handlebars');
};
