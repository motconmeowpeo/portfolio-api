const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true, // This field should be unique
  },
  email: {
    type: String,
    require: true,
    unique: true, // This field should be unique
  },
  password: {
    type: String,
    require: false,
  },
});

exports.User = new mongoose.model("User", userSchema);
