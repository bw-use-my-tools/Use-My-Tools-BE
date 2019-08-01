
exports.up = function (knex, Promise) {
  return knex.schema
    .createTable("users", table => {
      table.increments();
      table.string("first_name", 100).notNullable();
      table.string("last_name", 100).notNullable();
      table
        .string("username", 255)
        .notNullable()
        .unique();
      table.string("password", 100).notNullable();
      table
        .string("thumbnail_url")
        .defaultTo("https://pbs.twimg.com/media/C8QsNInXUAAyjZQ.jpg");
    })
    .createTable("tools", table => {
      table.increments();
      table
        .integer("userId")
        .unsigned()
        .references("users.id")
        .notNullable()
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      table.string("toolName", 100).notNullable();
      table.float('deposit');
      table.float("price").notNullable();
      table.string("description", 1000);
      table.string("imageUrl");
      table.boolean("isRented").defaultTo(false);
    })
    .createTable("rentedTools", table => {
      table.increments();
      table
        .integer("renterId")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      table
        .integer("toolId")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("tools")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");

    });
};

exports.down = function (knex, Promise) {
  return knex.schema
    .dropTableIfExists("tools")
    .dropTableIfExists("users")
    .dropTableIfExists('rented-tools');
};
