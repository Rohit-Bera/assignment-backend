const orderService = require("../services/order.service");

// user's bid
const postBidApi = async (request, response, next) => {
  const user = request.user._id;
  const assignment = request.params.id;

  const body = request.body;

  const result = await orderService.postBidService({
    user,
    assignment,
    body,
  });
};

const getBidApi = async (request, response, next) => {};

const editBidApi = async (request, repsonse, next) => {};

// client accept/reject bid
const editProposalApi = async (request, response, next) => {};

module.exports = { postBidApi, getBidApi, editBidApi, editProposalApi };
