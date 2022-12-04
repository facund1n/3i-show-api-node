const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { json } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router
  .get("/users", async (req, res) => {
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

    const userWithName = await User.findOne({ name: body.name });

    if (userWithName === null) {
      return res
        .status(400)
        .json({ message: "Nombre o contraseña incorrectos." });
    }

    const unHashPassword = await bcrypt.compare(
      body.password,
      userWithName.password
    );

    if (!userWithName || !unHashPassword) {
      return res
        .status(400)
        .json({ message: "Email o contraseña incorrectos" });
    } else {
      try {
        const jwtToken = jwt.sign(
          { id: userWithName.id, email: userWithName.email },
          process.env.JWT_SECRET
        );
        res.json({ message: "Bienvenido, redirigiendo..", token: jwtToken });
      } catch (err) {
        console.log(err);
      }
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
      return res.status(404).json({
        error: true,
        message: "Usuario o Email ya existen.",
      });
    } else {
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
        res
          .status(200)
          .json({ newUser, message: "Registro Exitoso... Redireccionando" });
        console.log("ADD user " + newUser.name);
      } catch (error) {
        console.log(error);
        res.status(400).json({ error: true, message: error });
      }
    }
  })
  //con PUT no funciona, con PATCH toma siempre el primer valor del array... :(
  .patch("/users/update/:username", async (req, res) => {
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
  .delete("/users/delete/:username", async (req, res) => {
    const { username } = req.params;
    console.log("DELETE/users/" + username);

    const superUser = process.env.SUPER_USER;

    if (username === superUser) {
      return res.status(400).json({
        error: true,
        message: "This user cannot be erased!",
      });
    } else {
      const delUser = await User.findOneAndDelete({
        name: username,
      });
      console.log("deluaser ", delUser);
      if (!delUser) {
        try {
          return res.status(404).json({
            error: true,
            message: "Usuario no existe1",
          });
        } finally {
          console.log("DEL user " + delUser);
          return res.status(200).json(delUser);
        }
      }
    }
  });

module.exports = router;
