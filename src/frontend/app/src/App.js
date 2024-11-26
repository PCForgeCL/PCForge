import React, { useState, useEffect } from 'react';
import './App.css';
import ProductList from './ProductList';
import Filter from './Filter';
import SearchBar from './SearchBar';

function App() {
  const [filters, setFilters] = useState({ brand: '', category: '', shop: '', minPrice: 0, maxPrice: 2000 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('*');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams({
          name: searchTerm || '*',
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
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
  };

  const isLastPage = products.length < 9;

  return (
    <div className="App">
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
              <ProductList products={products} />
              <div className="pagination">
                <button 
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                >
                  Anterior
                </button>
                <span>Página {currentPage}</span>
                <button 
                  onClick={handleNextPage}
                  disabled={isLastPage}
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
