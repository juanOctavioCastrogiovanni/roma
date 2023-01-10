var express = require('express');
var router = express.Router();
let updateCartMiddleware = require('../middlewares/cartsMiddlewares/updateCartMiddleware')
const profileMiddleware = require('../middlewares/profileMiddleware');
let carritoMiddleware = require('../middlewares/cartsMiddlewares/carritoMiddleware');


const controllers = require('../controllers');

router.get('/', [carritoMiddleware,carritoMiddleware,carritoMiddleware], controllers.cart.root);

router.post('/', updateCartMiddleware, controllers.cart.store);

router.put('/', controllers.cart.update);

router.delete('/', controllers.cart.destroy);

router.post('/comprar', profileMiddleware, controllers.cart.buyCart);




module.exports = router;