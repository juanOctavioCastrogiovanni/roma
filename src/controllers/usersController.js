const bcrypt = require('bcrypt');
const {
    validationResult
} = require('express-validator');
let db = require('../db/models')

let usersController = {
    register: (req, res) => {

        res.render('users/register', {
            title: 'Registrate',
            user: req.session.user,
            admin: req.session.admin,
            data: {
                name: null,
                lastname: null,
                email: null,
                cell_phone: null,
                cell_phone_2: null,
                phone: null
            },
            admin: req.session.admin
        });
    },
    store: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            let passwordEncripted = bcrypt.hashSync(req.body.password, 10)

            db.User.create({
                name: req.body.name,
                last_name: req.body.lastname,
                email: req.body.email,
                password: passwordEncripted,
                admin: false,
                phone: {
                    cell_phone: req.body.cell_phone,
                    cell_phone_2: req.body.cell_phone_2,
                    phone: req.body.phone
                }
            }, {
                include: ['phone']
            })

            res.render('users/login', {
                title: 'Login',
                user: req.session.user,
                logueo: true,
                register: true,
                data: {
                    email: req.body.email
                },
                admin: req.session.admin,
            });
        } else {
            res.render('users/register', {
                title: 'Registrate',
                errors: errors.errors,
                data: req.body
            });
        }
    },
    update: async function (req, res) {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            await db.Phone.update({
                cell_phone: req.body.cell_phone,
                cell_phone_2: req.body.cell_phone_2,
                phone: req.body.phone,
            }, {
                where: {
                    id: req.body.phone_id
                }
            })

            await db.User.update({
                name: req.body.name,
                last_name: req.body.lastname,
                phone_id: req.body.phone_id,
            }, {
                where: {
                    id: req.session.userId
                }
            })

            res.redirect(`/usuarios/perfil`)

        } else {

            db.User.findOne({
                    include: ['address', 'phone', 'cart'],
                    where: {
                        email: req.session.email
                    }
                })
                .then(userLoggedIn => {
                    
                    let cartsSold = userLoggedIn.cart.filter(oneCart => {
                        return oneCart.sold == true
                      })

                    res.render('users/profile', {
                        title: 'Perfil',
                        user: userLoggedIn.name,
                        userLoggedIn: userLoggedIn,
                        address: userLoggedIn.address[0],
                        phone: userLoggedIn.phone.dataValues,
                        admin: req.session.admin,
                        errors: errors.errors,
                        cartSold: false,
                        carts: cartsSold
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.send('Error!!!')
                })
        }
    },
    addAddress: (req, res) => {
        res.render('users/addAddressForm', {
            title: 'Agregue un direccion',
            user: req.session.user,
            admin: req.session.admin,
            data: {
                alias: null,
                city: null,
                prov: null,
                street: null,
                number: null,
                floor: null,
                departament: null,
                zip_code: null,
            },
        });
    },
    storeAddress: async function (req, res) {

        let errors = validationResult(req)

        if (errors.isEmpty()) {
            await db.Address.create({
                alias: req.body.alias,
                city: req.body.city,
                prov: req.body.prov,
                street: req.body.street,
                number: req.body.number,
                floor: req.body.floor,
                departament: req.body.departament,
                zip_code: req.body.zip_code,
                user_id: req.session.userId
            })

            res.redirect('/usuarios/perfil')
        } else {
            res.render('users/addAddressForm', {
                title: 'Agregue un direccion',
                user: req.session.user,
                admin: req.session.admin,
                data: req.body,
                errors: errors.errors,
            });
        }
    },
    editAddress: async (req, res) => {
        let address = await db.Address.findByPk(req.body.address_id)

        res.render('users/editAddressForm', {
            title: 'Edite su dirección',
            user: req.session.user,
            admin: req.session.admin,
            address: address
        });
    },
    updateAddress: async (req, res) => {
        let errors = validationResult(req)

        if (errors.isEmpty()) {
            await db.Address.update({
                alias: req.body.alias,
                city: req.body.city,
                prov: req.body.prov,
                street: req.body.street,
                number: req.body.number,
                floor: req.body.floor,
                departament: req.body.departament,
                zip_code: req.body.zip_code,
                user_id: req.session.userId
            }, {
                where: {
                    id: req.body.address_id
                }
            })
                res.redirect('/usuarios/perfil')
        } else {
            res.render('users/addAddressForm', {
                title: 'Agregue un direccion',
                admin: req.session.admin,
                user: req.session.user,
                errors: errors.errors
            });
        }

    },
    deleteAddress: async (req, res) =>{
        
         await db.Address.destroy({
             where: {
                 id: req.body.address_id
             }
         })
   
    res.redirect('/usuarios/perfil')
    }
}

module.exports = usersController;