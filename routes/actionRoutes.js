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
    const { project_id, notes, description, completed } = req.body;

    if(
        typeof project_id === 'number' 
        && typeof notes === 'string'
        && typeof description === 'string'
    ) {
        const defaultCompleted = (typeof completed === 'boolean') ? completed : false
        actionDb.insert({project_id, notes, description, completed:defaultCompleted})
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
            error: 'Missing required project id, notes, or description.'
        });
    }
})


//PUT edit action
router.put('/:id', (req, res) => {
     const { project_id, notes, description, completed } = req.body;

    if(
        typeof project_id === 'number' 
        && typeof notes === 'string'
        && typeof description === 'string'
    ) {
        const defaultCompleted = (typeof completed === 'boolean') ? completed : false
        actionDb.update({ project_id, notes, description, completed:defaultCompleted })
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
            error: 'Missing required project id, notes, or description.'
        });
    }
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