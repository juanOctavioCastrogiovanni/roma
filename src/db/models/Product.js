module.exports = function (sequelize, dataTypes) {
    let alias = 'Product'

    let cols = {
        id: {
            type: dataTypes.BIGINT(19).UNSIGNED,
            primaryKey: true,
            autoIncrement: true,
            allownull: false
        },
        name: {
            type: dataTypes.STRING(50),
            allownull: false
        },
        description: {
            type: dataTypes.STRING(600),
            allownull: false
        },
        gross_price: {
            type: dataTypes.DECIMAL(10, 2).UNSIGNED,
            allownull: false
        },
        discount: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allownull: false
        },
        price: {
            type: dataTypes.DECIMAL(10, 2).UNSIGNED,
            allownull: false
        },
        stock: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allownull: false
        },
        slices: {
            type: dataTypes.INTEGER(10).UNSIGNED,
            allownull: true
        },
        image_1: {
            type: dataTypes.STRING(100),
            allownull: false
        },
        image_2: {
            type: dataTypes.STRING(100),
            allownull: true
        },
        image_3: {
            type: dataTypes.STRING(100),
            allownull: true
        },
        image_4: {
            type: dataTypes.STRING(100),
            allownull: true
        }
    }

    let config = {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        underscored: true,
        paranoid: true
    }

    let Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "category_id"
        })

        Product.belongsToMany(models.Cart, {
            as: 'cart',
            through: "cart_product",
            foreignKey: "product_id",
            otherKey: "carts_id",
            timestamps: false
        })
    }

    return Product
}