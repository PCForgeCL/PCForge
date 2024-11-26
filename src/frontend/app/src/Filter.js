import React, { useState, useEffect } from 'react';
import './Filter.css';

function Filter({ filters, setFilters }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  // Valores iniciales de los filtros
  const initialFilters = {
    brand: '',
    category: '',
    shop: '',
    minPrice: 0,
    maxPrice: 2000,
  };

  useEffect(() => {
    // Obtener marcas
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_URL}/brands`);
        const data = await response.json();
        setBrands(data);
      } catch (err) {
        console.error('Error fetching brands', err);
      }
    };

    // Obtener categorías
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

    // Obtener tiendas
    const fetchShops = async () => {
      try {
        const response = await fetch(`${API_URL}/shops`);
        const data = await response.json();
        setShops(data);
      } catch (err) {
        console.error('Error fetching shops', err);
      }
    };

    fetchBrands();
    fetchCategories();
    fetchShops();
  }, [API_URL]);

  return (
    <div className="filter-section">
      <h3>Filtrar</h3>
      <div>
        <label>Marca</label>
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">(Todo)</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Categoría</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">(Todo)</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Tienda</label>
        <select
          value={filters.shop}
          onChange={(e) => setFilters({ ...filters, shop: e.target.value })}
        >
          <option value="">(Todo)</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.name}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Precio mínimo</label>
        <input
          type="number"
          value={filters.minPrice}
          onChange={(e) =>
            setFilters({ ...filters, minPrice: e.target.value })
          }
        />
      </div>

      <div>
        <label>Precio máximo</label>
        <input
          type="number"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: e.target.value })
          }
        />
      </div>

      {/* Botón para reestablecer los filtros */} 
      <button
        className="reset-button"
        onClick={() => setFilters(initialFilters)}
      >
        Restablecer filtros
      </button>
    </div>
  );
}

export default Filter;
