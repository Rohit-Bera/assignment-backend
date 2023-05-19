const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const adminauth = require("../middlewares/adminauth");
const clientauth = require("../middlewares/clientauth");

const {
  askForPayment,
  getAllPaymentsClient,
  payAmount,
  getAllPaymentsUser,
  getBalanceWallet,
  withdrawFromWallet,
  createPaymentIntent,
} = require("../controllers/payment.controller");

// user
// id -> orderId
router.post("/askForPayment/:id", auth, askForPayment);
router.get("/getAllPaymentWorker", auth, getAllPaymentsUser);
// user wallet
router.get("/getBalance", auth, getBalanceWallet);
router.put("/withdrawAmount", auth, withdrawFromWallet);

// stripe payment gateway
router.post("/walletIntentWorker", auth, createPaymentIntent);

// client
// id -> paymentId
router.put("/payAmount/:id", clientauth, payAmount);
router.get("/getAllPaymentUser", clientauth, getAllPaymentsClient);

// stripe payment gateway
router.post("/paymentIntent", clientauth, createPaymentIntent);

module.exports = router;
