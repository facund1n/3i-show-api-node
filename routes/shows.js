const router = require("express").Router();
const Show = require("../models/show");

router
  .get("/all", async (req, res) => {
    console.log("GET /shows/all");
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
    console.log("GET /shows/:id" + id);
    try {
      const show = await Show.findOne({ _id: id });
      res.status(200).json(show);
    } catch (error) {
      res.status(404).json({ error: true, message: error });
    }
  }) // Obtener un solo Show:
  .post("/new", async (req, res) => {
    console.log("POST /show/new");
    const { body } = req;
    try {
      const newShow = new Show(body);
      await newShow.save();
      res.status(200).json(newShow);
      console.log("ADD/POST /show/id" + newShow._id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: error });
    }
  })
  // Actualizar un solo Show por ID:
  .patch("/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log("PUT/UPDATE show/id" + id);
    try {
      const modShow = await Show.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modShow);
      console.log("UPDATE show/id " + modShow._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  // Borrar un solo Show por ID:
  .delete("/delete/:id", async (req, res) => {
    const { id } = req.params;
    console.log("DELETE show/id" + id);
    try {
      const delShow = await Show.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delShow);
      console.log("DEL show id " + delShow._id);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
