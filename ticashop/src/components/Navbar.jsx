import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ totalItems }) {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/productos">Productos</Link>
      <Link to="/facturas">Facturas</Link>
      <span className="cart-indicator">🛒 {totalItems}</span>
    </nav>
  );
}
