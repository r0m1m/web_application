const models = require('../models');
const { sequelize } = require('../models');

exports.get_initialpage = function (req, res, next) {
    res.render('chartapp');
}

exports.get_dataset = function (req, res, next) {
    if (req.params.dOne !== '0') {
        if (req.params.dTwo !== '0') {
            if (req.params.groupBy !== '0') {
                //if two datsets required with group by
                console.log(1);
                models.household.count({
                    distinct: req.params.dOne,
                    group: [req.params.groupBy, req.params.dOne],
                    where: {
                        Q_11: req.params.cityName
                    }
                }).then(count1 => {
                    models.household.count({
                        distinct: req.params.dTwo,
                        group: [req.params.groupBy, req.params.dTwo],
                        where: {
                            Q_11: req.params.cityName
                        }
                    }).then(count2 => {
                        res.json({
                            datafrom: 1,
                            dataset01: count1,
                            dataset02: count2
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            } else {
                //if two datsets required without groupby
                console.log(2);
                models.household.count({
                    distinct: req.params.dOne,
                    group: [req.params.dOne],
                    where: {
                        Q_11: req.params.cityName
                    }
                }).then(count1 => {
                    models.household.count({
                        distinct: req.params.dTwo,
                        group: [req.params.dTwo],
                        where: {
                            Q_11: req.params.cityName
                        }
                    }).then(count2 => {
                        res.json({
                            datafrom: 2,
                            dataset01: count1,
                            dataset02: count2
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                });
            }
        } else {
            //if only one dataset required
            if (req.params.groupBy !== '0') {
                //if one dataset required with groupby
                console.log(3);
                models.household.count({
                    distinct: req.params.dOne,
                    group: [req.params.groupBy, req.params.dOne],
                    where: {
                        Q_11: req.params.cityName
                    }
                }).then(count => {
                    models.household.findAll({
                        attributes: [req.params.groupBy],
                        group: req.params.groupBy,
                        distinct: true,
                        where: {
                            Q_11: req.params.cityName
                        }
                    }).then(ldist => {
                        models.household.findAll({
                            attributes: [req.params.dOne],
                            group: req.params.dOne,
                            distinct: true,
                            where: {
                                Q_11: req.params.cityName
                            }
                        }).then(ddist => {
                            models.household.count({
                                distinct: true,
                            where: {
                                Q_11: req.params.cityName
                            }
                            }).then(t =>{
                                res.json({
                                    datafrom: 3,
                                    total: t,
                                    ldist: ldist,
                                    ddist: ddist,
                                    dataset01: count
                                });
                            }).catch();
                            
                        }).catch(err => {
                            console.log(err);
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                    
                }).catch(err => {
                    console.log(err);
                })
            } else {
                //if one datsets required without groupby
                console.log(4);
                models.household.count({
                    distinct: req.params.dOne,
                    group: [req.params.dOne],
                    where: {
                        Q_11: req.params.cityName
                    }
                }).then(count => {
                    models.household.count({
                        distinct: true,
                    where: {
                        Q_11: req.params.cityName
                    }
                    }).then(t => {
                        res.json({
                            datafrom: 4,
                            total: t,
                            dataset01: count
                        });
                    }).catch(err => {
                        console.log(err);
                    });
                }).catch(err => {
                    console.log(err);
                })
            }
        }
    } else {
        if(req.params.dTwo !== '0') {
            models.household.count({
                distinct: req.params.dTwo,
                group: [req.params.dTwo],
                where: {
                    Q_11: req.params.cityName
                }
            }).then(count => {
                models.household.count({
                    distinct: true,
                where: {
                    Q_11: req.params.cityName
                }
                }).then(t => {
                    res.json({
                        datafrom: 5,
                        total: t,
                        dataset01: count
                    });
                }).catch(err => console.log(err));
            }).catch(err => console.log(err));
        }
    }
}