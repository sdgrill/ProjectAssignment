let passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
    res.render('../views/accounts/login', { message: req.flash('loginMessage') });
});



router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});



router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', //redirect to the home page
    failureRedirect: '/accounts/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// ensures a user is logged in
function isLoggedIn(req, res, next) {

    // if authenticated, carry on 
    if (req.isAuthenticated())
        return next();

    // if not, redirect to the home page
    res.redirect('/');
}

module.exports = router;