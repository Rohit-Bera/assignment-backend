const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    clientId: {
      type: String,
      ref: "Client",
      required: true,
    },
    userId: {
      type: String,
      ref: "User",
      required: true,
    },
    chats: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
