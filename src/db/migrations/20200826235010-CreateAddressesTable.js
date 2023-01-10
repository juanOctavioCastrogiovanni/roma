'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('addresses', {
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
                allowNull: false
            },
            street: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            city: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            floor: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: true
            },
            departament: {
                type: Sequelize.STRING(5),
                allowNull: true
            },
            prov: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            alias: {
                type: Sequelize.STRING(45),
                allowNull: false
            },
            number: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false
            },
            zip_code: {
                type: Sequelize.INTEGER.UNSIGNED,
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
        return queryInterface.dropTable('addresses');
    }
};