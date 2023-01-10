'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            last_name: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: false
            },
            admin: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            phone_id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                references: {
                    model: {
                        tableName: 'phones',
                        key: 'id'
                    }
                },
                allowNull: false
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
        return queryInterface.dropTable('users')
    }
};