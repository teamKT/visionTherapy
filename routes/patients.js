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

<<<<<<< HEAD

router.get('/:patient_id', helpers.isPatient, function(req,res){
    res.format({
      'text/html':() =>{
        knex('patients').where('id', +req.params.patient_id).first()
        .then(child => {
            console.log('CHILD', child.childname)
            res.render('patients/show', {child: child.childname});
        })
       },
      'application/json':() =>{
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
           .then((patient_plans)=>{res.send(patient_plans)});
       },
       'default': () => {
         // log the request and respond with 406
         res.status(406).send('Not Acceptable');
       }
    })
})

// router.get('/:patient_id', helpers.isPatient, function(req,res){
//   knex.select(
//     'exercises.name', 
//     'exercises.id', 
//     'exercises.difficulty',
//     'plans.patient_id',
//     'plans.routine',
//     'plans.outcome',
//     'plans.parent_comments',
//     'plans.created_at',
//     'patients.childname',
//     'patients.doctor_id',
//     'patients.parentname',
//     'patients.username'
//   ).from('patients')
//     .join('plans', 'patients.id', 'plans.patient_id')
//     .join('exercises', 'exercises.id', 'plans.exercise_id')
//     .where('patients.id', +req.params.patient_id)
//     .then((patient_plans)=>{
//     res.format({
//       'text/html':() =>{
//         res.render('patients/show', {patient_plans});
//        },
//       'application/json':() =>{
//          res.send(patient_plans)
//        },
//        'default': () => {
//          // log the request and respond with 406
//          res.status(406).send('Not Acceptable');
//        }
//     })
//   });
// })

router.get('/', helpers.currentUser, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect(`/doctors/${req.params.doctor_id}/patients/${req.user.id}`)
    }
    knex('patients').where('doctor_id', +req.params.doctor_id).then((patients) => {
        res.format({
            'text/html': () => {
                res.render('')
            },
            'application/json': () => {
                res.send(patients)
            },
            'default': () => {
                // log the request and respond with 406
                res.status(406).send('Not Acceptable');
            }
        })
    });
})

//NEW
router.get('/new', helpers.currentUser, (req, res) => {
    res.render("patients/new")
});

=======
router.get('/', helpers.currentUser, (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect(`/doctors/${req.params.doctor_id}/patients/${req.user.id}`)
    }
    knex('patients').where('doctor_id', +req.params.doctor_id).then((patients) => {
        res.format({
            'text/html': () => {
                res.render('')
            },
            'application/json': () => {
                res.send(patients)
            },
            'default': () => {
                // log the request and respond with 406
                res.status(406).send('Not Acceptable');
            }
        })
    });
})

//NEW
router.get('/new', helpers.currentUser, (req, res) => {
    res.render("patients/new")
});

>>>>>>> 5fc73d6679aad3e72f8153449dd96ddc24a0a554
//SHOW
router.get('/:id', helpers.currentUser, (req, res) => {
    knex('patients')
        .join('plans', 'patients.id', 'plans.patient_id')
        .join('exercises', 'exercises.id', 'plans.exercise_id')
        .where('patients.id', +req.params.id)
        .then((patient_plans) => {
            res.render('patients/show', { patient_plans });
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

router.put('/:id', helpers.currentUser, (req, res) => {
    knex('patients').update(req.body.patient).where('id', +req.params.id).returning('doctor_id')
      .then((doctor_id) => {
      knex('doctors').join('patients', 'doctors.id', 'patients.doctor_id')
      .where('doctors.id', doctor_id[0])
      .then((data) => {
        res.format({
          'text/html': () => {
              res.render('')
          },
          'application/json': () => {
              console.log("DATA from PUT: ", JSON.stringify(data));
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


// DELETE

router.delete('/:id', helpers.isDoctor, (req, res) => {
    knex('patients').where('id', +req.params.id).del().returning('doctor_id')
        .then((doctor_id) => {
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
