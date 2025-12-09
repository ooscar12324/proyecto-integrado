// src/components/Login.jsx
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Login({ onLogin }) {
  const [params] = useSearchParams();
  const rolSeleccionado = params.get("rol"); // cliente, admin, rrhh

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          rol: rolSeleccionado,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMensaje(data.error || "Credenciales incorrectas");
        return;
      }

      onLogin(data.usuario);
      setMensaje("✔ Sesión iniciada correctamente");
    } catch (err) {
      setMensaje("⚠ Error al conectar con el servidor");
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

      {rolSeleccionado ? (
        <p className="rol-info">
          Estás iniciando como: <strong>{rolSeleccionado.toUpperCase()}</strong>
        </p>
      ) : (
        <p className="rol-info">No seleccionaste rol 😅</p>
      )}

      <form onSubmit={iniciarSesion}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Ingresa tu correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Contraseña:</label>
          <input
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn-login">
          Entrar
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
