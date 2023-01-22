const mongoose = require("mongoose");
const { Schema } = mongoose;

const SysFeedbackSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    feedback: {
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
