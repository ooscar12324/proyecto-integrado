// src/components/ProductGrid.jsx
import ProductCard from "./ProductCard";

const products = [
  { id: 1, name: "Reloj Deportivo", price: 49.9, img: "imagenes/producto1.jpg" },
  { id: 2, name: "Auriculares TWS", price: 29.9, img: "imagenes/producto2.jpg" },
  { id: 3, name: "Mochila Urbana", price: 39.9, img: "imagenes/producto3.jpg" },
];

export default function ProductGrid({ onAdd }) {
  return (
    <div className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}
