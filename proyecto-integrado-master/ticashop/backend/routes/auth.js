// routes/auth.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// LOGIN CON ROLES
router.post("/login", (req, res) => {
  const { email, password, rol } = req.body;

  if (!email || !password || !rol) {
    return res.status(400).json({ error: "Faltan datos para iniciar sesión" });
  }

  const query = "SELECT * FROM usuarios WHERE correo = ? AND rol = ?";

  db.query(query, [email, rol], async (err, results) => {
    if (err) {
      console.error("❌ Error SQL:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Usuario o rol incorrecto" });
    }

    const user = results[0];

    // Verificar contraseña
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      msg: "Login exitoso",
      usuario: {
        id: user.id_usuario,
        nombre: user.nombre,
        correo: user.correo,
        rol: user.rol,
      },
    });
  });
});

module.exports = router;
