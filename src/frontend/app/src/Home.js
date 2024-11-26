import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';
import ProductList from './ProductList';
import Filter from './Filter';
import SearchBar from './SearchBar';
import BottomSheet from './BottomSheet'; // Nuevo componente para el Bottom Sheet

function Home() {
  const [filters, setFilters] = useState({ brand: '', category: '', shop: '', minPrice: 0, maxPrice: 2000 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('*');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedProducts, setSelectedProducts] = useState([]); // Productos seleccionados para comparación

  const API_URL = process.env.REACT_APP_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const nameFromQuery = queryParams.get('name') || '*';

  useEffect(() => {
    if (nameFromQuery !== searchTerm) {
      setSearchTerm(nameFromQuery);
      setCurrentPage(1);
    }
  }, [location.search, searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          name: searchTerm,
          brand: filters.brand || '*',
          category: filters.category || '*',
          shop: filters.shop || '*',
          minPrice: filters.minPrice || 0,
          maxPrice: filters.maxPrice || 2000,
          page: currentPage,
          limit: 9,
        });

        const response = await fetch(`${API_URL}/components?${queryParams}`);
        if (!response.ok) throw new Error('Error al cargar los productos');
        const data = await response.json();

        setProducts(data);
        setTotalProducts(data.length);
      } catch (error) {
        console.error(error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, searchTerm, currentPage, API_URL]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    navigate({ pathname: '/', search: `?name=${term}` });
  };

  const handleToggleCompare = (product) => {
    setSelectedProducts((prevSelected) => {
      const isSelected = prevSelected.some((p) => p.id === product.id);
      if (isSelected) {
        return prevSelected.filter((p) => p.id !== product.id);
      }
      if (prevSelected.length >= 2) return prevSelected;
      return [...prevSelected, product];
    });
  };
  

  const handleClearSelection = () => {
    setSelectedProducts([]);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const isLastPage = products.length < 9;

  return (
    <div className="Home">
      <h1>PCForge</h1>
      <SearchBar onSearch={handleSearch} />
      <div className="main-content">
        <Filter filters={filters} setFilters={setFilters} />
        <div className="product-section">
          {loading ? (
            <p>Cargando productos...</p>
          ) : products.length === 0 ? (
            <p>No se encontraron productos</p>
          ) : (
            <>
              <ProductList
                products={products}
                selectedProducts={selectedProducts}
                onToggleCompare={handleToggleCompare}
              />
              <div className="pagination">
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>
                  Anterior
                </button>
                <span>Página {currentPage}</span>
                <button onClick={handleNextPage} disabled={isLastPage}>
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      {selectedProducts.length > 0 && (
        <BottomSheet
          products={selectedProducts}
          onClear={handleClearSelection}
        />
      )}
    </div>
  );
}

export default Home;
