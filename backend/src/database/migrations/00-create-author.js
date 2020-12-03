exports.up = function (knex) {
  return knex.schema.createTable('author', table => {
    table.increments('id').primary();

    table.string('name', 60).notNullable();

    table.timestamp('created_at').notNullable();
    table.timestamp('updated_at').notNullable();
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('author');
}