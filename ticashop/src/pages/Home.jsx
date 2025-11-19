import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>TICASHOP - Panel Administrativo</h1>
      <p>Bienvenido a TiCaShop </p>
      <p>Explora nuestros productos y gestiona tus facturas desde aquí.</p>

      <div className="home-buttons">
        <button className="home-btn" onClick={() => navigate("/productos")}>
          Ver Productos
        </button>
        <button className="home-btn" onClick={() => navigate("/facturas")}>
          Ver Facturas
        </button>
      </div>
    </div>
  );
}
