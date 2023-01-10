const sharp = require('sharp');
const {
    unlink
} = require('fs-extra');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const db = require('../../db/models');
const search = require('../../Fx/search')
const {
    validationResult
} = require('express-validator');
const path = require('path')

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


let productsControllers = {
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


        res.render('products/admin/adminProducts', {
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
            pagination: paginate(req, productsAll, 12, `/admin/productos?page=`)
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
            return res.render('products/admin/adminProductDetail', {
                title: product.name,
                product: product,
                productsRelated: productsRelated,
                user: req.session.user,
                admin: req.session.admin
            });
        }
        res.redirect('/no-encontrado');
    },
    // Create - Form to create
    create: (req, res) => {
        db.Category.findAll()
            .then(categories => {
                res.render('products/admin/createProduct', {
                    title: 'Crear Producto',
                    categories: categories,
                    user: req.session.user,
                    admin: req.session.admin,
                    data: {
                        name: null,
                        description: null,
                        slices: null,
                        category_id: null,
                        price: null,
                        stock: null
                    }
                });
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })

    },

    // Create -  Method to store
    store: (req, res, next) => {

        let errors = validationResult(req)
        let flag1=1
        let flag2=2
        let flag3=3



        if (errors.isEmpty()) {

            let ruta = path.join('.', 'public', 'images', 'upload', req.files[0].filename)
            let modificado = path.join('.', 'public', 'images', 'upload', 'm' + req.files[0].filename)
            sharp(ruta)
                .resize(1920, 1080)
                .toFile(modificado)


            
            if(req.files.length>1&&req.files[1].fieldname=='image_2'){
                let rutaB = path.join('.', 'public', 'images', 'upload', req.files[1].filename)
                let modificadoB = path.join('.', 'public', 'images', 'upload', 'm' + req.files[1].filename)
                sharp(rutaB)
                    .resize(1920, 1080)
                    .toFile(modificadoB)
                    
                flag=1
            
            } else {
                flag1=0          
            }

            if((req.files.length>1&&req.files[1].fieldname=='image_3')||(req.files.length>2&&req.files[2].fieldname=='image_3')){
            
                if (req.files.length>1&&req.files[1].fieldname=='image_3'){
                    let rutaC = path.join('.', 'public', 'images', 'upload', req.files[1].filename)
                    let modificadoC = path.join('.', 'public', 'images', 'upload', 'm' + req.files[1].filename)
                    sharp(rutaC)
                        .resize(1920, 1080)
                        .toFile(modificadoC)  

                    flag2=1
                    
                } else {
                    let rutaC = path.join('.', 'public', 'images', 'upload', req.files[2].filename)
                    let modificadoC = path.join('.', 'public', 'images', 'upload', 'm' + req.files[2].filename)
                    sharp(rutaC)
                        .resize(1920, 1080)
                        .toFile(modificadoC)  

                }


            } else {
                flag2=0
            }

            if((req.files.length>1&&req.files[1].fieldname=='image_4')||(req.files.length>2&&req.files[2].fieldname=='image_4')||(req.files.length>3&&req.files[3].fieldname=='image_4')){
                

                if(req.files.length>1&&req.files[1].fieldname=='image_4'){
                    let rutaD = path.join('.', 'public', 'images', 'upload', req.files[1].filename)
                        let modificadoD = path.join('.', 'public', 'images', 'upload', 'm' + req.files[1].filename)
                        sharp(rutaD)
                    .resize(1920, 1080)
                    .toFile(modificadoD)

                    flag3=1
                } else if (req.files.length>2&&req.files[2].fieldname=='image_4'){
                    let rutaD = path.join('.', 'public', 'images', 'upload', req.files[2].filename)
                        let modificadoD = path.join('.', 'public', 'images', 'upload', 'm' + req.files[2].filename)
                        sharp(rutaD)
                    .resize(1920, 1080)
                    .toFile(modificadoD)

                    flag3=2
                } else {

                    let rutaD = path.join('.', 'public', 'images', 'upload', req.files[3].filename)
                        let modificadoD = path.join('.', 'public', 'images', 'upload', 'm' + req.files[3].filename)
                         sharp(rutaD)
                    .resize(1920, 1080)
                    .toFile(modificadoD)
                    flag3=3
                }


            } else {
            flag3=0
            }



        if(flag1==1&&flag2==2&&flag3==3){
            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                image_1: 'm' + req.files[0].filename,
                image_2: 'm' + req.files[1].filename,
                image_3: 'm' + req.files[2].filename,
                image_4: 'm' + req.files[3].filename
            })
        } else if ((flag1==0&&flag2==1&&flag3==2)||(flag1==1&&flag2==0&&flag3==2)||(flag1==1&&flag2==2&&flag3==0)){
            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                image_1: 'm' + req.files[0].filename,
                image_2: 'm' + req.files[1].filename,
                image_3: 'm' + req.files[2].filename,
                image_4: null
            })

        } else if ((flag1==1&&flag2==0&&flag3==0)||(flag1==0&&flag2==1&&flag3==0)||(flag1==0&&flag2==0&&flag3==1)) {
            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                image_1: 'm' + req.files[0].filename,
                image_2: 'm' + req.files[1].filename,
                image_3: null,
                image_4: null
            })
        } else if (flag1==0&&flag2==0&&flag3==0) {
            db.Product.create({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock,
                image_1: 'm' + req.files[0].filename,
                image_2: null,
                image_3: null,
                image_4: null
            })
        } 














            res.redirect(`/admin/productos`)

        } else {
            db.Category.findAll()
                .then(categories => {
                    res.render('products/admin/createProduct', {
                        title: 'Crear Producto',
                        categories: categories,
                        user: req.session.user,
                        admin: req.session.admin,
                        errors: errors.errors,
                        data: req.body
                    });
                })
                .catch(err => {
                    console.log(err)
                    res.send('Error!!!')
                })
        }
    },

    // Update - Form to edit
    edit: (req, res) => {

        let productEdit = db.Product.findByPk(req.params.productId, {
            include: ['category']
        })
        let categoriesEdit = db.Category.findAll()

        Promise.all([productEdit, categoriesEdit])
            .then(([product, categories]) => {
                if (product) {
                    return res.render('products/admin/editProduct', {
                        title: `Editar Producto ${product.name}`,
                        product: product,
                        categories: categories,
                        user: req.session.user,
                        admin: req.session.admin
                    });
                } else {
                    res.send('no entro')
                }
            })
            .catch(err => {
                console.log(err)
                res.send('Error!!!')
            })
    },

    // Update - Method to update
    update: (req, res) => {

        let errors = validationResult(req)

        if (errors.isEmpty()) {

            db.Product.update({
                name: req.body.name,
                description: req.body.description,
                slices: req.body.slices,
                category_id: req.body.category,
                price: req.body.price,
                stock: req.body.stock
            }, {
                where: {
                    id: req.params.productId
                }
            })

            res.redirect(`/admin/productos/${req.params.productId}`)

        } else {
            let productEdit = db.Product.findByPk(req.params.productId, {
                include: ['category']
            })
            let categoriesEdit = db.Category.findAll()

            Promise.all([productEdit, categoriesEdit])
                .then(([product, categories]) => {
                    if (product) {
                        return res.render('products/admin/editProduct', {
                            title: `Editar Producto ${product.name}`,
                            product: product,
                            categories: categories,
                            user: req.session.user,
                            admin: req.session.admin,
                            errors: errors.errors,
                            // data: req.body // ver como pasarle los campos a la vista, pisando los campos value originales del producto a editar
                        });
                    } else {
                        res.send('no entro')
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.send('Error!!!')
                })
        }
    },

    // Delete - Delete one product from DB
    destroy: async function (req, res) {


        let product = await db.Product.findByPk(req.params.productId)

        unlink('./public/images/upload/' + product.image_1, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('archivo borrado');
        });


        unlink('./public/images/upload/' + product.image, function (err) {
            if (err) {
                console.error(err);
            }
            console.log('archivo borrado');
        });


        db.Product.destroy({
            where: {
                id: req.params.productId
            }
        })

        res.redirect('/admin/productos')
    },

    search: async function (req, res) {
        let admin = 'admin'
        search(req, res, admin);


        //     let cant = 0;
        //     let productsFound = [];
        //     let word = req.query.search;
        //     word = word.toLocaleLowerCase();
        //     products.forEach(product => {
        //         let title = product.title.toLocaleLowerCase();
        //         let category = product.category.toLocaleLowerCase();
        //         if ((title.indexOf(word) != -1) || (category.indexOf(word) != -1)) {
        //             productsFound.push(product);
        //             cant++;
        //         }
        //     });




        //     res.render('products/products', {
        //         products: productsFound,
        //         title: 'Productos',
        //         categories: categories,
        //         word: word,
        //         cant: cant,
        //         user: req.session.user,
        //         admin: req.session.admin
        //     })
        // }
    }
}

module.exports = productsControllers;