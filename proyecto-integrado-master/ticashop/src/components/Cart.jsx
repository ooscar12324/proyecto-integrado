// src/components/Cart.jsx
export default function Cart({ cart, subtotal, iva, total, removeOne, clearCart }) {
  return (
    <aside className="cart">
      <h4>Carrito</h4>
      <div>
        {cart.length === 0 ? (
          <p>Carrito vacío</p>
        ) : (
          cart.map((it, idx) => (
            <div key={idx} className="item">
              <img src={`imagenes/producto${it.id}.jpg`} alt={it.name} />
              <div style={{ flex: 1 }}>
                <strong>{it.name}</strong>
                <div>
                  x{it.qty} · ${it.price.toFixed(2)}
                </div>
              </div>
              <button className="btn" onClick={() => removeOne(idx)}>
                -
              </button>
            </div>
          ))
        )}
      </div>
      <div className="iva">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="iva">
        <span>IVA (19%)</span>
        <span>${iva.toFixed(2)}</span>
      </div>
      <div className="total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <button className="btn" onClick={clearCart}>
          Vaciar
        </button>
        <button
          className="btn primary"
          onClick={() => alert("Pago con IVA incluido 💸")}
        >
          Pagar
        </button>
      </div>
    </aside>
  );
}
