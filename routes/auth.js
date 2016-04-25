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

// after successful login, redirect to doctors dashboard
router.post('/doctor-login', passport.authenticate('local', {
  successRedirect: '/doctors/',
  failureRedirect: '/auth/login'
}));

// after successful login, redirect to /auth/patients to be further redirected
router.post('/patient-login', passport.authenticate('local', {
  successRedirect: '/auth/patients/',
  failureRedirect: '/auth/login'
}));

// redirects patient to right page
router.get('/patients', (req,res) => {
  knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
    .where('patients.id', req.user.id).first().then(function(data){
      res.redirect('/doctors/' + data.doctor_id + '/patients/' + req.user.id)      
    })
});

// logout passport session
router.get('/logout', (req,res) => {
  req.logout();
  res.redirect('/auth/login');
});

//Return the session value when the client checks
router.get('/userid', function(req,res){
  console.log("# Current User ID check "+ req.user.id);
  res.json({userid: req.user.id})
});


module.exports = router;