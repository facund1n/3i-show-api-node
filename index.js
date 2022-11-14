// confuguración de express:
const express = require("express");
const app = express();
// config Body Parser:
app.use(express.json());
// config Mongoose:
const mongoose = require("mongoose");

// colocar en .ENV luego:
const user = "facundoss";
const pass = "2DEBQWswk2U0rok8";
const db = "metal-blog-show";
const uri = `mongodb+srv://facundoss:${pass}@cluster0.poemtw6.mongodb.net/${db}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection OK"))
  .catch((error) => console.error(error));

// Conf. de dotenv para uso de .ENV
require("dotenv").config();

// Configuracion de CORS (evito errores de CORS)
var cors = require("cors");
app.use(cors());
let corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};

//
const destacadosRoutes = require("./routes/destacados");
app.use("/destacados", cors(corsOptions), destacadosRoutes);

const noticiasRoutes = require("./routes/noticias");
app.use("/noticias", cors(corsOptions), noticiasRoutes);

//PUERTO:
const port = process.env.PORT;
//listen CORRE API, si no, no corre.
app.listen(port, () => {
  console.log("Running on port: " + port);
});
