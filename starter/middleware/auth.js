function ensureAuthenticated(req, res, next) {
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/accounts/login');
}

module.exports = {
    ensureAuthenticated: ensureAuthenticated,
}