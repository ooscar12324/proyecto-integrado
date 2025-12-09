import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  const irALogin = (rol) => {
    navigate(`/login?rol=${rol}`);
  };

  return (
    <div className="home-container">
      <h1>TICASHOP </h1>
      <p>Bienvenido a TiCaShop</p>
      <p>Selecciona cómo deseas iniciar sesión:</p>

      <div className="home-buttons">
        <button className="home-btn" onClick={() => irALogin("cliente")}>
          Iniciar como Cliente
        </button>

        <button className="home-btn" onClick={() => irALogin("admin")}>
          Iniciar como Administrador
        </button>

        <button className="home-btn" onClick={() => irALogin("rrhh")}>
          Iniciar como RRHH
        </button>
      </div>
    </div>
  );
}
