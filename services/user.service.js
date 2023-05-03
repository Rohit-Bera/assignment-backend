const HttpError = require("../middlewares/HttpError");
const User = require("../models/userModel");
const Client = require("../models/clientModel");
const UserWorkImage = require("../models/userWorkModel");
const fs = require("fs");
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

    const isClient = await Client.findOne({ email });

    if (isUser) {
      const error = new HttpError(404, "User already exist");

      return { error };
    }
    if (isClient) {
      const error = new HttpError(
        404,
        "This email ID already exist , enter another email"
      );

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

const addWorkerDemoServices = async ({ _id, workImg }) => {
  console.log("workImg: ", workImg);
  console.log("_id: ", _id);

  const data = {
    user: _id,
    workImage: workImg,
  };

  try {
    const newWorkImage = new UserWorkImage(data);

    await newWorkImage.save();

    if (!newWorkImage) {
      const error = new HttpError(404, "User not found!");
      return { error };
    }

    return { newWorkImage };
  } catch (e) {
    const error = new HttpError(500, `Inetrnal Server error: ${e} `);
    return { error };
  }
};

// delete
const deleteWorkerDemoService = async ({ imageId }) => {
  try {
    const _id = imageId;

    const deleted = await UserWorkImage.findByIdAndDelete({ _id });

    if (!deleted) {
      const error = new HttpError(404, "work image not found");

      return { error };
    }

    const { workImage } = deleted;
    console.log("workImage: ", workImage);

    const path = workImage.slice(55);
    console.log("path: ", path);

    // const file = `./upload/userImages/${path}`;

    // fs.unlinkSync(file);

    return { deleted };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e} `);

    return { error };
  }
};
// get user image for client
const getAllUserworkImageService = async () => {
  try {
    const allUserWorkImage = await UserWorkImage.find().populate("user");

    if (!allUserWorkImage) {
      const error = new HttpError(404, "User images not found!");
      return { error };
    }

    return { allUserWorkImage };
  } catch (e) {
    console.log("e: ", e);

    const error = new HttpError(500, `Internal server error : ${e} `);

    return { error };
  }
};
// get user image for user
const getMyUserworkImageService = async ({ _id }) => {
  console.log("_id: ", _id);
  try {
    const myWorkImages = await UserWorkImage.find({ user: _id });

    if (!myWorkImages) {
      const error = new HttpError(404, "User images not found!");
      return { error };
    }

    if (myWorkImages.length === 0) {
      const error = new HttpError(404, "no images were uploaded!");
      return { error };
    }

    return { myWorkImages };
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

    const isUser = await User.findOne({ email });

    if (isClient) {
      const error = new HttpError(404, "Client already exist");

      return { error };
    }

    if (isUser) {
      const error = new HttpError(
        404,
        "This email ID already exist , enter another email"
      );

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
    const allusers = await User.find();

    if (!allusers) {
      const error = new HttpError(404, "users not found");

      return { error };
    }

    return { allusers };
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
const searchUserService = async ({ name }) => {
  try {
    const firstName = new RegExp(name, "i");
    const found = await User.find({ firstName });
    if (!found) {
      const error = new HttpError(404, "something went wrong in the database!");

      return { error };
    }
    if (found.length == 0) {
      const error = new HttpError(404, `there are no ${name} Assignment!`);

      return { error };
    }
    return { found };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};
module.exports = {
  loginServices,
  // -----------------
  signUpUserService,
  editUserService,
  changeUserPassService,
  addWorkerDemoServices,
  deleteWorkerDemoService,
  getMyUserworkImageService,
  getAllUserworkImageService,
  // -----------------
  signUpClientService,
  editClientService,
  changeClientPassService,
  // -----------------
  deleteUserService,
  deleteClientService,
  getAllUsersService,
  getAllClientsService,
  searchUserService,
};
