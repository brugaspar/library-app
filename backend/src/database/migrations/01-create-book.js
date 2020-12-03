exports.up = function (knex) {
  return knex.schema.createTable('book', table => {
    table.increments('id').primary();

    table
      .integer('author_id')
      .notNullable()
      .references('id')
      .inTable('author')
      .onUpdate('cascade')

    table.string('title', 50).notNullable()
    table.string('status', 20).notNullable().defaultTo('AVAILABLE');

    table.timestamp('created_at').notNullable()
    table.timestamp('updated_at').notNullable()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('book')
}