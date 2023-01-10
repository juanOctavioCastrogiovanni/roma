const { check } = require('express-validator');

let addressValidations = [
    
    check('alias').isLength({min: 2}).withMessage('Debe escribir una alias válido'),
    check('city').isLength({min: 2}).withMessage('Debe escribir una ciudad válida'),
    check('prov').isLength({min: 2}).withMessage('Debe escribir una provincia válida'),
    check('street').isLength({min: 2}).withMessage('Debe escribir una calle válida'),
    check('number').isNumeric().withMessage('Debe escribir un nuémero de calle válido'),
    check('floor').isNumeric().withMessage('Debe escribir un número'),
    check('zip_code').isNumeric({min: 4}).withMessage('Debe escribir un código postal válido'),
]

module.exports = addressValidations
