const mongoose = require("mongoose");
const { Schema } = mongoose;

const walletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  TotalBalance: {
    type: Number,
  },
  transaction: {
    type: Array,
  },
});

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
