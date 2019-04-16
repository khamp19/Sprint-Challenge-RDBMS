Tables:
- Projects 
  - Have multiple actions
  - ID, name, description, complete(true/ false)
- Actions:
  - Belong to one Project
  - ID, description, notes, complete(true/ false)
- Context: where the actions are performed
  - Actions can have many Contexts
  - Contexts can have many Actions
  - ID, name, 

Table projects {
  id int [pk]
  name varchar [not null, unique]
  description varchar
  complete boolean
}

Table actions {
  id int [pk]
  name varchar [not null]
  description varchar
  project_id int [ref:> projects.id]
  complete boolean
}

Table contexts {
  id int [pk]
  name varchar [not null, unique]
}

Table action_context {
  id int [pk]
  action_id int [ref: > actions.id]
  context_id int [ref: > contexts.id]
}