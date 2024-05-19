var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    id: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    linked_users: {
      type: Array,
      required: true,
    },
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", UserSchema);
