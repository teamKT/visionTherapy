const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

router.use(helpers.isDoctor);
router.use(helpers.currentUser);

// doctors index for DEV ENVIRONMENT
router.get('/', function(req,res){
  // if(req.isAuthenticated()){
  //   res.redirect(`/doctors/${req.user.id}`)
  // }
  knex('doctors').then((doctors) => {
    res.send(doctors);
  })
});

// VIEW doctor's dashboard
router.get('/:id', helpers.ensureCorrectUser, function(req,res){
  knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
    .where('doctors.id', +req.params.id)
    .then((doctor_patients) => {
    res.format({
      'text/html':() =>{
        res.render('doctors/show', {doctor_patients});
      },
      'application/json':() =>{
        console.log(doctor_patients)
        res.send(doctor_patients)
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})

// GET Doctor's patient exercises info
router.get('/:id/ex', function(req,res){
  knex('patients').join('plans', 'patients.id', 'plans.patient_id')
    .select('exercises.name', 'plans.id')
    .join('exercises', 'exercises.id', 'plans.exercise_id')
    .where('patients.id', req.params.id)
    .then((data)=>res.json(data))
  
})

// EDIT Doctor
router.get('/:id/edit', helpers.ensureCorrectUser, function(req,res){
  res.render('doctors/edit');
})

// DELETE Doctor
router.delete('/:id', function(req,res){
  knex('doctors').del().where('doctors.id', +req.params.id)
    .then(()=>{
      req.logout();
      res.redirect('/');      
    })
})


module.exports = router;