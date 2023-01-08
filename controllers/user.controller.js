const {response} = require("express");
const { request } = require("http");
const userServices = require("../services/user.service");
require("dotenv").config();


//login controller
const logIn = async (request, response, next) => {
    const { email, password } = request.body;
    console.log("password: ", password);
    console.log("email: ", email);
  
    const data = await userServices.logInServices(request.body);
    const { loguser, error } = data;
    console.log("loguser: ", loguser);
    if (error) {
      return next(error);
    }
    loguser
      ? response.json({ status: "200", loguser })
      : response.json({ status: "404", error });
  };
//get all user controller
const getAllUsers = async (request, response, next) => {
    const user = await userServices.getAllUsersServices();
    const { allusers, error } = user;
    if (error) {
      return next(error);
    }
    response.json({ status: "200", allusers });
  };


//signup controller
const signUp = async (request, response, next) => {
    const { firstName, email, password, number } = request.body;
    console.log("request.body: ", request.body);
    const data = await userServices.signUpServices(request.body);
    const { signupuser, error } = data;
    
    if (error) {
      return next(error);
    }
    response.json({ status: "200", signupuser });
  };
module.exports ={logIn,getAllUsers,signUp};