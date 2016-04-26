exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('doctors').del(),
    knex('doctors').insert({
      isDoctor: true,
      firstname: 'Joe', 
      lastname: 'Smith', 
      email: 'joe@gmail.com', 
      username: 'joe',
      password: 'secret'
    }),
    knex('doctors').insert({
      isDoctor: true,
      firstname: 'Mary', 
      lastname: 'Smith', 
      email: 'mary@gmail.com', 
      username: 'mary',
      password: 'secret'
    })
  ]);
};