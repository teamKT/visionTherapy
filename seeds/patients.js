exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('patients').del(),
    knex('patients').insert({
      isDoctor: false,
      childname: 'Timmy', 
      parentname: 'Tom', 
      username: 'timmy', 
      password: 'secret',
      doctor_id: 1
    }),
    knex('patients').insert({
      isDoctor: false,
      childname: 'Kimmy', 
      parentname: 'Kim', 
      username: 'kimmy', 
      password: 'secret',
      doctor_id: 1
    }),
    knex('patients').insert({
      isDoctor: false,
      childname: 'Jimmy', 
      parentname: 'Jim', 
      username: 'jimmy', 
      password: 'secret',
      doctor_id: 2
    }),
  ]);
};