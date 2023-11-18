exports.up = knex => knex.schema.createTable("tags", knex=> {
    
    knex.increments("id")
    knex.integer("note_id").references("id").inTable("notes").onDelete("CASCADE")
    knex.integer("user_id").references("id").inTable("users2")
    knex.text("name").notNullable()
}) 

exports.down = knex => {knex.schema.dropTable("tags")}
