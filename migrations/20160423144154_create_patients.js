
exports.up = function(knex, Promise) {
  return knex.schema.createTable('patients', function(table){
    table.increments();
    table.text('childname');
    table.text('parentname');
    table.text('username').unique();
    table.text('password');
    table.integer('doctor_id').unsigned().index().references('id').inTable('doctors').onDelete('cascade');
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('patients');  
};
