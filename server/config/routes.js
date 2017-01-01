var controllers = require('../controllers');

module.exports = function (app){
  app.get('/', controllers.home.index);
  app.get('/about', controllers.home.about);

  app.all('*', function (req, res) {
    res.status(404);
    res.send('Not Found');
    res.end();
  });
};
