const models = require('../models');
const {
    Op
} = require("sequelize");
const {
    sequelize
} = require('../models');
const { response } = require('express');


exports.get_cityprofile = function (req, res, next) {
    res.render('tempcityprofile');
}


exports.get_info = function (req, res, next) {
    models.city.findOne({
        where: {
            City: req.params.cityName
        }
    }).then(info => {
        res.json(info);
    }).catch(err => {
        console.log(err);
    });
}

exports.get_bg = function (req, res, next) {
    models.household.count({
        distinct: 'Q_2_1',
        group: ['Q_5_5'],
        where: {
            Q_11: req.params.cityName
        }
    }).then(d1 => {
        models.household.count({
            distinct: 'Q_2_1',
            group: ['Q_5_8'],
            where: {
                Q_11: req.params.cityName
            }
        }).then(d2 => {
            models.household.findAll({
                attributes: ['Q_5_5'],
                group: 'Q_5_5',
                distinct: true,
                where: {
                    Q_11: req.params.cityName
                }
            }).then(d1d => {
                models.household.findAll({
                    attributes: ['Q_5_8'],
                    group: 'Q_5_8',
                    distinct: true,
                    where: {
                        Q_11: req.params.cityName
                    }
                }).then(d2d => {
                    models.household.count({
                        distinct: true,
                        where: {
                            Q_11: req.params.cityName
                        }
                    }).then(t => {
                        res.json({
                            dataset01: d1,
                            dataset02: d2,
                            d1d: d1d,
                            d2d: d2d,
                            total: t
                        });
                    }).catch();
                }).catch();
            }).catch();
        }).catch();
    }).catch();
}

exports.get_mapdata = function (req, res, next) {
    models.ward.findAll({
        attributes: ['ward', 'population', 'area_sqkm', [sequelize.fn('ST_AsGeoJSON', sequelize.col('geom')), 'geometry']],
        where: {
            city: req.params.cityName
        },
        raw: false
    }).then(wards => {
        models.cityprofile.findAll({
            attributes: ['feature', 'type', [sequelize.fn('ST_AsGeoJSON', sequelize.col('geom')), 'geometry']],
            where: {
                city: req.params.cityName
            }
        }).then(points => {
            res.json({
                points: points,
                wards: wards
            });
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.get_gc = (req, res, next) => {
    models.household.count({
        distinct: 'Q_3_2',
        group: ['Q_3_2', 'Q_5_1', 'Q_5_5'],
        where: {
            Q_11: req.params.cityName
        }
    }).then(count => {
        res.json(count);
    }).catch(err => console.log(err));
}

exports.get_ca = (req, res, next) => {
    models.household.count({
        distinct: 'Q_6_3',
        group: ['Q_6_3', 'Q_5_1', 'Q_6_2'],
        where: {
            Q_11: req.params.cityName
        }
    }).then(count => {
        res.json(count);
    }).catch(err => console.log(err));
}

exports.get_dataset = function (req, res, next) {
    models.household.count({
        distinct: 'Q_7_4',
        group: ['Q_7_4'],
        where: {
            Q_11: req.params.cityName
        }
    }).then(count1 => {
        models.household.count({
            distinct: 'Q_7_6',
            group: ['Q_7_6'],
            where: {
                Q_11: req.params.cityName
            }
        }).then(count2 => {
            models.household.count({
                distinct: true,
                where: {
                    Q_11: req.params.cityName
                }
            }).then(t => {
                res.json({
                    total: t,
                    dataset01: count1,
                    dataset02: count2
                });
            }).catch(err => {
                console.log(err);
            });
        }).catch(err => {
            console.log(err);
        });
    }).catch(err => {
        console.log(err);
    });
}

exports.get_wastesankey = (req, res, next) => {
    models.household.count({
        distinct: 'Q_7_4',
        group: ['Q_7_4'],
        where: {
            Q_11: req.params.cityName
        }
    }).then(count1 => {
        models.household.count({
            distinct: 'Q_7_4',
            group: ['Q_7_4', 'Q_7_6'],
            where: {
                [Op.and]: [{
                    Q_11: req.params.cityName
                }, {
                    Q_7_6: {
                        [Op.ne]: null
                    }
                }]
            }
        }).then(count2 => {
            models.household.count({
                distinct: true,
                where: {
                    Q_11: req.params.cityName
                }
            }).then(t => {
                res.json({
                    dataset01: count1,
                    dataset02: count2,
                    total: t
                });
            }).catch();
        }).catch();
    }).catch();
    
}

exports.get_sankey = (req, res, next) => {
    models.household.count({
        distinct: 'Q_4_4_1',
        group: ['Q_4_4_1', 'Q_5_1'],
        where: {
            Q_11: req.params.cityName
        }
    }).then(count1 => {
        models.household.count({
            distinct: 'Q_4_4_1',
            group: ['Q_5_1', 'Q_5_13'],
            where: {
                Q_11: req.params.cityName
            }
        }).then(count2 => {
            models.household.count({
                distinct: 'Q_4_4_1',
                group: ['Q_5_13', 'Q_5_14'],
                where: {
                    Q_11: req.params.cityName
                }
            }).then(count3 => {
                models.household.count({
                    distinct: true,
                    where: {
                        Q_11: req.params.cityName
                        // [Op.and]: [{
                        //     Q_11: req.params.cityName
                        // }, {
                        //     Q_4_4_1: {
                        //         [Op.ne]: null
                        //     }
                        // }]
                    }
                }).then(t => {
                    res.json({
                        total: t,
                        dataset01: count1,
                        dataset02: count2,
                        dataset03: count3
                    });
                }).catch(err => {
                    console.log(err);
                });
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
        })
    }).catch(err => {
        console.log(err);
    });
}