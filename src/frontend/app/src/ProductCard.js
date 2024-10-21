// ProductCard.js
import React from 'react';

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img src="https://via.placeholder.com/150" alt={product.name} />
      <h3>{product.name}</h3>
      <p>${product.price}</p>
      <button>Detalles</button>
    </div>
  );
}

export default ProductCard;
