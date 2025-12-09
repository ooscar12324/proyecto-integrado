import React, { useState, useEffect } from "react";
import "../styles/Facturas.css";

export default function Facturas() {
  const [facturas, setFacturas] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Cargar facturas desde backend
  useEffect(() => {
    fetch("http://localhost:3000/facturas/notificaciones")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setFacturas(data);
        } else {
          console.error("⚠ El backend NO devolvió un array:", data);
          setFacturas([]);
        }
      })
      .catch((err) => {
        console.error("Error al cargar facturas:", err);
        setFacturas([]);
      })
      .finally(() => setCargando(false));
  }, []);

  // Descargar Excel
  const descargarExcel = () => {
    window.open("http://localhost:3000/ventas/generar-excel");
  };

  return (
    <div className="facturas-container">
      <h2>Gestión de Facturas</h2>

      <button className="btn-excel" onClick={descargarExcel}>
        Descargar Excel 📊
      </button>

      {cargando ? (
        <p>Cargando facturas... ⏳</p>
      ) : Array.isArray(facturas) && facturas.length > 0 ? (
        <table className="tabla-facturas">
          <thead>
            <tr>
              <th>ID Factura</th>
              <th>Cliente</th>
              <th>Vendedor</th>
              <th>Emisión</th>
              <th>Vencimiento</th>
              <th>Estado</th>
              <th>Total</th>
              <th>Fecha Creación</th>
            </tr>
          </thead>

          <tbody>
            {facturas.map((f) => (
              <tr key={f.id_factura}>
                <td>{f.id_factura}</td>
                <td>{f.id_cliente}</td>
                <td>{f.id_vendedor}</td>
                <td>{f.fecha_emision}</td>
                <td>{f.fecha_vencimiento}</td>
                <td>{f.estado}</td>
                <td>${f.total}</td>
                <td>{f.fecha_creacion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay facturas registradas 🥲</p>
      )}
    </div>
  );
}
