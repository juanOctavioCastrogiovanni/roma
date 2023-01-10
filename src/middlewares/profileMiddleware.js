let profileMiddleware = (req, res, next) => {
    if ((req.session.user) && (req.session.email)) {    
        next();
    } else {
        res.redirect('/usuarios/login');
    }
}

module.exports = profileMiddleware;