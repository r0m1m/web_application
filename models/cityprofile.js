'use strict'

module.exports = (sequelize, DataTypes) => {
    let cityprofile = sequelize.define('cityprofile', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        geom: {
            allowNull: false,
            type: DataTypes.GEOMETRY('POINT', 4326)
        },
        feature: {
            type: DataTypes.STRING
        },
        lat: {
            type: DataTypes.FLOAT(8)
        },
        long: {
            type: DataTypes.FLOAT(8)
        },
        p_f: {
            type: DataTypes.STRING
        },
        p_f_2: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.STRING
        },
        capacity: {
            type: DataTypes.INTEGER
        },
        comments: {
            type: DataTypes.STRING
        },
        slum_name: {
            type: DataTypes.STRING
        },
        ward_no: {
            type: DataTypes.INTEGER
        },
        area: {
            type: DataTypes.FLOAT(8)
        },
        household_no: {
            type: DataTypes.INTEGER
        },
        total_people: {
            type: DataTypes.INTEGER
        },
        water_source: {
            type: DataTypes.STRING
        },
        indiviual_water: {
            type: DataTypes.INTEGER
        },
        indiviual_latrin: {
            type: DataTypes.INTEGER
        },
        comm_latrin: {
            type: DataTypes.INTEGER
        },
        com_lat_sep: {
            type: DataTypes.INTEGER
        },
        com_total_seat: {
            type: DataTypes.INTEGER
        },
        volum_com: {
            type: DataTypes.FLOAT(8)
        },
        com_pic: {
            type: DataTypes.STRING
        },
        cont_pic: {
            type: DataTypes.STRING
        },
        collector: {
            type: DataTypes.STRING
        },
        city: {
            type: DataTypes.STRING
        }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return cityprofile;
}