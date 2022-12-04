// confuguración de express:
const express = require("express");
const app = express();
// config Body Parser:
app.use(express.json());
// config Mongoose:
const mongoose = require("mongoose");

// Conf. de dotenv para uso de .ENV
require("dotenv").config();

mongoose
  .connect(process.env.URI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection OK"))
  .catch((error) => console.error(error));

// Configuracion de CORS (evito errores de CORS)
// esto hay que confiigurar para la gente que solo administre el front:
var cors = require("cors");
app.use(cors());
let corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
//PUERTO:
const port = process.env.PORT;

//
/* const destacadosRoutes = require("./routes/destacados");
const destacadoscomentariosRoutes = require("./routes/destacadoscomentarios");
const noticiasRoutes = require("./routes/noticias");
const showsRoutes = require("./routes/shows");*/
const usersRoutes = require("./routes/users");
const galeriaRoutes = require("./routes/galerias");
const articlesRoutes = require("./routes/articles");

/* app.use("/destacados", cors(corsOptions), destacadosRoutes);
app.use(
  "/destacadoscomentarios",
  cors(corsOptions),
  destacadoscomentariosRoutes
);
app.use("/noticias", cors(corsOptions), noticiasRoutes);
app.use("/shows", cors(corsOptions), showsRoutes);*/

app.use("/", cors(corsOptions), usersRoutes);
app.use("/galerias", cors(corsOptions), galeriaRoutes);
app.use("/", cors(corsOptions), articlesRoutes);

app.listen(port, () => {
  console.log("Running on port: " + port);
});
