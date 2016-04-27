exports.seed = function(knex, Promise) {
  return Promise.all([
    knex('exercises').del(),
    knex('exercises').insert({
      id: 1,
      name: 'Red-Green Tranaglyphs: Sliding',
      difficulty: 2 
    }),
    knex('exercises').insert({
      id: 2,
      name: 'Red-Green Tranaglyphs: Steps', 
      difficulty: 3
    }),
    knex('exercises').insert({
      id: 3,
      name: 'Lifesavers Vergences', 
      difficulty: 4
    }),
  ]);
};