module.exports = function (sequelize, dataTypes) {
    let alias = 'Phone'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        cell_phone: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        },
        cell_phone_2: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: true
        },
        phone: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: true
        }
    }

    let config = {
        tableName: 'phones',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let Phone = sequelize.define(alias, cols, config);

    Phone.associate = function (models) {
        Phone.hasOne(models.User, {
            as: "user",
            foreignKey: "phone_id"
        })

    }

    return Phone
}