
exports.seed = function(knex) {
  return knex('projects').insert([
    {name: 'run errands', description: '', complete: false},
    {name: 'clean house', description: '', complete: false },
    {name: 'client presentation', description: 'client pres 4-23-19', complete: false },
  ]);
};
