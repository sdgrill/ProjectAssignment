var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/auth')

/* get home page. */
router.get('/', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET help page. */
router.get('/help', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('help', { title: 'Help Page' });
});


module.exports = router;
