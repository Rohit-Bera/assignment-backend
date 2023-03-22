const { response } = require("express");
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
  const user = await userServices.getAllUsersService();
  const { allusers, error } = user;
  if (error) {
    return next(error);
  }
  response.json({ status: "200", allusers });
};

//signup controller
// const signUp = async (request, response, next) => {
//   const { firstName, email, password, number } = request.body;
//   console.log("request.body: ", request.body);
//   const data = await userServices.signUpServices(request.body);
//   const { signupuser, error } = data;

//   if (error) {
//     return next(error);
//   }
//   response.json({ status: "200", signupuser });
// };

// login for both the actors -> admin , users , clients
const login = async (request, response, next) => {
  const { email, password } = request.body;

  const result = await userServices.loginServices({ email, password });

  const { logedActor, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, logedActor });
};

//-------------------------- user
const userSignup = async (request, response, next) => {
  // const url = request.protocol + "://" + request.get("host");
  const url = "https://taskify-backend-server.onrender.com";
  const {
    firstName,
    lastName,
    gender,
    email,
    password,
    phoneNumber,
    city,
    pincode,
    profession,
    experience,
    about,
  } = request.body;

  // console.log("request.body: ", request.body);
  // console.log("request.files: ", request.files);

  const profilePic = url + "/userImages/" + request.files[0].filename;

  const body = {
    firstName,
    lastName,
    gender,
    email,
    password,
    phoneNumber,
    city,
    pincode,
    profession,
    experience,
    about,
    profilePic,
  };

  console.log("body: ", body);

  const data = await userServices.signUpUserService(body);

  const { successOnSignUp, error } = data;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, successOnSignUp });
};

const addWorkdemo = async (request, response, next) => {
  const user = request.user;

  const _id = user._id;

  // const url = request.protocol + "://" + request.get("host");

  const url = "https://taskify-backend-server.onrender.com";

  console.log("request.files: ", request.files);

  const workImg = url + "/userImages/" + request.files[0].filename;

  const postDemo = await userServices.addWorkerDemoServices({ _id, workImg });

  const { error, newWorkImage } = postDemo;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, newWorkImage });
};

// all user images for client
const getAllUserworkImages = async (request, response, next) => {
  const result = await userServices.getAllUserworkImageService();

  const { error, allUserWorkImage } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, allUserWorkImage });
};

//all images of client
const getMyUserworkImages = async (request, response, next) => {
  const user = request.user;
  // console.log("user: ", user);

  const _id = user._id;

  const result = await userServices.getMyUserworkImageService({ _id });

  const { myWorkImages, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, myWorkImages });
};

// user will delete particluar work image
const deleteWorkdemo = async (request, response, next) => {
  const imageId = request.params.id;

  const result = await userServices.deleteWorkerDemoService({ imageId });

  const { error, deleted } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, message: "Work image was deleted" });
};

const editUserDetails = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateUser = await userServices.editUserService({ _id, data });

  const { updated, error } = updateUser;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, message: "data updated successfully", updated });
};

const editUserPass = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateUser = await userServices.changeUserPassService({ _id, data });

  const { updated, error } = updateUser;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "user password updated successfully",
    updated,
  });
};

const userForgotPassword = async (request, response, next) => {};

//-------------------------- client
const clientSignup = async (request, response, next) => {
  const { name, email } = request.body;

  const data = await userServices.signUpClientService(request.body);

  const { successOnSignUp, error } = data;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, successOnSignUp });
};

const editClientDetails = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateClient = await userServices.editClientService({ _id, data });

  const { updated, error } = updateClient;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, message: "data updated successfully", updated });
};

const editClientPass = async (request, response, next) => {
  const _id = request.params.id;
  const data = request.body;
  const updateClient = await userServices.changeClientPassService({
    _id,
    data,
  });

  const { updated, error } = updateClient;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "CLient password updated successfully",
    updated,
  });
};

const clientForgotPassword = async (request, response, next) => {};

//-------------------------- admin
const deleteUser = async (request, response, next) => {
  const _id = request.params.id;

  const deleted = await userServices.deleteUserService({ _id });

  const { deleteUser, error } = deleted;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "user deleted successfully",
    deleteUser,
  });
};

const deleteClient = async (request, response, next) => {
  const _id = request.params.id;

  const deleted = await userServices.deleteClientService({ _id });

  const { deleteClient, error } = deleted;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message: "user deleted successfully",
    deleteClient,
  });
};

const getAllClients = async (request, response, next) => {
  const allClients = await userServices.getAllClientsService();

  const { clients, error } = allClients;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    clients,
  });
};

module.exports = {
  login,
  userSignup,
  editUserDetails,
  editUserPass,
  userForgotPassword,
  clientSignup,
  editClientDetails,
  editClientPass,
  clientForgotPassword,
  deleteUser,
  deleteClient,
  getAllClients,
  getAllUsers,
  addWorkdemo,
  deleteWorkdemo,
  getMyUserworkImages,
  getAllUserworkImages,
};
