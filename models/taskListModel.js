const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskListSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assignment: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    payment: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskListSchema);
module.exports = Task;
