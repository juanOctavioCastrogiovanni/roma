const db = require('../db/models');
const sequelize = require('sequelize')


module.exports = async function (req,res,x) {
    let product = await db.Product.findAll({
        where: {
            name: {
                [sequelize.Op.substring]:req.query.search
            }
        }
    })

    let categories = await db.Category.findAll()
        // let cant = 0;
        // let productsFound = [];
        // let word = req.query.search;
        // word = word.toLocaleLowerCase();
        // products.forEach(product => {
        //     let title = product.title.toLocaleLowerCase();
        //     let category = product.category.toLocaleLowerCase();
        //     if ((title.indexOf(word) != -1) || (category.indexOf(word) != -1)) {
        //         productsFound.push(product);
        //         cant++;
        //     }
        // });

    let cant = product.length
    let word = req.query.search
    
    if (x=='admin')
    {
    res.render('products/admin/adminProducts', {
        products: product,
        title: 'Productos',
        categories: categories,
        word: word,
        cant: cant,
        user: req.session.user,
        admin: req.session.admin
    })
    } else {
        res.render('products/products', {
            products: product,
            title: 'Productos',
            categories: categories,
            word: word,
            cant: cant,
            user: req.session.user,
            admin: req.session.admin
        })
    }

}
