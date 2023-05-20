const HttpError = require("../middlewares/HttpError");
const paymentService = require("../services/payment.service");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// user
const askForPayment = async (request, response, next) => {
  const userId = request.user._id;

  const orderId = request.params.id;

  const { assignmentCost, paymentInfo, clientId, assignmentId } = request.body;

  const result = await paymentService.askForPaymentService({
    clientId,
    orderId,
    userId,
    assignmentCost,
    paymentInfo,
    assignmentId,
  });

  const { newPayment, error } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, success: "payment was asked successfully!" });
};

const getAllPaymentsUser = async (request, response, next) => {
  const userId = request.user._id;

  const result = await paymentService.getPaymentsUserService({ userId });

  const { allPayments, error } = result;
  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, allPayments });
};

const getBalanceWallet = async (request, response, next) => {
  const _id = request.user._id;

  const result = await paymentService.getBalanceWalletService({ _id });

  const { error, myBalance } = result;

  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, myBalance });
};

const withdrawFromWallet = async (request, response, next) => {
  const _id = request.user._id;
  console.log("_id: ", _id);

  const { withdrawlAmt } = request.body;

  const result = await paymentService.withdrawFromWallet({ _id, withdrawlAmt });

  const { error, success } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ statsu: 200, success });
};

// client
const payAmount = async (request, response, next) => {
  const clientId = request.client._id;

  const _id = request.params.id;

  const { paymentInfo } = request.body;

  const result = await paymentService.payAmountService({
    clientId,
    _id,
    paymentInfo,
  });

  const { error, success } = result;

  if (error) {
    response.json({ error });
    return next(error);
  }

  response.json({ status: 200, success });
};

const getAllPaymentsClient = async (request, response, next) => {
  const clientId = request.client._id;
  console.log("clientId: ", clientId);

  const result = await paymentService.getPaymentsClientService({ clientId });

  const { allPayments, error } = result;
  if (error) {
    response.json({ error });

    return next(error);
  }

  response.json({ status: 200, allPayments });
};

// payment gateway
const createPaymentIntent = async (request, response, next) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: request.body.amount * 100,
      currency: "INR",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    //   return the secret

    response.json({ status: 200, paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    const error = new HttpError(500, `internal server error : ${e}`);
    response.json({ error });
    next(error);
  }
};

module.exports = {
  askForPayment,
  getAllPaymentsClient,
  payAmount,
  getAllPaymentsUser,
  getBalanceWallet,
  withdrawFromWallet,
  createPaymentIntent,
};
