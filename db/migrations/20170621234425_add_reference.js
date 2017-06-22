exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('voters', (table) => {
      table.foreign('polls_id').references('polls.id');
    }),
    knex.schema.table('choices', (table) => {
      table.foreign('polls_id').references('polls.id');
    }),
    knex.schema.table('voter_choice', (table) => {
      table.foreign('voters_id').references('voters.id');
      table.foreign('choices_id').references('choices.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('voters', (table) => {
      table.dropForeign('polls_id');
    }),
    knex.schema.table('choices', (table) => {
      table.dropForeign('polls_id');
    }),
    knex.schema.table('voter_choice', (table) => {
      table.dropForeign('voters_id');
      table.dropForeign('choices_id');
    })
  ]);
};
