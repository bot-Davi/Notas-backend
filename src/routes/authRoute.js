const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../services/authService");

router.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body);
    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.json({ message: "Registro exitoso", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
