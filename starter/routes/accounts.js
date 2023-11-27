let passport = require('passport');
var express = require('express');
var router = express.Router();

router.get('/login', function (req, res) {
    res.render('../views/accounts/login', { message: req.flash('loginMessage') });
});

router.get('/signup', function (req, res) {
    res.render('../views/accounts/signup',
        { message: req.flash('signupMessage') });
});

router.get('/logout', function (req, res) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});


router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/', //redirect to the secure home page
    failureRedirect: '/accounts/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/', //redirect to the home page
    failureRedirect: '/accounts/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));

// makes sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;