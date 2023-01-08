const mongoose = require("mongoose");
const { Schema } = mongoose;

const SysFeedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userFeedback: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const SysFeedback = mongoose.model("Systemfeedback", SysFeedbackSchema);
module.exports = SysFeedback;
