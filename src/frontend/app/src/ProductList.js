// ProductList.js
import React from 'react';

function ProductList({ products }) {
  return (
    <div className="product-list">
      {products.map(product => (
        <div key={product.id} className="product-card">
          <img src={product.imgUrl} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button>Detalles</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
