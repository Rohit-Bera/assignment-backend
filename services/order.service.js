const Usersbid = require("../models/bidModel");
const Assignment = require("../models/assignmentModel");
const Order = require("../models/orderModel");
const Client = require("../models/clientModel");
const HttpError = require("../middlewares/HttpError");

// visitor's service

const getTaskBidsService = async ({ _id }) => {
  try {
    const allTaskBids = await Usersbid.find({ assignment: _id })
      .sort({
        createdAt: -1,
      })
      .populate("user");
    console.log("allTaskBids service: ", allTaskBids);

    if (!allTaskBids) {
      const error = new HttpError(404, "bids were not found!");

      return { error };
    }

    return { allTaskBids };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// user's services
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

    const myBid = new Usersbid(data);
    await myBid.save();

    if (!myBid) {
      const error = new HttpError(404, "bids were not found!");

      return { error };
    }

    return { myBid };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getBidService = async ({ _id }) => {
  try {
    const findMyBid = await Usersbid.find({ user: _id });

    if (!findMyBid) {
      const error = new HttpError(404, `bids not find , please check again!`);

      return { error };
    }

    // const {  } = findMyBid;

    return { findMyBid };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const deleteBidService = async ({ _id }) => {
  try {
    const deletedBid = await Usersbid.findByIdAndDelete({ _id });

    if (!deletedBid) {
      const error = new HttpError(404, "Your bid was not found");

      return { error };
    }

    return { deletedBid };
  } catch (e) {
    const error = new HttpError(500, `Internal server error :${e}`);

    return { error };
  }
};

const getUserOrderService = async ({ user }) => {
  try {
    const userOrders = await Order.find({ user })
      .populate("client")
      .populate("assignment")
      .populate("finalBid");

    if (!userOrders) {
      const error = new HttpError(404, "user orders were not found");
      return { error };
    }

    return { userOrders };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

// client's service

const getClientBidService = async ({ clientId }) => {
  try {
    const allBids = await Usersbid.find({ client: clientId })
      .populate("user")
      .populate("assignment");

    console.log("allBids: ", allBids);

    if (!allBids) {
      const error = new HttpError(404, "your user bids were not found!");

      return { error };
    }

    return { allBids };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const placeOrderService = async ({ id, client }) => {
  console.log("id servcie: ", id);

  try {
    const bid = { bidStatus: "accepted" };

    const accepted = await Usersbid.findByIdAndUpdate(
      { _id: id },
      { $set: bid },
      { new: true }
    );

    if (!accepted) {
      const error = new HttpError(
        404,
        "the bid you are searching for was not found!"
      );

      return { error };
    }

    const { user, _id, finalPrice, assignment } = accepted;
    const finalBid = _id;
    const item = {
      client,
      user,
      finalBid,
      finalPrice,
      assignment,
    };

    const orderPlaced = new Order(item);

    await orderPlaced.save();

    if (!orderPlaced) {
      const error = new HttpError(404, "the order was not placed");

      return { error };
    }

    return { accepted, orderPlaced };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

const getPlacedOrderService = async ({ client }) => {
  try {
    const myPlacedOrders = await Order.find({ client })
      .populate("user")
      .populate("assignment")
      .populate("finalBid");

    if (!myPlacedOrders) {
      const error = new HttpError(
        400,
        "Your orders were not found! , please check agian"
      );

      return { error };
    }

    return { myPlacedOrders };
  } catch (e) {
    const error = new HttpError(500, "Internal server error");

    return { error };
  }
};

// admin
const getOrderServcie = async () => {
  try {
    const allOrders = await Order.find();

    if (!allOrders) {
      const error = new HttpError(404, "Orders not found!");

      return { error };
    }

    return { allOrders };
  } catch (e) {
    const error = new HttpError(500, `Internal server error : ${e}`);

    return { error };
  }
};

module.exports = {
  postBidService,
  getBidService,
  deleteBidService,
  getClientBidService,
  placeOrderService,
  getPlacedOrderService,
  getUserOrderService,
  getOrderServcie,
  getTaskBidsService,
};
