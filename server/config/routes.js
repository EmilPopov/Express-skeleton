module.exports = function (app){
  app.get('/', function(req, res){
    res.render('index', {title:'Welcome to my app'});
  });

  app.all('*', function (req, res) {
    res.status(404);
    res.send('Not Found');
    res.end();
  });
};
