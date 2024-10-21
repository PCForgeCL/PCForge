// Filter.js
import React from 'react';

function Filter({ filters, setFilters }) {
  return (
    <div className="filter-section">
      <h3>Filtrar</h3>
      <div>
        <label>Marcas</label>
        <select
          value={filters.brand}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">(Todo)</option>
          <option value="Intel">Intel</option>
          <option value="AMD">AMD</option>
        </select>
      </div>
      <div>
        <label>Categoría</label>
        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">(Todo)</option>
          <option value="Placas madres">Placas madres</option>
          <option value="Procesadores">Procesadores</option>
          <option value="Memorias">Memorias</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
