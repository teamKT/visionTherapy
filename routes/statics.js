const express = require("express");
const router = express.Router({ mergeParams: true });
const helpers = require('../helpers/authHelpers');

router.get('/contact', function(req, res) {
  res.render('statics/contact');
});

router.get('/about', function(req, res) {
  res.render('statics/about');
});

router.get('/', helpers.signedOn, function(req, res){
  res.render('homepage');
});

module.exports = router;