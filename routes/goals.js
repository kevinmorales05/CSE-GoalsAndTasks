"use strict";
const express = require('express');
const router = express.Router();

const goalsController = require("../controllers/goals");
const validationGoals = require('../validation/validationGoal');
const { isAuthenticated } = require('../middleware/authenticate');

router
  .get('/:id', goalsController.getSingleGoal)

  //Part 2
  .post('/', isAuthenticated, validationGoals, goalsController.createGoal)
  .put('/:id', isAuthenticated, validationGoals, goalsController.updateGoal)
  .delete('/:id',isAuthenticated, goalsController.deleteGoal)
  .get('/', goalsController.getAllGoals)
  .get('/goalsByUser/:id', isAuthenticated, goalsController.getUsersGoals);

module.exports = router;
