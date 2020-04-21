const db = require('../dbconfig.js')


//get all projects start here

function findProjects() {
    return db('project')
}


// ends here



//get all projects, task, rss start here

function findAllProjects() {
    return db('project')
    .then(projects => {
        return db('resources')
        .then(resources => {
            return db('tasks')
            .then(tasks => {
                return {...projects, resources, tasks}
            })

        })
    })
}

//ends here


function findAllById(id) {
    return db('project as p')
    .where({project_id: id})
    .first()
    .then(projects => {
        return db('resources')
        .where({resource_id: id})
        .then(resources => {
            return db('tasks')
            .where({task_id: id})
            .then(tasks => {
                return {...projects, resources, tasks}
            })
        })
    })
}




function addProject(body) {
    return db('project')
    .insert(body)
    .then(id => {
        return findAllById(id[0])
    })
}

function addTask(body) {
    return db('tasks')
    .insert(body)
    .then(id => {
        return findAllById(id[0])
    })
}

function addResources(body) {
    return db('resources')
    .insert(body)
    .then(id => {
        return findAllProjects(id[0])
    })
    
}





//Project end here

module.exports = {
 findProjects,
 findAllProjects,
 findAllById, 
 addProject,
 addTask,
 addResources
}