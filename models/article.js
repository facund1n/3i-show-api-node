const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  title: { String, required: true, min: 2, max: 85 },
  subtitle: { String, required: true, min: 2, max: 85 },
  body: { String, required: true, min: 10, max: 500 },
  image: { String, required: true },
  alt: { String, required: true },
  category: { String, required: true },
  likes: Array,
  ticketsUrl: String,
  tags: Array,
});

const Article = mongoose.model("articulos", articleSchema);
module.exports = Article;
