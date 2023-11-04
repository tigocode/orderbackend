/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('temp_multifocal', function (table) {
    table.increments();
    table.string('name'),
    table.string('esferico'),
    table.string('adicao'),
    table.string('sku')
    table.string('qtd');
    table.string('username');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('temp_multifocal');
};
