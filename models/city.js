'use strict'

module.exports = (sequelize, DataTypes) => {
    let city = sequelize.define('city', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        City: {
            type: DataTypes.STRING
        },
        safemanaged : {
            type: DataTypes.INTEGER
        },
        basic : {
            type: DataTypes.INTEGER
        },
        limited : {
            type: DataTypes.INTEGER
        },
        unimproved : {
            type: DataTypes.INTEGER
        },
        opendefication : {
            type: DataTypes.INTEGER
        },
        area: {
            type: DataTypes.FLOAT(8)
        },
        population: {
            type: DataTypes.INTEGER
        },
        density: {
            type: DataTypes.FLOAT(8)
        },
        wards: {
            type: DataTypes.INTEGER
        },
        fs_generation: {
            type: DataTypes.FLOAT(8)
        },
        fs_collection: {
            type: DataTypes.FLOAT(8)
        },
        fs_treatment: {
            type: DataTypes.INTEGER
        },
        fstp: {
            type: DataTypes.INTEGER
        },
        sw_generation: {
            type: DataTypes.FLOAT(8)
        },
        sw_collection: {
            type: DataTypes.FLOAT(8)
        },
        sw_treatment: {
            type: DataTypes.INTEGER
        },
        swtp: {
            type: DataTypes.INTEGER
        },
        dustbin: {
            type: DataTypes.INTEGER
        },
        informal_bin: {
            type: DataTypes.INTEGER
        },
        sts: {
            type: DataTypes.INTEGER
        },
        vaccum_tanker: {
            type: DataTypes.INTEGER
        },
        truck: {
            type: DataTypes.INTEGER
        },
        dump_truck: {
            type: DataTypes.INTEGER
        },
        pick_up: {
            type: DataTypes.INTEGER
        },
        trolley: {
            type: DataTypes.INTEGER
        },
        conservancy_officials: {
            type: DataTypes.INTEGER
        },
        waste_collectors: {
            type: DataTypes.INTEGER
        },
        pit_cleaners: {
            type: DataTypes.INTEGER
        },
        road_collectors: {
            type: DataTypes.INTEGER
        },
        private_pit_cleaners: {
            type: DataTypes.INTEGER
        }

    }, {
        freezeTableName: true,
        timestamps: false
    });
    return city;
}