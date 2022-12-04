const router = require("express").Router();
const Article = require("../models/article");

const searchProduct = async (req, res, next) => {
  try {
    const { q } = req.query;
    const articulos = await Article.find({
      name: { $regex: q, $options: "i" },
    });

    if (articulos.length < 1) throw new ErrorHandler(404, "No hay resultados");

    res.status(201).json({
      status: "success",
      message: "Hay resultados",
      articulos,
    });
  } catch (error) {
    next(error);
  }
};
