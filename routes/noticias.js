const router = require("express").Router();
const Noticia = require("../models/noticia");

router
  // Obtener todos las noticias:
  .get("/all", async (req, res) => {
    console.log("GET todos las noticias");
    try {
      const allNoticia = await Noticia.find();
      res.status(200).send(allNoticia);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL noticias" });
    }
  })
  // Obtener una sola Noticia:
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET para 1 solo ID noticias" + id);
    try {
      const noticia = await Noticia.findOne({ _id: id });
      res.status(200).json(noticia);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  })
  // Obtener una sola Noticia:
  .post("/new", async (req, res) => {
    console.log("POST /noticia/new");
    const { body } = req;
    try {
      const newNoticia = new Noticia(body);
      await newNoticia.save();
      res.status(200).json(newNoticia);
      console.log("ADD/POST /noticias/id" + newNoticia._id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: error });
    }
  })
  // Actualizar una sola Noticia por ID:
  .patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("PUT/UPDATE noticia/id" + id);
    try {
      const modNoticia = await Noticia.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modNoticia);
      console.log("UPDATE noticia/id " + modNoticia._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  // Borrar una sola Noticia por ID:
  .delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log("DELETE noticia/id" + id);
    try {
      const delNoticia = await Noticia.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delNoticia);
      console.log("DEL noticia id " + delNoticia._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
