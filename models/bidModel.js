const mongoose = require("mongoose");
const { Schema } = mongoose;

const bidSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    assignment: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    finalPrice: {
      type: Number,
      required: true,
    },
    userMessage: {
      type: String,
    },
    // client will accept / reject , defaul = pending
    bidStatus: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const UsersBid = mongoose.model("Usersbid", bidSchema);
module.exports = UsersBid;
