const { RESPONSE_STATUS_CODES } = require("../config/constants");

function apiCatchGenericResponse() {
  return {
    responseStatus: RESPONSE_STATUS_CODES.SERVER_ERROR,
    responseJson: {
      status: 0,
      data: null,
      message: "Something went wrong while creating user.",
      errors: [
        {
          field: "general-field",
          message: "Something went wrong while creating user.",
        },
      ],
    },
  };
}

module.exports = {
  apiCatchGenericResponse,
};
