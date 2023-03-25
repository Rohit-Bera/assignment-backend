const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    area: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: Number,
    },
    profession: {
      type: String,
    },
    experience: {
      type: Number,
    },
    about: {
      type: String,
    },
    bankAccountNo: {
      type: Number,
    },
    usertype: {
      type: String,
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
