const orderService = require("../services/order.service");

// user
const postBidApi = async (request, response, next) => {
  const user = request.user._id;
  const assignment = request.params.id;

  const body = request.body;

  const result = await orderService.postBidService({
    user,
    assignment,
    body,
  });

  const { myBid, error } = result;

  if (error) {
    response.json({ error });
    return { error };
  }

  response.json({ status: 200, myBid });
};

const getParticularTaskBid = async (request, response, next) => {
  const _id = request.params.id;

  const result = await orderService.getTaskBidsService({ _id });
  const { error, allTaskBids } = result;
  console.log("allTaskBids: ", allTaskBids);

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, allTaskBids });
};

const getUserBidApi = async (request, response, next) => {
  const _id = request.user._id;

  const result = await orderService.getBidService({ _id });

  const { findMyBid, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  if (findMyBid.length === 0) {
    return response.json({
      status: 400,
      Message: "you have not bidded in any of the assignments",
    });
  }

  response.json({ status: 200, findMyBid });
};

const getUserOrderApi = async (request, response, next) => {
  const user = request.user._id;

  const result = await orderService.getUserOrderService({ user });

  const { userOrders, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, userOrders });
};

const deleteBidApi = async (request, response, next) => {
  const _id = request.params.id;

  const result = await orderService.deleteBidService({ _id });

  const { error, deletedBid } = result;
  console.log("deletedBid: ", deletedBid);

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, deletedBid });
};

const onWorkDoneApi = async (request, response, next) => {
  const _id = request.params.id;

  const body = request.body;
  console.log("body: ", body);

  const result = await orderService.workDoneService({ _id, body });

  const { updateWorkDone, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({
    status: 200,
    message:
      "Order was Completed , please chat with the client to checkout payment",
  });
};

// client
const getClientBidApi = async (request, response, next) => {
  const clientId = request.client._id;

  const result = await orderService.getClientBidService({ clientId });

  const { allBids, error } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  if (allBids.length === 0) {
    return response.json({
      status: 400,
      Message: "Users have not bid in any of the assignments",
    });
  }

  response.json({ status: 200, allBids });
};

const placeOrderApi = async (request, response, next) => {
  const client = request.client._id;
  console.log("client: ", client);

  const { bidStatus } = request.body;

  const id = request.params.id;
  console.log("id: ", id);

  const result = await orderService.placeOrderService({
    id,
    client,
    bidStatus,
  });

  const { accepted, orderPlaced, error, rejected } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  if (rejected) {
    return response.json({ status: 200, rejected });
  }

  response.json({
    status: 200,
    accepted,
    orderPlaced,
    Message: "The order was placed",
  });
};

const getPlacedOrderApi = async (request, response, next) => {
  const client = request.client._id;

  const result = await orderService.getPlacedOrderService({ client });

  const { myPlacedOrders, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  if (myPlacedOrders.length === 0) {
    return response.json({ status: 400, Message: "There are no Orders!" });
  }

  response.json({ status: 200, myPlacedOrders });
};

// admin
const getOrdersApi = async (request, response, next) => {
  const result = await orderService.getOrderServcie();

  const { allOrders, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  if (allOrders.length === 0) {
    return response.json({
      status: 400,
      Message: "There are no Orders Registered.",
    });
  }

  response.json({ status: 200, allOrders });
};

module.exports = {
  postBidApi,
  getUserBidApi,
  deleteBidApi,
  onWorkDoneApi,
  getClientBidApi,
  placeOrderApi,
  getPlacedOrderApi,
  getUserOrderApi,
  getOrdersApi,
  getParticularTaskBid,
};
