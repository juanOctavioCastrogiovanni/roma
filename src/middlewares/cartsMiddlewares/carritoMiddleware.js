const db = require('../../db/models');
let actualizarFx = require('../../Fx/actualizar');


async function pindorcho (req,res,next) {
// let cart = await db.cart_product.findAll({
//     where: {
//         carts_id:req.session.cartId
//     }
// })
let actualizar


let cart2 = await db.Cart.findAll({
    include: ['product'],
    where: {
        id: req.session.cartId
    }
})
    actualizar = false;

    for await (let producto of cart2[0].product) {
     if (producto.price != producto.cart_product.unit_price){
        actualizar = true;
        }
 }

// let pindorcha = await cart2[0].product.forEach(producto => {
// if (producto.price != producto.cart_product.unit_price){
//     actualizar = true;
//     }
// })


if (actualizar) {
    actualizarFx(cart2[0]);
}



next()
}

module.exports = pindorcho;