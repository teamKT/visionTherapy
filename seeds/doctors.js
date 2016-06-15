exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('doctors').del(),
    knex('doctors').insert({
      id: 99,
      isDoctor: true,
      firstname: 'John', 
      lastname: 'Smith', 
      email: 'john.smith@sample.com', 
      username: 'docter_sample1',
      password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa'
    })
  ]);
};