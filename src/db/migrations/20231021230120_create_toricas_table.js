/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('table_toricas', function (table) {
    table.string('name'),
    table.string('esferico'),
    table.string('cilindrico'),
    table.string('eixo'),
    table.string('sku')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('table_toricas');
};
