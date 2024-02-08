"use strict";
const express = require('express');
const router = express.Router();

const tasksController = require("../controllers/tasks");
const { isAuthenticated } = require('../middleware/authenticate');

router
  .get('/:id', tasksController.getSingleTask)

  //Part 2
  .post('/', isAuthenticated, tasksController.createTask)
  .put('/:id', isAuthenticated, tasksController.updateTask)
  .delete('/:id', isAuthenticated, tasksController.deleteTask)
  .get('/', tasksController.getAllTasks)
  .get('/tasksByGoal/:id', isAuthenticated, tasksController.getTasksByGoal);

module.exports = router;
