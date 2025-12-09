// src/pages/LoginPage.jsx
import React from "react";
import Login from "../components/Login";

export default function LoginPage({ onLogin }) {
  return (
    <section className="login-page">
      <Login onLogin={onLogin} />
    </section>
  );
}
