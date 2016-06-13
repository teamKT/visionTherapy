const knex = require('../db/knex');

const authHelpers = {
  currentUser(req, res, next) {
    if (req.isAuthenticated()) {
      res.locals.currentUser = req.user;
      return next();
    }
    else {
      return next();
    }
  },
  ensureCorrectUser(req,res,next){
    if(+req.params.id !== req.user.id && req.user.isDoctor){
      return res.redirect('/auth/doctors');
    }
    else if (+req.params.patient_id !== req.user.id && !req.user.isDoctor) {
      return res.redirect('/auth/patients');
    }
    else {
      return next();
    }
  },
  isAuthenticated(req,res,next){
    if (req.isAuthenticated()) return next();
    else res.redirect('/')
  },
  signedOn(req,res,next){
    if (req.isAuthenticated()) {
      res.redirect('/auth/doctors')
    }
    else {
      return next();
    }
  },
  isDoctor(req,res,next){
    if(req.user.isDoctor){
      return next();
    }
    else {
      return res.redirect('/auth/patients/');
    }
  },
  isPatient(req,res,next){
    if(!req.user.isDoctor){
      return next();
    }
    else {
      return res.redirect('/auth/doctors');
    }
  },
  validInputs(req,res,next){
    if(!req.body.user.username || !req.body.user.password) {
      if(req.originalUrl === '/auth/doctor-login')
        req.flash('loginMessage1','username/password field empty');
      else 
        req.flash('loginMessage2','username/password field empty');
      return res.redirect('/auth/login');
    } else return next();
  },
  signupCheck(req,res,next){
    if(!req.body.user.username || !req.body.user.password || 
       !req.body.user.firstname || !req.body.user.lastname ||
       !req.body.user.email) {
      req.flash('signupMessage','all fields must not be empty');
      return res.redirect('/auth/signup');
    } 
    if (req.body.user.password.length < 6) {
      req.flash('signupMessage', 'password must be at least 6 characters')
      return res.redirect('/auth/signup');
    } 
    else return next();
  },
  editCheck(req,res,next){
    if(!req.body.doctor.password || 
       !req.body.doctor.firstname || !req.body.doctor.lastname ||
       !req.body.doctor.email) {
      req.flash('editMessage','all fields must not be empty');
      return res.redirect(`/doctors/${req.params.id}/edit`);
    } 
    if (req.body.doctor.password.length < 6) {
      req.flash('editMessage', 'password must be at least 6 characters')
      return res.redirect(`/doctors/${req.params.id}/edit`);
    } 
    else return next();
  }
}

module.exports = authHelpers;
