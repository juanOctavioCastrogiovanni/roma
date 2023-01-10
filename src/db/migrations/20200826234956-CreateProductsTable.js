'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('products', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
              type: Sequelize.STRING(50),
              allowNull: false
             },
            description: {
                type: Sequelize.STRING(600),
                allowNull: false
            },
            price: {
                type: Sequelize.DECIMAL(10, 2).UNSIGNED,
                allowNull: false
            },
            gross_price: {
                type: Sequelize.DECIMAL(10, 2).UNSIGNED,
                allowNull: false
            },
            discount: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            stock: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            slices: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true
            },
            category_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'categories',
                        key: 'id'
                    }
                },
                allowNull: false
            },
            image_1: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            image_2: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            image_3: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            image_4: {
                type: Sequelize.STRING(100),
                allowNull: true
            },
            created_at: {
                type: Sequelize.DATE,
                allowNull: true
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

        return queryInterface.dropTable('products');

    }
};