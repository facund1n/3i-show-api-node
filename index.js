const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT;

app.use(express.json());

const MOCK = [
  {
    id: "1",
    category: "news",
    title: "Nuevo integrante de Metallica",
    description: "Se suma a la banda nuevo integrante",
    image:
      "https://lasoga.org/wp-content/uploads/2016/05/Metallica-promo-780x470.jpg",
  },
  {
    id: "2",
    category: "photos",
    title: "Rock in Rio",
    description: "Algunas Placas de Rock in Rio",
    image: {
      1: "https://st4.depositphotos.com/36524586/38416/i/450/depositphotos_384166448-stock-photo-rio-de-janeiro-september-24.jpg",
      2: "https://st4.depositphotos.com/36524586/38416/i/450/depositphotos_384166448-stock-photo-rio-de-janeiro-september-24.jpg",
    },
  },
];

app.get("/all", (req, res) => {
  const all = MOCK;
  res.status(200).send(all);
});

app.get("/all/:id", (req, res) => {
  const { id } = req.params;
  const one = MOCK.find((i) => i.id === id);
  res.status(200).send(one);
});

app.listen(port, () => {
  console.log(`Running on port: ${port}`);
});
