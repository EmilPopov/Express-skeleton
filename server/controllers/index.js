var homeController = require('./homeController');
var usersController = require('./usersController');
var articlesController = require('./articlesController');

module.exports = {
    home: homeController,
    users: usersController,
    articles: articlesController
};
