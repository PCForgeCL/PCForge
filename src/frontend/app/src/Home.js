import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-8xl font-bold text-left text-gray-800 mb-8">
        <span className="text-primary">PC</span>
        <span className="text-gray-800">Forge</span>
        <span className="text-primary mb-4 text-xl">
          Comparador de precios de componentes de PC
        </span>
      </h1>
      
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <Filter filters={filters} setFilters={setFilters} />
        <div className="flex-1">
          {loading ? (
            <p className="text-center text-gray-600">Cargando productos...</p>
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">No se encontraron productos</p>
          ) : (
            <>
              <ProductList
                products={products}
                selectedProducts={selectedProducts}
                onToggleCompare={handleToggleCompare}
              />
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
                >
                  Anterior
                </button>
                <span className="text-gray-600">Página {currentPage}</span>
                <button
                  onClick={handleNextPage}
                  disabled={isLastPage}
                  className="px-4 py-2 bg-gray-300 rounded disabled:bg-gray-200"
                >
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
