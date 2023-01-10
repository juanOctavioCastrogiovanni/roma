'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.createTable('phones', {
            id: {
                type: Sequelize.BIGINT(19).UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            cell_phone: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: false
            },
            cell_phone_2: {
                type: Sequelize.INTEGER(10).UNSIGNED,
                allowNull: true
            },
            phone: {
                type: Sequelize.INTEGER(10).UNSIGNED,
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
        return queryInterface.dropTable('phones');
    }
};