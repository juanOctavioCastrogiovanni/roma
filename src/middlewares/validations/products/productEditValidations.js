const { check } = require('express-validator');

let productEditValidation = [
    
    check('name').isLength({min: 2}).withMessage('Debe escribir el nombre del producto'),

    check('price').isNumeric({min: 1}, ['ar']).withMessage('Debe escribir un precio separando los decimales por una coma'),

    check('description').isLength({min: 10}).withMessage('Debe escribir una descripción del producto'),

    check('slices').isNumeric({min: 0, max: 20}).withMessage('Las porciones deben ser un número entre 0 a 20'),

    check('stock').isNumeric({min: 0, max: 9999}).withMessage('Debe ingresar un número de stock'),

]

module.exports = productEditValidation
