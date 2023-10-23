var express = require('express');
var router = express.Router();


router.get('/create', function(req, res, next) {
  res.render('patients/create', { title: 'Express' });
});

router.get('/details', function(req, res, next) {
    res.render('patients/details', { title: 'Express' });
  });


module.exports = router;
