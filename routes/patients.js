const express = require("express");
const router = express.Router({ mergeParams: true })
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

router.use(helpers.isAuthenticated);
router.use(helpers.currentUser);

// PatientInfo

// INDEX patients route
router.get('/', helpers.isPatient, (req, res) => {
    res.redirect(`/doctors/${req.params.doctor_id}/patients/${req.user.id}`)
})

// renders a new patient page as the doctor user
router.get('/new', helpers.isDoctor, (req, res) => {
    res.render("patients/new")
});

// POST the new patient into the database as doctor user
router.post('/', helpers.isDoctor, (req, res) => {
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    bcrypt.hash(req.body.patient.password, salt, function(err, hash){
    knex('patients')
      .insert({
          isDoctor: false,
          childname: req.body.patient.childname,
          parentname: req.body.patient.parentname,
          username: req.body.patient.username,
          password: hash,
          doctor_id: +req.params.doctor_id
      })
      .then(() => {
          res.redirect(`/doctors/${req.params.doctor_id}`)
      }).catch(err => {
          console.log("Error Message: ", err)
          res.redirect(`/doctors/${req.params.doctor_id}`)
      });
    });
  });
});

// VIEW patient's dashboard
router.get('/:patient_id', helpers.isPatient, helpers.ensureCorrectUser, function(req, res) {
    res.format({
        'text/html': () => {
            knex('patients').where('id', +req.params.patient_id).first()
                .then(child => {
                    console.log('CHILD', child.childname)
                    res.render('patients/show', { child: child.childname });
                })
        },
        'application/json': () => {
            knex.select(
                    'exercises.name',
                    'exercises.id',
                    'exercises.difficulty',
                    'plans.patient_id',
                    'plans.routine',
                    'plans.outcome',
                    'plans.parent_comments',
                    'plans.created_at',
                    'patients.childname',
                    'patients.doctor_id',
                    'patients.parentname',
                    'patients.username'
                ).from('patients')
                .join('plans', 'patients.id', 'plans.patient_id')
                .join('exercises', 'exercises.id', 'plans.exercise_id')
                .where('patients.id', +req.params.patient_id)
                .then((patient_plans) => { res.send(patient_plans) });
        },
        'default': () => {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    })
})

// EDIT
router.get('/:id/edit', helpers.isDoctor, (req, res) => {
    knex('patients').where("id", +req.params.id).first().then(patient => {
        res.render("patients/edit", { patient })
    });
});

// PUT

router.put('/:id', helpers.isDoctor, (req, res) => {
  console.log("Req.Body.Patient: " ,req.body.patient)
    knex('patients').update(req.body.patient).where('id', +req.params.id).returning('doctor_id')
      .then((doctor_id) => {
          console.log("What do we get back?", doctor_id)
          knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
            .where('doctors.id', doctor_id[0])
            .then((data) => {
            console.log("What is DATA: ", data)
                res.format({
                    // 'text/html': () => {
                    //     res.redirect('/')
                    // },
                    'application/json': () => {
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

// DELETE patient as doctor user
router.delete('/:id', helpers.isDoctor, (req, res) => {
    knex('patients').where('id', +req.params.id).del().returning('doctor_id')
      .then((doctor_id) => {
          console.log("What do we get back?", doctor_id)
          knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
            .where('doctors.id', doctor_id[0])
            .then((data) => {
                res.format({
                    // 'text/html': () => {
                    //     res.redirect('/')
                    // },
                    'application/json': () => {
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
