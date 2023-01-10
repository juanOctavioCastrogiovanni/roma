const {
    check, body
} = require('express-validator');

let editProfileValidations = [

    check('name').isLength({
        min: 2
    }).withMessage('Debés escribir tu nombre'),
    check('lastname').isLength({
        min: 2
    }).withMessage('Debés escribir tu apellido'),
    check('cell_phone')
    .isNumeric().withMessage('Debe escribir un número de teléfono válido en "teléfono celular pricipal"')
    .isLength(({
        min: 8
    })).withMessage('El teléfono debe tener al menos 8 números'),
    body('cell_phone_2').custom(value => {
        if ((value.length == 0) || (value.length >= 8 && (!isNaN(value)))) {
            return true
        }
        return false
    }).withMessage('Debe escribir un número de teléfono válido en  "teléfono celular alternativo"'),
    body('phone').custom(value => {
        if ((value.length == 0) || (value.length >= 8 && (!isNaN(value)))) {
            return true
        }
        return false
    }).withMessage('Debe escribir un número de teléfono válido en "teléfono"')

]

module.exports = editProfileValidations