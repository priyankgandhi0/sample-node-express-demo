const { RESPONSE_STATUS_CODES } = require("../config/constants");
const { apiCatchGenericResponse } = require("../helpers/common-fn");
const { decodeJwtToken } = require("../helpers/jwt-fn");
const User = require("../models/User");

async function validateAuthentication(req, res, next) {
  try {
    const { authorization } = req.headers;
    if (authorization) {
      const authArr = authorization.split(" ");
      if (authArr.length === 2) {
        const [authType, token] = authArr;
        if (authType.toLowerCase() === "bearer" && token) {
          const decodedUser = await decodeJwtToken(token);
          if (decodedUser) {
            const id = decodedUser._id;
            const userFromDB = await User.findOne({ _id: id, token }).lean();
            if (userFromDB) {
              req._stpUser = userFromDB;
              return next();
            }
          }
        }
      }
    }
    return res.status(RESPONSE_STATUS_CODES.UNAUTHORIZED).json({
      status: 0,
      data: null,
      message: "Unauthenticated access",
      errors: [
        {
          field: "general-field",
          message: "Unauthenticated access",
        },
      ],
    });
  } catch (error) {
    const obj = apiCatchGenericResponse();
    return res.status(obj.responseStatus).json(obj.responseJson);
  }
}

module.exports = { validateAuthentication };
