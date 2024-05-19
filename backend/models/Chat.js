var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var chatSchema = new Schema(
  {
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "chats" }
);

module.exports = mongoose.model("Chat", chatSchema);
