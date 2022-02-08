var middlewareObj = {};

middlewareObj.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}
middlewareObj.isAdmin = (req, res, next) => {
    if(req.user.username != "admin")
    {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be admin to access this page.');
        return res.redirect('/login');
    }
    next();
}

module.exports = middlewareObj;