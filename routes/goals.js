"use strict";
const express = require('express');
const router = express.Router();

const goalsController = require("../controllers/goals");
const validationGoals = require('../validation/validationGoal');

router
  .get('/:id', goalsController.getSingleGoal)

  //Part 2
  .post('/', validationGoals, goalsController.createGoal)
  .put('/:id', validationGoals, goalsController.updateGoal)
  .delete('/:id', goalsController.deleteGoal)
  .get('/', goalsController.getAllGoals)
  .get('/goalsByUser/:id', goalsController.getUsersGoals);

module.exports = router;
