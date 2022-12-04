const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: String,
  subtitle: String,
  body: String,
  image: String,
  alt: String,
  category: String,
  likes: Array,
  ticketsUrl: String,
  tags: Array,
});

const Article = mongoose.model("articulos", articleSchema);
module.exports = Article;
