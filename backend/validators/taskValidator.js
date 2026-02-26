const { body } = require("express-validator");

exports.createTaskValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required"),

  body("status")
    .optional()
    .isIn(["pending", "in-progress", "completed"])
];