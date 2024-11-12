const { RESPONSE_STATUS_CODES } = require("../config/constants");
const { apiCatchGenericResponse } = require("../helpers/common-fn");
const { encryptPassword, comparePassword } = require("../helpers/hash-fn");
const { generateJwtToken } = require("../helpers/jwt-fn");
const { splitName } = require("../helpers/string-fn");
const User = require("../models/User");

async function register(req, res) {
  try {
    const { name, password, ...rest } = req.body;
    const [firstName, lastName] = splitName(name);
    const hashedPassword = await encryptPassword(password);
    if (!hashedPassword) {
      return res.status(RESPONSE_STATUS_CODES.BAD_REQUEST).json({
        status: 0,
        data: null,
        message: "Invalid password",
        errors: [
          {
            field: "general-field",
            message: "Invalid password",
          },
        ],
      });
    }
    const userPayload = {
      ...rest,
      firstName,
      lastName,
      password: hashedPassword,
    };
    const userObj = new User(userPayload);
    await userObj.save();
    return res.status(RESPONSE_STATUS_CODES.CREATED).json({
      status: 1,
      data: userObj,
      message: "User created successfully",
      errors: [],
    });
  } catch (error) {
    const obj = apiCatchGenericResponse();
    return res.status(obj.responseStatus).json(obj.responseJson);
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
      isActive: true,
      isDeleted: false,
    }).lean();
    if (user) {
      const isMatch = await comparePassword(password, user.password);
      if (isMatch) {
        delete user.password;
        delete user.token;
        delete user.resetToken;
        const jwtToken = await generateJwtToken(user);
        if (jwtToken) {
          const updatedUser = await updateTokenForUser(user._id, jwtToken);
          if (updatedUser) {
            delete updatedUser.password;
            return res.status(RESPONSE_STATUS_CODES.OK).json({
              status: 1,
              data: { user: updatedUser, token: jwtToken },
              message: "User logged in successfully",
              errors: [],
            });
          }
        }
      }
    }
    return res.status(RESPONSE_STATUS_CODES.OK).json({
      status: 0,
      data: null,
      message: "Invalid credentials",
      errors: [
        {
          field: "general-field",
          message: "Invalid credentials",
        },
      ],
    });
  } catch (error) {
    console.log(error);
    const obj = apiCatchGenericResponse();
    return res.status(obj.responseStatus).json(obj.responseJson);
  }
}

async function logout(req, res) {
  try {
    const { _stpUser } = req;
    if (_stpUser) {
      const { _id } = _stpUser;
      const user = await User.findByIdAndUpdate(_id, {
        token: null,
        resetToken: null,
      });
      if (user) {
        return res.status(RESPONSE_STATUS_CODES.OK).json({
          status: 1,
          data: null,
          message: "User logged out successfully",
          errors: [],
        });
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

async function updateTokenForUser(id, token) {
  const user = await User.findByIdAndUpdate(id, { token, lastLogin: new Date() }, { new: true }).lean();
  if (user) {
    return user;
  }
  return null;
}

const AuthController = { register, login, logout };

module.exports = AuthController;
