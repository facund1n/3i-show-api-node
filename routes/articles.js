const router = require("express").Router();
const Article = require("../models/article");

router
  // Obtener todos los destacados:
  .get("/articulos", async (req, res) => {
    try {
      const allArticles = await Article.find();
      res.status(200).send(allArticles);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .get("/articulos/destacados", async (req, res) => {
    try {
      const allArticles = await Article.find({ category: "destacados" });
      res.status(200).send(allArticles);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .get("/articulos/noticias", async (req, res) => {
    try {
      const allArticles = await Article.find({ category: "noticias" });
      res.status(200).send(allArticles);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .get("/articulos/shows", async (req, res) => {
    try {
      const allArticles = await Article.find({ category: "shows" });
      res.status(200).send(allArticles);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .get("/articulos/destacados/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const articulo = await Article.findOne({ _id: id });
      res.status(200).json(articulo);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .get("/articulos/noticias/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const articulo = await Article.findOne({ _id: id });
      res.status(200).json(articulo);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .get("/articulos/shows/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const articulo = await Article.findOne({ _id: id });
      res.status(200).json(articulo);
    } catch (error) {
      res.status(404).json({ message: error });
    }
  })
  .post("/articulos/destacado/new", async (req, res) => {
    const { body } = req;
    try {
      const newDestacado = new Article(body);
      await newDestacado.save();
      res.status(200).json(newDestacado);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .post("/articulos/noticias/new", async (req, res) => {
    const { body } = req;
    try {
      const newNoticia = new Article(body);
      await newNoticia.save();
      res.status(200).json(newNoticia);
    } catch (error) {
      res.status(400).json({ error: true, message: error });
    }
  })
  .post("/articulos/shows/new", async (req, res) => {
    const { body } = req;
    try {
      const newShow = new Article(body);
      await newShow.save();
      res.status(200).json(newShow);
    } catch (error) {
      res.status(400).json({ error: true, message: error });
    }
  })
  .patch("/articulos/destacados/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const modDestacado = await Article.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modDestacado);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .patch("/articulos/noticias/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const modNoticia = await Article.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modNoticia);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .patch("/articulos/shows/update/:id", async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
      const modShow = await Article.findByIdAndUpdate(id, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modShow);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .delete("/articulos/destacados/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const delDestacado = await Article.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delDestacado);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .delete("/articulos/noticias/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const delNoticia = await Article.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delNoticia);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .delete("/articulos/shows/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const delShow = await Article.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delShow);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .get("/search?query=:input", async (req, res) => {
    const { input } = req.query;
    console.log(input);
    try {
      const allArticles = await Article.find({
        tags: input,
      });
      res.status(200).send(allArticles);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
