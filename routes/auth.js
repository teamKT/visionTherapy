const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const passport = require("passport");
const helpers = require("../helpers/authHelpers")

// signing up as a doctor
router.get('/signup', helpers.signedOn, function(req,res){
  res.render('auth/signup', {message: req.flash('signupMessage')});
});

// POST new doctor info into database
router.post('/signup', helpers.signupCheck, function(req,res){
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    bcrypt.hash(req.body.user.password, salt, function(err, hash){
      knex('doctors').insert({
        isDoctor: true,
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

// login page showing both doctors and patients login
router.get('/login', helpers.signedOn, function(req,res){
  res.render('auth/login', {message1: req.flash('loginMessage1'), message2: req.flash('loginMessage2')})
});

// after successful login, redirect to doctors dashboard
router.post('/doctor-login', helpers.validInputs, passport.authenticate('local', {
  successRedirect: '/auth/doctors',
  failureRedirect: '/auth/login'
}));

// sample login
router.post('/sample', passport.authenticate('local', {
  successRedirect: '/doctors/sample',
  failureRedirect: '/auth/login'
}));

// redirects doctors to right page after sign in
router.get('/doctors', helpers.isAuthenticated, (req,res) => {
  res.redirect('/doctors/' + req.user.id)
});

// after successful login, redirect to /auth/patients to be further redirected
router.post('/patient-login', helpers.validInputs, passport.authenticate('local', {
  successRedirect: '/auth/patients/',
  failureRedirect: '/auth/login'
}));

// redirects patient to right page after sign in
router.get('/patients', helpers.isAuthenticated, (req,res) => {
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

//get doctors ID
router.get('/get_doctor_id', function(req,res){
  console.log("# Current Doctor ID check "+ req.user.id);
  knex('doctors').where('id', +req.user.id).first().returning("*")
  .then((data) =>{
    res.format({
      'text/html': () => {
          res.redirect('/')
      },
      'application/json': () => {
          console.log("DATA from PUT: ", JSON.stringify(data));
          res.send(data)
      },
      'default': () => {
          // log the request and respond with 406
          res.status(406).send('Not Acceptable');
      }
    })
  })  
});

// return the session value when the client checks
router.get('/get_patient_id', function(req,res){
  console.log("# Current User ID check "+ req.user.id);
  knex('patients').where('id', +req.user.id).first()
  .then((user) =>{
    if (user) {
      res.json({childInfo: user});
    } else {
      res.json({userid: req.user.id});
    }
  })    
});



module.exports = router;