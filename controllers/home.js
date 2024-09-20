const models = require('../models');

exports.get_home = function(req, res, next) {
    res.render('home', { title: 'Express' });
}

