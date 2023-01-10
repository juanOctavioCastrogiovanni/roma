module.exports = function (sequelize, dataTypes) {
    let alias = 'Cart'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        total_price: {
            type: dataTypes.DECIMAL(10, 2),
            allownull: false
        },
        products_total: {
            type: dataTypes.DECIMAL(10, 0),
            allownull: false
        },
        general_comments: {
            type: dataTypes.STRING(600),
            allownull: true
        },
        sold: {
            type: dataTypes.BOOLEAN,
            allownull: false
        }
    }

    let config = {
        tableName: 'carts',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let Cart = sequelize.define(alias, cols, config);

    Cart.associate = function (models) {
        Cart.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })

        Cart.belongsTo(models.Address, {
            as: "address",
            foreignKey: "address_id"
        })

        Cart.belongsToMany(models.Product, {
            as: 'product',
            through: "cart_product",
            foreignKey: "carts_id",
            otherKey: "product_id",
            timestamps: false
        })
    }


    return Cart
}