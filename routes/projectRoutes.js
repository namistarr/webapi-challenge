const express = require('express');
const projectDb = require('../data/helpers/projectModel.js')

const router = express.Router();
router.use(express.json());

//GET all projects
router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error retrieving projects.'
            })
        })
})

//GET project by id
router.get('/:id', (req, res) => {
    const id = req.params.id;

    projectDb.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error retrieving the project information.'
            })
        })
})

//GET project actions
router.get('/:id/actions', (req, res) => {
    const id = req.params.id;

    projectDb.getProjectActions(id)
        .then(actions => {
            if (actions[0]) {
            res.status(200).json(actions) 
            }
            else {
                res.status(404).json({
                    error: "Unable to find a project with that ID."
                })
            }
            
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error retrieving the project actions.'
            })
        })
})

//POST project
router.post('/', (req, res) => {
    const project = req.body;

    if(project.name && project.description) {
        projectDb.insert(project)
            .then(newProject => {
                res.status(201).json(newProject);
            })            
            .catch(error => {
                res.status(500).json({
                    error: 'There was an error adding the project.'
                });
            });
    }
    else {
        res.status(400).json({
            error: 'Please provide a project name and description.'
        });
    };
})


//PUT edit project
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const edits = req.body;

    if (!edits.name || !edits.description) {
        res.status(400).json({
            error: 'Please provide name and description for the project.'
        })
    } else {
        projectDb.update(id, edits)
        .then((updatedProject) => {
            if (updatedProject) {
                res.status(200).json(updatedProject)
            } else {
                res.status(404).json({
                    error: 'The project with the specified ID does not exist.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: 'There was en error editing the project.'
            })
        })
    }
})


//DELETE project
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    projectDb.remove(id)
        .then(deletedProject => {
            res.status(200).json(deletedProject);
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error deleting the project.'
            })
        })
})


module.exports = router;