const Usersbid = require("../models/bidModel");
const Assignment = require("../models/assignmentModel");
const Order = require("../models/orderModel");
const HttpError = require("../middlewares/HttpError");

// user's bid services
const postBidService = async ({ user, assignment, body }) => {
  try {
    const { finalPrice, userMessage } = body;

    let data = "";
    if (!userMessage) {
      data = { user, assignment, finalPrice };
    } else {
      data = { user, assignment, finalPrice, userMessage };
    }

    console.log("data : ", data);

    const myBid = new Assignment(data);
    await myBid.save();

    if (!myBid) {
      // const
    }
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getBidService = async () => {};

const editBidService = async () => {};

const editProposalService = async () => {};

module.exports = {
  postBidService,
  getBidService,
  editBidService,
  editProposalService,
};
