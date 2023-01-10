'use strict';

const factory = require('../factories/addressesFactory')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('addresses', factory(4), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('addresses', null, {});
    }
};

