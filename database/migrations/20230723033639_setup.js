/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("product", function(productTable) {
            productTable.increments("id").notNullable().primary();
            productTable.integer("price").notNullable();
            productTable.integer("quantity").notNullable();
            productTable.string("name").notNullable();
            productTable.string("description");
            productTable.string("image");
        })
        .createTable("order", function(orderTable) {
            orderTable.increments("id").notNullable().primary();
            orderTable.integer("product_id").unsigned().references("id").inTable("product").notNullable();
            orderTable.integer("quantity").notNullable();
            orderTable.integer("total").notNullable();
            orderTable.string("status").notNullable();
            orderTable.string("tracking_number").notNullable();
            orderTable.string("tracking_company").notNullable();
            orderTable.string("shipping_address").notNullable();
            orderTable.bigInteger("order_date").notNullable();
            orderTable.bigInteger("date_updated").notNullable();
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
