const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user.js");

router
  .get("/all", async (req, res) => {
    console.log("GET /users/all");
    try {
      const allUsers = await User.find();
      res.status(200).send(allUsers);
    } catch (error) {
      res
        .status(400)
        .json({ error: true, message: error + "ERROR en GET ALL users" });
    }
  })
  .post("/login", async (req, res) => {
    const { body } = req;
    console.log("POST /users/login");

    const user = await User.findOne({
      name: body.name,
    });

    const passwordOk = await bcrypt.compare(body.password, user.password);

    if (user && passwordOk) {
      return res.status(200).json({
        error: null,
        message: "USER & PASS OK",
        role: user.role || "user",
      });
    } else {
      return res.status(400).json({
        error: true,
        message: "Credenciales no correctas.",
      });
    }
  })
  .post("/register", async (req, res) => {
    console.log("POST /users/register");
    const { body } = req;

    const newUserNameExist = await User.findOne({
      name: body.name,
    });

    const newUserEmailExist = await User.findOne({
      email: body.email,
    });

    // Cheque doble de previa existencia del usuario, en la API y en el Schema con unique
    if (newUserNameExist || newUserEmailExist) {
      return res.status(400).json({
        error: true,
        message: "Usuario o Email ya existen.",
      });
    }

    // Aplico bcrypt
    const salt = await bcrypt.genSalt(6);
    const encryptedPassword = await bcrypt.hash(body.password, salt);

    try {
      const newUser = new User({
        name: body.name,
        email: body.email,
        password: encryptedPassword,
      });
      await newUser.save();
      newUser.password = body.password;
      res.status(200).json(newUser);
      console.log("ADD user " + newUser.name);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: true, message: error });
    }
  })
  //con PUT no funciona, con PATCH toma siempre el primer valor del array... :(
  .patch("/update/:username", async (req, res) => {
    const { username } = req.params;
    const { body } = req;
    console.log("PUT/users/update" + username);
    try {
      const modUser = await User.findOneAndUpdate(username, body, {
        useFindAndModify: false,
      });
      res.status(200).json(modUser);
      console.log("MOD user " + modUser.name);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  })
  .delete("/delete/:username", async (req, res) => {
    const { username } = req.params;
    console.log("DELETE/users/" + username);

    // chequeo previamente si el user es el super usuario para no borrarlo nunca
    const SUPER_USER = "admin";

    if (username === SUPER_USER) {
      return res.status(400).json({
        error: true,
        message: "This user cannot be erased!",
      });
    }

    try {
      const delUser = await User.findOneAndDelete({
        name: username,
      });
      res.status(200).json(delUser);
      console.log("DEL user " + delUser.name);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        error: true,
        message: error,
      });
    }
  });

module.exports = router;
