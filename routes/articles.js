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
  .post("/articulos/new", async (req, res) => {
    const { body } = req;
    try {
      const newArticle = new Article(body);
      await newArticle.save();
      res.status(200).json(newArticle);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  })
  .patch("/articulos/update/:id", async (req, res) => {
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
  .delete("/articulos/delete/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const delArticle = await Article.findByIdAndDelete({
        _id: id,
      });
      res.status(200).json(delArticle);
    } catch (error) {
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
