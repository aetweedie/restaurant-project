
exports.up = function(knex, Promise) {
  return knex.schema.createTable('reviews', function(table) {
    table.increments();
    table.string('reviewer').notNullable();
    table.date('review_date').notNullable();
    table.integer('rating').notNullable();
    table.text('review').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('reviews');
};
