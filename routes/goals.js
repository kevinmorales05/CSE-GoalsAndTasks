"use strict";
const express = require('express');
const router = express.Router();

const goalsController = require("../controllers/goals");

router
  .get('/:id', goalsController.getSingleGoal)

  //Part 2
  .post('/', goalsController.createGoal)
  .put('/:id', goalsController.updateGoal)
  .delete('/:id', goalsController.deleteGoal)
  .get('/', goalsController.getAllGoals)
  .get('/goalsByUser/:id', goalsController.getUsersGoals);

module.exports = router;
