const { validationResult } = require("express-validator");
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAllGoals = async (req, res) => {
  //#swagger.tags=['Goals']
  console.log("getAllGoals");
  const result = await mongodb.getDatabase().db().collection("goals").find();
  //const result = await mongodb.getDatabase().db().collection('users').find();
  //console.log('these are the results ', result);
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingleGoal = async (req, res) => {
  //#swagger.tags=['Goals']
  if (req.params.id == undefined || null) {
    console.log("Param is empty");
  }
  console.log("get single");
  if (req.params.id.length == 24) {
    console.log("from params ", req.params.id);
    const goalId = new ObjectId(req.params.id);
    console.log(goalId);
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("goals")
      .find({ _id: goalId });
    //const result = await mongodb.getDatabase().db().collection('users').find();
    result.toArray().then((users) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  } else {
    return res.status(404).json({ error: "Goal id invalid!" });
  }
};
const updateGoal = async (req, res) => {
  //#swagger.tags=['Goals']
  console.log("Update Goal");
  if (req.params.id.length == 24) {
    const validations = validationResult(req);
    console.log("validation errors ", validations);
    if (validations.errors.length > 0) {
      let errorDescriptions = "Payload invalid :";
      validations.errors.map((er) => {
        errorDescriptions = errorDescriptions + " " + er.msg + ", ";
        console.log("Some errors in the payload");
      });
      console.log("descriptions ", errorDescriptions);
      return res.status(404).json({ error: `${errorDescriptions}` });
    } else {
      const goalId = new ObjectId(req.params.id);
      console.log("this is the param ", goalId);
      const goal = {
        idUser: req.body.idUser,
        title: req.body.title,
        description: req.body.description,
        dateToStart: req.body.dateToStart,
        dateToFinish: req.body.dateToFinish,
        category: req.body.category,
        priority: req.body.priority,
      };
      console.log("this is the new body ", goal);
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("goals")
        .replaceOne({ _id: goalId }, goal);
      if (response.modifiedCount > 0) {
        res.status(200).send("Goal updated successfully!");
      } else {
        res.status(200).json(response.error || "Goal not found");
      }
    }
  } else {
    return res.status(404).json({ error: "Goal id invalid!" });
  }
};
const createGoal = async (req, res) => {
  //#swagger.tags=['Goals']
  console.log("request", req.body);
  const goal = {
    idUser: req.body.idUser,
    title: req.body.title,
    description: req.body.description,
    dateToStart: req.body.dateToStart,
    dateToFinish: req.body.dateToFinish,
    category: req.body.category,
    priority: req.body.priority,
  };
  const validations = validationResult(req);
  console.log("validation errors ", validations);
  if (validations.errors.length > 0) {
    let errorDescriptions = "Payload invalid :";
    validations.errors.map((er) => {
      errorDescriptions = errorDescriptions + " " + er.msg + ", ";
      console.log("Some errors in the payload");
    });
    console.log("descriptions ", errorDescriptions);
    return res.status(404).json({ error: `${errorDescriptions}` });
  } else {
    const response = await mongodb
      .getDatabase()
      .db()
      .collection("goals")
      .insertOne(goal);
    if (response.acknowledged > 0) {
      res.status(200).send('Goal created successfully!');
    } else {
      res
        .status(200)
        .json(response.error || "Some Error ocurred while creating the user");
    }
  }
};

const deleteGoal = async (req, res) => {
  //#swagger.tags=['Goals']
  console.log("Delete User");
  if (req.params.id.length == 24) {
    const userId = new ObjectId(req.params.id);
  console.log("this is the param ", userId);

  const response = await mongodb
    .getDatabase()
    .db()
    .collection("goals")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send("Goal deleted successfully!");
  } else {
    res
      .status(200)
      .json(
        response.error ||
          `Goal not found`
      );
  }
  } else {
    return res.status(404).json({ error: "User id invalid!" });
  }
  
};

const getUsersGoals = async (req, res) => {
  //#swagger.tags=['Goals']
  if (req.params.id.length == 24) {
    console.log("get users goals");
  console.log("from params ", req.params.id);
  const userId = req.params.id;
  const results = await mongodb
    .getDatabase()
    .db()
    .collection("goals")
    .find({ idUser: userId });
  results.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
  } else {
    return res.status(404).json({ error: "User id invalid!" });
  }
  
};

module.exports = {
  getAllGoals,
  getSingleGoal,
  createGoal,
  updateGoal,
  deleteGoal,
  getUsersGoals,
};
