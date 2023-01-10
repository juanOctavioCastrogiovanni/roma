'use strict';


module.exports = {
    up: (queryInterface, Sequelize) => {

        let categories = [{
                name: 'Dulce'
            }, {
                name: 'Salado'
            }, {
                name: 'Tortas'
            }, {
                name: 'Meriendas'
            }, {
                name: 'Desayunos'
            }, {
                name: 'Brunch'
            }
        ]

        return queryInterface.bulkInsert('categories', categories, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('categories', null, {});
    }
};