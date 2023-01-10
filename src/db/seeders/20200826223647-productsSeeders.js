'use strict';

const factory = require('../factories/productsFactory')

// let hola = factory(1);

// console.log(hola)
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('products', factory(4), {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('products', null, {});
    }
};
