const { validationResult } = require("express-validator");
const { RESPONSE_STATUS_CODES } = require("../config/constants");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResult = errors
      .array({ onlyFirstError: true })
      .map((err) => ({ field: err.path, message: err.msg }));
    return res
      .status(RESPONSE_STATUS_CODES.VALIDATION_ERROR)
      .json({ errors: errorResult });
  }
  next();
};

module.exports = { handleValidationErrors };
