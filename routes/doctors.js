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
    .where('doctors.id', +req.params.id)
    .then((doctor_patients) => {
    res.format({
      'text/html':() =>{
        res.render('doctors/show', {doctor_patients});
      },
      'application/json':() =>{
        res.send(doctor_patients)
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})



module.exports = router;