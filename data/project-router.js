const express = require('express');
const db = require('./project-model.js');
const router = express.Router();


//Projects start here

//get all project

router.get('/', (req, res) => {
    const get = db.findProjects();
    get.then(projects => res.json(projects))
    .catch(error => res.status(500).json({errMessage: 'Failed to get all Projects'}))
})

// end here

// get all Projects, Tasks and Resources

router.get('/all', (req, res) => {
    const getAll = db.findAllProjects();

    getAll.then(projects => res.json(projects))
    .catch(err => res.status(500).json({errMessage: 'Failed to get all info'}))
})


//end here

//get all by id

router.get('/:id', (req, res) => {  
    const { id } = req.params;

    const findAll = db.findAllById(id);

    findAll.then(projects => {
        console.log(projects)
        if (projects) {
            if (projects.resources) {
                if (projects.tasks) {
                    res.status(200).json(projects)
                } else {
                    res.status(404).json({messsage: "This project has no id"})
                }
            } else {
                res.status(404).json({message: "No id for rss"})
            }
        } else {
            res.status(404).json({message: "No id for task"})
        }
    })        
    .catch(err => res.status(500).json({errMessage: err})) 
})

//ends here


//project
router.post('/', (req, res) => {
    const body = req.body;

    db.addProject(body)
    .then(newProject => res.status(201).json(newProject))
    .catch(err => res.status(500).json({message: err}))
})

//rss

router.post('/resources', (req, res) => {
    const body = req.body;
    console.log(body)

    db.addResources(body)
    .then(newRss =>{
         res.status(201).json(newRss)})
    .catch(err => res.status(500).json({message: err}))
})

//task

router.post('/task', (req, res) => {
    const body = req.body;

    db.addTask(body)
    .then(newRss => res.status(201).json(newRss))
    .catch(err => res.status(500).json({message: err}))
})


module.exports = router;