const router = require("express").Router();
const Show = require("../models/show");

router
  .get("/all", async (req, res) => {
    console.log("GET todos los shows");
    try {
      const allShow = await Show.find();
      res.status(200).send(allShow);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL shows" });
    }
  })
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    console.log("GET para 1 solo ID noticias" + id);
    try {
      const show = await Show.findOne({ _id: id });
      res.status(200).json(show);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  });

module.exports = router;
