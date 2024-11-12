module.exports = {
  USER_TYPES: {
    ADMIN: "admin",
    USER: "user",
  },

  RESPONSE_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    SUCCESS_NO_CONTENT: 204,

    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    VALIDATION_ERROR: 417,

    SERVER_ERROR: 500,
  },

  SALT_ROUNDS: process.env.SALT_ROUNDS || 10,

  JWT_DETAILS: {
    SECRET: process.env.JWT_SECRET || "Replace secret key with your",
    EXPIRATION_TIME: process.env.JWT_EXPIRE_TIME || "365d",
  },
};
