const express = require('express');
const actionDb = require('../data/helpers/actionModel.js');

const router = express.Router();

router.use(express.json());

//GET action by id
router.get('/:id', (req, res) => {
    const id = req.params.id;
    actionDb.get(id)
        .then(action => {
            if (action) {
               res.status(200).json(action) 
            } 
            else {
                res.status(404).json({
                    error: 'There is no action with that ID.'
                })
            }
        })
        .catch(() => {
            res.status(500).json({
                error: 'There was an error retrieving the action.'
            })
        })
});


//POST action
router.post('/', (req, res) => {
    const id = req.body.project_id;
    const notes = req.body.notes;
    const desc = req.body.description;

    if(action.id && action.notes && action.desc) {
        actionDb.insert(id, notes, desc)
            .then(newAction => {
                res.status(201).json(newAction);
            })            
            .catch(error => {
                res.status(500).json({
                    error: 'There was an error adding the project action.'
                });
            });
    }
    else {
        res.status(400).json({
            error: 'Missing required project id, name, or description.'
        });
    };
})

//PUT edit action
router.put('/:id', (req, res) => {
    const id = req.body.project_id;
    const notes = req.body.notes;
    const desc = req.body.description;

    if(action.id && action.notes && action.desc) {
        actionDb.update(id, notes, desc)
            .then(updatedAction => {
                res.status(201).json(updatedAction);
            })            
            .catch(error => {
                res.status(500).json({
                    error: 'There was an error editing the project action.'
                });
            });
    }
    else {
        res.status(400).json({
            error: 'Missing required project id, name, or description.'
        });
    };
})



//DELETE action
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDb.remove(id) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error deleting the action.'
            }) 
        })
});


module.exports = router;