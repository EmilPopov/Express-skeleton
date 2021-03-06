var path = require('path');

var rootPath = path.normalize(path.join(__dirname, '/../../'));

module.exports = {
  development: {
    rootPath:rootPath,
    db:'mongodb://localhost:27017/express-skeleton',
    port:1234
  },
  production:{
    rootPath:rootPath,
    db:process.env.MONGO_DB_CONNECTION_STRING,
    port:process.env.port
  }
};
