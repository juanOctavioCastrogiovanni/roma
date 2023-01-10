'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('carts', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            user_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'users',
                        key: 'id'
                    }
                },
                allowNull: true
            },
            address_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'addresses',
                        key: 'id'
                    }
                },
                allowNull: true
            },
            total_price: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            products_total: {
                type: Sequelize.DECIMAL(10, 0),
                allowNull: false
            },
            general_comments: {
                type: Sequelize.STRING(600),
                allowNull: true
            },
            sold: {
                type: Sequelize.BOOLEAN,
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
        return queryInterface.dropTable('carts');
    }
    
};