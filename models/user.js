const { Schema, model } = require("mongoose");

const user = new Schema({
  name: String,
  email: String,
  avatar: String,
});

module.exports = model("User", user);
