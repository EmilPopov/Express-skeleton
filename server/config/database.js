var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;

    db.once('open', function(err) {
        if (err) {
            console.log(err);
        }
        console.log('MongoDB ready !!!');
    });

    db.on('error', function(err) {
        console.log('DB ERROR: ' + err);
    });

};
