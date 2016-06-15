const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

router.use(helpers.isAuthenticated);
router.use(helpers.isDoctor);
router.use(helpers.currentUser);

// INDEX doctors route
router.get('/', function(req,res){
  res.redirect(`/doctors/${req.user.id}`)
});

// SAMPLE doctors route
router.get('/sample', function(req,res){
  knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
    .where('doctors.id', 99).orderBy('childname', 'asc')
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
});

// VIEW doctor's dashboard
router.get('/:id', helpers.ensureCorrectUser, function(req,res){
  if (req.user.id === 99) res.redirect('/doctors/sample');
  knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
    .where('doctors.id', +req.params.id).orderBy('childname', 'asc')
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
});
// EDIT Doctor
router.get('/:id/edit', helpers.ensureCorrectUser, function(req,res){
  res.render('doctors/edit', {message: req.flash('editMessage')});
})

// GET Doctor's patient exercises info in JSON
router.get('/:id/ex', function(req,res){
  knex('patients').join('plans', 'patients.id', 'plans.patient_id')
    .select('exercises.name', 'plans.id')
    .join('exercises', 'exercises.id', 'plans.exercise_id')
    .where('patients.id', req.params.id)
    .then((data)=>res.json(data))
});


// DELETE Doctor
router.delete('/:id', helpers.ensureCorrectUser, function(req,res){
  knex('doctors').del().where('doctors.id', +req.params.id)
    .then(()=>{
      req.logout();
      res.redirect('/');      
    })
});

// PUT Docter
router.put('/:id', helpers.ensureCorrectUser, helpers.editCheck, function(req,res){
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    bcrypt.hash(req.body.doctor.password, salt, function(err, hash){
      req.body.doctor.password = hash;
      knex('doctors').update(req.body.doctor).where('doctors.id', +req.params.id).returning('id')
        .then((id)=>{
          res.redirect(`/doctors/${id}`);      
      })
    });
  });
});


module.exports = router;