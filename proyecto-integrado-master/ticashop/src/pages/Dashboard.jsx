import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function Dashboard() {
  const [ventas, setVentas] = useState([]);
  const [facturas, setFacturas] = useState([]);

  const cargarVentas = () => {
    fetch('http://localhost:3001/ventas/reporte-mensual')
      .then(res => res.json())
      .then(data => setVentas(data))
      .catch(err => console.error(err));
  };

  const descargarExcel = () => {
    window.open('http://localhost:3001/ventas/generar-excel');
  };

  const cargarFacturas = () => {
    fetch('http://localhost:3001/facturas/notificaciones')
      .then(res => res.json())
      .then(data => setFacturas(data))
      .catch(err => console.error(err));
  };

  const pagarFactura = (id, monto) => {
    fetch('http://localhost:3001/facturas/pago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_factura: id, monto })
    })
      .then(res => res.json())
      .then(() => cargarFacturas())
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarVentas();
    cargarFacturas();
  }, []);

  const colorAlerta = (dias) => {
    if (dias < 0) return '#ff4d4f';
    if (dias <= 5) return '#faad14';
    return '#52c41a';
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <Header />

      {/* Sección Ventas */}
      <section style={{ marginBottom: 50 }}>
        <h2>Reporte de Ventas</h2>
        <button
          onClick={descargarExcel}
          style={{ padding: '8px 15px', marginBottom: 15, cursor: 'pointer' }}
        >
          Descargar Excel
        </button>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead style={{ backgroundColor: '#1890ff', color: '#fff' }}>
            <tr>
              <th>Factura</th>
              <th>Vendedor</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Proveedor</th>
              <th>Costo</th>
              <th>Precio Venta</th>
              <th>Utilidad</th>
              <th>Margen %</th>
            </tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id_factura + v.producto} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                <td>{v.id_factura}</td>
                <td>{v.vendedor}</td>
                <td>{v.cliente}</td>
                <td>{v.producto}</td>
                <td>{v.proveedor}</td>
                <td>{v.costo}</td>
                <td>{v.precio_venta}</td>
                <td>{v.utilidad}</td>
                <td>{v.margen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sección Facturas */}
      <section>
        <h2>Facturas Pendientes</h2>
        {facturas.length === 0 ? (
          <p style={{ fontStyle: 'italic' }}>No hay facturas pendientes</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#1890ff', color: '#fff' }}>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Fecha Vencimiento</th>
                <th>Días Restantes</th>
                <th>Alerta</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {facturas.map(f => (
                <tr key={f.id_factura} style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>
                  <td>{f.id_factura}</td>
                  <td>{f.cliente}</td>
                  <td>{f.fecha_vencimiento}</td>
                  <td>{f.dias_restantes}</td>
                  <td style={{ color: '#fff', backgroundColor: colorAlerta(f.dias_restantes), fontWeight: 'bold' }}>
                    {f.alerta}
                  </td>
                  <td>
                    <button
                      onClick={() => pagarFactura(f.id_factura, 1500)}
                      style={{ padding: '5px 10px', cursor: 'pointer' }}
                    >
                      Marcar como pagada
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}
