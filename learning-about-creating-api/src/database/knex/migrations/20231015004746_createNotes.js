
exports.up = knex => knex.schema.createTable("notes", table => {
    table.increments("id");
    table.text('tittle');
    table.text("description");
    table.integer("users_id").references("id").inTable("users2")
    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("notes")
