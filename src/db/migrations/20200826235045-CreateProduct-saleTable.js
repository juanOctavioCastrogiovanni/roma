'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('cart_product', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            product_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'products',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            carts_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'carts',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            unit_price: {
                type: Sequelize.DECIMAL(10, 2).UNSIGNED,
                allowNull: false
            },
            qty: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            sub_total_price: {
                type: Sequelize.DECIMAL(10, 2).UNSIGNED,
                allowNull: false
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.DATE,
                allowNull: true
            },
            deleted_at: {
                type: Sequelize.DATE,
                allowNull: true
            }
        });

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('cart_product');
    }
};