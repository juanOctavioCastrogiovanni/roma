module.exports = function (sequelize, dataTypes) {
    let alias = 'Address'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        user_id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
        },
        street: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        city: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        prov: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        alias: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        number: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        },
        floor: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        },
        departament: {
            type: dataTypes.STRING(5),
            allownull: false
        },
        zip_code: {
            type: dataTypes.INTEGER.UNSIGNED,
            allownull: false
        }
    }

    let config = {
        tableName: 'addresses',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let Address = sequelize.define(alias, cols, config);

    Address.associate = function (models) {
        Address.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
        Address.hasMany(models.Cart, {
            as: "cart",
            foreignKey: "address_id"
        }) 
    }
    return Address
}