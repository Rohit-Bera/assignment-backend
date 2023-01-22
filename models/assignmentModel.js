const mongoose = require("mongoose");
const { Schema } = mongoose;

const assignmentSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    assignmentName: {
      type: String,
      required: true,
    },
    assignmentType: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    // pending | done
    assignmentStatus: {
      type: String,
      required: true,
      default: "pending",
    },
    assignmentBudget: {
      type: Number,
      required: true,
    },
    attachments: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Assignment = mongoose.model(" Assignment ", assignmentSchema);

module.exports = Assignment;
