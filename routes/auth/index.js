const express = require("express");
const {
  registrationRules,
  loginRules,
} = require("../../validation-rules/auth");
const {
  handleValidationErrors,
} = require("../../middlewares/validation-handler");
const AuthController = require("../../controllers/auth.controller");
const {
  validateAuthentication,
} = require("../../middlewares/authgard.middleware");
const router = express.Router();

router.post(
  "/register",
  registrationRules,
  handleValidationErrors,
  AuthController.register
);

router.post("/login", loginRules, handleValidationErrors, AuthController.login);

router.get("/logout", validateAuthentication, AuthController.logout);

module.exports = router;
