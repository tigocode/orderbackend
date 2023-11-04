/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('order_multifocal', function (table) {
    table.increments();
    table.string('name'),
    table.string('esferico'),
    table.string('adicao'),
    table.string('sku')
    table.string('qtd');
    table.string('username');
    table.timestamp('date').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('order_multifocal');
};
