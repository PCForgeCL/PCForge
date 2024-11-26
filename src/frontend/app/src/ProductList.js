import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import image from './graphics-card.png';

function ProductList({ products }) {
  const navigate = useNavigate(); 

  const handleViewDetails = (id) => {
    navigate(`/components/${id}`);
  };

  return (
    <div className="product-list">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={image} alt={product.name} />
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => handleViewDetails(product.id)}>Detalles</button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
