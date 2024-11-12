const bcrypt = require("bcrypt");
const { SALT_ROUNDS } = require("../config/constants");

function encryptPassword(password) {
  return new Promise(function (resolve, reject) {
    const saltRounds = parseInt(SALT_ROUNDS);
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}

function comparePassword(password, hashPassword) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hashPassword, (err, hash) => {
      if (err) return reject(err);
      return resolve(hash);
    });
  });
}

module.exports = { encryptPassword, comparePassword };
