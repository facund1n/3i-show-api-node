const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 128,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 30,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  saved: { type: Array, required: true },
  liked: { type: Array, required: true },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
