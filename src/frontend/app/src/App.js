// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



// App.js
import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import Filter from './Filter';
import SearchBar from './SearchBar';

function App() {
  const [filters, setFilters] = useState({ brand: '', category: '' });

  const products = [
    { id: 1, name: 'M/B Intel H410M-E', price: '84.700', brand: 'Intel', imgUrl: 'https://i5.walmartimages.com/asr/a35922ca-9336-44cf-90ea-a3a07198ac66.40134e758677d6de22548b1d273a9078.jpeg' },
    { id: 2, name: 'M/B Intel H510M-E', price: '101.990', brand: 'Intel', imgUrl: 'https://img.terabyteshop.com.br/produto/g/placa-mae-asus-prime-h510m-e-chipset-h510-intel-lga-1200-matx-ddr4-90mb17e0-m0eay0-imp_124176.jpg' },
    { id: 3, name: 'M/B AMD A520M-K', price: '78.600', brand: 'AMD', imgUrl: 'https://content.rozetka.com.ua/goods/images/big/334504997.jpg' },
    { id: 4, name: 'M/B AMD B550-F', price: '265.190', brand: 'AMD', imgUrl: 'https://images.novatech.co.uk/asus-90mb14s0-m0eay0_extra2.jpg' },
    { id: 5, name: 'M/B AMD A520M-A', price: '99.990', brand: 'AMD', imgUrl: 'https://images.novatech.co.uk/asrock-a520m-hdv_extra1.jpg' },
    { id: 6, name: 'M/B Intel H510M-E', price: '81.600', brand: 'Intel', imgUrl: 'https://asset.msi.com/resize/image/global/product/product_163002939008ef50cf3f827267afdcc2e5cc4aeab0.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png' },
  ];

  const filteredProducts = products.filter(product => {
    return (filters.brand === '' || product.brand === filters.brand);
  });

  return (
    <div className="App">
      <h1>PCForge</h1>
      <SearchBar />
      <div className="main-content">
        <Filter filters={filters} setFilters={setFilters} />
        <ProductList products={filteredProducts} />
      </div>
    </div>
  );
}

export default App;
