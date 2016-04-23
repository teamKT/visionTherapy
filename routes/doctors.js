const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

// doctors index
router.get('/', function(req,res){
  // if authenticated, cannot access index of doctors, 
  // will redirect to specific doctor's dashboard
  if(req.isAuthenticated()){
    res.redirect('/doctors/' + req.user.id)
  }
  knex('doctors').then((doctors) => {
    res.render('doctors/index', {doctors});
  })
});

// specific doctor's dashboard
router.get('/:id', helpers.currentUser, function(req,res){
  knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
    .where('doctors.id', req.params.id)
    .then((patients) => {
    res.render('doctors/show', {patients});
  })
});

module.exports = router;