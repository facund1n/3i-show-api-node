const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const showSchema = new Schema({
  title: String,
  description: String,
  imageSm: String,
  imageLg: String,
  altLg: String,
  altSm: String,
});

const Show = mongoose.model("show", showSchema);
module.exports = Show;
