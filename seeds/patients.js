exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('patients').del(),
    knex('patients').insert({
      id: 1,
      childname: 'Timmy', 
      parentname: 'Tom', 
      username: 'timmy', 
      password: 'secret',
      doctor_id: 1
    }),
    knex('patients').insert({
      id: 2,
      childname: 'Kimmy', 
      parentname: 'Kim', 
      username: 'kimmy', 
      password: 'secret',
      doctor_id: 1
    }),
    knex('patients').insert({
      id: 3,
      childname: 'Jimmy', 
      parentname: 'Jim', 
      username: 'jimmy', 
      password: 'secret',
      doctor_id: 2
    }),
  ]);
};