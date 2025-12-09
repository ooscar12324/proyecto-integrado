// src/components/ProductCard.jsx
export default function ProductCard({ product, onAdd }) {
  return (
    <article className="card">
      <img src={product.img} alt={product.name} />
      <h3>{product.name}</h3>
      <div className="meta">
        <div>${product.price.toFixed(2)}</div>
        <button className="btn add" onClick={() => onAdd(product)}>
          Agregar
        </button>
      </div>
    </article>
  );
}
