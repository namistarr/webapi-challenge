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
    const action = req.body;

    actionDb.insert(action) 
        .then(newAction => {
            res.status(200).json(newAction)
        })
        .catch(error => {
            res.status(500).json({
                error: 'There was an error adding the action.'
            })
        })
})

//PUT edit action
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const edits = req.body;

    actionDb.update(id, edits) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

//DELETE action
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    actionDb.remove(id) 
        .then(results => {
            res.status(201).json(results)
        })
        .catch(error => {
            res.status(500).json(error) 
        })
});


module.exports = router;