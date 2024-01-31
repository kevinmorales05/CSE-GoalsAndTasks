"use strict";
const express = require('express');
const router = express.Router();

const usersController = require("../controllers/users");

router
  .get('/:id', usersController.getSingle)

  //Part 2
  .post('/', usersController.createUser)
  .put('/:id', usersController.updateUser)
  .delete('/:id', usersController.deleteUser)
  .get('/', usersController.getAll);

module.exports = router;
