const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    order: {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    // status - payment is pending or not
    paymentInfo: {
      type: String,
      required: true,
      default: "pending",
    },
    assignmentCost: {
      type: Number,
      required: true,
    },
    commision: {
      type: Number,
    },
    finalCost: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
