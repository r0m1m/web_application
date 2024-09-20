'use strict'

module.exports = (sequelize, DataTypes) => {
    let district = sequelize.define('district', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        geom: {
            allowNull: true,
            type: DataTypes.GEOMETRY('MULTIPOLYGON', 4326)
        },
        district: {
            allowNull: true,
            type: DataTypes.STRING(50)
        },
        key: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        area: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        pop_11: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        pop_19: {
            allowNull: true,
            type: DataTypes.INTEGER      }
    }, {
        freezeTableName: true,
        timestamps: false
    });
    return district;
}