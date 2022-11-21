const router = require("express").Router();
const Galeria = require("../models/galeria");

router
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
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET para 1 solo ID" + id);
    try {
      const galeria = await Galeria.findOne({ _id: id });
      res.status(200).json(galeria);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  });

module.exports = router;
