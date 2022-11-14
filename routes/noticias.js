const router = require("express").Router();
const Noticias = require("../models/noticia");

router
  .get("/all", async (req, res) => {
    console.log("GET todos las noticias");
    try {
      const allNoticias = await Noticias.find();
      res.status(200).send(allNoticias);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL noticias" });
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET para 1 solo ID noticias" + id);
    try {
      const Noticias = await Noticias.findOne({ _id: id });
      res.status(200).json(Noticias);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  });

module.exports = router;
