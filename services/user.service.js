const User = require("../models/user.model");
const HttpError = require("../middlewares/Httperror");
const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");



//hashing password
const hashPassword = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 8);
    return hashedPassword;
  };
  
  //token
  const generateAuthToken = async (user) => {
    const token = await jwt.sign({ _id: user._id.toString() }, "newuser");
    return token;
  };

//find user
const findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      const error = new HttpError(404, "Invalid User!");
      console.log("error: ", error);
      return { error };
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new HttpError(404, "Invalid User!");
      console.log("error: ", error);
      return { error };
    }
    return user;
  };

  //sign up services
  const signUpServices = async (signupUser) => {
    const { email } = signupUser;
    try {
      const isUser = await User.findOne({ email });
      if (isUser) {
        const error = new HttpError(404, "User is already exist");
        console.log("error: ", error);
        return { error };
      }
      const user = new User(signupUser);
      console.log("user: ", user);
      const hashedPassword = await hashPassword(user);
      user.password = hashedPassword;
      await user.save();
      const token = await generateAuthToken(user);
      console.log("token: ", token);
      user.password = undefined;
      const signupuser = { signupUser, token };
      return { signupuser };
    } catch (err) {
      const error = new HttpError(
        500,
        "something went Wrong in delete user services"
      );
      console.log("error: ", error);
      return error;
    }
  };
  
//login services
const logInServices = async(loginUser)=>{
    const { email, password } = loginUser;
    try {
        const user = await findByCredentials(email,password);
        console.log("User: ", user);
        const token = await generateAuthToken(user);
        console.log("token: ", token);
        const loguser = { user, token };
        user.password = undefined;
        return { loguser };

    } catch (err) {
        const error = new HttpError(
            500,
            "something went Wrong in login user services"
          );
          console.log("error: ", error);
          return error;
    }
};

//get all user services
const getAllUsersServices = async () => {
    try {
      const allusers = await User.find();
      if (!allusers) {
        const error = new HttpError(404, "User Not Found!");
  
        return { error };
      }
      return { allusers };
    } catch (error) {
      console.log("error: ", error);
      return { error };
    }
  };
module.exports = {logInServices ,getAllUsersServices,signUpServices};