const express = require("express");
const router = express.Router({mergeParams: true})
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

router.use(helpers.currentUser);

router.get('/new', (req, res) => {
  knex('exercises').then((exercises) => {
    res.render('exercises/new', {exercises, patient: req.params.patient_id});
  })
});

router.get('/:exercise_id', (req, res) => {
  res.render(`exercises/ex${req.params.exercise_id}`);
});

router.post('/', (req, res) => {
  console.log(req.body.exercises);
  knex('plans')
    .insert({
      exercise_id: req.body.exercises, 
      patient_id: req.params.patient_id, 
      doctor_id: req.params.doctor_id
    })
    .then(()=>res.redirect(`/doctors/${req.params.doctor_id}`))
});

router.delete('/:id', (req, res) => {
  knex('plans').del().where('plans.id', req.params.id).then(()=>{
    knex('plans').join('exercises', 'exercises.id', 'plans.exercise_id')
      .then((data)=>{
        res.send(data);
    })
  });
});


module.exports = router;