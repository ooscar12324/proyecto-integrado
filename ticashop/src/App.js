import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Facturas from "./pages/Facturas";
import ProductGrid from "./components/ProductGrid";
import Cart from "./components/Cart";
import Login from "./components/Login";
import "./styles/App.css";
import { useState } from "react";

const IVA = 0.19;

export default function App() {
  const [cart, setCart] = useState([]);

  const handleLogin = (email) => {
    alert(`Inicio de sesión correcto como: ${email}`);
  };

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

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const iva = subtotal * IVA;
  const total = subtotal + iva;

  return (
    <div className="app">
      <Navbar totalItems={cart.reduce((s, i) => s + i.qty, 0)} />

      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Página de productos */}
        <Route
          path="/productos"
          element={
            <>
              <section id="productos" style={{ padding: "20px" }}>
                <h3>Catálogo de Productos</h3>
                <ProductGrid onAdd={addToCart} />
              </section>
              <Cart
                cart={cart}
                subtotal={subtotal}
                iva={iva}
                total={total}
                removeOne={removeOne}
                clearCart={clearCart}
              />
            </>
          }
        />

        {/* Página de facturas */}
        <Route path="/facturas" element={<Facturas />} />

        {/* Página de login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
}
