import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductDetail.css';
import SearchBar from './SearchBar';
import { FaHome } from 'react-icons/fa';
import image from './graphics-card.png';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/components/${id}`);
        if (!response.ok) throw new Error('Error al cargar el producto');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate(`/?name=${term}`);
  };

  if (!product) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className="product-detail">
      <Link to="/" className="back-link">
        <FaHome size={16} /> Volver
      </Link>
      <h1>PCForge</h1>
      <SearchBar onSearch={handleSearch} />
      <h2 className="product-title">{product.name}</h2>

      <div className="product-detail-content">
        <div className="product-image">
          <img src={image} alt={product.name} />
        </div>
        <div className="product-info">
          <h3><strong>${product.price}</strong></h3>
          <p><strong>Categoría:</strong> {product.categoryName}</p>
          <p><strong>Marca:</strong> {product.brandName}</p>
          <p><strong>Tienda:</strong> {product.shopName}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
