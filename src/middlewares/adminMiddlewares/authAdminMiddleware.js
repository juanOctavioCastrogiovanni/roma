const db = require('../../db/models');


let authAdminMiddleware = (req, res, next) => {
   db.User.findAll({
        where: {
            email: req.session.email,
            admin: true
        }
    })
        .then(users => {
            if (users.length != 0) {
                next();
            } else {
                res.redirect('/')
            }
        })
        .catch(err => {
            console.log(err)
            res.redirect('/')
        })
    
}

module.exports = authAdminMiddleware