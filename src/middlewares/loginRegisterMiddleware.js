let db = require('../db/models')

let loginRegisterMiddleware = (req, res, next) => {

    if ((req.session.user) && (req.session.email)) {        
        
        return db.User.findAll({
            where: {
                email: req.session.email
            }
        })
            .then(user => {
                if (user[0]) { 
                    res.redirect('/usuarios/perfil')
                } 
            });

    }

    // if ((req.session.user) && (req.session.email)) {        
    //     users.forEach(user => {
    //         if (user.email == req.session.email) { 
    //             res.redirect('/usuarios/profile')
    //         } 
    //     })
    // }
        
    next();

}

module.exports = loginRegisterMiddleware;