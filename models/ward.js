'use strict'

module.exports = (sequelize, DataTypes) => {
    let ward = sequelize.define('ward', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        geom: {
            allowNull: true,
            type: DataTypes.GEOMETRY('MULTIPOLYGON', 4326)
        },
        ward: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        population: {
            allowNull: true,
            type: DataTypes.BIGINT
        },
        area_sqm: {
            allowNull: true,
            type: DataTypes.DOUBLE
        },
        city: {
            allowNull: true,
            type: DataTypes.STRING(50)
        },
        area_sqkm: {
            allowNull: true,
            type: DataTypes.DOUBLE       }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return ward;
}