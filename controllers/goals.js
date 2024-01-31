const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllGoals = async (req, res) => {
    //#swagger.tags=['Goals']
    console.log('getAllGoals');
    const result = await mongodb.getDatabase().db().collection('goals').find();
    //const result = await mongodb.getDatabase().db().collection('users').find();
    //console.log('these are the results ', result);
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });
}

const getSingleGoal = async (req, res) => {
      //#swagger.tags=['Goals']
    console.log('get single')
    console.log('from params ', req.params.id);
    const userId = new ObjectId(req.params.id);
    console.log(userId);
    const result = await mongodb.getDatabase().db().collection('goals').find({ _id: userId });
    //const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users[0]);
    });
}
const updateGoal = async (req, res) => {
    //#swagger.tags=['Goals']
    console.log('Update User');
    const goalId = new ObjectId(req.params.id);
    console.log('this is the param ', goalId);
    const goal = {
        idUser: req.body.idUser,
        title: req.body.title,
        description: req.body.description,
        dateToStart: req.body.dateToStart,
        dateToFinish: req.body.dateToFinish,
        category: req.body.category,
        priority: req.body.priority
    }
    console.log('this is the new body ', goal)
    const response = await mongodb.getDatabase().db().collection('goals').replaceOne({ _id: goalId }, goal);
    if (response.modifiedCount > 0) {
        res.status(200).send();
    }
    else {
        res.status(200).json(response.error || 'Some Error ocurred while updating the user');
    }
}
const createGoal = async (req, res) => {
    //#swagger.tags=['Goals']
    console.log('request',req.body);
    const goal = {
        idUser: req.body.idUser,
        title: req.body.title,
        description: req.body.description,
        dateToStart: req.body.dateToStart,
        dateToFinish: req.body.dateToFinish,
        category: req.body.category,
        priority: req.body.priority
    }
    const response = await mongodb.getDatabase().db().collection('goals').insertOne(goal);
    if (response.acknowledged > 0) {
        res.status(200).send();
    }
    else {
        res.status(200).json(response.error || 'Some Error ocurred while creating the user');
    }
}

const deleteGoal = async (req, res) => {
    //#swagger.tags=['Goals']
    console.log('Delete User');
    const userId = new ObjectId(req.params.id);
    console.log('this is the param ', userId);

    const response = await mongodb.getDatabase().db().collection('goals').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(200).send();
    }
    else {
        res.status(200).json(response.error || `Some Error ocurred while deleting the user ${response.error}`);
    }
}

const getUsersGoals = async (req, res) => {
    //#swagger.tags=['Goals']
    console.log('get users goals')
    console.log('from params ', req.params.id);
    const userId = req.params.id;
    const results = await mongodb.getDatabase().db().collection('goals').find({   idUser: userId });
    results.toArray().then((users) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(users);
    });

}

module.exports = {
    getAllGoals, 
    getSingleGoal,
    createGoal,
    updateGoal,
    deleteGoal,
    getUsersGoals
}