const db = require('../db/models');

async function actualizar(cart){


cart.product.forEach(producto => {
    db.cart_product.update({
        unit_price: producto.price,
        sub_total_price: producto.price * producto.cart_product.qty
       },{
        where: {
            carts_id:cart.id,
            product_id:producto.id
        }
       })    
       
    });

}

module.exports = actualizar