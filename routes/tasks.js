"use strict";
const express = require('express');
const router = express.Router();

const tasksController = require("../controllers/tasks");

router
  .get('/:id', tasksController.getSingleTask)

  //Part 2
  .post('/', tasksController.createTask)
  .put('/:id', tasksController.updateTask)
  .delete('/:id', tasksController.deleteTask)
  .get('/', tasksController.getAllTasks)
  .get('/tasksByGoal/:id', tasksController.getTasksByGoal);

module.exports = router;
