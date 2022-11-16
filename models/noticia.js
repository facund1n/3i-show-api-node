const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticiaSchema = new Schema({
  title: String,
  description: String,
  imageSm: String,
  imageLg: String,
  altLg: String,
  altSm: String,
});

const Noticia = mongoose.model("noticia", noticiaSchema);
module.exports = Noticia;