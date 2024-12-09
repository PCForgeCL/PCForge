import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ProductDetail.css';
import SearchBar from './SearchBar';
import { FaHome } from 'react-icons/fa';
import image from './graphics-card.png';

function ProductDetail() {
  const { id } = useParams(); // Obtener el ID desde la URL
  const [product, setProduct] = useState(null); // Estado del producto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error
  const [searchTerm, setSearchTerm] = useState(''); // Estado del término de búsqueda
  const navigate = useNavigate(); // Navegación programática

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_URL}/components/${id}`);
        if (!response.ok) throw new Error('Error al cargar el producto');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, API_URL]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    navigate(`/?name=${term}`);
  };

  // Renderizar mensaje de carga
  if (loading) {
    return (
      <div className="loader-container">
        <p>Cargando detalles del producto...</p>
      </div>
    );
  }

  // Renderizar mensaje de error
  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/" className="error-link">
          <FaHome size={16} /> Volver a la página principal
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Encabezado */}
      <h1 className="text-8xl font-bold text-left text-gray-800 mb-8">
        <span className="text-primary">PC</span>
        <span className="text-gray-800">Forge</span>
        <span className="text-primary mb-4 text-xl">
          Comparador de precios de componentes de PC
        </span>
      </h1>

      {/* Barra de búsqueda */}
      <SearchBar onSearch={handleSearch} />

      {/* Enlace para volver */}
      <Link to="/" className="back-link">
        <FaHome size={16} /> Volver
      </Link>

      {/* Detalles del producto */}
      <h2 className="product-title text-center text-2xl font-bold mb-8">{product.name}</h2>
      <div className="product-detail-content">
        <div className="product-image">
          {" "}<img src={image} alt={product.name} />
        </div>
      </div>
      <span className="product-info">
          <h3><strong>${product.price}</strong></h3>
          <p><strong>Categoría:</strong> {product.categoryName}</p>
          <p><strong>Marca:</strong> {product.brandName}</p>
          <p><strong>Tienda:</strong> {product.shopName}</p>
          <p><strong>Descripción:</strong> {product.description}</p>
        </span>
    </div>
  );
}

export default ProductDetail;
