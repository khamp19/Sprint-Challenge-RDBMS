
exports.seed = function(knex) {
  return knex('actions').insert([
    {name: 'get groceries', description: 'grocery list: fruit, meat, veg', project_id: 1, complete: false},
    {name: 'pay bills', description: 'bills to post office or pay online', project_id: 1, complete: false},
    {name: 'mop floors', description: '', project_id: 2, complete: false},
    {name: 'dust', description: 'dog fur', project_id: 2, complete: false },
    {name: 'competitive research', description: 'competitiors x and y', project_id: 3, complete: false },
    {name: 'ppt presentation', description: '', project_id: 3, complete: false },
  ]);
};
