const express = require("express");
const router = express.Router()
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

// PatientInfo
router.get('/', helpers.currentUser, (req,res) => {
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

module.exports = router;