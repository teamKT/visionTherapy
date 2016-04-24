
exports.up = function(knex, Promise) {
  return knex.schema.createTable('doctors', function(table){
    table.increments();
    table.text('firstname');
    table.text('lastname');
    table.text('email').unique();
    table.text('username').unique();
    table.text('password');
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('doctors');  
};
