exports.seed = function(knex, Promise) {
  return knex('choices').del()
    .then(function () {
      return Promise.all([
        knex('choices').insert({id: 101,
          polls_id: '1',
          description: 'Cruel but effective',
          title: 'Destroy everything they love with sharp kitty claws'}),
        knex('choices').insert({id: 102,
          polls_id: '1',
          description: 'Smelly and gross',
          title: 'Poop on everything to invoke heart attack'}),
        knex('choices').insert({id: 103,
          polls_id: '1',
          description: 'But I\'ll run out of catfood',
          title: 'Force feed them catfood'}),
      ]);
    });
};
