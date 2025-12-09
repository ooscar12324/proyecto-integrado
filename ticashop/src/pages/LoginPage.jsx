// src/pages/LoginPage.jsx
import React from "react";
import Login from "../components/Login";

export default function LoginPage({ onLogin }) {
  return (
    <section className="login-page">
      <h3>Iniciar Sesión</h3>
      <Login onLogin={onLogin} />
    </section>
  );
}
