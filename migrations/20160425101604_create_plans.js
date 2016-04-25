
exports.up = function(knex, Promise) {
  return knex.schema.createTable('plans', function(table){
    table.increments();
    table.integer('doctor_id').unsigned().index().references('id').inTable('doctors').onDelete('cascade');
    table.integer('patient_id').unsigned().index().references('id').inTable('patients').onDelete('cascade');
    table.integer('exercise_id').unsigned().index().references('id').inTable('exercises')
    table.text('routine');
    table.text('outcome');
    table.text('parent_comments');
    table.timestamp('created_at', true).defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('plans');  
};
