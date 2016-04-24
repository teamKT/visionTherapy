const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const passport = require("passport");

router.get('/signup', function(req,res){
  res.render('auth/signup')
});

router.post('/signup', function(req,res){
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    bcrypt.hash(req.body.user.password, salt, function(err, hash){
      knex('doctors').insert({
        firstname: req.body.user.firstname,
        lastname: req.body.user.lastname,
        email: req.body.user.email,
        username: req.body.user.username, 
        password: hash
      }).then(function(){
          res.redirect('/auth/login');
      }).catch(function(){
          res.redirect('/auth/signup');
      });
    });
  });
});

router.get('/login', function(req,res){
  res.render('auth/login')
});

// after successful login, redirect to doctors index
router.post('/doctor-login', passport.authenticate('local', {
  successRedirect: '/doctors/',
  failureRedirect: '/auth/login'
}));

// logout passport session
router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/auth/login');
});

module.exports = router;