import React, { useState, useEffect } from 'react';
import './Filter.css';

function Filter({ filters, setFilters }) {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [shops, setShops] = useState([]);

  const API_URL = process.env.REACT_APP_API_URL;

  const initialFilters = {
    brand: '',
    category: '',
    shop: '',
    minPrice: 0,
    maxPrice: 2000,
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_URL}/brands`);
        const data = await response.json();
        setBrands(data);
      } catch (err) {
        console.error('Error fetching brands', err);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Error fetching categories', err);
      }
    };

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

  const handlePriceChange = (e, type) => {
    const value = Math.max(0, e.target.value); // Evitar valores negativos
    setFilters({ ...filters, [type]: value });
  };

  return (
    <div className="filter-section">
      <h3>Filtrar</h3>

      <div>
        <label htmlFor="brand-filter">Seleccione la marca:</label>
        <select
          id="brand-filter"
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">(Todas las marcas)</option>
          {brands.map((brand) => (
            <option key={brand.id} value={brand.name}>
              {brand.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="category-filter">Seleccione la categoría:</label>
        <select
          id="category-filter"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">(Todas las categorías)</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="shop-filter">Seleccione la tienda:</label>
        <select
          id="shop-filter"
          value={filters.shop}
          onChange={(e) => setFilters({ ...filters, shop: e.target.value })}
        >
          <option value="">(Todas las tiendas)</option>
          {shops.map((shop) => (
            <option key={shop.id} value={shop.name}>
              {shop.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="min-price">Precio mínimo ($):</label>
        <input
          id="min-price"
          type="number"
          value={filters.minPrice}
          onChange={(e) => handlePriceChange(e, 'minPrice')}
        />
      </div>

      <div>
        <label htmlFor="max-price">Precio máximo ($):</label>
        <input
          id="max-price"
          type="number"
          value={filters.maxPrice}
          onChange={(e) => handlePriceChange(e, 'maxPrice')}
        />
      </div>

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
