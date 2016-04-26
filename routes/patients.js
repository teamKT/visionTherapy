const express = require("express");
const router = express.Router({ mergeParams: true })
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

router.use(helpers.currentUser);

// PatientInfo

// patients index for DEV ENVIRONMENT
router.get('/', (req,res) => {
  // if(req.isAuthenticated()){
  //   res.redirect(`/doctors/${req.params.doctor_id}/patients/${req.user.id}`)
  // }
  knex('patients').where('doctor_id',+req.params.doctor_id).then((patients) => {
    res.send(patients)
  });
})

//NEW
router.get('/new', helpers.isDoctor, (req, res) => {
    res.render("patients/new")
});

router.get('/:id', helpers.isPatient, helpers.ensureCorrectUser, (req,res) => {
  knex('patients')
    .join('plans', 'patients.id', 'plans.patient_id')
    .join('exercises', 'exercises.id', 'plans.exercise_id')
    .where('patients.id', +req.params.id)
    .then((patient_plans)=>{
      res.render('patients/show', {patient_plans});    
    })
});


//EDIT
router.get('/edit/:id', helpers.isDoctor, (req, res) => {
    knex('patients').where("id", +req.params.id).first().then(patient => {
        res.render("patients/edit", { patient })
    });
});


// POST
router.post('/', helpers.isDoctor, (req, res) => {
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
// needs work
router.put('/:id', helpers.isDoctor, (req, res) => {
    knex('patients').update(req.body.patient).where('id', +req.params.id)
        .then(() => {
            res.redirect(`/doctors/${req.params.doctor_id}`)
        });
});


// DELETE

router.delete('/:id', helpers.isDoctor, (req, res) => {
    knex('patients').where('id', +req.params.id).del().returning('doctor_id')
        .then((doctor_id) => {
          console.log("What do we get back?", doctor_id)
            knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
                .where('doctors.id', doctor_id[0])
                .then((data) => {
                  res.format({
                    'text/html': () => {
                        res.redirect('/')
                    },
                    'application/json': () => {
                        console.log("DATA from DEL: ", JSON.stringify(data));
                        res.send(data)
                    },
                    'default': () => {
                        // log the request and respond with 406
                        res.status(406).send('Not Acceptable');
                    }
                  })
                })
        })
});





module.exports = router;
