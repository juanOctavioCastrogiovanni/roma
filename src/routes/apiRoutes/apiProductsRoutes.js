var express = require('express');
var router = express.Router();

const apiControllers = require('../../controllers/apiControllers')

router.get('/', apiControllers.products.list)

router.get('/categories', apiControllers.products.categories)

router.get('/:id', apiControllers.products.detail)

module.exports = router;
