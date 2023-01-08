const userServices = require("../services/user.service");

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
  const { name, email } = request.body;

  const data = await userServices.signUpUserService(request.body);

  const { successOnSignUp, error } = data;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, successOnSignUp });
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

const getAllUsers = async (request, response, next) => {
  const allUsers = await userServices.getAllUsersService();

  const { users, error } = allUsers;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    users,
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
};
