
export default function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <span className="condition-badge">
          ● {product.condition}
        </span>
      </div>

      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <strong>₱{product.price.toLocaleString()}</strong>
        </div>

        <h3>{product.name}</h3>
        <p>♧ {product.campus}</p>
        <p>▣ {product.posted}</p>
      </div>
    </article>
  );
}
