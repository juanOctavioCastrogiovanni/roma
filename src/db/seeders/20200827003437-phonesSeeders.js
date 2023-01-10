'use strict';

const factory = require('../factories/phonesFactory')

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('phones', factory(4), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('phones', null, {});
    }
};
