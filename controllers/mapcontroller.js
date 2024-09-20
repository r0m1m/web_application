const models = require('../models');
const {
    sequelize
} = require('../models');

exports.get_map = function (req, res, next) {
    res.render('maps');
}

exports.get_renderdata = function (req, res, next) {
    switch (req.params.maptype) {
        case 'density':
            models.ward.findAll({
                attributes: ['ward', 'population', 'area_sqkm'],
                where: {
                    city: req.params.cityName
                },
                // group: ['ward'],
                raw: false
            }).then(result => {
                res.json(result);
            }).catch(err => {
                console.log(err);
            });
            break;

        default:
            break;
    }
}

exports.get_warddata = function (req, res, next) {
    models.ward.findAll({
        attributes: ['ward', 'population', 'area_sqkm', [sequelize.fn('ST_AsGeoJSON', sequelize.col('geom')), 'geometry']],
        where: {
            city: req.params.cityName
        },
        raw: false
    }).then(result => {
        res.json(result);
    }).catch(err => {
        console.log(err);
    });
}