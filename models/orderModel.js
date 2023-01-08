const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assignment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    finalPrice: {
      type: Number,
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
