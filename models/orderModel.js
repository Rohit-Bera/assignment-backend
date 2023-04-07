const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
    },
    finalBid: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Usersbid",
    },
    // work is done or not
    workStatus: {
      type: String,
      default: "pending",
      required: true,
    },
    // received or pending
    paymentStatus: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
