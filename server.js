const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile');

const server = express();
server.use(helmet());
server.use(express.json());

const db = knex(knexConfig.development);

const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n ** server listening on ${port} ** \n`);
});

server.get('/', (req, res) => {
  res.send('hello world!');
})

//projects- '/projects'
  //get all projects
server.get('/projects', (req, res) => {
  const projects = db('projects')
    .then(projects => {
      res.status(200).json(projects)
    })
    .catch(err => res.status(500).json(err));
})
//get project by id
server.get('/projects/:id', (req, res) => {
  const project = db('projects')
    .select('id', 'name', 'description', 'complete')
    .where({ id: req.params.id })
    .first()
    .then(project => {
      const actions = db('actions')
      .select('id', 'name', 'description', 'complete')
      .where({ project_id: project.id})
      .then(actions => {
        project.actions = actions;
        res.status(200).json({project});
      })
    })
    .catch(err => res.status(500).json(err));
})

//post to add new project
server.post('/projects', async (req, res) => {
  try {
    const [id] = await db('projects').insert(req.body);

    const newProject = await db('projects')
      .where({ id })
      .first()
    res.status(201).json(newProject)
  } catch (err) {
    res.status(500).json(err);
  }
})

//put to update projects
server.put('/projects/:id', (req, res) => {
  const count = db('projects')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if(count > 0) {
        const project = db('projects')
          .where({ id: req.params.id })
          .first()
          .then(project => {
            res.status(200).json(project)
          })
          .catch(err => res.status(500).json({ msg: 'project not found', err}))
      }
    })
    .catch(err => res.status(500).json(err))
})

//delete project
server.delete('/projects/:id', (req, res) => {
  const count = db('projects')
    .where({ id: req.params.id})
    .del()
    .then(count => {
      if(count > 0){
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'project not found'})
      }
    })
    .catch(err => res.status(500).json(err))
})

//actions- '/actions'
  //get all actions
server.get('/actions', async (req, res) => {
  try {
    const actions = await db('actions');
    res.status(200).json(actions);
  } catch (err) {
    res.status(500).json(err);
  }
})

//get action by id
server.get('/actions/:id', async (req, res) => {
  try {
    const action = await db('actions')
      .where({ id: req.params.id })
      .first()
    res.status(200).json(action)
  } catch (err) {
    res.status(500).json(err);
  }
})

//post to add new actions
server.post('/actions', async (req, res) => {
  try {
    const [id] = await db('actions').insert(req.body);

    const newAction = await db('actions')
      .where({ id })
      .first()
    res.status(201).json(newAction);
  } catch (err) {
    res.status(500).json(err);
  }
})

//put to update actions
server.put('/actions/:id', (req, res) => {
  const count = db('actions')
    .where({ id: req.params.id })
    .update(req.body)
    .then(count => {
      if (count > 0) {
        const action = db('actions')
          .where({ id: req.params.id })
          .first()
          .then(action => {
            res.status(200).json(action)
          })
          .catch(err => res.status(500).json({ msg: 'action not found', err }))
      }
    })
    .catch(err => res.status(500).json(err))
})

//delete an action
server.delete('/actions/:id', (req, res) => {
  const count = db('actions')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if (count > 0) {
        res.status(204).end();
      } else {
        res.status(404).json({ msg: 'action not found' })
      }
    })
    .catch(err => res.status(500).json(err))
})

//contexts- '/contexts'
//get all contexts
server.get('/contexts', (req, res) => {
  const contexts = db('contexts')
    .then(contexts => {
      res.status(200).json(contexts)
    })
    .catch(err => res.status(500).json(err));
})

//get context by id
server.get('/contexts/:id', (req, res) => {
  const context = db('contexts')
    // .select('id', 'name', 'description', 'complete')
    .where({ id: req.params.id })
    .first()
    .then(context => {
      let actions = db('action_contexts', 'actions')
        .where({ context_id: context.id, action_id: action.id})
        .then(actionIDs => {
          const actions = db('actions')
            .where({ action_id: action.id})
            .then(actions => {
              context.actions = actions;
              res.status(200).json(actions);
            })
            .catch(err => res.status(404).json({msg: 'not found'}))
        })
        .catch(err => res.status(404).json({msg: 'IDs not found'}))
    })
    .catch(err => res.status(500).json(err));
})