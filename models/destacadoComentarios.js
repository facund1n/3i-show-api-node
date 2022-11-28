const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const destacadocomentarioSchema = new Schema({
  body: String,
});

const Destacadocomentario = mongoose.model(
  "destacadocomentario",
  destacadocomentarioSchema
);
module.exports = Destacadocomentario;
