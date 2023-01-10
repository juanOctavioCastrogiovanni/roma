'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('categories', {
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
        return queryInterface.dropTable('categories');
    }
};