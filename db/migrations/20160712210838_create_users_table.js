exports.up = function(knex, Promise) {
  return Promise.all([knex.schema.createTable('polls', function (table) {
    table.increments('id').primary;
    table.string('creator_name');
    table.string('creator_email');
    table.string('question');
    table.string('admin_code');
    table.string('submission_code');
    table.string('status');
    table.string('background_path');
    table.boolean('anonymous');
  }),
  knex.schema.createTable('voters', function (table) {
    table.increments('id').primary;
    table.integer('polls_id');
    table.string('name');
  }),
  knex.schema.createTable('choices', function (table) {
    table.increments('id').primary;
    table.integer('polls_id');
    table.string('description');
    table.string('title');
  }),
  knex.schema.createTable('voter_choice', function (table) {
    table.increments('id').primary;
    table.integer('voters_id');
    table.integer('choices_id');
    table.integer('rank');
  })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('polls'),
    knex.schema.dropTable('voters'),
    knex.schema.dropTable('choices'),
    knex.schema.dropTable('voter_choice')
  ]);
};
