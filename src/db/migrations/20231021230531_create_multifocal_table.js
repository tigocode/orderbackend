/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('table_multifocal', function (table) {
    table.string('name'),
    table.string('esferico'),
    table.string('adicao'),
    table.string('sku')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.drpoTable('table_multifocal');
};
