exports.seed = function(knex, Promise) {
  return Promise.all([
    // knex('patients').del(),
    // knex('patients').insert({
    //   isDoctor: false,
    //   childname: 'Timmy', 
    //   parentname: 'Tom', 
    //   username: 'timmy', 
    //   password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa',
    //   doctor_id: 1
    // }),
    // knex('patients').insert({
    //   isDoctor: false,
    //   childname: 'Kimmy', 
    //   parentname: 'Kim', 
    //   username: 'kimmy', 
    //   password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa',
    //   doctor_id: 1
    // }),
    // knex('patients').insert({
    //   isDoctor: false,
    //   childname: 'Jimmy', 
    //   parentname: 'Jim', 
    //   username: 'jimmy', 
    //   password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa',
    //   doctor_id: 2
    // }),
  ]);
};