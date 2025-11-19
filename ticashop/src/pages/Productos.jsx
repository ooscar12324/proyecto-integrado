import React, { useEffect, useState } from "react";
import Cart from "../components/Cart";
import ProductGrid from "../components/ProductGrid";
import "../styles/Productos.css";

const IVA = 0.19;

export default function Productos() {
  const [cart, setCart] = useState([]);
  const [ventas, setVentas] = useState([]);

  // Cálculo de totales del carrito
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;

  // Funciones de carrito
  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeOne = (index) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].qty--;
      if (updated[index].qty <= 0) updated.splice(index, 1);
      return updated;
    });
  };

  const clearCart = () => setCart([]);

  // Cargar ventas desde backend
  useEffect(() => {
    fetch("http://localhost:3000/ventas/reporte-mensual")
      .then((res) => res.json())
      .then((data) => setVentas(data))
      .catch((err) => console.error(err));
  }, []);

  // Descargar Excel
  const descargarExcel = () => {
    window.open("http://localhost:3000/ventas/generar-excel");
  };

  return (
    <div className="productos-container">
      <h2>Productos / Ventas</h2>
      <button className="btn-excel" onClick={descargarExcel}>
        Descargar Excel
      </button>

      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <table>
          <thead>
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
            {ventas.map((v) => (
              <tr key={v.id_factura + v.producto}>
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
      )}

      <ProductGrid onAdd={addToCart} />

      <Cart
        cart={cart}
        subtotal={subtotal}
        iva={iva}
        total={total}
        removeOne={removeOne}
        clearCart={clearCart}
      />
    </div>
  );
}
