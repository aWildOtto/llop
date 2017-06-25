exports.seed = function(knex, Promise) {
  return knex('polls')
    .then(function () {
      return Promise.all([
        knex('polls').insert({id: 1,
          creator_name: 'Fluffy',
          creator_email: 'killallhumans@gmail.com',
          question: 'What is the best way to attack hoomans?',
          anonymous: 'false',
          admin_code: 'ab611667-3fce-4dd8-86bf-7feab98c9847',
          submission_code: 'dd32538b-7d13-4460-a623-0d186bccb994'
          }),
        knex('choices').insert({id: 1,
          polls_id: 1,
          description: 'v cruel',
          title: 'with fire'}),
        knex('choices').insert({id: i,
          polls_id: 1,
          description: 'v cruel',
          title: 'with water'})
      ]);
    });
};
