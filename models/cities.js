'use strict'

module.exports = (sequelize, DataTypes) => {
    let cities = sequelize.define('cities', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        geom: {
            allowNull: true,
            type: DataTypes.GEOMETRY('POINT', 4326)
        },
        city: {
            allowNull: true,
            type: DataTypes.STRING(100)
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
            type: DataTypes.INTEGER
        },
        district: {
            allowNull: true,
            type: DataTypes.STRING(50)
        },
        imp_toilet: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        will_imp_toilet: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        will_imp_cont: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        cont_accessible: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        cont_emptied: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        cont_emptied_2y: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        cont_emptied_mp: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        fs_to_tp: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        will_imp_service: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        fstp_capacity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        water_contamination_compliance: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_segregate: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_col_van: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_van_ulb: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_van_other: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_charge_efficiency: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_will_imp_service: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_landfill_extent: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_tp_capacity: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_recovery_extent: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_col_psp: {
            allowNull: true,
            type: DataTypes.INTEGER
        },
        swm_disposal_psp: {
            allowNull: true,
            type: DataTypes.INTEGER
        }        

    }, {
        freezeTableName: true,
        timestamps: false
    });
    return cities;
}