var express = require('express');
var upload = require('../../middlewares/adminMiddlewares/multerMiddelware')
var router = express.Router();

const adminControllers = require('../../controllers/adminControllers')

/* FORM VALIDATIONS */
const productCreateValidations = require('../../middlewares/validations/products/productCreateValidations')
const productEditValidations = require('../../middlewares/validations/products/productEditValidations')


/*** SHOW PRODUCTS ***/ 
router.get('/productos/', adminControllers.products.root); /* All products */

/*** CREATE ONE PRODUCT ***/ 
router.get('/productos/crear', adminControllers.products.create); /* Form to create */
router.post('/productos/crear', [upload().any(), productCreateValidations], adminControllers.products.store); /* Store in DB */

/***  SEARCH PRODUCTS ***/
router.get('/productos/search', adminControllers.products.search);

/*** EDIT ONE PRODUCT ***/ 
router.get('/productos/:productId/editar', adminControllers.products.edit); /* Form to create */
router.put('/productos/:productId/editar', productEditValidations, adminControllers.products.update); /* Update in DB */

/*** SHOW ONE PRODUCT ***/ 
router.get('/productos/:productId', adminControllers.products.detail); /* Product detail */

/*** DELETE ONE PRODUCT ***/ 
router.delete('/productos/:productId/eliminar', adminControllers.products.destroy); /* Delete from DB */


module.exports = router;