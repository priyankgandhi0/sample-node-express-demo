const { body } = require("express-validator");
const User = require("../models/User");

const registrationRules = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name should be at least 2 characters")
    .isLength({ max: 100 })
    .withMessage("Name should be at less than 100 characters"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .custom(async (value) => {
      const user = await User.findOne({
        email: value,
        isDeleted: false,
      }).lean();
      if (user) {
        throw new Error("Email already exists");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password should be at least 6 characters"),
];

const loginRules = [
  body("email").notEmpty().withMessage("Email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

module.exports = { registrationRules, loginRules };
