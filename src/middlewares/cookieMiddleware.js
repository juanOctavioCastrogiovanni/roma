function cookieMiddleware (req, res, next) {
    if ((req.cookies.recordame)&&(req.cookies.usuario)&&(req.session.user == undefined)&&(req.session.email == undefined)) {
        req.session.user = req.cookies.usuario;
        req.session.email = req.cookies.recordame;
        req.session.userId = req.cookies.userId;
        if ((req.cookies.admin)&&(req.session.admin == undefined))
        req.session.admin = req.cookies.admin;
    }
    

    // req.session.email = user[0].email
    // req.session.user = user[0].name 
    // req.session.userId = user[0].id
    // if (user[0].admin == true) {
    // req.session.admin = user[0].admin
    // }
    next();
}

module.exports = cookieMiddleware;