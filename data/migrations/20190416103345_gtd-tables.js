
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('contexts', tbl => {
      tbl.increments();
      tbl
        .string('name', 128)
        .notNullable()
        .unique()
      tbl.timestamps(true, true)
    })

    .createTable('projects', tbl => {
      tbl.increments();
      tbl
        .string('name', 128)
        .notNullable()
        .unique()
      tbl
        .string('description', 255)
      tbl
        .boolean('complete')
      tbl.timestamps(true, true)
    })

    .createTable('actions', tbl => {
      tbl.increments();
      tbl
        .string('name', 128)
        .notNullable()
      tbl
        .string('description', 255)
      tbl
        .integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl
        .boolean('complete')
      tbl.timestamps(true, true)
    })

    .createTable('action_contexts', tbl => {
      tbl.increments();
      tbl
        .integer('action_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('actions')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl
        .integer('context_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('contexts')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      tbl.timestamps(true, true)
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('contexts')
    .dropTableIfExists('projects')
    .dropTableIfExists('actions')
    .dropTableIfExists('action_context')
};
