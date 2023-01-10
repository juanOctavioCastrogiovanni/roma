const db = require('../db/models/');

let cartController = {
    // Root - Show all Shopping Cart
    root: async function (req, res) {

        let cart = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })

        let addresses

        if (req.session.userId != undefined) {
            addresses = await db.Address.findAll({
                where: {
                    user_id: req.session.userId
                }
            })
        } else {
            addresses = null
        }

        // res.json(cart)
        res.render('shoppingCart', {
            title: 'Carrito',
            admin: req.session.admin,
            cart: cart,
            addresses: addresses,
            products: cart.product,
            user: req.session.user
        })

    },
    store: async function (req, res) {
        //BUSCA EN LA BASE DE DATOS EL CARRITO EN SESSION Y EL PRODUCTO QUE LLEGA POR EL BODY
        let cart = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let product = await db.Product.findByPk(req.body.id)


        //BUSCA EN EL ARRAY DE PRODUCTOS AGREGADOS AL CARRITO SI ESTA EL PRODUCTO QUE LLEGA POR BODY, SI NO ESTA LO AGREGA
        let flag = true;
        req.session.productsId.forEach(productId => {
            if (productId == req.body.id) {
                flag = false;
            }
        })
        if (flag) {
            req.session.productsId.push(req.body.id)
        }

        //AGREGA EL PRODUCTO A LA TABLA PIVOT CON LOS DATOS CON LA CANTIDAD QUE TENIA (LLEGA DEL MIDDLEWARE) Y DEL BODY
        await cart.addProduct(product.id, {
            through: {
                unit_price: Number(product.price),
                qty: Number(req.body.qty) + Number(req.session.qty),
                sub_total_price: Number(product.price) * (Number(req.body.qty) + Number(req.session.qty))
            }
        })

        //BUSCA DE NUEVO EL CARRITO PERO YA CON EL PRODUCTO AGREGADO
        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        
        let productsInCart = cartFull.product
        let cartTotalPrice = 0
        let cartTotalQty = 0

        //RECORRE EL ARRAY DE PRODUCTOS ASOCIADO A LA TABLA DE CARRITO Y ACUMULA LAS CANTIDADES Y TOTALES
        productsInCart.forEach(function (productInCart) {
            cartTotalPrice += Number(productInCart.cart_product.sub_total_price)
            cartTotalQty += Number(productInCart.cart_product.qty)
        })

        //ACTUALIZA EL CARRITO CON LOS TOTALES Y CANTIDADES DE LA TABLA PIVOT
        let cart4 = await db.Cart.update({
            user_id: req.session.userId,
            address_id: null,
            total_price: cartTotalPrice,
            products_total: cartTotalQty,
            general_comments: '',
            sold: false
        }, {
            where: {
                id: req.session.cartId
            }
        })


        //SETEA BOOLEANO QUE DICE QUE EL CARRITO TIENE COSAS EN TRUE
        req.session.cartFull = true

        res.redirect('/carrito')

    },
    // ESTE METODO SIRVE SOLO PARA LA ACTUALIZACION DE CANTIDADES DENTRO DEL CARRITO
    update: async function (req, res) {
        //LEVANTA EL CARRITO QUE ESTA EN SESSION Y EL PRODUCTO QUE LLEGA POR BODY
        let cart = await db.Cart.findByPk(req.session.cartId)
        let product = await db.Product.findOne({
            where: {
                id: req.body.id
            }
        })
        //AGREGA EL PRODUCTO QUE LLEGA POR BODY, CON LA CANTIDAD ELEGIDA POR EL CLIENTE
        cart.addProduct(product, {
            through: {
                unit_price: product.price,
                qty: req.body.qty,
                sub_total_price: product.price * req.body.qty
            }
        })

        //LEVANTA EL CARRITO YA CON EL PRODUCTO AGREGADO
        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let productsInCart = cartFull.product


        let cartTotalPrice
        let cartTotalQty
        let newQty
        let unitPrice

        //RECORRE LOS PRODUCTOS ASOCIADOS A ESE CARRITO, Y SUMA O RESTA LOS LAS CANTIDADES Y PRECIO DEPENDIENDO DE SI EL NUMERO QUE
        //LLEGA POR BODY ES MAYOR O MENOR DEL QUE HABIA EN EL CARRITO
        productsInCart.forEach(function (productInCart) {
            if (productInCart.id == req.body.id) {
                // NEWQTY DA NEGATIVO PERO EN LA ACTUALIZACION DEL CARRITO HAY UNA SUMA
                if (req.body.qty <= productInCart.cart_product.qty) {
                    newQty = Number(req.body.qty) - Number(productInCart.cart_product.qty)
                    unitPrice = Number(productInCart.cart_product.unit_price)
                    cartTotalPrice = Number(cartFull.total_price) + (unitPrice * newQty)
                    cartTotalQty = Number(cartFull.products_total)
                } else if (req.body.qty > productInCart.cart_product.qty) {
                    newQty = Number(req.body.qty) - Number(productInCart.cart_product.qty)
                    cartTotalPrice = Number(cartFull.total_price)
                    unitPrice = Number(productInCart.cart_product.unit_price)
                    cartTotalQty = Number(cartFull.products_total)
                    cartTotalPrice += (unitPrice * newQty)
                }
            }
        })

        //ACTUALIZA EL CARRITO CON LOS DATOS ACUMULADOS Y ACTUALIZADOS QUE ME DIO ARRIBA
        await db.Cart.update({
            user_id: req.session.userId,
            address_id: null,
            total_price: cartTotalPrice,
            products_total: cartTotalQty + newQty,
            general_comments: '',
            sold: false
        }, {
            where: {
                id: req.session.cartId
            }
        })
        res.redirect('/carrito')
    },
    destroy: async function (req, res) {
        //LEVANTA EL CARRITO QUE ESTA EN SESSION
        let cartFull = await db.Cart.findByPk(req.session.cartId, {
            include: ['product']
        })
        let productsInCart = cartFull.product
        let cartTotalPrice = cartFull.total_price
        let cartTotalQty = cartFull.products_total

        //RECORRE EL ARRAY DE PRODUCTOS ASOCIADOS A LA TABLA CARRITO Y SI EL ID ES EL MISMO QUE EL PRODUCTO QUE LLEGA POR BODY
        //RESTA EL TOTAL Y LA CANTIDAD
        productsInCart.forEach(function (productInCart) {
            if (productInCart.cart_product.product_id == req.body.id) {
                cartTotalPrice -= Number(productInCart.cart_product.sub_total_price)
                cartTotalQty -= Number(productInCart.cart_product.qty)
            }
        })

        //FILTRA EL ARRAY DE PRODUCTSID DE SESSION SACANDOLE EL PRODUCTO ELIMINADO
        req.session.productsId = req.session.productsId.filter((productId => {
            return productId != req.body.id
        }))

        //ACTUALIZA EL CARRITO CON LAS CANTIDADES ACUMULADAS ARRIBA
        await db.Cart.update({
            user_id: req.session.userId,
            address_id: null,
            total_price: cartTotalPrice,
            products_total: cartTotalQty,
            general_comments: '',
            sold: false
        }, {
            where: {
                id: req.session.cartId
            }
        })

        //ELIMINA EL PRODUCTO DE LA TABLA PIVOT
        await db.Cart.findByPk(req.session.cartId).then(cart => {
            cart.removeProduct(req.body.id)
        })


        res.redirect('/carrito')
    },
    buyCart: async function (req, res) {

        //SI LOS COMENTARIOS ESTAN VACIOS LOS SETEA EN NULL PARA NO ROMPER LA BASE DE DATOS
        req.body.general_comments == '' ? req.body.general_comments = null : req.body.general_comments
        //GUARDA LOS DATOS FINALES DE LA COMPRA
        await db.Cart.update({
            user_id: req.session.userId,
            address_id: req.body.address_id,
            general_comments: req.body.general_comments,
            sold: true
        }, {
            where: {
                id: req.session.cartId
            }
        })

        //CREA UN NUEVO CARRITO E INIZIALIZA EN CERO TODAS LAS VARIABLES
        req.session.productsId = [];
        req.session.cartFull = false
        req.session.cartBool = true

        let cart = await db.Cart.create({
            user_id: req.session.userId,
            address_id: null,
            total_price: 0,
            products_total: 0,
            general_comments: req.body.general_comments,
            sold: false
        })
        req.session.cartId = cart.dataValues.id

        let userLoggedIn = await db.User.findOne({
            include: ['address', 'phone', 'cart'],
            where: {
                email: req.session.email
            }
        })

        let cartsSold = userLoggedIn.cart.filter(oneCart => {
            return oneCart.sold == true
        })

        res.render('users/profile', {
            title: 'Perfil',
            user: userLoggedIn.name,
            userLoggedIn: userLoggedIn,
            addresses: userLoggedIn.address,
            phone: userLoggedIn.phone.dataValues,
            admin: req.session.admin,
            carts: cartsSold,
            cartSold: true
        })
    }
}

module.exports = cartController;