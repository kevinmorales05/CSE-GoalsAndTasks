const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllTasks = async (req, res) => {
    //#swagger.tags=['Tasks']
    console.log('getAllTasks');
    const result = await mongodb.getDatabase().db().collection('tasks').find();
    //const result = await mongodb.getDatabase().db().collection('users').find();
    //console.log('these are the results ', result);
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

const getSingleTask = async (req, res) => {
      //#swagger.tags=['Tasks']
    console.log('get single')
    console.log('from params ', req.params.id);
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDatabase().db().collection('tasks').find({ _id: userId });
    //const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
}
const updateTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    console.log('Update User');
    const taskId = new ObjectId(req.params.id);
    console.log('this is the param ', taskId);
    const task = {
        idGoalOwner: req.body.idGoalOwner,
        title: req.body.title,
        description: req.body.description,
        dateToStart: req.body.dateToStart,
        dateToFinish: req.body.dateToFinish
    }
    console.log('this is the new body ', task)
    const response = await mongodb.getDatabase().db().collection('tasks').replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
        res.status(200).send();
    }
    else {
        res.status(200).json(response.error || 'Some Error ocurred while updating the user');
    }
}
const createTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    console.log('request',req.body);
    const task = {
        idGoalOwner: req.body.idGoalOwner,
        title: req.body.title,
        description: req.body.description,
        dateToStart: req.body.dateToStart,
        dateToFinish: req.body.dateToFinish
    }
    const response = await mongodb.getDatabase().db().collection('tasks').insertOne(task);
    if (response.acknowledged > 0) {
        res.status(200).send();
    }
    else {
        res.status(200).json(response.error || 'Some Error ocurred while creating the user');
    }
}

const deleteTask = async (req, res) => {
    //#swagger.tags=['Tasks']
    console.log('Delete User');
    const userId = new ObjectId(req.params.id);
    console.log('this is the param ', userId);
    const response = await mongodb.getDatabase().db().collection('tasks').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    }
    else {
        res.status(200).json(response.error || `Some Error ocurred while deleting the user ${response.error}`);
    }
}

const getTasksByGoal = async (req, res) => {
    //#swagger.tags=['Tasks']
    console.log('get goal tasks')
    console.log('from params ', req.params.id);
    const goalId = req.params.id;
    const results = await mongodb.getDatabase().db().collection('tasks').find({   idGoalOwner: goalId });
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });

}

module.exports = {
    getAllTasks, 
    getSingleTask,
    createTask,
    updateTask,
    deleteTask,
    getTasksByGoal
}