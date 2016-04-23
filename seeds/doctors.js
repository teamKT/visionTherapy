exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('doctors').del(),
    knex('doctors').insert({
      id: 1,
      firstname: 'Joe', 
      lastname: 'Smith', 
      email: 'joe@gmail.com', 
      username: 'joe',
      password: 'secret'
    }),
    knex('doctors').insert({
      id: 2,
      firstname: 'Mary', 
      lastname: 'Smith', 
      email: 'mary@gmail.com', 
      username: 'mary',
      password: 'secret'
    })
  ]);
};