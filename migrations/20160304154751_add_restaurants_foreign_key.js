
exports.up = function(knex, Promise) {
  return knex.schema.table('reviews', function(table) {
    table.integer('restaurant_id').references('id').inTable('restaurants');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('reviews', function(table) {
    table.dropColumn('restaurant_id');
  });
};
