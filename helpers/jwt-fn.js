const jwt = require('jsonwebtoken');
const { JWT_DETAILS } = require("../config/constants");

function generateJwtToken(data) {
  return new Promise(function (resolve, reject) {
    jwt.sign(
      data,
      JWT_DETAILS.SECRET,
      {
        expiresIn: JWT_DETAILS.EXPIRATION_TIME,
      },
      function (err, token) {
        if (err) return reject(err);
        return resolve(token);
      }
    );
  });
}

function decodeJwtToken(token) {
  return new Promise(function (resolve, reject) {
    jwt.verify(
      token,
      JWT_DETAILS.SECRET,
      function (err, decoded) {
        if (err) return reject(err);
        return resolve(decoded);
      }
    );
  });
}

module.exports = { generateJwtToken, decodeJwtToken };
