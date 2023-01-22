const express = require("express");
const router = express.Router();
const clientauth = require("../middlewares/clientauth");
const adminauth = require("../middlewares/adminauth");
const auth = require("../middlewares/auth");

const {
  postBidApi,
  getBidApi,
  editBidApi,
  editProposalApi,
} = require("../controllers/order.controller");
// user
router.post("/postBid/:id", auth, postBidApi);

module.exports = router;
