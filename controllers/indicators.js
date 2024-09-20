const {
    sequelize
} = require('../models');
const {
    Op
} = require("sequelize");
const models = require('../models');

exports.get_cwis = (req, res, next) => {
    res.render('cwis');
}

exports.get_districtsmap = (req, res, next) => {
    models.district.findAll({
        attributes: ['district', [sequelize.fn('ST_AsGeoJSON', sequelize.col('geom')), 'geometry']],
        raw: false
    }).then(result => {
        models.cities.findAll({
            attributes: ['city', [sequelize.fn('ST_AsGeoJSON', sequelize.col('geom')), 'geometry']]
        }).then(cities => {
            res.json({
                districts: result,
                cities: cities
            });
        }).catch(err => console.log(err));
    }).catch(err => {
        console.log(err);
    });
}

exports.get_data = (req, res, next) => {
    switch (req.params.indicator) {
        case 'd1':
            models.cities.findAll({
                attributes: ['city', [sequelize.col('pop_19'), 'renderdata']],
                where: {
                    area: {
                        [Op.ne]: 0
                    }
                }
            }).then(result => {
                res.json(result);
            }).catch(err => console.log(err));
            break;
        case 'd2':
            models.cities.findAll({
                attributes: ['city', [sequelize.literal('pop_19/area'), 'renderdata']],
                where: {
                    area: {
                        [Op.ne]: 0
                    }
                }
            }).then(result => {
                res.json(result);
            }).catch(err => console.log(err));
            break;
        case 'd3':
            models.cities.findAll({
                attributes: ['city', [sequelize.literal('pop_19-pop_11'), 'renderdata']]
            }).then(result => {
                res.json(result);
            }).catch(err => console.log(err));
            break;            
        default:
            models.cities.findAll({
                attributes: ['city', [sequelize.literal(req.params.indicator), 'renderdata']]
            }).then(result => {
                res.json(result);
            }).catch(err => console.log(err));
            break;
    }
}