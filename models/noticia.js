const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noticiasSchema = new Schema({
  title: String,
  description: String,
  imageSm: String,
  imageLg: String,
  altLg: String,
  altSm: String,
});

const Noticias = mongoose.model("noticia", noticiasSchema);
module.exports = Noticias;
