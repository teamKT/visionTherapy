const express = require("express");
const router = express.Router({ mergeParams: true })
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


//EDIT
router.get('/edit/:id', helpers.currentUser, (req, res) => {
    knex('patients').where("id", +req.params.id).first().then(patient => {
        res.render("patients/edit", { patient })
    });
});

//NEW
router.get('/new', helpers.currentUser, (req, res) => {
    res.render("patients/new")
});

// POST
router.post('/', helpers.currentUser, (req, res) => {
    knex('patients')
        .insert({
            childname: req.body.patient.childname,
            username: req.body.patient.username,
            parentname: req.body.patient.parentname,
            doctor_id: +req.params.doctor_id
        })
        .then(() => {
            res.redirect(`/doctors/${req.params.doctor_id}`)
        }).catch(err => {
            console.log("Error Message: ", err)
            res.redirect(`/doctors/${req.params.doctor_id}`)
        })
});


// PUT
router.put('/:id', helpers.currentUser, (req, res) => {
    knex('patients').update(req.body.patient).where('id', +req.params.id)
        .then(() => {
            res.redirect(`/doctors/${req.params.doctor_id}`)
        });
});

module.exports = router;

