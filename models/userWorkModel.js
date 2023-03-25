const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userWorkImageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workImage: {
    type: String,
    required: true,
  },
});

const UserWorkImage = mongoose.model("Userworkimage", userWorkImageSchema);
module.exports = UserWorkImage;
