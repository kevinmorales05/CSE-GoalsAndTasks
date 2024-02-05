const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;
const { validationResult } = require("express-validator");

const getAll = async (req, res) => {
  //#swagger.tags=['Users']
  console.log("getAll");
  const result = await mongodb.getDatabase().db().collection("users").find();
  //const result = await mongodb.getDatabase().db().collection('users').find();
  //console.log('these are the results ', result);
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};

const getSingle = async (req, res) => {
  //#swagger.tags=['Users']
  console.log("get single");
  console.log("from params ", req.params.id);
  
  if (req.params.id == undefined || null) {
    console.log("Param is empty");
  }

  if(req.params.id.length == 24){
    console.log('user id valid!');
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });
    console.log('Param found!');
    console.log('this is the result ', JSON.stringify(result._eventsCount))
    result.toArray().then((users) => {
      console.log('this is the result ', JSON.stringify(users)) 
      //analize if the sysstem found a user
      if(users.length == 0){
        console.log('User not found!');
        return res.status(404).json({ error: "User not found" });
      }
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(users[0]);
    });
  }
  else {
    return res.status(404).json({ error: "User id invalid!" });
  }
  
};
const updateUser = async (req, res) => {
  //#swagger.tags=['Users']
  console.log("Update User");
  const userId = new ObjectId(req.params.id);
  console.log("this is the param ", userId);

//find user
const result = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .find({ _id: userId });
  
  
    const user = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday,
      };
      const validations = validationResult(req);
      console.log("Validations ", validations);

      console.log("this is the new body ", user);
      const response = await mongodb
        .getDatabase()
        .db()
        .collection("users")
        .replaceOne({ _id: userId }, user);
      if (response.modifiedCount > 0) {
        res.status(200).send();
      } else {
        res
          .status(200)
          .json(response.error || "User not found");
      }
  
};
const createUser = async (req, res) => {
  const result = validationResult(req);
  console.log("results ", result);
  //#swagger.tags=['Users']
  console.log("request", req.body);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .insertOne(user);
  if (response.acknowledged > 0) {
    res.status(200).send();
  } else {
    res
      .status(200)
      .json(response.error || "Some Error ocurred while creating the user");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=['Users']
  console.log("Delete User");
  const userId = new ObjectId(req.params.id);
  console.log("this is the param ", userId);
  const response = await mongodb
    .getDatabase()
    .db()
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(200).send();
  } else {
    res
      .status(200)
      .json(
        response.error ||
          `Some Error ocurred while deleting the user ${response.error}`
      );
  }
};

module.exports = {
  getAll,
  getSingle,
  createUser,
  updateUser,
  deleteUser,
};
