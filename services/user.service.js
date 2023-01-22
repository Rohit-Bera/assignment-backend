
const HttpError = require("../middlewares/HttpError");
const User = require("../models/userModel");
const Client = require("../models/clientModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// for signup
const hashPasswordUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, 8);
  return hashedPassword;
};

const generateTokenUser = async (user) => {
  const token = jwt.sign({ _id: user._id.toString() }, "newuser");
  return token;
};

// login generate token
const loginToken = async (actor) => {
  const token = jwt.sign({ _id: actor._id.toString() }, "newuser");
  return token;
};

const hashPasswordClient = async (client) => {
  const hashedPassword = await bcrypt.hash(client.password, 8);
  return hashedPassword;
};

const generateTokenClient = async (client) => {
  const token = jwt.sign({ _id: client._id.toString() }, "newuser");
  return token;
};

// for login
const findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  console.log("user: ", user);
  const client = await Client.findOne({ email });
  console.log("client: ", client);

  if (user) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new HttpError(404, "Invalid password!");
      return { error };
    }

    return user;
  } else if (client) {
    const isMatch = await bcrypt.compare(password, client.password);
    if (!isMatch) {
      const error = new HttpError(404, "Invalid password!");
      return { error };
    }

    return client;
  } else {
    const error = new HttpError(
      404,
      "account with this email id does not exist!"
    );
    return { error };
  }
};

// login common for both user and client
const loginServices = async ({ email, password }) => {
  console.log("email: ", email);

  try {
    const actor = await findByCredentials(email, password);
    console.log("actor: ", actor);

    const { error } = actor;

    if (error) {
      return { error };
    }

    const token = await loginToken(actor);

    const logedActor = { actor, token };

    actor.password = undefined;

    return { logedActor };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server Error : ${e} `);
    return { error };
  }
};

// --------------------------------------------
// user services
const signUpUserService = async (body) => {
  const { email } = body;
  try {
    const isUser = await User.findOne({ email });

    if (isUser) {
      const error = new HttpError(404, "User already exist");

      return { error };
    }

    const user = new User(body);
    const hashedPassword = await hashPasswordUser(user);
    user.password = hashedPassword;
    await user.save();
    const token = await generateTokenUser(user);
    user.password = undefined;

    const successOnSignUp = { user, token };

    return { successOnSignUp };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e} `);

    return { error };
  }
};

const editUserService = async ({ _id, data }) => {
  try {
    const updated = await User.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "User not found!");
      return { error };
    }

    return { updated };
  } catch (e) {
    const error = new HttpError(500, `Inetrnal Server error: ${e} `);
    return { error };
  }
};

const changeUserPassService = async ({ _id, data }) => {
  console.log("data: ", data);
  try {
    const hashedPassword = await hashPasswordUser(data);
    data.password = hashedPassword;

    const updated = await User.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "User not found");
      return { error };
    }

    return { updated };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// -------------------------------------------
// client services

const signUpClientService = async (body) => {
  const { email } = body;
  try {
    const isClient = await Client.findOne({ email });

    if (isClient) {
      const error = new HttpError(404, "Client already exist");

      return { error };
    }

    const client = new Client(body);
    const hashedPassword = await hashPasswordClient(client);
    client.password = hashedPassword;
    await client.save();
    const token = await generateTokenClient(client);
    client.password = undefined;

    const successOnSignUp = { client, token };

    return { successOnSignUp };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e} `);

    return { error };
  }
};

const editClientService = async ({ _id, data }) => {
  try {
    const updated = await Client.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "client not found!");
      return { error };
    }

    return { updated };
  } catch (e) {
    const error = new HttpError(500, `Inetrnal Server error: ${e} `);
    return { error };
  }
};

const changeClientPassService = async ({ _id, data }) => {
  console.log("data: ", data);
  try {
    const hashedPassword = await hashPasswordClient(data);
    data.password = hashedPassword;

    const updated = await Client.findByIdAndUpdate(
      { _id },
      { $set: data },
      { new: true }
    );

    if (!updated) {
      const error = new HttpError(404, "Client not found");
      return { error };
    }

    return { updated };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e}`);
    return { error };
  }
};

// -------------------------------------------
// admin services

const deleteUserService = async ({ _id }) => {
  console.log("_id: ", _id);

  try {
    const deleteUser = await User.findByIdAndDelete({ _id });

    if (!deleteUser) {
      const error = new HttpError(404, "User not found!");
      return { error };
    }

    return { deleteUser };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error: ${e}`);

    return { error };
  }
};

const deleteClientService = async ({ _id }) => {
  console.log("_id: ", _id);

  try {
    const deleteClient = await Client.findByIdAndDelete({ _id });

    if (!deleteClient) {
      const error = new HttpError(404, "client not found!");
      return { error };
    }

    return { deleteClient };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error: ${e}`);

    return { error };
  }
};

const getAllUsersService = async () => {
  try {
    const users = await User.find();

    if (!users) {
      const error = new HttpError(404, "users not found");

      return { error };
    }

    return { users };
  } catch (e) {
    console.log("e: ", e);

    const error = HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getAllClientsService = async () => {
  try {
    const clients = await Client.find();

    if (!clients) {
      const error = new HttpError(404, "users not found");

      return { error };
    }

    return { clients };
  } catch (e) {
    console.log("e: ", e);

    const error = HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  loginServices,
  // -----------------
  signUpUserService,
  editUserService,
  changeUserPassService,
  // -----------------
  signUpClientService,
  editClientService,
  changeClientPassService,
  // -----------------
  deleteUserService,
  deleteClientService,
  getAllUsersService,
  getAllClientsService,
};

