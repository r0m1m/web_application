'use strict'

module.exports = (sequelize, DataTypes) => {
    let household = sequelize.define('household', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER(4)
        },
        geom: {
            allowNull: true,
            type: DataTypes.GEOMETRY('POINT', 4326)
        },
        m_1: {
            allowNull: true,
            type: DataTypes.DATE
        },
        m_2: {
            allowNull: true,
            type: DataTypes.DATE
        },
        m_3: {
            allowNull: true,
            type: DataTypes.DATE
        },
        m_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        m_5: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_1_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        _Q_1_1_1: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        _Q_1_1_2: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        _Q_1_1_3: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        _Q_1_1_4: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_1_2: {
            allowNull: true,
            type: DataTypes.INTEGER(4)
        },
        Q_1_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_1_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_1_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_2_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_2_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_2_3: {
            allowNull: true,
            type: DataTypes.INTEGER(4)
        },
        Q_2_4: {
            allowNull: true,
            type: DataTypes.INTEGER(4)
        },
        Q_2_5: {
            allowNull: true,
            type: DataTypes.INTEGER(4)
        },
        Q_2_6: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_2_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_2_8: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_2_8_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_4_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_6: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_6_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_3_8: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_2_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_2_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_2_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_2_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_2_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_3_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_3_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_3_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_4_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_4_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_4_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_6: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_8: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_9: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_9_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_10: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_11: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_12: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_13: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_4_13_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_2_1: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_2_2: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_2_3: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_2_1_1: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_2_2_1: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_2_3_1: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_3_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_3_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_4_1: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_4_2: {
            allowNull: true,
            type: DataTypes.FLOAT(8)
        },
        Q_5_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_6: {
            allowNull: true,
            type: DataTypes.DATE
        },
        Q_5_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_8: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_9: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_10: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_11: {
            allowNull: true,
            type: DataTypes.DATE
        },
        Q_5_12: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_13: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_14: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_15: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_16: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_17: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_18: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_19: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_5_20: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_6: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_6_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_8: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_9: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_10: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_11: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_11_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_6_12: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_5: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_6: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_7_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_8: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_9: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_10: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_11: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_7_12: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_8_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_8_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_8_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_8_4: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_9_1: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_9_2: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_9_3: {
            allowNull: true,
            type: DataTypes.STRING
        },
        Q_10: {
            allowNull: true,
            type: DataTypes.STRING
        },
        m_6: {
            allowNull: true,
            type: DataTypes.INTEGER(4)
        },
        m_7: {
            allowNull: true,
            type: DataTypes.STRING
        },
        m_8: {
            allowNull: true,
            type: DataTypes.DATE
        },
        m_9: {
            allowNull: true,
            type: DataTypes.STRING
        },
        m_10: {
            allowNull: true,
            type: DataTypes.INTEGER(4)
        },
        Q_11: {
            allowNull: true,
            type: DataTypes.STRING
        }

    }, {
        freezeTableName: true,
        timestamps: false
    });
    return household;
}