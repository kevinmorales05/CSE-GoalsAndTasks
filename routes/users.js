"use strict";
const express = require('express');
const router = express.Router();
//const { query, validationResult } = require('express-validator');


const usersController = require("../controllers/users");
const validationUser = require('../validation/validationUser');

router
  .get('/:id', usersController.getSingle)

  //Part 2
  .post('/', validationUser, usersController.createUser)
  .put('/:id', validationUser, usersController.updateUser)
  .delete('/:id', usersController.deleteUser)
  .get('/', usersController.getAll);

module.exports = router;
