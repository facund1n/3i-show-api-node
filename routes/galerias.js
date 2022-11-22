const router = require("express").Router();
const Galeria = require("../models/galeria");

router
  // Obtener todos las fotos/galería:
  .get("/all", async (req, res) => {
    console.log("GET /galeria/all");
    try {
      const allGaleria = await Galeria.find();
      res.status(200).send(allGaleria);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL Galería" });
    }
  })
  // Obtener una sola foto/galería:
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET /galeria/id" + id);
    try {
      const galeria = await Galeria.findOne({ _id: id });
      res.status(200).json(galeria);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  }) // Postear una nueva foto/galería:
  .post("/new", async (req, res) => {
    console.log("POST /galeria/new");
    const { body } = req;
    try {
      const newGaleria = new Galeria(body);
      await newGaleria.save();
      res.status(200).json(newGaleria);
      console.log("ADD/POST /galería/id" + newGaleria._id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: error });
    }
  })
  // Actualizar una sola foto/galería por ID:
  .patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("PUT/UPDATE galeria/id" + id);
    try {
      const modGaleria = await Galeria.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modGaleria);
      console.log("UPDATE galeria/id " + modGaleria._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  // Borrar una sola foto/galería por ID:
  .delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log("DELETE galeria/id" + id);
    try {
      const delGaleria = await Galeria.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delGaleria);
      console.log("DEL galeria id " + delGaleria._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
