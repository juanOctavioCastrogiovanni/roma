const db = require('../../db/models')

async function updateCartMiddleware(req, res, next) {
    //Se fija si el propducto que llega por body ya esta en el carrito, si esta guarda acummula los datos de los elementos en el carrito
    //sino setea los datos en session de los acumuladores en 0

    //LEVANTA EL CARRITO QUE ESTA EN SESSION Y EL PRODUCTO QUE LLEGA POR BODY
    let cart = await db.Cart.findByPk(req.session.cartId, {
        include: ['product']
    })


    let flag = false;
    let prodQty
    let prodPrice
    //RECORRE EL ARRAY DE PRODUCTID EN SESSION Y SI ESTA RECORRE EL ARRAY DE PRODUCTOS EN CARRITO Y ACUMULA EL PRECIO Y LA CANTIDAD EN SESSION
    if(req.session.productsId.length > 0){
        req.session.productsId.forEach(oldId => {
            if (oldId == req.body.id) {
                flag = true;
            }
        })
    } 
    if (flag) {
        cart.product.forEach(prod => {
            if (prod.id == req.body.id) {
                prodQty = prod.cart_product.qty
                prodPrice = prod.price
            }
        })


        req.session.qty = Number(prodQty);

        cart.removeProduct(Number(req.body.id))

    } else {
        req.session.prPrice = 0;
        req.session.qty = 0;
    }

    next()
}

module.exports = updateCartMiddleware;