const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  semail: String,
  spass: String
});

module.exports = mongoose.model("User", userSchema);
