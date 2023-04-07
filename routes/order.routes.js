const express = require("express");
const router = express.Router();
const clientauth = require("../middlewares/clientauth");
const adminauth = require("../middlewares/adminauth");
const auth = require("../middlewares/auth");

const {
  postBidApi,
  getUserBidApi,
  deleteBidApi,
  getClientBidApi,
  placeOrderApi,
  getPlacedOrderApi,
  getUserOrderApi,
  getOrdersApi,
  getParticularTaskBid,
} = require("../controllers/order.controller");

router.get("/getParticularTaskBid/:id", getParticularTaskBid);

// user
router.post("/postBid/:id", auth, postBidApi);
router.get("/getMyBid", auth, getUserBidApi);
router.delete("/deleteMyBid/:id", auth, deleteBidApi);
router.get("/getUserOrders", auth, getUserOrderApi);

// client
router.get("/getClientsBid", clientauth, getClientBidApi);
router.put("/placeOrder/:id", clientauth, placeOrderApi);
router.get("/getClientOrders", clientauth, getPlacedOrderApi);

// admin
router.get("/getOrders", adminauth, getOrdersApi);

module.exports = router;
