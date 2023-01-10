const { check, body } = require('express-validator');
let db = require('../../../db/models')





let registerValidations = [
    
    check('name').isLength({min: 2}).withMessage('Debe escribir tu nombre'),
    check('lastname').isLength({min: 2}).withMessage('Debe escribir tu apellido'),
    check('email').isEmail().withMessage('Debe usar un email válido'),

    body('email').custom(value => {
        return db.User.findAll({
            where: {
                email: value
            }
        })
            .then(user => {
                if (user[0]) {
                return Promise.reject('Ya existe una cuenta con este email');
                }
            });
    }),

    check('password').isLength({min: 8}).withMessage('La contraseña debe tener al menos 8 caracteres'),
    body('passwordConfirmation').custom( (value, {req}) => {
        if (value !== req.body.password) {
            return false;
        }
        return true;
    }).withMessage('Las contraseñas no coinciden'),
    check('cell_phone')
        .isNumeric().withMessage('Debe escribir un número de teléfono válido en "teléfono celular pricipal"')
        .isLength(({min: 8})).withMessage('El teléfono debe tener al menos 8 números'),
    body('cell_phone_2').custom(value => {
        if((value.length==0)||(value.length>=8 && (!isNaN(value)))) {
            return true
        }
        return false
    }).withMessage('Debe escribir un número de teléfono válido en  "teléfono celular alternativo"'),
    body('phone').custom(value => {
        if((value.length==0)||(value.length>=8 && (!isNaN(value)))) {
            return true
        }
        return false
    }).withMessage('Debe escribir un número de teléfono válido en "teléfono"')
]

module.exports = registerValidations
