let controllers = {
    main: require('./mainController'),
    user: require('./usersController'),
    userAuth: require('./usersAuthController'),
    products: require('./productsController'),
    cart: require('./cartController'),
    admin: require('./adminControllers')
}

module.exports = controllers