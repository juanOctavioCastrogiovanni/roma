module.exports = function (sequelize, dataTypes) {
    let alias = 'User'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        name: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        last_name: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        email: {
            type: dataTypes.STRING(45),
            allownull: false
        },
        password: {
            type: dataTypes.STRING(100),
            allownull: false
        },
        admin: {
            type: dataTypes.BOOLEAN,
            allownull: false
        }
    }

    let config = {
        tableName: 'users',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Phone, {
            as: "phone",
            foreignKey: "phone_id"
        })

        User.hasMany(models.Address, {
            as: "address",
            foreignKey: "user_id"
        })

        User.hasMany(models.Cart, {
            as: 'cart',
            foreignKey: "user_id"
        })
    }

    return User
}