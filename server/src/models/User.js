const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  avatar: { type: String },
  email: { type: String },
  password: { type: String },
  website: {type: String},
  about: {type: String},
  notifications: [],
});

module.exports = mongoose.model("User", userSchema);
