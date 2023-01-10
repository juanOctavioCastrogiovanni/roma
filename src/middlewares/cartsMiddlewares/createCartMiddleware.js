const db = require('../../db/models')

async function cartMiddleware(req, res, next) {
    if (req.session.cartBool != true && req.session.user == undefined) { 
        //no hay carrito creado y no hay usuario logueado
        //crea un carrito en la base de datos y guarda esa info en el session

        req.session.cartFull = false
        req.session.cartBool = true
        req.session.productsId = []

        let cart = await db.Cart.create({
            user_id: null,
            address_id: null,
            total_price: 0,
            products_total: 0,
            general_comments: '',
            sold: false
        })
        req.session.cartId = cart.dataValues.id 


    } else if (req.session.user != undefined && req.session.cartFull == true && req.session.cartBool2 != true) {
        //hay usuario logueado, el carrito tiene cosas y es la primera vez que entra aca
        //levanta el carrito que ya tenia en session y le asigna el usuario que se acaba de loguear
        req.session.cartBool2 = true

        let cart4 = await db.Cart.update({
            user_id: req.session.userId,
            sold: false
        }, {
            where: { 
                id: req.session.cartId
            }
        })

    } else if (req.session.user != undefined && req.session.cartFull != true && req.session.cartBool3 != true) { 
        //hay usuario logueado, el carrito esta vacio y es la primera vez que entra aca
        //levanta el ultimo carrito del user guardado  y no vendido si es que lo tiene


        req.session.cartBool3 = true
        //levanta los carritos de usuario guardados no vendidos
        let cart2 = []
        cart2 = await db.Cart.findAll  ({
            where: {
                user_id: req.session.userId,
                sold: false
            } 
        })
        //entra por unica vez y guarda en session el id del ultimo carrito no vendido que tenia el usuario
        if (cart2.length > 0 && req.session.cartBool4 != true) {
            req.session.cartBool4 = true
            req.session.cartId = cart2[cart2.length-1].id 

            //levanta ese carrito
             let cart3 = await db.Cart.findByPk(req.session.cartId,{
                 include: ['product']
             })
            req.session.productsId = [];

 
            //pushea en session el id de todos los productos que estan en ese carrito
              cart3.product.forEach(produc=> {
                  req.session.productsId.push(produc.id)
              })
            //en session guarda si el carrito tiene cosas
            if (Number(cart3.products_total)>0){
                req.session.cartFull = true
            } else {
                req.session.cartFull = false
            }  
            
            req.session.cartBool = true

        } else if (req.session.cartBool != true) {
        //entra aca si hay usuario logueado, levantado desde cookie pero no tiene ningun carrito en la base de datos
        //crea un carrito
            req.session.productsId = []; 
            req.session.cartFull = false
            req.session.cartBool = true
           
            let cart = await db.Cart.create({
                user_id: req.session.userId,
                address_id: null,
                total_price: 0,
                products_total: 0,
                general_comments: '',
                sold: false
            })
            req.session.cartId = cart.dataValues.id

        }
    }

    next()
}

module.exports = cartMiddleware;