const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

// PatientInfo
router.get('/', helpers.currentUser, (req,res) => {
  if(req.isAuthenticated()){
    res.redirect(`/doctors/${req.params.doctor_id}/patients/${req.user.id}`)
  }
  knex('patients').where('doctor_id',+req.params.doctor_id).then((patients) => {
    res.format({
      'text/html':() =>{
        res.render('')
      },
      'application/json':() =>{
        res.send(patients)
      },
      'default': () => {
        // log the request and respond with 406
        res.status(406).send('Not Acceptable');
      }
    })
  });
})

router.get('/:id', helpers.currentUser, (req,res) => {
  knex('patients')
    .join('plans', 'patients.id', 'plans.patient_id')
    .join('exercises', 'exercises.id', 'plans.exercise_id')
    .where('patients.id', +req.params.id)
    .then((patient_plans)=>{
      res.render('patients/show', {patient_plans});    
    })
});

module.exports = router;