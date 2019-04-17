
exports.seed = function(knex) {
  return knex('contexts').insert([
    {name: 'at_home'}, //1
    {name: 'at_work'}, //2
    {name: 'out_and_about'}, //3
  ]);
};
