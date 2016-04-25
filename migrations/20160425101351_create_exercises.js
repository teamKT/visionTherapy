
exports.up = function(knex, Promise) {
  return knex.schema.createTable('exercises', function(table){
    table.increments();
    table.text('name');
    table.integer('difficulty');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('exercises');  
};
