var express = require('express');
var router = express.Router();
const authMiddleware = require('../middleware/auth')

/* GET home page. */
router.get('/', authMiddleware.ensureAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
