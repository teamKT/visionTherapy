exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('plans').del(),
    knex('plans').insert({
      id: 1,
      doctor_id: 1, 
      patient_id: 1, 
      exercise_id: 1, 
      routine: 'Timmy needs to do the slide',
      outcome: 'hooray',
      parent_comments: 'Timmy did it'
    }),
    knex('plans').insert({
      id: 2,
      doctor_id: 1, 
      patient_id: 1, 
      exercise_id: 2, 
      routine: 'Timmy needs to do the steps',
      outcome: 'doing ok',
      parent_comments: 'Timmy was a bit slow'
    }),
    knex('plans').insert({
      id: 3,
      doctor_id: 1, 
      patient_id: 2, 
      exercise_id: 1, 
      routine: 'Kimmy needs to do the slide',
      outcome: 'finished',
      parent_comments: 'Kimmy was a bit slow'
    }),
    knex('plans').insert({
      id: 4,
      doctor_id: 2, 
      patient_id: 3, 
      exercise_id: 2, 
      routine: 'Jimmy needs to do the steps',
      outcome: 'ok',
      parent_comments: 'Jimmy was a boss'
    }),
  ]);
};
