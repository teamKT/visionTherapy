const express = require("express");
const router = express.Router({mergeParams: true})
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

router.get('/:exercise_id', (req, res) => {
  res.render(`exercises/ex${req.params.exercise_id}`);
});

module.exports = router;