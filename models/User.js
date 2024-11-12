const mongoose = require("mongoose");
const { USER_TYPES } = require("../config/constants");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: false, default: null },
    profileImage: { type: String, required: false, default: null },
    token: { type: String, required: false, default: null },
    resetToken: { type: String, required: false, default: null },
    userType: {
      type: String,
      enum: [USER_TYPES.USER, USER_TYPES.ADMIN],
      required: false,
      default: USER_TYPES.USER,
    },
    lastLogin: { type: Date, required: false, default: null },
    isActive: { type: Boolean, required: false, default: true },
    isDeleted: { type: Boolean, required: false, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
