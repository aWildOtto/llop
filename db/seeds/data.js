exports.seed = function(knex, Promise) {
  return knex('polls').del()
    .then(function () {
      return Promise.all([
        knex('polls').insert({id: 1,
          creator_name: 'Fluffy',
          creator_email: 'killallhumans@gmail.com',
          question: 'What is the best way to attack hoomans?',
          anonymous: 'false'
          }),
      ]);
    });
};
