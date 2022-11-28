const router = require("express").Router();
const Destacadocomentario = require("../models/destacadoComentarios");

router
  // Obtener todos los destacados:
  .get("/all", async (req, res) => {
    console.log("GET /destacadosComentarios/all");
    try {
      const allComentarios = await Destacadocomentario.find();
      res.status(200).send(allComentarios);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL destacados" });
    }
  })
  // Obtener un solo destacados por ID:
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET /destacadoscomentarios/id" + id);
    try {
      const comentario = await Destacadocomentario.findOne({ _id: id });
      res.status(200).json(comentario);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  })
  // Postear un nuevo destacado:
  .post("/new", async (req, res) => {
    console.log("POST /destacado/new");
    const { body } = req;
    try {
      const newDestacado = new Destacado(body);
      await newDestacado.save();
      res.status(200).json(newDestacado);
      console.log("ADD/POST /destacado/id" + newDestacado._id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: error });
    }
  })
  // Actualizar un solo destacado por ID:
  .patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("PUT/UPDATE destacado/id" + id);
    try {
      const modDestacado = await Destacado.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modDestacado);
      console.log("UPDATE destacados/id " + modDestacado._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  // Borrar un solo destacado por ID:
  .delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log("DELETE destacado/id" + id);
    try {
      const delDestacado = await Destacado.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delDestacado);
      console.log("DEL destacado id " + delDestacado._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
