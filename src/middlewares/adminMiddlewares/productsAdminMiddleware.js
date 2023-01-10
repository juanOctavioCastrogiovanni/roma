const db = require('../../db/models');


let productsAdminMiddleware = (req, res, next) => {
   db.User.findAll({
        where: {
            email: req.session.email,
            admin: true
        }
    })
        .then(users => {
            if (users.length == 0) {
                next();
            } else {
                res.redirect('/admin/productos');
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('/error')
        })
    
}

module.exports = productsAdminMiddleware