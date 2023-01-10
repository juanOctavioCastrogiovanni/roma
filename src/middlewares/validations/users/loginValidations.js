const { check, body } = require('express-validator');
let db = require('../../../db/models')

let loginValidations = [
    check('email').isEmail().withMessage('Debe usar un email válido'),

    body('email').custom(value => {
        
        return db.User.findAll({
            where: {
                email: value
            }
        })
            .then(user => {
                if (!user[0]) {
                return Promise.reject('El email ingresado no se encuentra registrado');
                }
            });        
    }),

    check('password').isLength({min: 8}).withMessage('La contraseña es incorrecta')
    

]

module.exports = loginValidations
