var express = require('express');
var router = express.Router();

const controllers = require('../controllers')
// const productsAdminMiddleware = require('../middlewares/adminMiddlewares/productsAdminMiddleware')

/*** SHOW PRODUCTS ***/ 
router.get('/', /* productsAdminMiddleware, */ controllers.products.root); /* All products */

/***  SEARCH PRODUCTS ***/
router.get('/search', controllers.products.search);

/*** SHOW ONE PRODUCT ***/ 
router.get('/:productId', controllers.products.detail); /* Product detail */

/*** SHOW IMAGE ***/
router.get('/:productId/imagen', controllers.products.showImage); /* Product detail */




module.exports = router;