exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('plans').del(),
    knex('plans').insert({
      doctor_id: 99, 
      patient_id: 99, 
      exercise_id: 2, 
      routine: 'If Jimmy can separate the step tranaglyphs all the way, have him try the Lifesavers Vergences. If he cannot do the bottom ones, go back to the step tranaglyphs.',
      outcome: null,
      parent_comments: null
    }),
    knex('plans').insert({
      doctor_id: 99, 
      patient_id: 99, 
      exercise_id: 3, 
      routine: 'Do this only after mastering step tranaglyphs',
      outcome: null,
      parent_comments: null
    })
  ]);
};
