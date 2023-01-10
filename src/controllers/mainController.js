const db = require('../db/models');
const { unlink } = require('fs-extra');

let indexController = {
    root: async function (req, res) {
            let AllCategories = await db.Category.findAll();
            




            // REVISAR DÓNDE VA ESTO
            // let imagenActual = productsDB[(productsDB.length) - 1].image_1;
            // imagenActual = imagenActual.substring(1)
            
            // unlink('./public/images/upload/' + imagenActual, function (err) {
            //     if (err) {
            //         console.error(err);
            //     }
            //     console.log('archivo borrado');
            // });
    
            // let imagenActualB = productsDB[(productsDB.length)-1].image;
            // imagenActualB = imagenActual.substring(1)
    
            // unlink('./public/images/upload/' + imagenActualB, function (err) {
            //     if (err) {
            //         console.error(err);
            //     }
            //     console.log('archivo borrado');
            // });
    
            res.render('home/home', {
                title: 'Home',
                user: req.session.user,
                admin: req.session.admin
            })
    }

}

module.exports = indexController;