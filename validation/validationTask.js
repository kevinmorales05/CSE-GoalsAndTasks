const { body } = require("express-validator");

const validationGoal = [
  body("idGoalOwner").notEmpty().withMessage("idGoalOwner is required!"),
  body("title").notEmpty().withMessage("Title is required!"),
  body("description").notEmpty().withMessage("Description is required!"),
  body("dateToStart").notEmpty().withMessage("Date to start is required!"),
  body("dateToFinish").notEmpty().withMessage("Date to finish is required!"),
]

module.exports = validationGoal;
