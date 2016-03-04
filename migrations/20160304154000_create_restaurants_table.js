
exports.up = function(knex, Promise) {
  return knex.schema.createTable('restaurants', function(table) {
    table.increments();
    table.string('name').notNullable();
    table.string('address_city').notNullable();
    table.string('address_state').notNullable();
    table.string('cuisine').notNullable();
    table.text('image_url').notNullable();
    table.text('description');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('restaurants');
};
