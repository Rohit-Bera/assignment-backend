const Client = require("../models/clientModel");
const jwt = require("jsonwebtoken");
const HttpError = require("./HttpError");

const adminauth = async (request, response, next) => {
  try {
    const token = request.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "newuser");
    const client = await Client.findOne({ _id: decoded._id });
    // console.log('user: ', user);
    if (!client) {
      const error = new HttpError(401, "please authenticate!");
      console.log("error: ", error);
      return { error };
    }
    request.token = token;
    request.client = client;
    // console.log('request.user: ', request.user);
    next();
  } catch (err) {
    const error = new HttpError(500, `Client Authentication: ${err}`);
    response.json(error);
    console.log("error in auth: ", err);
    return error;
  }
};

module.exports = adminauth;
