const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galeriaSchema = new Schema({
  imageLg: String,
  altLg: String,
});

const Galeria = mongoose.model("galeria", galeriaSchema);
module.exports = Galeria;
