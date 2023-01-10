const db = require('../db/models');
const Sequelize = require('sequelize')
const Op = Sequelize.Op
let path = require('path');
const search = require('../Fx/search');

function paginate(req, result, productsLimit, url) {
    let queryPage = Number(req.query.page)
    let baseURL = url
    let limit = productsLimit
    let totalPages = parseInt(Number(result.count) / limit) - 1
    let main
    if (!queryPage) {
        main = true
    } else {
        main = false
    }
    return {
        firstPage: baseURL,
        nextPage: baseURL + (queryPage ? queryPage + 1 : 1),
        prevPage: baseURL + (queryPage > 0 ? queryPage - 1 : 0),
        lastPage: baseURL + totalPages,
        totalPages: totalPages,
        currentPage: queryPage,
        main: main
    }
}

let productsController = {
    // Root - Show all products
    root: async function (req, res) {

        let filter = req.query.filter;
        let priceMin = req.query.filterPriceMin;
        let priceMax = req.query.filterPriceMax;
        let filterBool = false
        let filterPriceBool = false
        let products
        let categoriesAll
        let productsAll
        let categoryFilter
        let flag = false
        let respuesta

        if ((filter != undefined) && (priceMin != undefined) && (priceMax != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    category_id: filter,
                    price: {
                        [Op.between]: [priceMin, priceMax]
                    }
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)

            flag = true;
            respuesta = 'filtro, precio maximo y precio minimo'
        }

        if ((filter != undefined) && (priceMin != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    category_id: filter,
                    price: {
                        [Op.gte]: priceMin,
                    }
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)

            flag = true;
            respuesta = 'filtro y precio minimo'
        }

        if ((filter != undefined) && (priceMax != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    category_id: filter,
                    price: {
                        [Op.lte]: priceMax,
                    }
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)

            flag = true;
            respuesta = 'filtro y precio maximo'
        }

        if ((priceMin != undefined) && (priceMax != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    price: {
                        [Op.between]: [priceMin, priceMax]
                    }
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            flag = true;
            respuesta = 'precio maximo y precio minimo'

        }

        if ((priceMin != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    price: {
                        [Op.gte]: priceMin,
                    }
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            flag = true;
            respuesta = 'precio minimo'
        }

        if ((priceMax != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    price: {
                        [Op.lte]: priceMax,
                    }
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            flag = true;
            respuesta = 'precio maximo'
        }

        if ((filter != undefined) && (flag == false)) {
            productsAll = await db.Product.findAll({
                include: ['category'],
                where: {
                    category_id: filter
                }
            })
            products = productsAll
            categoriesAll = await db.Category.findAll()
            categoryFilter = await db.Category.findByPk(filter)

            flag = true;
            respuesta = 'filtro'
        }

        if ((filter == undefined) && (flag == false)) {
            productsAll = await db.Product.findAndCountAll({
                offset: Number(req.query.page) * 18 || 0,
                limit: 12,
                include: ['category'],
            })
            products = productsAll.rows
            categoriesAll = await db.Category.findAll()
            flag = true
            respuesta = 'nada'
        }


        res.render('products/products', {
            title: 'Productos',
            products: products,
            categories: categoriesAll,
            filter: filter,
            filterPriceMin: priceMin,
            filterPriceMax: priceMax,
            user: req.session.user,
            categoryFilter: categoryFilter,
            // productsAllForFilter:productsAllForFilter,
            filterBool: filterBool,
            filterPriceBool: filterPriceBool,
            admin: req.session.admin,
            pagination: paginate(req, productsAll, 12, `/productos?page=`)
        });
    },
    detail: async function (req, res) {

        let productsAll = await db.Product.findAll({
            include: ['category']
        })
        let product = await db.Product.findByPk(req.params.productId, {
            include: ['category']
        })

        if (product) {
            let productsRelated = productsAll.filter(productRelated => {
                if (productRelated.category.name == product.category.name && productRelated.price <= (product.price * 1.5) &&
                    productRelated.price >= (product.price * 0.7) && productRelated != product) {
                    return productRelated;
                };
            });
            return res.render('products/productDetail', {
                title: product.name,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user,
                admin: req.session.admin
            });
        }
        res.redirect('/no-encontrado');
    },
    search: async function (req, res) {
        let x = 'x'
        search(req, res, x);
    },
    showImage: (req, res) => {

        // let filename = req.path.split('/').pop()
        // return res.sendFile(path.resolve('uploads',filename))


        db.Product.findByPk(req.params.productId)
            .then(product => {
                let image = product.image_1
                res.sendFile(path.join(__dirname, '../../public/images/upload', image))
            })
            .catch(errors => {
                console.log(errors);
                res.send('Error!!!');
            })
    }
}

module.exports = productsController;