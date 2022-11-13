const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destacadoSchema = new Schema({
  title: String,
  description: String,
  imageSm: String,
  imageLg: String,
  altLg: String,
  altSm: String,
});

const Destacado = mongoose.model("destacado", destacadoSchema);
module.exports = Destacado;
