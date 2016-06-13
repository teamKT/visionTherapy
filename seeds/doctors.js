exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('doctors').del(),
    knex('doctors').insert({
      isDoctor: true,
      firstname: 'Joe', 
      lastname: 'Smith', 
      email: 'joe@gmail.com', 
      username: 'joe',
      password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa' 
    }),
    knex('doctors').insert({
      isDoctor: true,
      firstname: 'Mary', 
      lastname: 'Smith', 
      email: 'mary@gmail.com', 
      username: 'mary',
      password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa'
    }),
    knex('doctors').insert({
      id: 99,
      isDoctor: true,
      firstname: 'John', 
      lastname: 'Sample', 
      email: 'john.sample@gmail.com', 
      username: 'sample',
      password: '$2a$10$jW.51sVsOQEbtuO1nM6.juxCnO9DiZsLg8jghQdIT6AlKvifKa.qa'
    })
  ]);
};