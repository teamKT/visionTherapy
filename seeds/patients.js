exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('patients').del(),
    knex('patients').insert({
      id: 99,
      isDoctor: false,
      childname: 'Jimmy John', 
      parentname: 'Jim John', 
      username: 'sample_patient1', 
      password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa',
      doctor_id: 99
    }),
  ]);
};