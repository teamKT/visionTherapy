const express = require("express");
const router = express.Router({mergeParams: true})
const knex = require("../db/knex");
const helpers = require('../helpers/authHelpers');

router.use(helpers.currentUser);

router.put('/:plan_id/parentComment', (req, res) => {
  knex('plans').update({parent_comments: req.body.comment}).where('plans.id', +req.params.plan_id).then((data)=> {
    res.json(data);
  });
});

router.put('/:plan_id/outcome', (req, res) => {
  knex('plans').update({outcome: req.body.outcome}).where('plans.id', +req.params.plan_id).then((data)=> {
    res.json(data);
  });
});

module.exports = router;