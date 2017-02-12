module.exports = {

    index: function(req, res) {
        res.render('home/index', {title:'Welcome to my NodeJS App'});
    },
    about: function(req, res) {
        res.render('home/about');
    }
};
