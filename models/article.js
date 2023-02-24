const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { type: String, required: true, min: 2, max: 85 },
  subtitle: { type: String, required: true, min: 2, max: 85 },
  body: { type: String, required: true, min: 10, max: 500 },
  image: { type: String, required: true },
  alt: { type: String, required: true },
  category: { String, required: true },
  likes: Array,
  ticketsUrl: String,
  tags: Array,
});

const Article = mongoose.model("articulos", articleSchema);
module.exports = Article;
