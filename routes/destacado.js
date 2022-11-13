const router = require("express").Router();
const Destacado = require("../models/destacado");

router
  .get("/all", async (req, res) => {
    console.log("GET todos los destacados");
    try {
      const allDestacado = await Destacado.find();
      res.status(200).send(allDestacado);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL" });
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET para 1 solo ID" + id);
    try {
      const destacado = await Destacado.findOne({ _id: id });
      res.status(200).json(destacado);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  });

module.exports = router;
